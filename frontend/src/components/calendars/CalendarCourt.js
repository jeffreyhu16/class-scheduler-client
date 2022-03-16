import React from 'react'
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarCourt(props) {
    const { courtNo, classData, day, fetchClasses } = props;
    let classCourtData;

    if (classData) {
        classCourtData = classData.filter(data => {
            console.log(data.location.courtNo, courtNo)
            return data.location.courtNo === courtNo
        });
        console.log(classCourtData)
    }

    let i = 0;
    const calendarQuarterHours = [...Array(72)].map(() => {
        return (
            <CalendarQuarterHour
                day={day}
                quarterHour={++i}
                classData={classCourtData}
                fetchClasses={fetchClasses}
            />
        )
    });
    return (
        <div className={`calendar-court court-${courtNo}`}>
            {calendarQuarterHours}
        </div>
    )
}