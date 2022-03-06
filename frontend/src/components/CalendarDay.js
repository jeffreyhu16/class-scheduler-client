import React from 'react'
import CalendarHalfHour from './CalendarHalfHour'

export default function CalendarDay(props) {
    const { weekData, classData, day, setIsGlow } = props;
    let dayTargetArr;
    let i = 0;
    if (weekData.mon) { 
        const dayDate = Object.entries(weekData)[day - 1][1];
        dayTargetArr = classData.filter(data => data.startTime.day === dayDate.day);
    }
    const calendarHalfHourArr = [...Array(36)].map(() => {
        return (
            <CalendarHalfHour 
                weekData={weekData}
                dayTargetArr={dayTargetArr}
                setIsGlow={setIsGlow}
                day={day} 
                halfHour={++i}
            />
        )
    });
    return <>{calendarHalfHourArr}</>
}
