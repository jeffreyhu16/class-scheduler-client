import React from 'react'
import CalendarHalfHour from './CalendarHalfHour'

export default function CalendarDay(props) {
    const { weekData, classData, setClassData, day, setIsGlow } = props;
    let dayTargetArr;
    let i = 0;
    if (weekData && classData) { 
        const dayDate = Object.entries(weekData)[day - 1][1];
        dayTargetArr = classData.filter(data => data.startTime.day === dayDate.day);
    }
    const calendarHalfHourArr = [...Array(36)].map(() => {
        return (
            <CalendarHalfHour 
                weekData={weekData}
                dayTargetArr={dayTargetArr}
                setIsGlow={setIsGlow}
                setClassData={setClassData}
                day={day} 
                halfHour={++i}
            />
        )
    });
    return <>{calendarHalfHourArr}</>
}
