import React from 'react'
import { DateTime, Settings } from 'luxon'
import { dataContext } from '../../contexts/DataContext'
import { renderContext } from '../../contexts/RenderContext'
import CalendarCourt from './CalendarCourt'
import CalendarQuarterHour from './CalendarQuarterHour'
import { useSelector, useDispatch } from 'react-redux'
import { fetchClassData } from '../../redux/classDataSlice'
Settings.defaultZone = 'Asia/Taipei';

export default function CalendarDay(props) {

    const { day } = props;
    const { api, currentDate, startOfWeek, location, locationData, coach } = React.useContext(dataContext);
    const { dayView, weekView, coachAll, locationAll } = React.useContext(renderContext);

    const classData = useSelector(state => state.classData[day ? day : 0]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // console.log('fetching..')
        if (startOfWeek && weekView) dispatch(fetchClassData('', startOfWeek, day, location, coach));
        if (currentDate && dayView) dispatch(fetchClassData(currentDate, '', '', location, coach));

    }, [dayView, currentDate, startOfWeek, location, coach]);

    let calendarQuarterHours, calendarCourts = [];
    if (classData) {
        if (dayView) {
            for (let i = 1; i < locationData.length; i++) {
                for (let j = locationData[i].numOfCourts; j > 0; j--) {
                    calendarCourts.push((
                        <CalendarCourt
                            location={locationData[i]}
                            courtNo={j}
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
                    />
                )
            });
        }
    }

    const styles = {
        width: dayView ? '100%' : 'calc(100% / 7)',
        display: dayView || coachAll ? 'flex' : 'block',
        borderRight: !dayView && coachAll ? '1px solid rgb(201,255,227,0.4)' : 'none'
    }

    return (
        <div className={`calendar-day day-${day}`} style={styles}>
            {calendarCourts[0] ? calendarCourts : calendarQuarterHours}
        </div> // change logic for className //
    )
}
