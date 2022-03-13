import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from './ClassForm'
import { glowContext } from './contexts/glowContext';

export default function CalendarQuarterHour(props) {
    const { classData, day, quarterHour, fetchClasses } = props;
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
    const halfHourIndex = Math.ceil(quarterHour / 2);
    
    React.useEffect(() => {
        if (classData) {
            // filter startTime //
            startTimeTarget.current = classData.filter(dayTarget => {
                const { startTime } = dayTarget;
                const quarterInterval = startTime.minute / 15;
                const startTimeQuarterHour = (startTime.hour - 6) * 4 + quarterInterval;
                return startTimeQuarterHour === quarterHour - 1;
            });
            if (startTimeTarget.current[0]) {
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: true }));
            } else setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isStartTime: false }));
            // filter midTime //
            midTimeTarget.current = classData.filter(dayTarget => {
                const { startTime, endTime } = dayTarget;
                const quarterInterval = startTime.minute / 15;
                const startTimeQuarterHour = (startTime.hour - 6) * 4 + quarterInterval;
                const startDateTime = DateTime.fromObject(startTime);
                const endDateTime = DateTime.fromObject(endTime);
                const duration = endDateTime.diff(startDateTime, 'minutes').toObject().minutes;
                let isMidTime = false;
                if (duration > 30) {
                    
                    const midTimeQuarterHours = (duration - 30) / 15;
                    for (let i = 1; i <= midTimeQuarterHours; i++) {
                        if (startTimeQuarterHour + i === quarterHour - 1) {
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
                const quarterInterval = endTime.minute / 15;
                const endTimeQuarterHour = (endTime.hour - 6) * 4 + quarterInterval;
                return endTimeQuarterHour === quarterHour;
            });
            if (endTimeTarget.current[0]) {
                // console.log(endTimeTarget.current[0])
                setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: true }));
            } else setIsClassTime(prevIsClassTime => ({ ...prevIsClassTime, isEndTime: false }));
        }
    }, [classData]); 

    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
    }

    function handleOnMouse(dayIndex, halfHourIndex, boolean) {
        setIsGlow(prevIsGlow => {
            const newIsGlow = { ...prevIsGlow }
            newIsGlow.day[dayIndex] = boolean;
            newIsGlow.halfHour[halfHourIndex] = boolean;
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

    let classTimeObj, startHour, startMin, endHour, endMin;
    if (isStartTime) {
        classTimeObj = startTimeTarget.current[0];
        startHour = classTimeObj.startTime.hour;
        startMin = classTimeObj.startTime.minute;
        endHour = classTimeObj.endTime.hour;
        endMin = classTimeObj.endTime.minute;
    }
 
    const classTimeTarget = 
        isStartTime ? startTimeTarget.current[0] : 
        isMidTime ? midTimeTarget.current[0] : 
        isEndTime ? endTimeTarget.current[0] : '';

    return (
        <>
            <div
                // onMouseEnter={() => handleOnMouse(day, halfHourIndex, true)}
                // onMouseLeave={() => handleOnMouse(day, halfHourIndex, false)}
                className={`calendar-quarter-hour day-${day} quarter-hour-${quarterHour}`}
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
                            {startHour > 12 ? startHour - 12 : startHour}:
                            {startMin === 0 ? '00' : startMin}-
                            {endHour > 12 ? endHour - 12 : endHour}:
                            {endMin === 0 ? '00' : endMin}
                        </div>
                    </div>
                }
            </div>
            {isShow &&
                <ClassForm
                    day={day}
                    quarterHour={quarterHour}
                    toggleForm={toggleForm}
                    fetchClasses={fetchClasses}
                    classTimeTarget={classTimeTarget}
                />}
            {isShow && <div className="overlay"></div>}
        </>
    )
}

