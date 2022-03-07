import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const { weekData, dayTargetArr, day, halfHour, setIsGlow } = props;
    const [isShow, setIsShow] = React.useState(false);
    const [isClassTime, setIsClassTime] = React.useState({ 
        isStartTime: false, 
        isMidTime: false, 
        isEndTime: false 
    });
    const { isStartTime, isMidTime, isEndTime } = isClassTime;
    const hourIndex = Math.ceil(halfHour / 2);

    React.useEffect(() => {
        if (weekData.mon && dayTargetArr[0]) {
            const startTimeTarget = dayTargetArr.filter(dayTarget => {
                const { startTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                return (startTime.hour - 6) * 2 + halfInterval === halfHour - 1;
            });
            const endTimeTarget = dayTargetArr.filter(dayTarget => {
                const { endTime } = dayTarget;
                const halfInterval = endTime.minute === 30 ? 1 : 0;
                return (endTime.hour - 6) * 2 + halfInterval === halfHour;
            });
            if (startTimeTarget[0]) setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: true }));
            if (endTimeTarget[0]) setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: true }));
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
    const borderDefault = '1px solid rgba(250, 250, 250, 0.2)';
    const styles = {
        background: isStartTime ? '#c9e5ff' : (isEndTime ? '#c9e5ff' : '#00407b'),
        border: isStartTime ? '1px solid #00407b' : (isEndTime ? '1px solid #00407b' : borderDefault),
        'margin-bottom': isStartTime ? '-1px' : '0',
        'border-bottom': isStartTime ? '#c9e5ff' : borderDefault,
        'margin-top': isEndTime ? '-1px' : '0',
        'border-top': isEndTime ? '#c9e5ff' : borderDefault
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

