import React from 'react'
import { DateTime } from 'luxon'
import CalendarHalfHour from './CalendarHalfHour'
import { weekContext } from './contexts/weekContext'

export default function CalendarDay(props) {

    const { day } = props;
    const { startOfWeek } = React.useContext(weekContext);
    const [ classData, setClassData ] = React.useState();

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
    }
  
    let i = 0;
    const calendarHalfHourArr = [...Array(36)].map(() => {
        return (
            <CalendarHalfHour 
                day={day} 
                halfHour={++i}
                classData={classData}
                fetchClasses={fetchClasses}
            />
        )
    });
    return <>{calendarHalfHourArr}</>
}
