import React from 'react'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    let arr = new Array(37).fill(null);
    let [clickArr, setClickArr] = React.useState(arr);

    function handleClick(index) {
        setClickArr(prevClickArr => {
            prevClickArr[index] = true;
            return prevClickArr;
        });
        console.log(clickArr[index]);
    }

    return (
        <div 
            onClick={()=>handleClick(props.halfHour)} 
            className={`calendar-half-hour day-${props.day} half-hour-${props.halfHour}`}
        >
            {clickArr[props.halfHour] && 
            <ClassForm 
                weekData={props.weekData} 
                day={props.day} 
                halfHour={props.halfHour} 
            />}
        </div>
    )
}