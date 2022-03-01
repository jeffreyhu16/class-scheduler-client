import React from 'react'
import CalendarHead from './CalendarHead';
import CalendarTime from './CalendarTime';
import CalendarDay from './CalendarDay'

export default function Calendar() {

    const [weekData, setWeekData] = React.useState({});
    
    React.useEffect(() => {
        fetch('/getFullWeek')
            .then(res => res.json())
            .then(data => setWeekData(data));
    }, []);

    let i = 0;
    let calendarDayArr = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay weekData={weekData} day={i} />
            </div>
            
        )
    });

    return (
        <div className="calendar">
            <div className="calendar-head">
                <div className="calendar-head-group"></div>
                <CalendarHead weekData={weekData} />
            </div>
            <div className="calendar-body">
                <div className="calendar-time">
                    <CalendarTime />
                </div>
                {calendarDayArr}
            </div>
        </div>
    )
}