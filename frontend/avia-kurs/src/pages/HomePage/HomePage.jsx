import {useEffect} from 'react';
import classes from "./HomePage.module.scss";
import FlightTable from '../../components/elements/FlightTable/FlightTable';


export default function HomePage() {
   // const {fetchConferences } = useConferenceStore((state) => ({
   //    fetchConferences: state.fetchConferences,
   //  }));

    useEffect(() => {
      // fetchConferences();
    }, [])

  return (
    <main className={classes.main}>
      <FlightTable/>
    </main>
  )
}