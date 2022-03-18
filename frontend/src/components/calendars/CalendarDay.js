import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from '../contexts/DataContext'
import CalendarCourt from './CalendarCourt';
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarDay(props) {

    const { day } = props;
    const { startOfWeek, location, coach } = React.useContext(dataContext);
    const [ classData, setClassData ] = React.useState();
    // create state for CourtNo //
    React.useEffect(() => {
        if (startOfWeek) fetchClasses(startOfWeek, day, location, coach);
    }, [startOfWeek, location, coach]); // possible unnecessary //

    function fetchClasses(startOfWeek, day, location, coach) {
        const isoDate = DateTime.fromObject(startOfWeek).toISO();
        const uri = encodeURIComponent(isoDate);
        // if (location.name) location = location.name;
        fetch(`/class/classes?startOfWeek=${uri}&day=${day}&location=${location.name}&coach=${coach.name}`)
        .then(res => res.json())
        .then(data => setClassData(data))
        .catch(err => console.log(err));
    }// fetch location data and setCourtNo //

    let j = location.numOfCourts;
    const calendarCourts = [...Array(location.numOfCourts)].map(() => {
        return (
            <CalendarCourt 
                courtNo={j--}
                day={day} 
                classData={classData}
                fetchClasses={fetchClasses}
            />
        )
    });

    let i = 0;
    const calendarQuarterHours = [...Array(72)].map(() => {
        return (
            <CalendarQuarterHour
                day={day}
                quarterHour={++i}
                classData={classData}
                fetchClasses={fetchClasses}
            />
        )
    });

    const styles = {
        display: coach.name === 'all' ? 'flex' : 'block',
        'border-right': coach.name === 'all' ? '1px solid rgb(201,255,227,0.4)' : 'none'
    }

    return (
        <div className={`calendar-day day-${day}`} style={styles}>
            {coach.name === 'all' && calendarCourts}
            {coach.name !== 'all' && calendarQuarterHours}
        </div>
    )
}
