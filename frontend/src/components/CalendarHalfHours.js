import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHours(props) {

    const [isClick, setIsClick] = React.useState(false)

    let i = 0;
    const calendarHalfHoursArr = [...Array(36)].map(() => {
        return (
            <div
                onClick={() => setIsClick(true)}
                className={`calendar-half-hour day-${props.day} half-hour-${++i}`}
            >
                {isClick &&
                <ClassForm
                    weekData={props.weekData}
                    day={props.day}
                    halfHour={i}
                />}
            </div>
        )
    });

    return <>{calendarHalfHoursArr}</>
}