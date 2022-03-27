import React from 'react'
import Header from './Header'
import Main from './Main'
import { dataContext } from './contexts/DataContext';

export default function App() {

    const [ calendarView, setCalendarView ] = React.useState('week');
    const [ breakPoint, setBreakPoint ] = React.useState(window.innerWidth > 1080);
    const [ startOfWeek, setStartOfWeek ] = React.useState();
    const [ currentDate, setCurrentDate ] = React.useState();
    const [ locationData, setLocationData ] = React.useState();
    const [ coachData, setCoachData ] = React.useState();
    const [ location, setLocation ] = React.useState({ name: 'Camberwell', numOfCourts: 5 });
    const [ coach, setCoach ] = React.useState({ name: 'Tim' });

    React.useEffect(() => {
        Promise.all([
            fetch('/date/currentDate'),
            fetch('/date/startOfWeek'),
            fetch('/location'),
            fetch('/coach')
        ])
        .then(([ res1, res2, res3, res4 ]) => {
            res1.json().then(data => setCurrentDate(data));
            res2.json().then(data => setStartOfWeek(data));
            res3.json().then(data => {
                setLocationData([{ name: 'all' }, ...data ]);
                setLocation(data[0]);
            });
            res4.json().then(data => {
                setCoachData([{ name: 'all' }, ...data ]);
                setCoach(data[0]);
            });
        })
        .catch(err => console.log(err));

        window.addEventListener('resize', () => setBreakPoint(window.innerWidth > 1080));
    }, []); 

    return (
        <dataContext.Provider value={{
            calendarView,
            setCalendarView,
            currentDate,
            setCurrentDate,
            locationData,
            coachData,
            startOfWeek, 
            setStartOfWeek,
            location,
            setLocation,
            coach,
            setCoach
        }}>
            <Header breakPoint={breakPoint}/>
            <Main breakPoint={breakPoint}/>
        </dataContext.Provider>
    )
}