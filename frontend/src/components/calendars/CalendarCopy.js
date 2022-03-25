import React from 'react'
import { DateTime } from 'luxon'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dataContext } from '../contexts/DataContext'

export default function CalendarCopy(props) {

    const [ isShow, setIsShow ] = React.useState(false);
    const { calendarView, startOfWeek, coach } = React.useContext(dataContext);

    async function copyClasses(period) {
        // const res = await fetch(`class/weekClasses?period=${period}&startOfWeek=${startOfWeek}`);
        // const data = await res.json();
        // await console.log(data);
        const isoDate = DateTime.fromObject(startOfWeek).toISO();
        const uri = encodeURIComponent(isoDate);
        fetch(`class/weekClasses?period=${period}&startOfWeek=${uri}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
        // fetch('class/week', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         copy: period,
        //         startOfWeek: startOfWeek
        //     })
        // })
        // .catch(err => console.log(err));
    }

    const weekView = calendarView === 'week';
    const coachAll = coach.name === 'all';

    const styles = {
        paddingTop: weekView && coachAll ? '0.3em' : '0.2em'
    }
    return (
        <div className="calendar-copy" style={styles}>
            <FontAwesomeIcon
                icon={faCopy}
                className="icon-copy"
            />
            <div className="calendar-copy-popup">
                <div className="calendar-copy-msg">Copy from <span>previous week</span></div>
                <div className="calendar-copy-confirm" onClick={() => copyClasses(1)}>Confirm</div>
            </div>
        </div>
    )
}