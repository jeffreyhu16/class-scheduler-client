import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const { weekData, dayTargetArr, day, halfHour, setIsGlow } = props;
    const [isShow, setIsShow] = React.useState(false);
    const [isStartTime, setIsStartTime] = React.useState(false);
    const hourIndex = Math.ceil(halfHour / 2);

    React.useEffect(() => {
        if (weekData.mon && dayTargetArr[0]) {
            const startTimeTarget = dayTargetArr.filter(dayTarget => {
                const { startTime, endTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                return (startTime.hour - 6) * 2 + halfInterval === halfHour - 1;
            });
            if (startTimeTarget[0]) setIsStartTime(true);
        }
    }, [weekData]);
    

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

    const styles = {
        background: isStartTime ? '#c9e5ff' : '#00407b',
        border: isStartTime ? '1px solid #00407b' : '1px solid rgba(225, 225, 225, 0.2)',
        'margin-bottom': isStartTime ? '-1px' : '0',
        'border-bottom': isStartTime ? '#c9e5ff' : '1px solid rgba(225, 225, 225, 0.2)'
    }

    return (
        <>
            <div
                onMouseEnter={() => handleOnMouse(day, hourIndex)}
                onMouseLeave={() => handleOnMouse(day, hourIndex)}
                className={`calendar-half-hour day-${day} half-hour-${halfHour}`}
                onClick={toggleForm}
                style={styles}
            >
            </div>
            {isShow &&
                <ClassForm
                    weekData={weekData}
                    day={day}
                    halfHour={halfHour}
                    isShow={isShow}
                    toggleForm={toggleForm}
                />}
            {isShow && <div className="overlay"></div>}
        </>
    )
}

