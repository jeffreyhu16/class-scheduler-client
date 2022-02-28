import React from 'react'

export default function ClassForm(props) {
    const [inputs, setInputs] = React.useState([]);
    let startTime
    let date
    let hour

    function handleOnLoad() {
        let weekArr = Object.entries(props.weekData);
        date = weekArr[props.day - 1][1];
        hour = props.halfHour / 2 + 6;

        startTime = props.halfHour % 2 !== 0 ?
            new Date(date).setHours(hour) :
            new Date(date).setHours(hour, 30);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevInputs => [...prevInputs, { [name]: value }]);
    }

    function handleSubmit() {
        fetch('/')
    }

    return (
        <div className="class-form">
            <form onLoad={handleOnLoad} onSubmit={handleSubmit}>
                <div className="form-time">
                    <input
                        type="text"
                        name="startTime"
                        className="startTime"
                        placeholder="Start"
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        type="text"
                        name="endTime"
                        className="endTime"
                        placeholder="End"
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <input
                    type="text"
                    name="studentName"
                    className="studentName"
                    placeholder="Student Name"
                    onChange={handleChange}
                >
                </input>
                <input
                    type="text"
                    name="coachName"
                    className="coachName"
                    placeholder="Coach Name"
                    onChange={handleChange}
                >
                </input>
                <input
                    type="text"
                    name="location"
                    className="location"
                    placeholder="Location"
                    onChange={handleChange}
                >
                </input>
                <div className="form-button-group">
                    <button
                        onClick={''}
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