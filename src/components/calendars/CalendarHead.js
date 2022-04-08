import React from 'react'
import { DateTime, Settings } from 'luxon'
import { dataContext } from '../contexts/DataContext'
import { glowContext } from '../contexts/GlowContext'
import { renderContext } from '../contexts/RenderContext'
Settings.defaultZone = 'Asia/Taipei';

export default function CalendarHead(props) {

    const { isGlow } = props;
    // const { isGlow } = React.useContext(glowContext);
    const [weekData, setWeekData] = React.useState();
    const { api, currentDate, startOfWeek, location, locationData } = React.useContext(dataContext);
    const { weekView, coachAll, locationAll } = React.useContext(renderContext);
    
    let i = 0;
    let weekDataArr, calendarHeads = [];

    React.useEffect(() => {
        if (startOfWeek) {
            const isoDate = DateTime.fromObject(startOfWeek).toISO();
            const uri = encodeURIComponent(isoDate)
            fetch(`${api}/date/fullWeek?startOfWeek=${uri}`)
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
                opacity: isGlow.day[day] && isGlow.location[location.name][j] ? '1' : '0',
                width: `calc(100% / ${location.numOfCourts})`,
                marginBottom: '0.3em'
            }
            const dayStyles = {
                textShadow: isGlow.location[location.name][j] ? '0 0 0.5rem #fff' : 'none',
                width: `calc(98% / 7)`, // change logic when new courts added //
                marginBottom: '0.8em' 
            }
            return (
                <div className="calendar-head-court" style={weekView ? weekStyles : dayStyles}>
                    <div className="calendar-head-court-name">{!weekView && location.name}</div>
                    <div>{weekView ? `Court ${j--}` : `# ${j--}`}</div>
                </div>
            )
        });
        return <>{dayCourtHeads}</>
    }

    if (weekData && weekView) {
        weekDataArr = Object.entries(weekData);
        calendarHeads = weekDataArr.map(weekDay => {
            const styles = {
                textShadow: isGlow.day[++i] ? '0 0 0.5rem #fff' : 'none',
                marginBottom: !coachAll ? '0.8em' : '0'
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
                        weekView && coachAll &&
                            <div className="calendar-head-court-day">
                                <CalendarHeadCourt day={i} location={location} />
                            </div>
                    }
                </div>
            )
        });
    }

    if (currentDate && !weekView) {
        for (let i = 1; i < locationData.length; i++) {
            calendarHeads.push((
                <CalendarHeadCourt location={locationData[i]} />
            ));
        }
    }
    return <>{calendarHeads}</>
}