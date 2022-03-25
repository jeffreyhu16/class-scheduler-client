import React from 'react'
import { DateTime } from 'luxon'
import ClassForm from '../ClassForm'
import { glowContext } from '../contexts/GlowContext';

export default function CalendarQuarterHour(props) {
    const { classData, day, location, courtNo, quarterHour, fetchClasses } = props;
    const { isGlow, setIsGlow } = React.useContext(glowContext);
    const [isShow, setIsShow] = React.useState(false);

    let startTimeTarget, midTimeTarget, endTimeTarget;
    let isStartTime, isMidTime, isEndTime;
    if (classData.length > 0) {
        // filter startTime //
        startTimeTarget = classData.filter(dayTarget => {
            const { startTime } = dayTarget;
            const quarterInterval = startTime.minute / 15;
            const startTimeQuarterHour = (startTime.hour - 6) * 4 + quarterInterval;
            return startTimeQuarterHour === quarterHour - 1;
        });
        if (startTimeTarget[0]) isStartTime = true
        else isStartTime = false
        
        // filter midTime //
        midTimeTarget = classData.filter(dayTarget => {
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
        if (midTimeTarget[0]) isMidTime = true
        else isMidTime = false
        
        // filter endTime //
        endTimeTarget = classData.filter(dayTarget => {
            const { endTime } = dayTarget;
            const quarterInterval = endTime.minute / 15;
            const endTimeQuarterHour = (endTime.hour - 6) * 4 + quarterInterval;
            return endTimeQuarterHour === quarterHour;
        });
        if (endTimeTarget[0]) isEndTime = true
        else isEndTime = false
    }

    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
    }

    function handleOnMouse(dayIndex, courtIndex, quarterHourIndex, boolean) {
        setIsGlow(prevIsGlow => {
            const newIsGlow = { ...prevIsGlow }
            if (dayIndex) newIsGlow.day[dayIndex] = boolean;
            if (courtIndex) newIsGlow.court[courtIndex] = boolean;
            newIsGlow.quarterHour[quarterHourIndex] = boolean;
            return newIsGlow;
        }) // fix for daily view //
    }

    let isFree = true;
    if (isStartTime || isMidTime || isEndTime) isFree = false

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
        classTimeObj = startTimeTarget[0];
        const { startTime, endTime } = classTimeObj;
        startHour = startTime.hour;
        startMin = startTime.minute;
        endHour = endTime.hour;
        endMin = endTime.minute;
    }
    
    const classTimeTarget =
        isStartTime ? startTimeTarget[0] :
            isMidTime ? midTimeTarget[0] :
                isEndTime ? endTimeTarget[0] : '';

    return (
        <>
            <div
                onMouseEnter={() => handleOnMouse(day, courtNo, quarterHour, true)}
                onMouseLeave={() => handleOnMouse(day, courtNo, quarterHour, false)}
                className={
                    day ?
                        `calendar-quarter-hour day-${day} quarter-hour-${quarterHour}` :
                        `calendar-quarter-hour ${location.name}-${courtNo} quarter-hour-${quarterHour}`
                }
                onClick={toggleForm}
                style={styles}
            >
                {isStartTime &&
                    <div className="calendar-class-info">
                        <div className="calendar-class-info-student-name">
                            {classTimeObj && classTimeObj.student[0].name}
                        </div>
                        <div className="calendar-class-info-coach-name">
                            {classTimeObj && classTimeObj.coach.name}
                        </div  >
                        <div className="calendar-class-info-location">
                            {classTimeObj && classTimeObj.location._id.name}
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
                    courtNo={courtNo}
                    toggleForm={toggleForm}
                    fetchClasses={fetchClasses}
                    classTimeTarget={classTimeTarget}
                />}
            {isShow && <div className="overlay"></div>}
        </>
    )
}

