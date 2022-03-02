import React from 'react'

export default function CalendarHead(props) {

    let weekDataArr, calendarHeads
    if (props.weekData.mon) {
        weekDataArr = Object.entries(props.weekData);
        calendarHeads = weekDataArr.map(weekDay => {
            return (
                <div className="calendar-head-group">
                    <div className="calendar-head-day">
                        {weekDay[0]}
                    </div>
                    <div className="calendar-head-date">
                        {weekDay[1].day}
                    </div>
                </div>
            )
        });
    }
    return <>{calendarHeads}</>
}