import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from './ClassForm'

export default function CalendarHalfHour(props) {
    const { weekData, dayTargetArr, setClassData, day, halfHour, setIsGlow } = props;
    const [isShow, setIsShow] = React.useState(false);
    const [isClassTime, setIsClassTime] = React.useState({
        isStartTime: false,
        isMidTime: false,
        isEndTime: false
    });
    const { isStartTime, isEndTime } = isClassTime;
    const startTimeTarget = React.useRef();
    const hourIndex = Math.ceil(halfHour / 2);

    React.useEffect(() => {
        if (dayTargetArr) {
            // filter startTime //
            startTimeTarget.current = dayTargetArr.filter(dayTarget => {
                const { startTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                const startTimeHalfHour = (startTime.hour - 6) * 2 + halfInterval;
                return startTimeHalfHour === halfHour - 1;
            });
            if (startTimeTarget.current[0]) {
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: true }))
            }
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
                            setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isMidTime: true }));
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

    let isFree = true;
    for (let key in isClassTime) {
        if (isClassTime[key]) isFree = false
    }

    const borderDefault = '1px solid rgba(201, 229, 255, 0.2)';
    const borderActive = '1px solid #00407b';
    const styles = {
        backgroundColor: isFree ? '#00407b' : '#c9e5ff',
        borderTop: isStartTime ? borderActive : borderDefault,
        borderBottom: isEndTime ? borderActive : borderDefault,
        borderLeft: isFree ? borderDefault : borderActive,
        borderRight: isFree ? borderDefault : borderActive
    }

    let startTimeObj, startTimeHour, startTimeMinute, endTimeHour, endTimeMinute;
    if (isStartTime) {
        startTimeObj = startTimeTarget.current[0];
        startTimeHour = startTimeObj.startTime.hour;
        startTimeMinute = startTimeObj.startTime.minute;
        endTimeHour = startTimeObj.endTime.hour;
        endTimeMinute = startTimeObj.endTime.minute;
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
                        <div className="calendar-class-info-student-name">
                            {startTimeObj.studentName}
                        </div>
                        <div className="calendar-class-info-coach-name">
                            {startTimeObj.coachName}
                        </div  >
                        <div className="calendar-class-info-location">
                            {startTimeObj.location}
                        </div>
                        <div className="calendar-class-info-class-period">
                            {startTimeHour}
                            {startTimeMinute === 0 ? '' : ':30'}
                            {startTimeHour > 11 ? 'pm' : 'am'}-
                            {endTimeHour}
                            {endTimeMinute === 0 ? '' : ':30'}
                            {endTimeHour > 11 ? 'pm' : 'am'}
                        </div>
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
                    setClassData={setClassData}
                />}
            {isShow && <div className="overlay"></div>}
        </>
    )
}

