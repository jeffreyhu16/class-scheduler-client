import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const [isShow, setIsShow] = React.useState(false);

    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
    }
    console.log(isShow)
    return (
        <>
            <div className="calendar-half-hour" onClick={toggleForm}></div>
            {isShow &&
                <ClassForm
                weekData={props.weekData}
                day={props.day}
                halfHour={props.halfHour}
                isShow={isShow}
                toggleForm={toggleForm}
            />}
        </>
    )
}

