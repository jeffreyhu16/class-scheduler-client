import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from './contexts/DataContext'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ClassForm(props) {
    const { day, quarterHour, toggleForm, fetchClasses, classTimeTarget } = props;
    const { startOfWeek } = React.useContext(dataContext);
    const [ inputs, setInputs ] = React.useState({
        startTime: '.',
        endTime: '.',
        studentName: '.',
        coachName: '.',
        location: '.',
        note: ''
    }); // still an uncontrolled component //
    const { startTime, endTime, studentName, coachName, location } = inputs;
    let dateObj, startDateTime, endDateTime, startTimeString, endTimeString

    if (startOfWeek) {
        const hour = Math.floor((quarterHour - 1) / 4 + 6);
        const min = (quarterHour - 1) % 4 * 15;

        dateObj = DateTime.fromObject(startOfWeek);
        startDateTime = dateObj.plus({ days: day - 1, hours: hour, minutes: min });
        endDateTime = dateObj.plus({ days: day - 1, hours: hour + 1, minutes: min });
        startTimeString = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
        endTimeString = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    }

    if (classTimeTarget) {
        startDateTime = DateTime.fromObject(classTimeTarget.startTime);
        endDateTime = DateTime.fromObject(classTimeTarget.endTime);

        startTimeString = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
        endTimeString = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    }

    React.useEffect(() => {
        if (startOfWeek) {
            setInputs(prevInputs => ({
            ...prevInputs,
            startTime: startDateTime.toObject(),
            endTime: endDateTime.toObject()
            }));
        }
    }, [startOfWeek]); // check why using startDateTime will cause infinite re-render //

    React.useEffect(() => {
        if (classTimeTarget) {
            setInputs({
            startTime: classTimeTarget.startTime,
            endTime: classTimeTarget.endTime,
            studentName: classTimeTarget.studentName,
            coachName: classTimeTarget.coachName,
            location: classTimeTarget.location,
            note: classTimeTarget.note  
            });
        }
    }, [classTimeTarget]);

    function handleChange(e) {
        let { name, value } = e.target;
        if (name === 'startTime' || name === 'endTime') {
            const hour = value.length === 4 ? parseInt(value[0]) : parseInt(value.slice(0, 2));
            const min = parseInt(value.slice(value.length - 2));
            value = startDateTime.set({ hour: hour, minute: min }).toObject();
        }
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    function handleCancel(e) {
        e.preventDefault();
        toggleForm();
    }

    function handleDelete(e) {
        e.preventDefault();
        fetch('/class',{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: classTimeTarget._id
            })
        })
        .then(() => {
            fetchClasses(startOfWeek, day);
            toggleForm()
        })
        .catch(err => console.log(err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        for (let value in inputs) {
            if (value === '.') return
        }
        if (classTimeTarget) {
            fetch('/class', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...inputs,
                    id: classTimeTarget._id
                })
            })
            .then(() => {
                fetchClasses(startOfWeek, day);
                toggleForm()
            })
            .catch(err => console.log(err));
        } else {
            fetch('/class', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            })
            .then(() => {
                fetchClasses(startOfWeek, day);
                toggleForm()
            })
            .catch(err => console.log(err));
        }
    }
    // add courtNo to form //
    return (
        <div className="form-container">
            <form className="class-form" onSubmit={handleSubmit}>
                <div className="form-time">
                    <label htmlFor="startTime"></label>
                    <input
                        type="text"
                        id="startTime"
                        name="startTime"
                        className="startTime"
                        placeholder={startTimeString}
                        onChange={handleChange}
                        style={{ outline: startTime ? 'none' : 'red auto 1px' }}
                    >
                    </input>
                    <FontAwesomeIcon icon={faMinus} />
                    <label htmlFor="endTime"></label>
                    <input
                        type="text"
                        id="endTime"
                        name="endTime"
                        className="endTime"
                        placeholder={endTimeString}
                        onChange={handleChange}
                        style={{ outline: endTime ? 'none' : 'red auto 1px' }}
                    >
                    </input>
                </div>
                <label htmlFor="studentName"></label>
                <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    className="studentName"
                    placeholder={classTimeTarget ? classTimeTarget.studentName : "Student Name"}
                    onChange={handleChange}
                    style={{ outline: studentName ? 'none' : 'red auto 1px' }}
                >
                </input>
                <label htmlFor="coachName"></label>
                <input
                    type="text"
                    id="coachName"
                    name="coachName"
                    className="coachName"
                    placeholder={classTimeTarget ? classTimeTarget.coachName : "Coach Name"}
                    onChange={handleChange}
                    style={{ outline: coachName ? 'none' : 'red auto 1px' }}
                >
                </input>
                <label htmlFor="location"></label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    className="location"
                    placeholder={classTimeTarget ? classTimeTarget.location : "Location"}
                    onChange={handleChange}
                    style={{ outline: location ? 'none' : 'red auto 1px' }}
                >
                </input>
                <label htmlFor="note"></label>
                <textarea
                    id="note"
                    name="note"
                    className="note"
                    placeholder="Notes"
                    onChange={handleChange}
                />
                <div className="form-button-group">
                    <button className="form-cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    {
                        classTimeTarget &&
                        <button className="form-delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    }
                    <button type="submit" className="form-submit-button">
                        {classTimeTarget ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    )
}