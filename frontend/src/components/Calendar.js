import React from 'react'
import CalendarDay from './CalendarDay'

export default function Calendar() {

    let i = 0;
    const calendarDays = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay day={`day-${i}`}/>
            </div>
        )    
    })

    return (
        <>
            <div className="calendar">
                <div className="calendar-head">
                    <div>mon</div>
                    <div>tue</div>
                    <div>wed</div>
                    <div>thu</div>
                    <div>fri</div>
                    <div>sat</div>
                    <div>sun</div>
                </div>
                <div className="calendar-body">
                    {calendarDays}
                </div>
            </div>
        </>
    )
}