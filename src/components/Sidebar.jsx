import React from 'react'
import Calendar from 'react-calendar'
import { DateTime, Settings } from 'luxon'
import { dataContext } from '../contexts/DataContext';
import { Backdrop, CircularProgress } from '@mui/material'
Settings.defaultZone = 'Asia/Taipei';

export default function Sidebar() {

    const { presentDate, currentDate, setCurrentDate, setStartOfWeek } = React.useContext(dataContext);
    const [selectDate, setSelectDate] = React.useState(DateTime.fromObject(currentDate).toJSDate());
    const [loading, setLoading] = React.useState(false);

    const matchTile = date => {
        const tileDate = DateTime.fromISO(date.toISOString());
        if (presentDate) {
            if (tileDate.equals(DateTime.fromObject(presentDate)))
                return 'present-day-tile';
        }   

        if (currentDate) {
            if (tileDate.equals(DateTime.fromObject(currentDate)))
                return 'select-tile';
        }
    }

    const handleChange = (date) => {
        setLoading(true);
        setSelectDate(date);
        const currentDate = DateTime.fromISO(date.toISOString());
        setCurrentDate(currentDate.toObject());
        setStartOfWeek(currentDate.startOf('week').toObject());
        setTimeout(() => setLoading(false), 2000);
    }

    return (
        <>
            <div className="sidebar">
                <Calendar
                    value={selectDate}
                    onChange={handleChange}
                    defaultActiveStartDate={selectDate}
                    tileClassName={({ date }) => matchTile(date)}
                />
                <ul className="side-list">
                </ul>
            </div>
            {loading &&
                <Backdrop open={loading} sx={{ zIndex: '5' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}