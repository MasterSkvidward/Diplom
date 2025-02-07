import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // для перехода к следующему уроку
import classes from './Course.module.scss';
import Test from '../../Test/Test';
import Comments from '../../Comments/Comments';

const Course = ({ lesson }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const step = lesson.steps[currentStep];

    // Локальное состояние для лайков и дизлайков урока
    const [likes, setLikes] = useState(lesson.likes);
    const [dislikes, setDislikes] = useState(lesson.dislikes);

    const handleNextStep = () => {
        if (currentStep < lesson.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Переход к следующему уроку (пример, замените на нужную логику)
            console.log("Переход к следующему уроку");
            navigate(`/course/${lesson.nextLessonId}`);
        }
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    // Рендер контента шага
    const renderContent = () => {
        switch (step.contentType) {
            case 'video':
                return (
                    <div className={classes.content}>
                        <div className={classes.video}>
                            <iframe
                                src={step.content}
                                title={lesson.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div className={classes.content}>
                        <p>{step.content}</p>
                    </div>
                );
            case 'test':
                return (
                    <div className={classes.content}>
                        <Test questions={step.questions} />
                    </div>
                );
            default:
                return <div className={classes.content}>Нет контента</div>;
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.course}>
                <h2 className={classes.lessonTitle}>{lesson.title}</h2>
                {/* Интерфейс навигации по шагам */}
                <div className={classes.stepNavigator}>
                    {lesson.steps.map((_, index) => (
                        <button
                            key={index}
                            className={`${classes.stepButton} ${currentStep === index ? classes.activeStepButton : ''}`}
                            onClick={() => setCurrentStep(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className={classes.stepContainer}>
                    <div className={classes.courseWrapper}>
                        {renderContent()}
                    </div>
                </div>
            </div>

            <div className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.lessonFooter}>
                        <div className={classes.feedback}>
                            <button className={classes.likeButton} onClick={handleLike}>
                                👍 <span className={classes.likeCount}>{likes}</span>
                            </button>
                            <button className={classes.dislikeButton} onClick={handleDislike}>
                                👎 <span className={classes.dislikeCount}>{dislikes}</span>
                            </button>
                        </div>
                        <div className={classes.stepLabel}>Шаг {currentStep + 1}</div>
                        <button className={classes.nextStepButton} onClick={handleNextStep}>
                            Следующий шаг
                        </button>
                    </div>
                    <Comments comments={step.comments} totalCount={lesson.totalComments || 0} />
                </div>
            </div>
        </div>
    );
};

export default Course;
