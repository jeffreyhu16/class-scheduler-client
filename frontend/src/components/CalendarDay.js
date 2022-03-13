import React from 'react'
import { DateTime } from 'luxon'
import CalendarQuarterHour from './CalendarQuarterHour'
import { weekContext } from './contexts/weekContext'

export default function CalendarDay(props) {

    const { day } = props;
    const { startOfWeek } = React.useContext(weekContext);
    const [ classData, setClassData ] = React.useState();
    // create state for CourtNo //
    React.useEffect(() => {
        if (startOfWeek) fetchClasses(startOfWeek, day);
    }, [startOfWeek]);

    function fetchClasses(startOfWeek, day) {
        const isoDate = DateTime.fromObject(startOfWeek).toISO();
        const uri = encodeURIComponent(isoDate);
        fetch(`/class/classes?startOfWeek=${uri}&day=${day}`)
        .then(res => res.json())
        .then(data => setClassData(data))
        .catch(err => console.log(err));
    }// fetch location data and setCourtNo //
  
    let i = 0;
    const calendarQuarterHourArr = [...Array(72)].map(() => {
        return ( 
            <CalendarQuarterHour 
                day={day} 
                quarterHour={++i}
                classData={classData}
                fetchClasses={fetchClasses}
            />
        )
    }); // use courtNo to map through new [...Array(courtNo)] and return calendarQuarterHourArr(72) //
    return <>{calendarQuarterHourArr}</>
}
