import React from 'react'
import CalendarHeads from './CalendarHeads';
import CalendarTimes from './CalendarTimes';
import CalendarDays from './CalendarDays'

export default function Calendar() {

    const [weekData, setWeekData] = React.useState({});
    // const [weekInfo, setWeekInfo] = React.useState([]);
    // const [calendarDays, setCalendarDays] = React.useState([]);
    
    React.useEffect(() => {
        fetch('/getFullWeek')
            .then(res => res.json())
            .then(data => setWeekData(data));
    }, []);

    return (
        <div className="calendar">
            <div className="calendar-head">
                <CalendarHeads weekData={weekData} />
            </div>
            <div className="calendar-body">
                <div className="calendar-time">
                    <CalendarTimes />
                </div>
                <CalendarDays weekData={weekData}/>
            </div>
        </div>
    )

    // return (
    //     <div className="calendar">
    //         <div className="calendar-head">
    //             <div className="calendar-head-group"></div>
    //             {weekInfo}
    //         </div>
    //         <div className="calendar-body">
    //             <div className="calendar-time">
    //                 {calendarTimes}
    //             </div>
    //             {calendarDays}
    //         </div>
    //     </div>
    // )
}