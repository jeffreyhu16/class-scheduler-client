import React from 'react'
import Header from './Header'
import Main from './Main'
import { dataContext } from './contexts/DataContext';

export default function App() {

    const [ calendarView, setCalendarView ] = React.useState('week');
    const [ startOfWeek, setStartOfWeek ] = React.useState();
    const [ currentDate, setCurrentDate ] = React.useState();
    const [ locationData, setLocationData ] = React.useState();
    const [ location, setLocation ] = React.useState({ name: 'Camberwell', numOfCourts: 5 });
    const [ coach, setCoach ] = React.useState({ name: 'Tim' });

    React.useEffect(() => {
        Promise.all([
            fetch('/date/currentDate'),
            fetch('/date/startOfWeek'),
            fetch('/location')
        ])
        .then(([ res1, res2, res3 ]) => {
            res1.json().then(data => setCurrentDate(data));
            res2.json().then(data => setStartOfWeek(data));
            res3.json().then(data => setLocationData(data));
        })
        .catch(err => console.log(err));
    }, []); 

    return (
        <dataContext.Provider value={{
            calendarView,
            setCalendarView,
            currentDate,
            setCurrentDate,
            locationData,
            setLocationData, 
            startOfWeek, 
            setStartOfWeek,
            location,
            setLocation,
            coach,
            setCoach
        }}>
            <Header/>
            <Main/>
        </dataContext.Provider>
    )
}