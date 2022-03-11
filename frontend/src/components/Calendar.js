import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'

export default function Calendar() {
    
    const [isGlow, setIsGlow] = React.useState({
        day: [...Array(7)].fill(false),
        hour: [...Array(18)].fill(false)
    });

    let i = 0;
    let calendarDayArr = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay 
                    setIsGlow={setIsGlow}
                    day={i}
                />
            </div>
        )
    });

    return (
        <div className="calendar">
            <div className="calendar-head-group">
                <div className="calendar-head-empty"></div>
                <CalendarHead isGlow={isGlow}/>
            </div>
            <div className="calendar-body">
                <div className="calendar-time">
                    <CalendarTime isGlow={isGlow} />
                </div>
                {calendarDayArr}
            </div>
        </div>
    )
}