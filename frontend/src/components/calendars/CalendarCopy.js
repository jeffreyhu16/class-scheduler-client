import React from 'react'
import { DateTime } from 'luxon'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dataContext } from '../contexts/DataContext'

export default function CalendarCopy(props) {

    const [ isOn, setIsOn ] = React.useState(false);
    const { calendarView, startOfWeek, setStartOfWeek, coach } = React.useContext(dataContext);

    async function copyClasses(period) {
        fetch('class/copy', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                period: period,
                startOfWeek: startOfWeek
            })
        })
        .then(() => setStartOfWeek(prev => ({ ...prev })));
    }

    const weekView = calendarView === 'week';
    const coachAll = coach.name === 'all';

    const copyStyles = {
        paddingTop: weekView && coachAll ? '0.3em' : '0.2em'
    }
    const popupStyles = {
        opacity: isOn ? '1' : '0',
        transform: isOn ? 'translateX(0)' : 'translateX(-0.4em)',
        pointerEvents: isOn ? 'auto' : 'none'
    }
    return (
        <div className="calendar-copy" style={copyStyles} onClick={() => setIsOn(prev => !prev)}>
            <FontAwesomeIcon
                icon={faCopy}
                className="icon-copy"
            />
            <div className="calendar-copy-popup" style={popupStyles}>
                <div className="calendar-copy-msg">Copy from <span>previous week</span></div>
                <div className="calendar-copy-confirm" onClick={() => copyClasses(1)}>Confirm</div>
            </div>
        </div>
    )
}