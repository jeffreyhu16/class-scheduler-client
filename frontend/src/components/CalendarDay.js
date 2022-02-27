import React from 'react'

export default function CalendarDay(props) {

    let i = 0;
    const calendarHalfHours = [...Array(36)].map(() => {
        return (
            <div className={`calendar-half-hour ${props.day} half-hour-${++i}`}></div>
        )    
    });
    
    return <>{calendarHalfHours}</>
}