import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from '../contexts/DataContext'
import { glowContext } from '../contexts/GlowContext';

export default function CalendarHead() {

    const { isGlow } = React.useContext(glowContext);
    const [weekData, setWeekData] = React.useState();
    const { calendarView, currentDate, startOfWeek, location, locationData, coach } = React.useContext(dataContext);
    let i = 0;
    let weekDataArr, calendarHeads = [];

    React.useEffect(() => {
        if (startOfWeek) {
            const isoDate = DateTime.fromObject(startOfWeek).toISO();
            const uri = encodeURIComponent(isoDate)
            fetch(`/date/fullWeek?startOfWeek=${uri}`)
                .then(res => res.json())
                .then(data => setWeekData(data))
                .catch(err => console.log(err));
        }
    }, [startOfWeek]);

    function CalendarHeadCourt(props) {
        const { day, location } = props;
        let j = location.numOfCourts;

        const dayCourtHeads = [...Array(j)].map(() => {
            const weekStyles = {
                opacity: isGlow.day[day] && isGlow.court[j] ? '1' : '0'
            }
            const dayStyles = {
                opacity: '1',
                width: `calc(98% / 7)`
            }
            return (
                <div className="calendar-head-court" style={weekView ? weekStyles : dayStyles}>
                    <div>{!weekView && location.name}</div>
                    <div>{`Court ${j--}`}</div>
                </div>
            )
        });
        return <>{dayCourtHeads}</>
    }

    const weekView = calendarView === 'week';
    const coachAll = coach.name === 'all';
    const locationAll = location.name === 'all';

    if (weekData && weekView) {
        weekDataArr = Object.entries(weekData);
        calendarHeads = weekDataArr.map(weekDay => {
            const styles = {
                textShadow: isGlow.day[++i] ? '0 0 0.5rem #fff' : 'none',
                marginBottom: !coachAll && !locationAll ? '0.8em' : '0'
            }
            return (
                <div className={`calendar-head`} style={styles}>
                    <div className="calendar-head-day">
                        {weekDay[0]}
                    </div>
                    <div className="calendar-head-date">
                        {weekDay[1].day}
                    </div>
                    {
                        !coachAll && !locationAll ? '' :
                            <div className="calendar-head-court-day">
                                <CalendarHeadCourt day={i} location={location} />
                            </div>
                    }
                </div>
            )
        });
    }

    if (currentDate && !weekView) {
        locationData.forEach(location => {
            calendarHeads.push((
                <CalendarHeadCourt location={location} />
            ));
        })
    }
    return <>{calendarHeads}</>
}