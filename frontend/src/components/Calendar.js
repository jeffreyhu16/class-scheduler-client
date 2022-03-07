import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'

export default function Calendar() {

    const [weekData, setWeekData] = React.useState({});
    const [classData, setClassData] = React.useState([{ 
        startTime: {
            day: 8,
            hour: 6,
            minute: 0,
        }, 
        endTime: {
            day: 8,
            hour: 7,
            minute: 0,
        }, 
        studentName: 'Jeff', 
        coachName: 'Tim', 
        location: 'Camberwell' 
    }]);
    const [isGlow, setIsGlow] = React.useState({
        day: [...Array(7)].fill(false),
        hour: [...Array(18)].fill(false)
    });
 
    React.useEffect(() => {
        fetch('/date/getFullWeek')
            .then(res => res.json())
            .then(data => setWeekData(data));
    }, []);

    let i = 0;
    let calendarDayArr = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay 
                    weekData={weekData} 
                    classData={classData} 
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
                <CalendarHead weekData={weekData} isGlow={isGlow}/>
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