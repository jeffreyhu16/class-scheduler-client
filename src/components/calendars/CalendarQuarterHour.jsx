import React from 'react'
import ClassForm from '../ClassForm'
import { DateTime, Settings } from 'luxon'
import { renderContext } from '../../contexts/RenderContext'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setIsGlow } from '../../redux/isGlowSlice'
Settings.defaultZone = 'Asia/Taipei';

export default function CalendarQuarterHour(props) {

    const { day, location, courtNo, quarterHour, classData } = props;
    const { weekView, coachAll, locationAll, printMode } = React.useContext(renderContext);

    const [isShow, setIsShow] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    let startTimeTarget, midTimeTarget, endTimeTarget, isLeave;
    let isStartTime, isMidTime, isEndTime, duration, showLocation;
    if (classData.length > 0) {
        // filter startTime //
        startTimeTarget = classData.filter(dayTarget => {
            const { startTime } = dayTarget;
            const quarterInterval = startTime.minute / 15;
            const startTimeQuarterHour = (startTime.hour - 7) * 4 + quarterInterval;
            return startTimeQuarterHour === quarterHour - 1;
        });
        if (startTimeTarget[0]) isStartTime = true
        else isStartTime = false

        // filter midTime //
        midTimeTarget = classData.filter(dayTarget => {
            const { startTime, endTime } = dayTarget;
            const quarterInterval = startTime.minute / 15;
            const startTimeQuarterHour = (startTime.hour - 7) * 4 + quarterInterval;
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
            const endTimeQuarterHour = (endTime.hour - 7) * 4 + quarterInterval;
            return endTimeQuarterHour === quarterHour;
        });
        if (endTimeTarget[0]) isEndTime = true
        else isEndTime = false
    }

    function toggleForm() {
        setIsShow(prevIsShow => !prevIsShow);
    }

    let classTimeObj, startString, endString, students = '';
    if (isStartTime) {
        classTimeObj = startTimeTarget[0];
        const { startTime, endTime, student } = classTimeObj;
        startString = DateTime.fromObject(startTime).toFormat('h:mm').toLowerCase();
        endString = DateTime.fromObject(endTime).toFormat('h:mm').toLowerCase();
        student.forEach(student => {
            students += (student + ' ');
        });
    }

    const classTimeTarget =
        isStartTime ? startTimeTarget[0] :
            isMidTime ? midTimeTarget[0] :
                isEndTime ? endTimeTarget[0] : '';

    if (classTimeTarget) isLeave = classTimeTarget.isLeave;

    let isFree = true;
    if (isStartTime || isMidTime || isEndTime) isFree = false

    const borderDefault = '1px solid rgba(201, 229, 255, 0.2)';
    const borderActive = '1px solid #00407b';

    let backgroundColor, borderTop, borderBottom;
    if (isStartTime) {
        borderTop = borderActive;
    } else if (isMidTime) {
        borderTop = '';
        borderBottom = '';
    } else if (isEndTime) {
        borderBottom = borderActive;
    } else {
        borderTop = borderDefault;
        borderBottom = borderDefault;
    }

    if (isLeave || isLeave && isHover) {
        backgroundColor = 'rgba(201,229,255,0.5)';
    } else if (!isFree || isHover) {
        backgroundColor = '#c9e5ff';
    } else {
        backgroundColor = '#00407b';
    }

    const styles = {
        container: {
            backgroundColor: backgroundColor,
            borderTop: borderTop,
            borderBottom: borderBottom,
            borderLeft: isFree ? borderDefault : borderActive,
            borderRight: isFree ? borderDefault : borderActive
        },
        classInfo: {
            top: printMode ? '0.1em' : '0.5em',
            fontSize: printMode ? '1.25rem' : '1rem',
        }
    }

    return (
        <>
            <div
                onMouseEnter={() => {
                    setIsHover(true);
                    dispatch(setIsGlow(day, location, courtNo, quarterHour, true));
                }}
                onMouseLeave={() => {
                    setIsHover(false);
                    dispatch(setIsGlow(day, location, courtNo, quarterHour, false));
                }}
                className={
                    weekView ?
                        `calendar-quarter-hour day-${day} quarter-hour-${quarterHour}` :
                        `calendar-quarter-hour ${location.name}-${courtNo} quarter-hour-${quarterHour}`
                }
                onClick={toggleForm}
                style={styles.container}
            >
                {isStartTime &&
                    <div className="calendar-class-info" style={styles.classInfo}>
                        {classTimeObj && coachAll &&
                            <div className="calendar-class-info-coach-name">
                                {classTimeObj.coach.name}
                            </div>
                        }
                        <div className="calendar-class-info-class-period">
                            {`${startString}-${endString}`}
                        </div>
                        <div className="calendar-class-info-location">
                            {classTimeObj && showLocation && classTimeObj.location._id.name}
                        </div>
                        <div className="calendar-class-info-student-name">
                            {classTimeObj && students}
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
                    classTimeTarget={classTimeTarget}
                />}
            {isShow && <div className="overlay"></div>}
            {loading &&
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}