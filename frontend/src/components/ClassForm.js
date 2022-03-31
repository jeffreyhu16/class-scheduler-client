import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from './contexts/DataContext'
import { faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, TextField } from '@mui/material'

export default function ClassForm(props) {
    const { day, quarterHour, toggleForm, classTimeTarget } = props;
    const { currentDate, startOfWeek, setStartOfWeek, locationData, coachData } = React.useContext(dataContext);
    const [options, setOptions] = React.useState([]);
    const [inputs, setInputs] = React.useState({
        startTime: '',
        endTime: '',
        studentArr: [],
        coachName: '',
        location: { name: '', courtNo: '' },
        note: ''
    });

    React.useEffect(() => {
        fetch('/student')
            .then(res => res.json())
            .then(data => setOptions(data))
    }, []);

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
                studentArr: student,
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
            setInputs(prevInputs => {
                const newInputs = { ...prevInputs };
                newInputs.location = {
                    ...prevInputs.location,
                    [name]: value.length > 1 ? value : parseInt(value)
                };
                return newInputs;
            });
            return;
        }
        setInputs(prevInputs => {
            console.log(name, value)
            return {
                ...prevInputs,
                [name]: value
            }
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        toggleForm();
    }

    function handleDelete(e) {
        e.preventDefault();
        fetch('/class', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: classTimeTarget._id
            })
        })
            .then(() => {
                setStartOfWeek(prev => ({ ...prev }));
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
                    _id: classTimeTarget._id
                })
            })
                .then(() => {
                    setStartOfWeek(prev => ({ ...prev }));
                    toggleForm()
                })
                .catch(err => console.log(err));
        } else {
            fetch('/class', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            })
                .then(res => {
                    if (res.status === 400) throw new Error('wrong student');
                    setStartOfWeek(prev => ({ ...prev }));
                    toggleForm();
                })
                .catch(err => console.log(err));
        }
    }
    const [ test, setTest ] = React.useState([]);
    const studentChange = (e, values) => {
        console.log(values)
        setTest(values);
        // setInputs(prev => ({
        //     ...prev,
        //     studentArr: values
        // }));
    }

    const selectChange = (event, field) => {
        const { value } = event.target;
        console.log(event.target)
        if (!value) return;
        if (field === 'name' || field === 'courtNo') {
            setInputs(prev => {
                const newInputs = { ...prev };
                const parse = value.length < 2;
                newInputs.location[field] = parse ? parseInt(value) : value;
                return newInputs;
            });
        } else {
            
            setInputs(prev => ({
                ...prev,
                [field]: value
            }));
        }
    }
    let coachOptions;
    let locationOptions;
    let courtNoOptions = [];
    if (coachData) coachOptions = coachData.slice(1).map(coach => coach.name);
    if (locationData) locationOptions = locationData.slice(1).map(location => location.name);
    if (inputs.location.name === 'Camberwell')
        courtNoOptions = ['1', '2', '3', '4', '5'];
    else
        courtNoOptions = ['1', '2'];

    const textInput = (params, tag) => (
        <TextField
            {...params}
            label={tag}
            variant="filled"
        />
    )

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
                <Autocomplete
                    options={options}
                    renderInput={params => textInput(params, 'Student')}
                    value={test}
                    onChange={studentChange}
                    size="small"
                    autoHighlight
                    multiple
                />
                <Autocomplete
                    options={coachOptions}
                    isOptionEqualToValue={(option, value) => true}
                    renderInput={params => textInput(params, 'Coach')}
                    value={inputs.coachName}
                    onSelect={e => selectChange(e, 'coach')}
                    size="small"
                    autoHighlight
                />
                <div className="form-location">
                    <Autocomplete
                        options={locationOptions}
                        isOptionEqualToValue={(option, value) => true}
                        renderInput={params => textInput(params, 'Location')}
                        value={inputs.location.name}
                        onSelect={e => selectChange(e, 'name')}
                        size="small"
                        autoHighlight
                    />
                    <Autocomplete
                        options={courtNoOptions}
                        getOptionLabel={option => option.toString()}
                        isOptionEqualToValue={(option, value) => true}
                        renderInput={params => textInput(params, 'Court No.')}
                        value={inputs.location.courtNo}
                        onSelect={e => selectChange(e, 'courtNo')}
                        size="small"
                        autoHighlight
                    />
                    {/* <input  
                        type="text"
                        id="location"
                        name="name"
                        className="location"
                        placeholder={classTimeTarget ? classTimeTarget.location._id.name : "Location"}
                        onChange={handleChange}
                        style={{ outline: inputs.location ? 'none' : 'red auto 1px' }}
                    >
                    </input> */}
                    {/* <label htmlFor="courtNo"></label>
                    <input
                        type="text"
                        id="courtNo"
                        name="courtNo"
                        className="courtNo"
                        placeholder={classTimeTarget ? classTimeTarget.location.courtNo : "Court No."}
                        onChange={handleChange}
                        style={{ outline: inputs.location ? 'none' : 'red auto 1px' }}
                    >
                    </input> */}
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
                            <FontAwesomeIcon icon={faTrashCan} />
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