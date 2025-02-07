import React from 'react';
import classes from './CourseBlock.module.scss';
import CourseCard from '../CourseCard/CourseCard';

import cat from "../../../../assets/кот.png";
import bleach from "../../../../assets/bleach.png";

const CourseBlock = ({ title }) => {

    const courses = [
        { title: "Python", image: cat, hours: "70", category: "Programming" },
        { title: "Marketing", image: bleach, hours: "702", category: "Bussiness" },
        { title: "History", image: cat, hours: "710", category: "Useless" },
        { title: "C++", image: bleach, hours: "740", category: "Programming" },
        { title: "History", image: cat, hours: "710", category: "Useless" },
        { title: "C++", image: bleach, hours: "740", category: "Programming" },
        { title: "History", image: cat, hours: "710", category: "Useless" },
    ]

    return (
        <div className="_wrapper">
            <div className={classes.card}>
                <div className={classes.header}>
                    <h2 className={classes.title}>{title}</h2>
                </div>
                <div className={classes.grid}>
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseBlock;
