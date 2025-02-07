import { useEffect } from 'react';
import classes from "./HomePage.module.scss";
import FlightTable from '../../components/elements/FlightTable/FlightTable';
import Test from '../../components/elements/Test/Test';
import CourseCard from '../../components/elements/Course/CourseCard/CourseCard';
import CourseBlock from "../../components/elements/Course/CourseBlock/CourseBlock";


export default function HomePage() {
  // const {fetchConferences } = useConferenceStore((state) => ({
  //    fetchConferences: state.fetchConferences,
  //  }));

  useEffect(() => {
    // fetchConferences();
  }, [])

  return (
    <main className={classes.main}>
      <CourseBlock title={"Программирование"} />
      <CourseBlock title={"Бизнес"} />
      <CourseBlock title={"Лингвистика"} />

    </main>
  )
}