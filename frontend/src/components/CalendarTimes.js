import React from 'react'

export default function CalendarTimes() {

    let j = 0
    let hourCount = new Date('2022-01-01T05:00:00').getHours();
    const calendarTimes = [...Array(18)].map(() => {
        return (
            <div className={`calendar-hour half-hour-${++j} half-hour-${++j}`}>
                {++hourCount > 12 ? hourCount - 12 : hourCount}
                {hourCount > 11 ? ' pm' : ' am'}
            </div>
        )
    });
    return <>{calendarTimes}</>

}