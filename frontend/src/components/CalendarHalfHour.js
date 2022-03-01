import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    // const [clickArr, setClickArr] = React.useState(new Array(37).fill(null));
    const [isClick, setIsClick] = React.useState(false)

    function handleClick() {
        // setClickArr(prevClickArr => {
        //     prevClickArr[props.halfHour] = true;
        //     return prevClickArr;
        // });
        setIsClick(true)
    }

    return (
        <div 
            onClick={handleClick} 
            className={`calendar-half-hour day-${props.day} half-hour-${props.halfHour}`}
        >
            {/* {isClick && 
            <ClassForm 
                weekData={props.weekData} 
                day={props.day} 
                halfHour={props.halfHour} 
            />} */}
        </div>
    )
}