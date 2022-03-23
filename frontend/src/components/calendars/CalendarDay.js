import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from '../contexts/DataContext'
import CalendarCourt from './CalendarCourt';
import CalendarQuarterHour from './CalendarQuarterHour';

export default function CalendarDay(props) {

    const { day } = props;
    const { calendarView, currentDate, startOfWeek, location, locationData, coach } = React.useContext(dataContext);
    const [classData, setClassData] = React.useState();

    const dayView = calendarView === 'day';
    const coachAll = coach.name === 'all';
    const locationAll = location.name === 'all';

    // create state for CourtNo //
    React.useEffect(() => {
        // console.log('fetching..')
        if (startOfWeek && !dayView) fetchClasses(null, startOfWeek, day, location, coach);
        if (currentDate && dayView) fetchClasses(currentDate, null, null, location, coach);

    }, [calendarView, currentDate, startOfWeek, location, coach]);

    async function fetchClasses(currentDate, startOfWeek, day, location, coach) {
        const inputDate = currentDate ? currentDate : startOfWeek;
        const isoDate = DateTime.fromObject(inputDate).toISO();
        const uri = encodeURIComponent(isoDate);
        let res;
        if (startOfWeek) {
            res = await fetch(`/class/classes?startOfWeek=${uri}&day=${day}&location=${location.name}&coach=${coach.name}`)
            await res.json()
                .then(data => setClassData(data))
                .catch(err => console.log(err));
            // console.log('fetch init...')
        } else if (currentDate) {
            res = await fetch(`/class/classes?currentDate=${uri}&location=${location.name}&coach=${coach.name}`)
            await res.json()
                .then(data => setClassData(data))
                .catch(err => console.log(err));
        }
    }

    let calendarQuarterHours, calendarCourts = [];
    if (classData && locationAll) {
        // console.log(locationData[0].numOfCourts)
        for (let i = 1; i < locationData.length; i++) {
            for (let j = locationData[i].numOfCourts; j > 0; j--) {
                calendarCourts.push((
                    <CalendarCourt
                        location={locationData[i]}
                        courtNo={j}
                        classData={classData}
                        fetchClasses={fetchClasses}
                    />
                ));
            }
        }
    }

    if (classData && !locationAll) {
        let j = location.numOfCourts;
        calendarCourts = [...Array(j)].map(() => {
            return (
                <CalendarCourt
                    day={day}
                    courtNo={j--}
                    location={location}
                    classData={classData}
                    fetchClasses={fetchClasses}
                />
            )
        });
    }

    if (classData && !coachAll && !locationAll) {
        let i = 0;
        calendarQuarterHours = [...Array(72)].map(() => {
            return (
                <CalendarQuarterHour
                    day={day}
                    quarterHour={++i}
                    classData={classData}
                    fetchClasses={fetchClasses}
                />
            )
        });
    }

    const styles = {
        width: dayView ? '98%' : 'calc(98% / 7)',
        display: dayView || coachAll ? 'flex' : 'block',
        borderRight: !dayView && coachAll ? '1px solid rgb(201,255,227,0.4)' : 'none'
    }

    return (
        <div className={`calendar-day day-${day}`} style={styles}>
            {!coachAll && !locationAll ? calendarQuarterHours : calendarCourts}
        </div> // change logic for className //
    )
}
