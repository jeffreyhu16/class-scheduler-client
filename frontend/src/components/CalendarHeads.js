import React from 'react'

export default function CalendarHeads(props) {
    
    let calendarHeads = [];
    for (let key in props.weekData) {
        calendarHeads.push(
            <div className="calendar-head-group">
                <div className="calendar-head-day">
                    {key}
                </div>
                <div className="calendar-head-date">
                    {props.weekData[key].slice(8)}
                </div>
            </div>
        );
    }

    return (
        <>{calendarHeads}</>
    )
}