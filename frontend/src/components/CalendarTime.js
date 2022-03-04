import React from 'react'

export default function CalendarTime(props) {
    let i = 0
    let hourCount = 6;
    const { isGlow } = props;
    const calendarTimes = [...Array(18)].map(() => {
        const styles = {
            textShadow: isGlow.hour[++i] ? '0 0 0.5rem #fff' : 'none'
        }
        return (
            <div className={`calendar-hour`} style={styles}>
                {hourCount > 12 ? hourCount - 12 : hourCount}
                {hourCount++ > 11 ? ' pm' : ' am'}
            </div>
        )
    });
    return <>{calendarTimes}</>
}