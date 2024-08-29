import React, {useEffect} from 'react';
import classes from "./LoginForm.module.scss";
import { useForm } from 'react-hook-form';
import MyInput from '../../UI/MyInput/MyInput';
import { emailValidation, passwordValidation } from '../../../utils/validations';
import useAuthStore from '../../../stores/auth';

export default function LoginForm({setVisible}) {
   const {login, isAuth } = useAuthStore((state) => ({
      login: state.login,
      isAuth: state.isAuth,
    }));

   const {
      register,
      handleSubmit,
      watch,
      reset,
      resetField,
      formState: { errors, isValid, isSubmitted, isSubmitting },
    } = useForm({ mode: "onTouched" });
    
    const watchFields = watch(["name", "surname", "email", "university", "group", "phone" ]);
    
    const onSubmit = async (data) => {
      // if (!file.name) toast.error('Ошибка! Прикрепите файл!');
      // else 
      // toast.success('Заявка отправлена!');
      // if (params.id !== "undefined" && params.id !== "null") navigate(`/conference/${params.id}`);
      await login(data.email, data.password);
      reset();
    };

    useEffect(() => {
      if (isAuth) {
         setVisible(false);
      }
    }, [isAuth])


  return (
    <div className={classes.login} onMouseDown={e => e.stopPropagation()}>
      <h2 className={classes.login__title}>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
         <MyInput
            type="text"
            placeholder="Email"
            {...register("email", emailValidation)}
            label={"Адрес Email"}
            required
            errors={errors.email && errors.email.message}
         />
         <MyInput
            type="password"
            placeholder="*********"
            {...register("password", passwordValidation)}
            label={"Пароль"}
            required
            errors={errors.password && errors.password.message}
         />
         <div className={classes.login__buttons}>
            <button
               type="submit"
               className={classes.login__btn}
               >
               Войти
            </button>
         </div>
    
      </form>
    </div>
  )
}