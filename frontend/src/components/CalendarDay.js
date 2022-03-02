import React from 'react'
import CalendarHalfHour from './CalendarHalfHour';

export default function CalendarDay(props) {
    
    let i = 0
    const calendarHalfHourArr = [...Array(36)].map(() => {
        return (
            <CalendarHalfHour 
                weekData={props.weekData} 
                day={props.day} 
                halfHour={++i}
            />
            // make form parallel here//
            
        )
    });
    return <>{calendarHalfHourArr}</>
}
