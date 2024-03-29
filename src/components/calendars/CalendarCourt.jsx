import React from 'react'
import isEqual from 'lodash'
import { useSelector } from 'react-redux'
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarCourt(props) {

    const { location, courtNo, day } = props;
    const classData = useSelector(state => state.classData[day ? day : 0]);
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
    
    const calendarQuarterHours = [...Array(64)].map((k, i) => {
        return (
            <CalendarQuarterHour
                key={i}
                day={day}
                location={location}
                courtNo={courtNo}
                quarterHour={i + 1}
                classData={classCourtData}
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