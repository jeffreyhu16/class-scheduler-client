import React from 'react'
import { DateTime, Settings } from 'luxon'
import ClassForm from '../ClassForm'
import { glowContext } from '../contexts/GlowContext'
import { renderContext } from '../contexts/RenderContext'
import { Backdrop, CircularProgress } from '@mui/material'
Settings.defaultZone = 'Asia/Taipei';

export default function CalendarQuarterHour(props) {
    const { classData, day, location, courtNo, quarterHour, fetchClasses, setClassData } = props;
    // const { setIsGlow } = React.useContext(glowContext);
    const { weekView } = React.useContext(renderContext);
    const [isShow, setIsShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let startTimeTarget, midTimeTarget, endTimeTarget;
    let isStartTime, isMidTime, isEndTime, duration, showLocation;
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
            duration = endDateTime.diff(startDateTime, 'minutes').toObject().minutes;
            let isMidTime = false;
            if (duration > 30) {
                const midTimeQuarterHours = (duration - 30) / 15;
                for (let i = 1; i <= midTimeQuarterHours; i++) {
                    if (startTimeQuarterHour + i === quarterHour - 1) {
                        isMidTime = true;
                    }
                }
                if (startTimeQuarterHour === quarterHour - 1) showLocation = true;
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

    // function handleOnMouse(dayIndex, courtIndex, quarterHourIndex, boolean) {
    //     setIsGlow(prevIsGlow => {
    //         const newIsGlow = { ...prevIsGlow }
    //         if (dayIndex) newIsGlow.day[dayIndex] = boolean;
    //         if (courtIndex) newIsGlow.location[location.name][courtIndex] = boolean;
    //         newIsGlow.quarterHour[quarterHourIndex] = boolean;
    //         return newIsGlow;
    //     }) // fix for daily view //
    // }

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

    let classTimeObj, startString, endString, students = '';
    if (isStartTime) {
        classTimeObj = startTimeTarget[0];
        const { startTime, endTime, student } = classTimeObj;
        startString = DateTime.fromObject(startTime).toFormat('h:mm').toLowerCase();
        endString = DateTime.fromObject(endTime).toFormat('h:mm').toLowerCase();
        student.forEach(student => {
            students += (student + ' ');
        })
    }

    const classTimeTarget =
        isStartTime ? startTimeTarget[0] :
            isMidTime ? midTimeTarget[0] :
                isEndTime ? endTimeTarget[0] : '';

    return (
        <>
            <div
                // onMouseEnter={() => handleOnMouse(day, courtNo, quarterHour, true)}
                // onMouseLeave={() => handleOnMouse(day, courtNo, quarterHour, false)}
                className={
                    weekView ?
                        `calendar-quarter-hour day-${day} quarter-hour-${quarterHour}` :
                        `calendar-quarter-hour ${location.name}-${courtNo} quarter-hour-${quarterHour}`
                }
                onClick={toggleForm}
                style={styles}
            >
                {isStartTime &&
                    <div className="calendar-class-info">
                        <div className="calendar-class-info-coach-name">
                            {classTimeObj && classTimeObj.coach.name}
                        </div>
                        <div className="calendar-class-info-class-period">
                            {startString}-{endString}
                        </div>
                        <div className="calendar-class-info-student-name">
                            {classTimeObj && students}
                        </div>
                        <div className="calendar-class-info-location">
                            {classTimeObj && showLocation && classTimeObj.location._id.name}
                        </div>

                    </div>
                }
            </div>
            {isShow &&
                <ClassForm
                    day={day}
                    quarterHour={quarterHour}
                    courtNo={courtNo}
                    setLoading={setLoading}
                    toggleForm={toggleForm}
                    fetchClasses={fetchClasses}
                    setClassData={setClassData}
                    classTimeTarget={classTimeTarget}
                />}
            {isShow && <div className="overlay"></div>}
            {loading && 
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>}
        </>
    )
}

