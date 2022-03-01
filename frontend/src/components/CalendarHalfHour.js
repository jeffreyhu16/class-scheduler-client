import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const [isClick, setIsClick] = React.useState(false);

    function handleClick() {
        setIsClick(true);
    }
    return (
        <div className="calendar-half-hour" onClick={handleClick}>
            {isClick &&
            <ClassForm
                weekData={props.weekData}
                day={props.day}
                halfHour={props.halfHour}
            />}      
        </div>
    )
}

