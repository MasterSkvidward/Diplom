import React from 'react';
import classes from "./WatchFlight.module.scss";
import { formatDate } from '../../../utils/utils';

export default function WatchFlight({flight, setVisible}) {

   if (!flight) return <></>

  return (
    <div className={classes.container}>
      <div className={classes.flight}>
         <div className={classes.flight__info}>
            <div className={classes.flight__row}>
               <p>Номер рейса:</p><p>{flight.number}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Модель воздушного судна:</p><p>{flight.model}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Авиакомпания:</p><p>{flight.airline}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Статус:</p><p>{flight.status}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Число пассажиров:</p><p>{flight.passenger_count}</p>
            </div>



         </div>

         <div className={classes.flight__dates}>
            <div className={classes.flight__row}>
               <p>Время отправления:</p><p>{formatDate(flight.departure_time)}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Время прибытия:</p><p>{formatDate(flight.arrival_time)}</p>
            </div>

            <div className={classes.flight__row}>
               <p>Место отправления:</p><p>{flight.departure_location}</p>
            </div>
            <div className={classes.flight__row}>
               <p>Место прибытия:</p><p>{flight.arrival_location}</p>
            </div>
         </div>

      </div>
      <button
         type="submit"
         className={[classes.btn, classes.btn_cancel].join(" ")}
         onClick={() => setVisible(false)}
      >
         Закрыть
      </button>
    </div>
  )
}
