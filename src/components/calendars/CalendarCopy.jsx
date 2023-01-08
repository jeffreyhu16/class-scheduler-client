import React from 'react'
import { dataContext } from '../../contexts/DataContext'
import { renderContext } from '../../contexts/RenderContext'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Backdrop, CircularProgress } from '@mui/material'

export default function CalendarCopy(props) {

    const [isOn, setIsOn] = React.useState(false);
    const { api, startOfWeek, setStartOfWeek } = React.useContext(dataContext);
    const { weekView, coachAll } = React.useContext(renderContext);
    const [loading, setLoading] = React.useState(false);

    async function copyClasses(period) {
        setLoading(true);
        fetch(`${api}/class/copy`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                period: period,
                startOfWeek: startOfWeek
            })
        })
            .then(() => {
                setStartOfWeek(prev => ({ ...prev }));
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(err => console.log(err));
    }

    const copyStyles = {
        paddingTop: weekView && coachAll ? '0.3em' : '0.2em'
    }
    const popupStyles = {
        opacity: isOn ? '1' : '0',
        transform: isOn ? 'translate(-50%, 0.4em)' : 'translate(-50%, 0)',
        pointerEvents: isOn ? 'auto' : 'none'
    }
    return (
        <>
            <div className="calendar-copy" onClick={() => setIsOn(prev => !prev)}>
                <FontAwesomeIcon
                    icon={faCopy}
                    className="icon-copy"
                />
                <div className="calendar-copy-popup" style={popupStyles}>
                    <div className="calendar-copy-msg">Copy from <span>previous week</span></div>
                    <div className="calendar-copy-confirm" onClick={() => copyClasses(1)}>Confirm</div>
                </div>
            </div>
            {loading &&
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}