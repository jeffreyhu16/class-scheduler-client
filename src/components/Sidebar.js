import React from 'react'
import Calendar from 'react-calendar'
import { DateTime, Settings } from 'luxon'
import { dataContext } from './contexts/DataContext';
Settings.defaultZone = 'Asia/Taipei';

export default function Sidebar() {

    const { currentDate } = React.useContext(dataContext);
    const [ date, setDate ] = React.useState(new Date());
    const testDate = DateTime.fromISO(date.toISOString());

    const matchTile = date => {
        if (currentDate) {const tileDate = DateTime.fromISO(date.toISOString());
        if (tileDate.month === currentDate.month && tileDate.day === currentDate.day)
            return tyleStyle;}
    }

    const tyleStyle = 'active-tile';

    return (
        <div className="sidebar">
            <Calendar 
                value={date} 
                onChange={setDate}
                tileClassName={({ date }) => matchTile(date)}
            />
            <ul className="side-list">
            </ul>
        </div>
    )
}