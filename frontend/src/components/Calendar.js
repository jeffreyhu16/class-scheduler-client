import React from 'react'
import CalendarDay from './CalendarDay'

export default function Calendar() {

    const [weekData, setWeekData] = React.useState({});
    const [weekInfo, setWeekInfo] = React.useState([]);
    const [calendarDays, setCalendarDays] = React.useState([]);

    React.useEffect(() => {
        fetch('/getFullWeek')
            .then(res => res.json())
            .then(data => setWeekData(data))
            .then(() => {
                let tempArr = [];
                for (let key in weekData) {
                    tempArr.push(
                        <div className="calendar-head-group">
                            <div className="calendar-head-day">
                                {key}
                            </div>
                            <div className="calendar-head-date">
                                {weekData[key].slice(8)}
                            </div>
                        </div>
                    );
                }
                setWeekInfo(tempArr);
            })
            .then(() => {
                let tempArr = [...Array(7)].map(() => {
                    let i = 0;
                    return (
                        <div className={`calendar-day day-${++i}`}>
                            <CalendarDay weekData={weekData} day={i} />
                        </div>
                    )
                });
                setCalendarDays(tempArr);
            });
    }, [weekInfo]);
    

    let j = 0
    let hourCount = new Date('2022-01-01T05:00:00').getHours();
    const calendarTimes = [...Array(18)].map(() => {
        return (
            <div className={`calendar-hour half-hour-${++j} half-hour-${++j}`}>
                {++hourCount > 12 ? hourCount - 12 : hourCount}
                {hourCount > 11 ? 'pm' : 'am'}
            </div>
        )
    });

    return (
        <>
            <div className="calendar">
                <div className="calendar-head">
                    <div></div>
                    {weekInfo}
                </div>
                <div className="calendar-body">
                    <div className="calendar-time">
                        {calendarTimes}
                    </div>
                    {calendarDays}
                </div>
            </div>
        </>
    )
}