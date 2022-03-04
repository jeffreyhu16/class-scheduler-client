import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const { weekData, day, halfHour, setIsGlow } = props;
    const [isShow, setIsShow] = React.useState(false);
    const hourIndex = Math.ceil(halfHour / 2);
    
    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
    }

    function handleOnMouse(dayIndex, hourIndex) {
        setIsGlow(prevIsGlow => {
            const newIsGlow = { ...prevIsGlow }
            newIsGlow.day[dayIndex] = !prevIsGlow.day[dayIndex];
            newIsGlow.hour[hourIndex] = !prevIsGlow.hour[hourIndex];
            return newIsGlow;
        })
    }

    return (
        <>
            <div 
                onMouseEnter={()=>handleOnMouse(day, hourIndex)}
                onMouseLeave={()=>handleOnMouse(day, hourIndex)}
                className={`calendar-half-hour day-${day} half-hour-${halfHour}`} 
                onClick={toggleForm}>
            </div>
            {isShow &&
                <ClassForm
                weekData={weekData}
                day={day}
                halfHour={halfHour}
                isShow={isShow}
                toggleForm={toggleForm}
            />}
        </>
    )
}

