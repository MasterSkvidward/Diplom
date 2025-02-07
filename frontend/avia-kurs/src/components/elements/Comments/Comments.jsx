import React, { useState, useEffect } from 'react';
import classes from './Comments.module.scss';

const getDeclension = (n, forms) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
};

const formatDate = (date, now) => {
    const diff = (now - new Date(date)) / 1000;
    if (diff < 30) return "Только что";
    if (diff < 60) {
        const sec = Math.floor(diff);
        return `${sec} ${getDeclension(sec, ["секунда", "секунды", "секунд"])} назад`;
    }
    if (diff < 3600) {
        const min = Math.floor(diff / 60);
        return `${min} ${getDeclension(min, ["минута", "минуты", "минут"])} назад`;
    }
    if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours} ${getDeclension(hours, ["час", "часа", "часов"])} назад`;
    }
    if (diff < 2592000) {
        const days = Math.floor(diff / 86400);
        return `${days} ${getDeclension(days, ["день", "дня", "дней"])} назад`;
    }
    const months = Math.floor(diff / 2592000);
    return `${months} ${getDeclension(months, ["месяц", "месяца", "месяцев"])} назад`;
};

const Comments = ({ comments, totalCount }) => {
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(
        // добавляем свойство userVote: 0 (нет), 1 (лайк), -1 (дизлайк)
        comments.map(c => ({ ...c, userVote: 0 }))
    );
    const [filter, setFilter] = useState('popular'); // 'popular' или 'new'
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [now, setNow] = useState(new Date());

    // Обновляем время каждую минуту для обновления форматирования времени
    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSend = () => {
        if (newComment.trim() === '') return;
        const comment = {
            id: Date.now(),
            author: "Пользователь",
            avatar: "https://via.placeholder.com/40",
            date: new Date(),
            text: newComment,
            likes: 0,
            dislikes: 0,
            userVote: 0
        };
        setCommentList([comment, ...commentList]);
        setNewComment('');
        setIsInputFocused(false);
    };

    const handleCancel = () => {
        setNewComment('');
        setIsInputFocused(false);
    };

    const handleLike = (id) => {
        setCommentList(prev =>
            prev.map(c => {
                if (c.id !== id) return c;
                // Если уже поставлен лайк, снимаем его
                if (c.userVote === 1) {
                    return { ...c, likes: c.likes - 1, userVote: 0 };
                }
                // Если был дизлайк, снимаем его и ставим лайк
                if (c.userVote === -1) {
                    return { ...c, dislikes: c.dislikes - 1, likes: c.likes + 1, userVote: 1 };
                }
                // Если ничего не было, ставим лайк
                return { ...c, likes: c.likes + 1, userVote: 1 };
            })
        );
    };

    const handleDislike = (id) => {
        setCommentList(prev =>
            prev.map(c => {
                if (c.id !== id) return c;
                if (c.userVote === -1) {
                    return { ...c, dislikes: c.dislikes - 1, userVote: 0 };
                }
                if (c.userVote === 1) {
                    return { ...c, likes: c.likes - 1, dislikes: c.dislikes + 1, userVote: -1 };
                }
                return { ...c, dislikes: c.dislikes + 1, userVote: -1 };
            })
        );
    };

    return (
        <div className={classes.commentsContainer}>
            <div className={classes.header}>
                <div className={classes.totalCount}>{totalCount} комментариев</div>
                <div className={classes.filterContainer}>
                    <select
                        className={classes.filterSelect}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="popular">Сначала популярные</option>
                        <option value="new">Сначала новые</option>
                    </select>
                </div>
            </div>
            <div className={classes.newComment}>
                <img className={classes.avatar} src="https://via.placeholder.com/40" alt="avatar" />
                <input
                    className={classes.commentInput}
                    type="text"
                    placeholder="Напишите комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                />
            </div>
            {isInputFocused && (
                <div className={classes.commentButtons}>
                    <button className={classes.cancelButton} onClick={handleCancel}>Отмена</button>
                    <button className={classes.sendButton} onClick={handleSend}>Отправить</button>
                </div>
            )}
            <ul className={classes.commentList}>
                {commentList.map((comment) => (
                    <li key={comment.id} className={classes.commentItem}>
                        <img className={classes.avatar} src={comment.avatar} alt={comment.author} />
                        <div className={classes.commentContent}>
                            <div className={classes.commentHeader}>
                                <span className={classes.author}>{comment.author}</span>
                                <span className={classes.date}>{formatDate(comment.date, now)}</span>
                            </div>
                            <div className={classes.text}>{comment.text}</div>
                            <div className={classes.commentActions}>
                                <button className={classes.likeButton} onClick={() => handleLike(comment.id)}>
                                    <span className={classes.emoji}>👍</span>
                                    <span className={classes.count}>{comment.likes}</span>
                                </button>
                                <button className={classes.dislikeButton} onClick={() => handleDislike(comment.id)}>
                                    <span className={classes.emoji}>👎</span>
                                    <span className={classes.count}>{comment.dislikes}</span>
                                </button>
                                <button className={classes.replyButton}>Ответить</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
