import React from 'react'
import { DateTime } from 'luxon'
import { glowContext } from '../contexts/GlowContext';

function CalendarTime() {
    let i = 0
    const { isGlow } = React.useContext(glowContext);
    const time = DateTime.local().set({ hour: 6, minute: 0 });

    const calendarTimes = [...Array(72)].map(() => {

        const newTime = time.plus({ minutes: 15 * i });

        const styles = {
            textShadow: isGlow.quarterHour[++i] ? '0 0 0.5rem #fff' : 'none',
            opacity: isGlow.quarterHour[i] ? 1 : 0
        }
        
        return (
            <div className={`calendar-time-quarter`} style={styles}>
                {newTime.hour > 12 ? newTime.hour - 12 : newTime.hour}:
                {newTime.minute === 0 ? '00' : newTime.minute}
            </div>
        )
    });
    return <>{calendarTimes}</>
}

export default React.memo(CalendarTime);