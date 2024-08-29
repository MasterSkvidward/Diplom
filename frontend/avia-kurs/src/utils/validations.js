export const emailValidation = {
   minLength: {
     value: 9,
     message: "Минимум 9 символов",
   },
   maxLength: {
     value: 35,
     message: "Максимум 35 символов",
   },
   pattern: {
     value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
     message: "Email не соответствует формату",
   },
 };
 

 export const nameValidation = {
   minLength: {
     value: 2,
     message: "Минимум 2 символа",
   },
   maxLength: {
     value: 30,
     message: "Максимум 30 символов",
   },
   pattern: {
     value: /[А-Яа-я]{2,}$/,
     message: "Имя не соответствует формату",
   },
 };

 export const phoneValidation = {
   pattern: {
     value: /^(\+7|8)?\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
     message: "Номер телефона не соответствует формату",
   },
 };

export const passwordValidation = {
  minLength: {
    value: 3,
    message: "Минимум 3 символа",
  },
  maxLength: {
    value: 50,
    message: "Максимум 50 символов",
  },
};


export const numberValidation = {
  minLength: {
    value: 2,
    message: "Минимум 2 символа",
  },
  maxLength: {
    value: 30,
    message: "Максимум 30 символов",
  },
  // pattern: {
  //   value: /[А-Яа-я]{2,}$/,
  //   message: "Имя не соответствует формату",
  // },
};
