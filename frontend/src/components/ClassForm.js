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
                <label htmlFor="startTime">Start</label>
                <input
                    type="text"
                    name="startTime"
                    id="startTime"
                    placeholder={startTime}
                    onChange={handleChange}
                >
                </input>
                <label htmlFor="endTime">End</label>
                <input
                    type="text"
                    name="endTime"
                    id="endTime"
                    onChange={handleChange}
                >
                </input>
                <label htmlFor="studentName">Student</label>
                <input
                    type="text"
                    name="studentName"
                    id="studentName"
                    onChange={handleChange}
                >
                </input>
                <label htmlFor="coachName">Coach</label>
                <input
                    type="text"
                    name="coachName"
                    id="coachName"
                    onChange={handleChange}
                >
                </input>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    name="location"
                    id="location"
                    onChange={handleChange}
                >
                </input>
                <button type="submit"></button>
            </form>
        </div>
    )
}