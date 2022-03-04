import React from 'react'

export default function CalendarHead(props) {
    const { isGlow } = props;
    let i = 0;
    let weekDataArr, calendarHeads
    
    if (props.weekData.mon) {
        weekDataArr = Object.entries(props.weekData);
        calendarHeads = weekDataArr.map(weekDay => {
            const styles = {
                textShadow: isGlow.day[++i] ? '0 0 0.5rem #fff' : 'none'
            }
            return (
                <div className={`calendar-head`} style={styles}>
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