import React, { useState, useEffect } from "react";
import CheckBox from "../../UI/CheckBox/CheckBox"; // Импорт компонента CheckBox (путь можно настроить)
import classes from "./Test.module.scss"; // Стили для Test

const Test = () => {
  const testTitle = "Тема тестирования: Основы React";
  const totalTime = 300; // 5 минут (в секундах)

  // answers – объект, где ключ (числовой id вопроса) соответствует массиву выбранных индексов вариантов
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [answers, setAnswers] = useState({});

  // Массив вопросов с числовыми id
  const questions = [
    {
      id: 1,
      question: "Что такое JSX?",
      options: [
        "Расширение синтаксиса JavaScript",
        "Специальный язык для стилей",
        "Инструмент для тестирования"
      ]
    },
    {
      id: 2,
      question: "Какой хук используется для работы с состоянием?",
      options: [
        "useState",
        "useEffect",
        "useContext"
      ]
    },
    {
      id: 3,
      question: "Какой хук используется для работы с состоянием?",
      options: [
        "useState",
        "useEffect",
        "useContext"
      ]
    },
    {
      id: 4,
      question: "Какой хук используется для работы с состоянием?",
      options: [
        "useState",
        "useEffect",
        "useContext"
      ]
    }
  ];

  // Таймер обратного отсчёта
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Функция переключения (toggle) выбранного варианта: добавляет или удаляет вариант из массива для конкретного вопроса
  const toggleOption = (questionId, optionIndex) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || [];
      if (currentSelections.includes(optionIndex)) {
        // Убираем выбранный вариант
        return {
          ...prev,
          [questionId]: currentSelections.filter(index => index !== optionIndex)
        };
      } else {
        // Добавляем вариант
        return {
          ...prev,
          [questionId]: [...currentSelections, optionIndex]
        };
      }
    });
  };

  // Функция форматирования времени в формате MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
      <div className={classes.testComponent}>

        <header className={classes.testHeader}>
          <h2 className={classes.title}>{testTitle}</h2>
          <div className={classes.timer}>Осталось: {formatTime(timeLeft)}</div>
        </header>
        <div className={classes.questions}>
          {questions.map((q, idx) => (
            <div key={q.id} className={classes.questionBlock}>
              {/* Выводим номер вопроса и текст */}
              <h3 className={classes.questionText}>{`${idx + 1}. ${q.question}`}</h3>
              <div className={classes.options}>
                {q.options.map((option, index) => (
                  <CheckBox
                    key={index}
                    label={option}
                    checked={(answers[q.id] || []).includes(index)}
                    onChange={() => toggleOption(q.id, index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Test;
