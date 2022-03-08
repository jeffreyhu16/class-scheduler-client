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
    const startTimeTarget = React.useRef();
    const hourIndex = Math.ceil(halfHour / 2);

    React.useEffect(() => {
        if (dayTargetArr) {
            // filter startTime //
            startTimeTarget.current = dayTargetArr.filter(dayTarget => {
                const { startTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                const startTimeHalfHour = (startTime.hour - 6) * 2 + halfInterval;
                return startTimeHalfHour === halfHour - 1
            });
            if (startTimeTarget.current[0]) setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: true }));
            // filter midTime //
            dayTargetArr.forEach(dayTarget => {
                const { startTime, endTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                const startTimeHalfHour = (startTime.hour - 6) * 2 + halfInterval;
                const startDateTime = DateTime.fromObject(startTime);
                const endDateTime = DateTime.fromObject(endTime);
                const duration = endDateTime.diff(startDateTime, 'hours').hours;
                if (duration > 1) {
                    const midTimeHalfHours = (duration - 1) * 2;
                    for (let i = 1; i <= midTimeHalfHours; i++) {
                        if (startTimeHalfHour + i === halfHour - 1) {
                            setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isMidTime : true }));
                        }
                    }
                }
            });
            // filter endTime //
            dayTargetArr.forEach(dayTarget => {
                const { endTime } = dayTarget;
                const halfInterval = endTime.minute === 30 ? 1 : 0;
                const endTimeHalfHour = (endTime.hour - 6) * 2 + halfInterval;
                if (endTimeHalfHour === halfHour) {
                    setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: true }));
                }
            });
        }
    }, [dayTargetArr]);

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
    const borderActive = '1px solid #00407b';
    const borderJoin = '1px solid #c9e5ff'
    const styles = {
        background: isStartTime ? '#c9e5ff' : (isEndTime ? '#c9e5ff' : (isMidTime ? '#c9e5ff' : '#00407b')),
        borderTop: isStartTime ? borderActive : (isEndTime ? borderJoin : (isMidTime ? borderJoin : borderDefault)),
        borderBottom: isStartTime ? borderJoin : (isMidTime ? borderJoin : (isEndTime ? borderActive : borderDefault)),
        borderLeft: isStartTime ? borderActive : (isEndTime ? borderActive : (isMidTime ? borderActive : borderDefault)),
        borderRight: isStartTime ? borderActive : (isEndTime ? borderActive : (isMidTime ? borderActive : borderDefault)),
        marginBottom: isStartTime ? '-1px' : (isMidTime ? '-1px' : (isEndTime ? '3px' : '0'))
        // add logic for adjusting the amount of marginBottom given the midTime duration //
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
                {isStartTime && 
                    <div className="calendar-class-info">
                        <div>{startTimeTarget.current[0].studentName}</div>
                        <div>{startTimeTarget.current[0].coachName}</div>
                        <div>{startTimeTarget.current[0].location}</div>
                    </div>
                }
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

