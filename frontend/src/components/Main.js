import React from 'react'
import Calendar from './calendars/Calendar'
import { dataContext } from './contexts/DataContext'
import Sidebar from './Sidebar'

export default function Main(props) {

    const { breakPoint } = props;
    const { calendarView, coach } = React.useContext(dataContext);

    const dayView = calendarView === 'day';
    const coachAll = coach.name === 'all';
    return (
        <main className="main-flex">
            {(dayView || !coachAll) && breakPoint && <Sidebar />}
            <Calendar breakPoint={breakPoint}/>
        </main>
    )
}