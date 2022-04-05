import React from 'react'
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarCourt(props) {

    const { location, courtNo, classData, day, fetchClasses } = props;
    let classCourtData;
    if (day) {
        classCourtData = classData.filter(data => {
            return data.location.courtNo === courtNo;
        });
    } else {
        classCourtData = classData.filter(data => {
            return data.location._id.name === location.name && data.location.courtNo === courtNo;
        });
        
    }
    
    let i = 0;
    const calendarQuarterHours = [...Array(72)].map(() => {
        return (
            <CalendarQuarterHour
                day={day}
                location={location}
                courtNo={courtNo}
                quarterHour={++i}
                classData={classCourtData}
                fetchClasses={fetchClasses}
            />
        )
    });

    const styles = {
        width: day ? `calc(100% / ${location.numOfCourts})` : 'calc(100% / 7)'
    }

    return (
        <div 
            className={
                day ? 
                `calendar-court court-${courtNo}` :
                `calendar-court ${location.name}-${courtNo}`
            } 
            style={styles}
        >
            {calendarQuarterHours}
        </div>
    )
}