import { useEffect } from 'react';
import classes from "./CoursePage.module.scss";
import Sidebar from '../../components/elements/SideBar/SideBar';
import Course from '../../components/elements/Course/Course/Course';


export default function CoursePage() {
  // const {fetchConferences } = useConferenceStore((state) => ({
  //    fetchConferences: state.fetchConferences,
  //  }));


  const testCourse1 = {
    progress: 45,
    chapters: [
      {
        title: "Основы Python",
        lessons: [
          { id: 1, title: "Введение в Python", watched: true },
          { id: 2, title: "Переменные и типы данных", watched: true },
          { id: 3, title: "Условные операторы", watched: false },
          { id: 4, title: "Циклы", watched: false },
          { id: 5, title: "Функции", watched: false },
          { id: 6, title: "Модули и пакеты", watched: false }
        ]
      },
      {
        title: "Продвинутые темы Python",
        lessons: [
          { id: 7, title: "Работа с файлами", watched: false },
          { id: 8, title: "Исключения", watched: false },
          { id: 9, title: "ООП в Python", watched: false },
          { id: 10, title: "Многопоточность", watched: false }
        ]
      },
      {
        title: "Продвинутые темы Python",
        lessons: [
          { id: 7, title: "Работа с файлами", watched: false },
          { id: 8, title: "Исключения", watched: false },
          { id: 9, title: "ООП в Python", watched: false },
          { id: 10, title: "Многопоточность", watched: false }
        ]
      },
      {
        title: "Продвинутые темы Python",
        lessons: [
          { id: 7, title: "Работа с файлами", watched: false },
          { id: 8, title: "Исключения", watched: false },
          { id: 9, title: "ООП в Python", watched: false },
          { id: 10, title: "Многопоточность", watched: false }
        ]
      },
      {
        title: "Продвинутые темы Python",
        lessons: [
          { id: 7, title: "Работа с файлами", watched: false },
          { id: 8, title: "Исключения", watched: false },
          { id: 9, title: "ООП в Python", watched: false },
          { id: 10, title: "Многопоточность", watched: false }
        ]
      }
    ]
  };

  const testCourse2 = {
    progress: 80,
    chapters: [
      {
        title: "Основы веб-разработки",
        lessons: [
          { id: 1, title: "HTML основы", watched: true },
          { id: 2, title: "CSS основы", watched: true },
          { id: 3, title: "Основы JavaScript", watched: true },
          { id: 4, title: "Респонсивный дизайн", watched: false }
        ]
      },
      {
        title: "Продвинутые темы веб-разработки",
        lessons: [
          { id: 5, title: "Фреймворки JS", watched: false },
          { id: 6, title: "Интеграция с API", watched: false }
        ]
      }
    ]
  };

  const testLesson = {
    title: "1.2 Основы Django",
    likes: 120,
    dislikes: 3,
    steps: [
      {
        contentType: "video",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ", // пример ссылки на видео
        comments: [
          { author: "Иван", text: "Отличное видео!" },
          { author: "Мария", text: "Понятное объяснение." }
        ]
      },
      {
        contentType: "text",
        content: "В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений. В этом шаге мы рассмотрим основы Django. Django — это высокоуровневый веб-фреймворк на Python, который упрощает создание сложных веб-приложений.",
        comments: [
          { author: "Алексей", text: "Интересный материал, хотелось бы больше примеров." }
        ]
      },
      {
        contentType: "text",
        content: "Здесь описаны основные компоненты Django: модели, представления и шаблоны, которые помогают структурировать приложение.",
        comments: []
      },
      {
        contentType: "text",
        content: "Мы обсудим преимущества использования Django для быстрого прототипирования и разработки функциональных веб-приложений.",
        comments: [
          { author: "Елена", text: "Прекрасное изложение материала." }
        ]
      },
      {
        contentType: "test",
        // Для теста передаём массив вопросов через поле questions (будет использоваться как prompt в компоненте Test)
        questions: [
          {
            id: 1,
            question: "Что такое Django?",
            options: ["Веб-фреймворк", "Язык программирования", "Библиотека"]
          },
          {
            id: 2,
            question: "Какой шаблон архитектуры используется в Django?",
            options: ["MTV", "MVC", "MVVM"]
          },
          {
            id: 3,
            question: "Что является моделью в Django?",
            options: ["Объект данных", "Вид", "Контроллер"]
          },
          {
            id: 4,
            question: "Как называется административная панель Django?",
            options: ["Admin", "Dashboard", "Control Panel"]
          },
          {
            id: 5,
            question: "На каком языке написан Django?",
            options: ["Python", "JavaScript", "Ruby"]
          }
        ],
        // Для шага теста можно оставить поле content пустым, так как вопросы задаются отдельно
        content: "",
        comments: [
          { author: "Олег", text: "Тест получился интересным!" }
        ]
      }
    ]
  };



  useEffect(() => {
    // fetchConferences();
  }, [])

  return (
    <main className={classes.main}>
      <div className={classes.sidebar}>
        <Sidebar course={testCourse1} />
      </div>

      <Course lesson={testLesson} />
    </main>
  )
}