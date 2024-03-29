import React from 'react'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux';

export default function CalendarTime() {
    let i = 0
    const time = DateTime.local().set({ hour: 7, minute: 0 });

    const isGlow = useSelector(state => state.isGlow);

    const calendarTimes = [...Array(64)].map((k, i) => {

        const newTime = time.plus({ minutes: 15 * i });

        const styles = {
            textShadow: isGlow.quarterHour[++i] ? '0 0 0.5rem #fff' : 'none',
            opacity: isGlow.quarterHour[i] ? 1 : 0
        }
        
        return (
            <div key={i} className={`calendar-time-quarter`} style={styles}>
                {newTime.hour > 12 ? newTime.hour - 12 : newTime.hour}:
                {newTime.minute === 0 ? '00' : newTime.minute}
            </div>
        )
    });
    return <>{calendarTimes}</>
}
