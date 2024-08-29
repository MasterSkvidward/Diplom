import React, { useState, useEffect, useRef } from 'react';
import classes from './Chat.module.scss';
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import useAuthStore from '../../../stores/auth';
import { IoIosChatbubbles } from "react-icons/io";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser, isAuth } = useAuthStore((state) => ({
    currentUser: state.user,
    isAuth: state.isAuth,
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users');
      const usersData = await response.json();
      const finalUserData = usersData.filter(user => user.id !== currentUser.id);
      setUsers(finalUserData);
    };

    if (currentUser.id) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const messageData = {
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        text: newMessage,
      };

      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      const savedMessage = await response.json();
      setMessages([...messages, savedMessage]);
      setNewMessage('');
  };
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const fetchMessages = async () => {
    if (selectedUser) {
      const response = await fetch(
        `http://localhost:3001/messages?senderId=${currentUser.id}&receiverId=${selectedUser.id}`
      );
      const data = await response.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Проверка новых сообщений каждые 5 секунд
    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [selectedUser]);


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupMessagesByDate = () => {
    const groupedMessages = [];
    let lastDate = null;

    messages.forEach((msg) => {
      const messageDate = new Date(msg.timestamp).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
      });

      if (messageDate !== lastDate) {
        groupedMessages.push({ type: 'date', date: messageDate });
        lastDate = messageDate;
      }

      groupedMessages.push({ ...msg, type: 'message' });
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="_wrapper">
      <div className={classes.chat}>
        <div className={classes.chat__userList}>
          <div className={classes.chat__title}>
          <IoIosChatbubbles />
            <h3>Все чаты</h3>
          </div>

          <ul>
            {!isAuth 
              ? <p className={classes.usersEmpty}>Войдите в профиль чтобы начать переписку</p>
              :
            users.map(user => (
              <li
                key={user.id}
                className={selectedUser?.id === user.id ? classes.active : ''}
                onClick={() => setSelectedUser(user)}
              >
                <img src={user.img} alt={user.name} />
                <p>{user.name}</p>
              </li>
            ))}
          </ul>
        </div>

        {(!selectedUser || !isAuth) ? (
          <p className={classes.empty}>Выберите, кому хотели бы написать</p>
        ) : (
          <div className={classes.chat__box}>
            <div className={classes.chat__user}>
              <img src={selectedUser.img} alt={selectedUser.name} />
              <p>{selectedUser.name}</p>
              <p className={classes.phone}>{selectedUser.phone}</p>
            </div>
            <div
              className={classes.messages || "-"}
             
            >
              {groupedMessages.map((msg, index) =>
                msg.type === 'date' ? (
                  <div key={index} className={classes.dateSeparator}>
                    <span>{msg.date}</span>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className={
                      msg.sender_id === currentUser.id
                        ? [classes.message, classes.myMessage].join(" ")
                        : [classes.message, classes.theirMessage].join(" ")
                    }
                  >
                    <p>{msg.text}</p>
                    <span className={classes.timestamp}>
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                )
              )}
              <div />
              
            </div>
            <div className={classes.inputBox}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Написать сообщение..."
                onKeyDown={handleKeyPress}
              />
              <IoSend onClick={handleSendMessage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
