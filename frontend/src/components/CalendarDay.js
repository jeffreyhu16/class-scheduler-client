import React from 'react'
import CalendarHalfHour from './CalendarHalfHour'

export default function CalendarDay(props) {
    const { weekData, day, setIsGlow } = props;
    let i = 0
    const calendarHalfHourArr = [...Array(36)].map(() => {
        return (
            <CalendarHalfHour 
                weekData={weekData} 
                setIsGlow={setIsGlow}
                day={day} 
                halfHour={++i}
            />
        )
    });
    return <>{calendarHalfHourArr}</>
}
