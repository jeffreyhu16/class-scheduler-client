import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from './ClassForm'
import { glowContext } from './contexts/glowContext';

export default function CalendarHalfHour(props) {
    const { classData, day, halfHour, fetchClasses } = props;
    const { isGlow, setIsGlow } = React.useContext(glowContext);
    const [ isShow, setIsShow ] = React.useState(false);
    const [ isClassTime, setIsClassTime ] = React.useState({
        isStartTime: false,
        isMidTime: false,
        isEndTime: false
    });
    const { isStartTime, isMidTime, isEndTime } = isClassTime;
    const startTimeTarget = React.useRef();
    const midTimeTarget = React.useRef();
    const endTimeTarget = React.useRef();
    const hourIndex = Math.ceil(halfHour / 2);
    
    React.useEffect(() => {
        if (classData) {
            // filter startTime //
            startTimeTarget.current = classData.filter(dayTarget => {
                const { startTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                const startTimeHalfHour = (startTime.hour - 6) * 2 + halfInterval;
                return startTimeHalfHour === halfHour - 1;
            });
            if (startTimeTarget.current[0]) {
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: true }));
            } else setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: false }));
            // filter midTime //
            midTimeTarget.current = classData.filter(dayTarget => {
                const { startTime, endTime } = dayTarget;
                const halfInterval = startTime.minute === 30 ? 1 : 0;
                const startTimeHalfHour = (startTime.hour - 6) * 2 + halfInterval;
                const startDateTime = DateTime.fromObject(startTime);
                const endDateTime = DateTime.fromObject(endTime);
                const duration = endDateTime.diff(startDateTime, 'hours').hours;
                let isMidTime = false;
                if (duration > 1) {
                    const midTimeHalfHours = (duration - 1) * 2;
                    for (let i = 1; i <= midTimeHalfHours; i++) {
                        if (startTimeHalfHour + i === halfHour - 1) {
                            isMidTime = true;
                        }
                    }
                }
                return isMidTime;
            });
            if (midTimeTarget.current[0]) {
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isMidTime: true }));
            } else setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isMidTime: false }));
            // filter endTime //
            endTimeTarget.current = classData.filter(dayTarget => {
                const { endTime } = dayTarget;
                const halfInterval = endTime.minute === 30 ? 1 : 0;
                const endTimeHalfHour = (endTime.hour - 6) * 2 + halfInterval;
                return endTimeHalfHour === halfHour;
            });
            if (endTimeTarget.current[0]) {
                // console.log(endTimeTarget.current[0])
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: true }));
            } else setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: false }));
        }
    }, [classData]);

    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
        console.log(isGlow.hour)
    }

    function handleOnMouse(dayIndex, hourIndex, boolean) {
        setIsGlow(prevIsGlow => {
            const newIsGlow = { ...prevIsGlow }
            newIsGlow.day[dayIndex] = boolean;
            newIsGlow.hour[hourIndex] = boolean;
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

    let classTimeObj, startTimeHour, startTimeMinute, endTimeHour, endTimeMinute;
    if (isStartTime) {
        classTimeObj = startTimeTarget.current[0];
        startTimeHour = classTimeObj.startTime.hour;
        startTimeMinute = classTimeObj.startTime.minute;
        endTimeHour = classTimeObj.endTime.hour;
        endTimeMinute = classTimeObj.endTime.minute;
    }
    const classTimeTarget = 
        isStartTime ? startTimeTarget.current[0] : 
        isMidTime ? midTimeTarget.current[0] : 
        isEndTime ? endTimeTarget.current[0] : '';

    return (
        <>
            <div
                onMouseEnter={() => handleOnMouse(day, hourIndex, true)}
                onMouseLeave={() => handleOnMouse(day, hourIndex, false)}
                className={`calendar-half-hour day-${day} half-hour-${halfHour}`}
                onClick={toggleForm}
                style={styles}
            >
                {isStartTime &&
                    <div className="calendar-class-info">
                        <div className="calendar-class-info-student-name">
                            {classTimeObj.studentName}
                        </div>
                        <div className="calendar-class-info-coach-name">
                            {classTimeObj.coachName}
                        </div  >
                        <div className="calendar-class-info-location">
                            {classTimeObj.location}
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
                    day={day}
                    halfHour={halfHour}
                    toggleForm={toggleForm}
                    fetchClasses={fetchClasses}
                    classTimeTarget={classTimeTarget}
                />}
            {isShow && <div className="overlay"></div>}
        </>
    )
}

