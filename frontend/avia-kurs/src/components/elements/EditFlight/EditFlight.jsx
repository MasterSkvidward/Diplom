import React from 'react';
import classes from "./EditFlight.module.scss";
import MyInput from '../../UI/MyInput/MyInput';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function EditFlight({flight, setVisible, saveChanges}) {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm({ mode: "onTouched" });

    function filterObject(obj) {
      const filteredObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (value !== null && value !== undefined && value !== '') {
            filteredObj[key] = value;
          }
        }
      }
      return filteredObj;
    }

    const adjustToMoscowTime = (dateTime) => {
      if (!dateTime) return null;
      const date = new Date(dateTime);
      // Смещаем время на +3 часа (Москва)
      date.setHours(date.getHours() + 3);
      return date.toISOString();
    };

    const onSubmit = (data) => {
      const filteredObject = filterObject(data);

      // Преобразование времени и даты вылета и прилета в формат ISO с учетом часового пояса Москвы
      if (filteredObject.departure_time) {
        filteredObject.departure_time = adjustToMoscowTime(filteredObject.departure_time);
      }
      if (filteredObject.arrival_time) {
        filteredObject.arrival_time = adjustToMoscowTime(filteredObject.arrival_time);
      }

      const finalData = {...flight, ...filteredObject};
      saveChanges(finalData);
      setVisible(false);
      reset();
      toast.success('Изменения сохранены');
    };

    if (!flight) return <></>;

    return (
      <div className={classes.container}>
        <form className={classes.flight} onSubmit={handleSubmit(onSubmit)}>
          <MyInput
            type="text"
            placeholder={flight.number}
            {...register("number")}
            label={"Номер рейса"}
            errors={errors.number && errors.number.message}
          />

          <MyInput
            type="text"
            placeholder={flight.model}
            {...register("model")}
            label={"Модель самолета"}
            errors={errors.model && errors.model.message}
          />

          <MyInput
            type="text"
            placeholder={flight.airline}
            {...register("airline")}
            label={"Авиакомпания"}
            errors={errors.airline && errors.airline.message}
          />

         <MyInput
            type="text"
            placeholder={flight.status}
            {...register("status")}
            label={"Статус"}
            errors={errors.status && errors.status.message}
          />

          {/* Поле для изменения даты и времени вылета */}
          <MyInput
            type="datetime-local"
            defaultValue={flight.departure_time ? new Date(flight.departure_time).toISOString().slice(0, 16) : ''}
            {...register("departure_time")}
            label={"Дата и время вылета"}
            errors={errors.departure_time && errors.departure_time.message}
          />

          {/* Поле для изменения даты и времени прилета */}
          <MyInput
            type="datetime-local"
            defaultValue={flight.arrival_time ? new Date(flight.arrival_time).toISOString().slice(0, 16) : ''}
            {...register("arrival_time")}
            label={"Дата и время прилета"}
            errors={errors.arrival_time && errors.arrival_time.message}
          />

          <div className={classes.flight__btns}>
            <button
              type="submit"
              className={[classes.flight__btn, classes.flight__btn_save].join(" ")}
            >
              Сохранить
            </button>

            <div
              className={[classes.flight__btn, classes.flight__btn_cancel].join(" ")}
              onClick={() => setVisible(false)}
            >
              Отменить
            </div>
          </div>
        </form>
        <Toaster/>
      </div>
    );
}
