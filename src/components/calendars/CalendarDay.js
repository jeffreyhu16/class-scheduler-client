import React from 'react'
import { DateTime, Settings } from 'luxon'
import { dataContext } from '../contexts/DataContext'
import { renderContext } from '../contexts/RenderContext'
import CalendarCourt from './CalendarCourt'
import CalendarQuarterHour from './CalendarQuarterHour'
Settings.defaultZone = 'Asia/Taipei';

export default function CalendarDay(props) {

    const { day } = props;
    const { api, currentDate, startOfWeek, location, locationData, coach } = React.useContext(dataContext);
    const { dayView, coachAll, locationAll } = React.useContext(renderContext);
    const [classData, setClassData] = React.useState();

    // create state for CourtNo //
    React.useEffect(() => {
        // console.log('fetching..')
        if (startOfWeek && !dayView) fetchClasses(null, startOfWeek, day, location, coach);
        if (currentDate && dayView) fetchClasses(currentDate, null, null, location, coach);

    }, [dayView, currentDate, startOfWeek, location, coach]);

    async function fetchClasses(currentDate, startOfWeek, day, location, coach) {
        const inputDate = currentDate ? currentDate : startOfWeek;
        const isoDate = DateTime.fromObject(inputDate).toISO();
        const uri = encodeURIComponent(isoDate);
        let res;
        if (startOfWeek) {
            res = await fetch(`${api}/class/classes?startOfWeek=${uri}&day=${day}&location=${location.name}&coach=${coach.name}`);
        } else if (currentDate) {
            res = await fetch(`${api}/class/classes?currentDate=${uri}&location=${location.name}&coach=${coach.name}`);
        }
        res.json()
            .then(data => setClassData(data))
            .catch(err => console.log(err));
    }

    let calendarQuarterHours, calendarCourts = [];
    if (classData) {
        if (dayView) {
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

        if (coachAll && !locationAll) {
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

        if (!coachAll) {
            let i = 0;
            // console.log(classData)
            calendarQuarterHours = [...Array(72)].map(() => {
                return (
                    <CalendarQuarterHour
                        day={day}
                        quarterHour={++i}
                        classData={classData}
                        fetchClasses={fetchClasses}
                        setClassData={setClassData}
                    />
                )
            });
        }
    }

    const styles = {
        width: dayView ? '98%' : 'calc(98% / 7)',
        display: dayView || coachAll ? 'flex' : 'block',
        borderRight: !dayView && coachAll ? '1px solid rgb(201,255,227,0.4)' : 'none'
    }

    return (
        <div className={`calendar-day day-${day}`} style={styles}>
            {calendarCourts[0] ? calendarCourts : calendarQuarterHours}
        </div> // change logic for className //
    )
}
