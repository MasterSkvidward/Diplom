import React from 'react';
import classes from "./EditFlight.module.scss";
import MyInput from '../../UI/MyInput/MyInput';
import { useForm } from 'react-hook-form';
import { emailValidation, numberValidation } from '../../../utils/validations';
import MyButton from '../../UI/MyButton/MyButton';
import toast, { Toaster } from 'react-hot-toast';

export default function EditFlight({flight, setVisible, saveChanges}) {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      resetField,
      formState: { errors, isValid, isSubmitted, isSubmitting },
    } = useForm({ mode: "onTouched" });
    
    const watchFields = watch(["number", "model", "airline" ]);

    function filterObject(obj) {
      // Создаем новый объект для хранения свойств с непустыми значениями
      const filteredObj = {};
    
      // Проходим по всем свойствам исходного объекта
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
    
          // Проверяем, является ли значение непустым (не null, не undefined, не пустая строка)
          if (value !== null && value !== undefined && value !== '') {
            filteredObj[key] = value;
          }
        }
      }
    
      return filteredObj;
    }
    
    const onSubmit = (data) => {
   
      const filteredObject = filterObject(data);
      console.log(data)
      console.log(filteredObject)
      console.log(flight)
      const finalData = {...flight, ...filteredObject};
      saveChanges(finalData);
      setVisible(false);
      reset();
      toast.success('Изменения сохранены');
    };

    if (!flight) return <></>

  return (
   <div className={classes.container}>
      <form className={classes.flight} onSubmit={handleSubmit(onSubmit)}>
            <MyInput
               type="text"
               placeholder={flight.number}
               {...register("number", numberValidation)}
               label={"Номер рейса"}
               errors={errors.number && errors.number.message}
            />

            <MyInput
               type="text"
               placeholder={flight.model}
               {...register("model", numberValidation)}
               label={"Модель самолета"}
               errors={errors.model && errors.model.message}
            />

            <MyInput
               type="text"
               placeholder={flight.airline}
               {...register("airline", numberValidation)}
               label={"Авиакомпания"}
               errors={errors.airline && errors.airline.message}
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

  )
}
