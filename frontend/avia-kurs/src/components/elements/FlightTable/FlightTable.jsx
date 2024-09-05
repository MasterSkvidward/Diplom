import React, { useState, useEffect } from 'react';
import classes from './FlightTable.module.scss';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import EditFlight from '../EditFlight/EditFlight';
import WatchFlight from '../WatchFlight/WatchFlight';
import {formatTime} from "../../../utils/utils";
import toast, { Toaster } from 'react-hot-toast';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [watchVisible, setWatchVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentFlight, setCurrentFlight] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/flights')
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  const handleView = (flight) => {
    setCurrentFlight(flight);
    setWatchVisible(true);
  };

  const saveChanges = async (updatedFlight) => {
    try {
      const response = await fetch(`http://localhost:3001/flights/${updatedFlight.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFlight),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setFlights(flights.map(f => f.id === updatedData.id ? updatedData : f));
        setEditVisible(false);
      } else {
        console.error('Error updating flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  };

  const handleEdit = (flight) => {
    setCurrentFlight(flight);
    setEditVisible(true);
  };


  const handleDelete = async (flight) => {
    try {
      const response = await fetch(`http://localhost:3001/flights/${flight.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setFlights(flights.filter(item => item.id !== flight.id));
        toast.success('Рейс удален')
      } else {
        console.error('Error deleting flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  console.log(flights)

  return (
    <div className={classes.flight}>
      <div className="_wrapper">
        <h2 className={classes.flight__title}>Список рейсов</h2>
        <table className={classes.flight__table}>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Номер рейса</th>
              <th>Авиакомпания</th>
              <th>Время отправления</th>
              <th>Время прибытия</th>
              <th>Место отправления</th>
              <th>Место прибытия</th>
              <th>Статус</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.number}</td>
                <td>{flight.airline}</td>
                <td>{formatTime(flight.departure_time)}</td>
                <td>{formatTime(flight.arrival_time)}</td>
                <td>{flight.departure_town}</td>
                <td>{flight.arrival_town}</td>
                <td>{flight.status}</td>
                <td className={classes.actions}>
                  <FaEye onClick={() => handleView(flight)} className={[classes.actions__icon, classes.actions__icon_watch].join(" ")} />
                  <FaEdit onClick={() => handleEdit(flight)} className={[classes.actions__icon, classes.actions__icon_edit].join(" ")} />
                  <FaTrashAlt onClick={() => handleDelete(flight)} className={[classes.actions__icon, classes.actions__icon_delete].join(" ")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalWindow title={"Изменение рейса"} visible={editVisible} setVisible={setEditVisible}>
        <EditFlight flight={currentFlight} setVisible={setEditVisible} saveChanges={saveChanges}/>
      </ModalWindow>
      <ModalWindow title={"Просмотр рейса"} visible={watchVisible} setVisible={setWatchVisible}>
        <WatchFlight flight={currentFlight} setVisible={setWatchVisible}/>
      </ModalWindow>
      <Toaster/>
    </div>
  );
};

export default FlightTable;
