import React from 'react'
import { glowContext } from './contexts/glowContext'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'

export default function Calendar() {
    
    const [ isGlow, setIsGlow ] = React.useState({ day: [], halfHour: [] });

    let i = 0;
    let calendarDayArr = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay day={i} />
            </div>
        )
    });

    return (
        <glowContext.Provider value={{ isGlow, setIsGlow }}>
            <div className="calendar">
                <div className="calendar-head-group">
                    <div className="calendar-head-empty"></div>
                    <CalendarHead />
                </div>
                <div className="calendar-body">
                    <div className="calendar-time">
                        <CalendarTime />
                    </div>
                    {calendarDayArr}
                </div>
            </div>
        </glowContext.Provider>
    )
}