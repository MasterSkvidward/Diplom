import React from 'react';
import classes from "./MessangerPage.module.scss";
import Chat from '../../components/elements/Chat/Chat';

export default function MessangerPage() {
   const users = [
      { id: 1, name: 'Диспетчер' },
      { id: 2, name: 'Аэрофлот' },
      { id: 3, name: 'Сотрудник безопасности' },
    ];

  return (
    <div className={classes.messages}>
      <Chat />
    </div>
  )
}
