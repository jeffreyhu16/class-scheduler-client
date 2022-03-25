import React from 'react'
import Calendar from 'react-calendar'
import { DateTime } from 'luxon'
// import 'react-calendar/dist/Calendar.css';

export default function Sidebar() {

    const [ date, setDate ] = React.useState(new Date());
    const testDate = DateTime.fromISO(date.toISOString());

    return (
        <div className="sidebar">
            <Calendar value={date} onChange={(date) => setDate(date)}/>
            <ul className="side-list">
            </ul>
        </div>
    )
}