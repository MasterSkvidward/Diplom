import React from 'react';
import classes from './CourseCard.module.scss';

const CourseCard = ({ course }) => {

    console.log(course)

    return (
        <div className={classes.card} onClick={e => { }}>
            <div className={classes.imageWrapper}>
                <img src={course.image} alt={course.title} className={classes.image} />
            </div>
            <div className={classes.cardContent}>
                <h3 className={classes.title}>{course.title}</h3>
                <div className={classes.info}>
                    <span className={classes.hours}>{course.hours} часов</span>
                    {course.category && <span className={classes.category}>{course.category}</span>}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
