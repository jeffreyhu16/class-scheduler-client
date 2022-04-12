import React from 'react'
import Header from './Header'
import Main from './Main'
import { dataContext } from '../contexts/DataContext';
import { renderContext } from '../contexts/RenderContext'
import { Backdrop, CircularProgress } from '@mui/material'

export default function App() {

    const api = process.env.REACT_APP_LOCAL;
    const [calendarView, setCalendarView] = React.useState('week');
    const [startOfWeek, setStartOfWeek] = React.useState();
    const [currentDate, setCurrentDate] = React.useState();
    const [locationData, setLocationData] = React.useState();
    const [coachData, setCoachData] = React.useState();
    const [location, setLocation] = React.useState({ name: 'all' });
    const [coach, setCoach] = React.useState({ name: 'Larry' });
    const [breakPoint, setBreakPoint] = React.useState({
        1280: window.innerWidth > 1280,
        780: window.innerWidth > 780,
        660: window.innerWidth > 660
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        Promise.all([
            fetch(`${api}/date/currentDate`),
            fetch(`${api}/date/startOfWeek`),
            fetch(`${api}/location`),
            fetch(`${api}/coach`)
        ])
            .then(([res1, res2, res3, res4]) => {
                res1.json().then(data => setCurrentDate(data));
                res2.json().then(data => setStartOfWeek(data));
                res3.json().then(data => {
                    setLocationData([{ name: 'all' }, ...data]);
                });
                res4.json().then(data => {
                    setCoachData([{ name: 'all' }, ...data]);
                });
            })
            .then(() => {
                setTimeout(() => setLoading(false), 4000);
            })
            .catch(err => console.log(err));

        window.addEventListener('resize', () => {
            setBreakPoint({
                1280: window.innerWidth > 1280,
                780: window.innerWidth > 780,
                660: window.innerWidth > 660,
            });
        });
    }, []);
    const dayView = calendarView === 'day';
    const weekView = calendarView === 'week';
    const coachAll = coach.name === 'all';
    const locationAll = location.name === 'all';

    return (
        <dataContext.Provider value={{
            api,
            setCalendarView,
            currentDate,
            setCurrentDate,
            startOfWeek,
            setStartOfWeek,
            locationData,
            location,
            setLocation,
            coachData,
            coach,
            setCoach
        }}>
            <renderContext.Provider value={{
                dayView,
                weekView,
                coachAll,
                locationAll
            }}>
                <Header breakPoint={breakPoint} />
                <Main breakPoint={breakPoint} />
            </renderContext.Provider>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </dataContext.Provider>
    )
}