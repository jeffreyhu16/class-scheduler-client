import React from 'react'
import { dataContext } from '../contexts/DataContext';
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarCourt(props) {
    const { location, courtNo, classData, day, fetchClasses } = props;
    const { calendarView, currentDate, coach } = React.useContext(dataContext);

    let classCourtData;
    if (classData && day) {
        classCourtData = classData.filter(data => {
            return data.location.courtNo === courtNo
        });
    }
    
    React.useEffect(() => {
        if (currentDate && !day) {
            fetchClasses(currentDate, '', '', location, courtNo, coach);
        }
    }, [calendarView, currentDate, location, coach]); // double check and limit rerenders //

    let i = 0;
    const calendarQuarterHours = [...Array(72)].map(() => {
        return (
            <CalendarQuarterHour
                day={day}
                location={location}
                courtNo={courtNo}
                quarterHour={++i}
                classData={classData && day ? classCourtData : classData}
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