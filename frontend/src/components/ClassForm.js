import React from 'react'
import { DateTime } from 'luxon'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ClassForm(props) {
    const { weekData, day, halfHour, isShow, toggleForm } = props;
    const [inputs, setInputs] = React.useState({
        startTime: '.',
        endTime: '.',
        studentName: '.',
        coachName: '.',
        location: '.',
        note: ''
    }); // still an uncontrolled component //
    const { startTime, endTime, studentName, coachName, location } = inputs;
    let dateObj, startDateTime, endDateTime, startTimeString, endTimeString

    if (weekData) {
        const dayDate = Object.entries(weekData)[day - 1][1];
        const hour = Math.floor((halfHour - 1) / 2 + 3);
        const min = (halfHour - 1) % 2 * 30;

        dateObj = DateTime.fromObject(dayDate).setZone('Australia/Melbourne');
        startDateTime = dateObj.plus({ hours: hour, minutes: min });
        endDateTime = dateObj.plus({ hours: hour + 1, minutes: min });

        startTimeString = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
        endTimeString = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    }

    React.useEffect(() => {
        setInputs(prevInputs => ({
            ...prevInputs,
            startTime: startDateTime.toObject(),
            endTime: endDateTime.toObject()
        }));
    }, [weekData]); // check why using startDateTime will cause infinite re-render //

    function handleChange(e) {
        let { name, value } = e.target;
        if (name === 'startTime' || name === 'endTime') {
            const hour = value.length === 4 ? parseInt(value[0]) : parseInt(value.slice(0,2));
            const min = parseInt(value.slice(value.length - 2));
            value = dateObj.set({ hour: hour, minute: min }).toObject();
            console.log(hour, min, value)
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

    function handleSubmit(e) {
        e.preventDefault();
        for (let value in inputs) { 
            if (value === '.') return
        }
        fetch('/class/singleClass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));        
    }

    return isShow && (
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
                    placeholder="Student Name"
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
                    placeholder="Coach Name"
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
                    placeholder="Location"
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
                    <button
                        onClick={handleCancel}
                        className="form-cancel-button">
                        Cancel
                    </button>
                    <button
                        type="submit" className="form-submit-button">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}