import React from 'react'
import CalendarHalfHours from './CalendarHalfHours';

export default function CalendarDays(props) {
    
    let calendarDaysArr = [...Array(7)].map(() => {
        let i = 0;
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarHalfHours weekData={props.weekData} day={i} />
            </div>
        )
    });

    return <>{calendarDaysArr}</>
}
