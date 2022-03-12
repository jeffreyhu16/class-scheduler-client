import React from 'react'
import { DateTime } from 'luxon'
import { weekContext } from './contexts/weekContext'

export default function CalendarHead(props) {

    const [weekData, setWeekData] = React.useState();
    const { startOfWeek } = React.useContext(weekContext);
    const { isGlow } = props;
    let i = 0;
    let weekDataArr, calendarHeads
    
    React.useEffect(() => {
        if (startOfWeek) {
            const isoDate = DateTime.fromObject(startOfWeek).toISO();
            const uri = encodeURIComponent(isoDate)
            fetch(`/date/getFullWeek?startOfWeek=${uri}`)
            .then(res => res.json())
            .then(data => setWeekData(data))
            .catch(err => console.log(err));
        }
    }, [startOfWeek]);
    
    if (weekData) {
        weekDataArr = Object.entries(weekData);
        calendarHeads = weekDataArr.map(weekDay => {
            const styles = {
                textShadow: isGlow.day[++i] ? '0 0 0.5rem #fff' : 'none'
            } // tue/thu keeps glowing after closing class form //
            return (
                <div className={`calendar-head`} style={styles}>
                    <div className="calendar-head-day">
                        {weekDay[0]}
                    </div>
                    <div className="calendar-head-date">
                        {weekDay[1].day}
                    </div>
                </div>
            )
        });
    }
    return <>{calendarHeads}</>
}