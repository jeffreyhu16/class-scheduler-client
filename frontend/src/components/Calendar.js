import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'

export default function Calendar() {

    const [weekData, setWeekData] = React.useState();
    const [classData, setClassData] = React.useState();
    const [initFetch, setInitFetch] = React.useState({ render: true });
    const [isGlow, setIsGlow] = React.useState({
        day: [...Array(7)].fill(false),
        hour: [...Array(18)].fill(false)
    });

    React.useEffect(() => {
        fetch('/class')
            .then(res => res.json())
            .then(data => {
                console.log('fetching classData')
                setClassData(data);
            })
            .catch(err => console.log(err));
        fetch('/date/getFullWeek')
            .then(res => res.json())
            .then(data => setWeekData(data))
            .catch(err => console.log(err));
    }, [initFetch]); 
    function initiateFetch() {
        setInitFetch(prevInitFetch => ({ ...prevInitFetch }));
    }
    let i = 0;
    let calendarDayArr = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay 
                    weekData={weekData} 
                    classData={classData} 
                    setIsGlow={setIsGlow}
                    setClassData={setClassData}
                    initiateFetch={initiateFetch} 
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