import React from 'react'
import { DateTime } from 'luxon'

export default function ClassForm(props) {
    const { weekData, day, halfHour, isShow, toggleForm } = props;
    const [inputs, setInputs] = React.useState({});
    // const [isShow, setIsShow] = React.useState(isShow);
    let weekArr, date, hour, min, startTime, endTime, startTimeString, endTimeString
    // console.log(isShow)
    if (weekData.mon) {
        weekArr = Object.entries(weekData);
        date = weekArr[day - 1][1];
        hour = Math.floor((halfHour - 1) / 2 + 3);
        min = (halfHour - 1) % 2 * 30;

        startTime =
            DateTime.fromObject(date)
                .setZone('Australia/Melbourne')
                .plus({ hours: hour, minutes: min });
        endTime =
            DateTime.fromObject(date)
                .setZone('Australia/Melbourne')
                .plus({ hours: hour + 1, minutes: min });

        startTimeString = startTime.toLocaleString(DateTime.TIME_SIMPLE);
        endTimeString = endTime.toLocaleString(DateTime.TIME_SIMPLE);
    }

    function handleChange(e) {
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [e.target.name]: e.target.value
            }
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        toggleForm();
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/class/singleClass', {
            method: 'POST',
            body: JSON.stringify({ inputs: inputs })
        })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err));        
    }

    return isShow && (
        <div className="class-form">
            <form onSubmit={handleSubmit}>
                <div className="form-time">
                    <label htmlFor="startTime"></label>
                    <input
                        type="text"
                        id="startTime"
                        name="startTime"
                        className="startTime"
                        // value={startTime}
                        placeholder={startTimeString}
                        onChange={handleChange}
                    >
                    </input>
                    <label htmlFor="endTime"></label>
                    <input
                        type="text"
                        id="endTime"
                        name="endTime"
                        className="endTime"
                        // value={endTime}
                        placeholder={endTimeString}
                        onChange={handleChange}
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
                >
                </input>
                <label htmlFor="note"></label>
                <textarea
                    id="note"
                    name="note"
                    className="note"
                    placeholder="Notes"
                    onChange={handleChange}
                    // onClick={handleCancel}
                >
                </textarea>
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