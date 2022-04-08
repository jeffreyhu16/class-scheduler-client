import React from 'react'
import isEqual from 'lodash'
import CalendarQuarterHour from './CalendarQuarterHour';

function CalendarCourt(props) {

    const { location, courtNo, classData, day, fetchClasses, setIsGlow } = props;
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
                setIsGlow={setIsGlow}
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

const classEquals = (prev, next) => {
    if (!next.classData[0]) return false;
    for (let i = 0; i < prev.classData.length; i++) {
        const diff = Object.keys(prev.classData[i]).reduce((result, key) => {
            if (!next.classData[i].hasOwnProperty(key)) {
                result.push(key);
            } else if (isEqual(prev.classData[i][key], next.classData[i][key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
            }
            return result;
        }, Object.keys(next.classData[i]));

        if (diff.length > 0) {
            // console.log(diff);
            return false;
        } else return true;
    }
}

export default React.memo(CalendarCourt, classEquals);