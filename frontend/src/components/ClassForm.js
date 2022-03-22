import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from './contexts/DataContext'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ClassForm(props) {
    const { day, quarterHour, courtNo, toggleForm, fetchClasses, classTimeTarget } = props;
    const { currentDate, startOfWeek, location, coach } = React.useContext(dataContext);
    const [ inputs, setInputs ] = React.useState({
        startTime: '.',
        endTime: '.',
        studentName: '.',
        coachName: '.',
        location: '.',
        note: ''
    }); // still an uncontrolled component //
    const { startTime, endTime, studentName, coachName } = inputs;
    let dateObj, startDateTime, endDateTime, startTimeString, endTimeString
    const hour = Math.floor((quarterHour - 1) / 4 + 6);
    const min = (quarterHour - 1) % 4 * 15;

    if (startOfWeek && day) {
        dateObj = DateTime.fromObject(startOfWeek);
        startDateTime = dateObj.plus({ days: day - 1, hours: hour, minutes: min });
        endDateTime = dateObj.plus({ days: day - 1, hours: hour + 1, minutes: min });
    } else if (currentDate && !day) {
        dateObj = DateTime.fromObject(currentDate);
        startDateTime = dateObj.set({ hour: hour, minute: min });
        endDateTime = dateObj.set({ hour: hour + 1, minute: min });
    }
    startTimeString = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    endTimeString = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);

    if (classTimeTarget) {
        startDateTime = DateTime.fromObject(classTimeTarget.startTime);
        endDateTime = DateTime.fromObject(classTimeTarget.endTime);

        startTimeString = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
        endTimeString = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    }

    React.useEffect(() => {
        if (startOfWeek || currentDate) {
            setInputs(prevInputs => ({
            ...prevInputs,
            startTime: startDateTime.toObject(),
            endTime: endDateTime.toObject()
            }));
        }
    }, [startOfWeek, currentDate]); // check why using startDateTime will cause infinite re-render //

    React.useEffect(() => {
        if (classTimeTarget) {
            const { startTime, endTime, student, coach, location, note } = classTimeTarget;
            setInputs({
            startTime: startTime,
            endTime: endTime,
            studentName: student[0].name,
            coachName: coach.name,
            location: { name: location._id.name, courtNo: location.courtNo },
            note: note  
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
        if (name === 'name' || name === 'courtNo') {
            setInputs(prevInputs => ({
                ...prevInputs,
                location: { ...prevInputs.location, [name]: value }
            }));
            return;
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
                _id: classTimeTarget._id
            })
        })
        .then(() => {
            if (day) fetchClasses(null, startOfWeek, day, location, null, coach);
            else fetchClasses(currentDate, null, null, location, courtNo, coach);
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
            console.log('classTimeTarget', classTimeTarget)
            fetch('/class', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...inputs,
                    _id: classTimeTarget._id
                })
            })
            .then(res => {
                // if (day) fetchClasses(null, startOfWeek, day, location, null, coach);
                // else fetchClasses(currentDate, null, null, location, courtNo, coach);
                res.json();
                toggleForm()
            })
            .catch(err => console.log(err));
            console.log('after put...')
        } else {
            fetch('/class', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            })
            .then(res => {
                res.json(); //cannot receive //
                // if (day) 
                //     fetchClasses('', startOfWeek, day, location, '', coach);
                // else 
                //     fetchClasses(currentDate, '', '', location, courtNo, coach);  
            })
            .then(data => {
                console.log(data)
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
                    placeholder={classTimeTarget ? classTimeTarget.student[0].name : "Student Name"}
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
                    placeholder={classTimeTarget ? classTimeTarget.coach.name : "Coach Name"}
                    onChange={handleChange}
                    style={{ outline: coachName ? 'none' : 'red auto 1px' }}
                >
                </input>
                <div className="form-location">
                    <label htmlFor="location"></label>
                    <input
                        type="text"
                        id="location"
                        name="name"
                        className="location"
                        placeholder={classTimeTarget ? classTimeTarget.location._id.name : "Location"}
                        onChange={handleChange}
                        style={{ outline: inputs.location ? 'none' : 'red auto 1px' }}
                    >
                    </input>
                    <label htmlFor="courtNo"></label>
                    <input
                        type="Numnber"
                        id="courtNo"
                        name="courtNo"
                        className="courtNo"
                        placeholder={classTimeTarget ? classTimeTarget.location.courtNo : "Court No."}
                        onChange={handleChange}
                        style={{ outline: inputs.location ? 'none' : 'red auto 1px' }}
                    >
                    </input>
                </div>
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