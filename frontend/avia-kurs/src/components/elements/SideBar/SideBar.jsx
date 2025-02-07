import React, { useState, useEffect } from 'react';
import classes from './SideBar.module.scss';

const Sidebar = ({ course }) => {
    // Создаем локальную копию данных курса, чтобы обновлять поле watched при клике
    const [courseData, setCourseData] = useState(course);
    // Храним идентификатор активного урока в виде объекта { chapterIndex, lessonIndex }
    const [activeLesson, setActiveLesson] = useState({ chapterIndex: 0, lessonIndex: 0 });

    // Функция для получения глобального индекса урока
    const getGlobalIndex = (chapterIndex, lessonIndex) => {
        let index = 0;
        for (let i = 0; i < chapterIndex; i++) {
            index += courseData.chapters[i].lessons.length;
        }
        return index + lessonIndex;
    };

    // Функция для вычисления количества последовательных просмотренных уроков (начиная с первого)
    const getLastWatchedCount = () => {
        let count = 0;
        for (let c of courseData.chapters) {
            for (let lesson of c.lessons) {
                if (lesson.watched) {
                    count++;
                } else {
                    return count;
                }
            }
        }
        return count;
    };

    // Разрешённый глобальный индекс для выбора: все уроки с индексом <= (lastWatchedCount) и следующий (lastWatchedCount)
    const lastWatchedCount = getLastWatchedCount();
    const allowedGlobalIndex = lastWatchedCount; // нумерация с 0: урок с индекс = lastWatchedCount является следующим допустимым

    // Обработчик клика по уроку
    const handleLessonClick = (chapterIndex, lessonIndex) => {
        const globalIndex = getGlobalIndex(chapterIndex, lessonIndex);
        // Разрешаем выбор только если глобальный индекс <= allowedGlobalIndex
        if (globalIndex > allowedGlobalIndex) return;

        // Обновляем активный урок
        setActiveLesson({ chapterIndex, lessonIndex });

        // Если урок еще не отмечен как просмотренный, обновляем состояние курса
        setCourseData(prevData => {
            const newData = { ...prevData };
            // Создаем копии массивов для иммутабельности
            newData.chapters = prevData.chapters.map((ch, ci) => {
                if (ci !== chapterIndex) return ch;
                return {
                    ...ch,
                    lessons: ch.lessons.map((lesson, li) => {
                        if (li !== lessonIndex) return lesson;
                        return { ...lesson, watched: true };
                    })
                };
            });
            return newData;
        });
    };

    // Для нумерации уроков: формат "глава.номер" (например, 1.1, 1.2 и т.д.)
    const getLessonNumber = (chapterIndex, lessonIndex) => {
        return `${chapterIndex + 1}.${lessonIndex + 1}`;
    };

    return (
        <aside className={classes.sidebar}>
            <div className={classes.progressSection}>
                <div className={classes.progressLabel}>Прогресс: {courseData.progress}%</div>
                <div className={classes.progressBar}>
                    <div
                        className={classes.progressFill}
                        style={{ width: `${courseData.progress}%` }}
                    ></div>
                </div>
            </div>
            <div className={classes.chapterList}>
                {courseData.chapters.map((chapter, ci) => (
                    <div key={ci} className={classes.chapter}>
                        <h3 className={classes.chapterTitle}>
                            {`Глава ${ci + 1} - ${chapter.title}`}
                        </h3>
                        <ul className={classes.lessonList}>
                            {chapter.lessons.map((lesson, li) => {
                                const globalIndex = getGlobalIndex(ci, li);
                                // Определяем, доступен ли урок: если его глобальный индекс <= allowedGlobalIndex, то доступен
                                const isAllowed = globalIndex <= allowedGlobalIndex;
                                // Определяем, является ли урок активным
                                const isActive =
                                    activeLesson.chapterIndex === ci && activeLesson.lessonIndex === li;
                                return (
                                    <li
                                        key={lesson.id}
                                        className={`
                      ${classes.lessonItem} 
                      ${isActive ? classes.activeLesson : ''} 
                      ${!isAllowed ? classes.disabledLesson : ''}
                    `}
                                        onClick={() => handleLessonClick(ci, li)}
                                    >
                                        <span className={classes.lessonNumber}>{getLessonNumber(ci, li)}</span>
                                        <span className={classes.lessonTitle}>{lesson.title}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
