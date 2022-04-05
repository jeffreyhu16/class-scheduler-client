import React from 'react'
import { DateTime } from 'luxon'
import { dataContext } from './contexts/DataContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, TextField, Popper } from '@mui/material'

export default function ClassForm(props) {
    const { day, quarterHour, toggleForm, classTimeTarget } = props;
    const { currentDate, startOfWeek, setStartOfWeek, locationData, coachData } = React.useContext(dataContext);
    const [timeOptions, setTimeOptions] = React.useState([]);
    const [studentOptions, setStudentOptions] = React.useState([]);
    const [inputDate, setInputDate] = React.useState({
        startDate: '',
        endDate: '',
        startTimeString: '',
        endTimeString: ''
    });
    const [inputs, setInputs] = React.useState({
        startTime: '',
        endTime: '',
        studentArr: [],
        coachName: '',
        location: { name: '', courtNo: '' },
        note: ''
    });

    React.useEffect(() => {
        fetch('/student/options')
            .then(res => res.json())
            .then(data => setStudentOptions(data));
        fetch('date/timeOptions')
            .then(res => res.json())
            .then(data => setTimeOptions(data));
    }, []);

    let dateObj, startDateTime, endDateTime, startTimeString, endTimeString;
    const hour = Math.floor((quarterHour - 1) / 4 + 6);
    const min = (quarterHour - 1) % 4 * 15;

    if (classTimeTarget) {
        const { startTime, endTime } = classTimeTarget;
        startDateTime = DateTime.fromObject(startTime);
        endDateTime = DateTime.fromObject(endTime);
    } else if (startOfWeek && day) {
        dateObj = DateTime.fromObject(startOfWeek);
        startDateTime = dateObj.plus({ days: day - 1, hours: hour, minutes: min });
        endDateTime = dateObj.plus({ days: day - 1, hours: hour + 1, minutes: min });
    } else if (currentDate && !day) {
        dateObj = DateTime.fromObject(currentDate);
        startDateTime = dateObj.set({ hour: hour, minute: min });
        endDateTime = dateObj.set({ hour: hour + 1, minute: min });
    }
    startTimeString = startDateTime.toFormat('h:mm a').toLowerCase();
    endTimeString = endDateTime.toFormat('h:mm a').toLowerCase();

    React.useEffect(() => {
        if (startOfWeek || currentDate) {
            setInputs(prevInputs => ({
                ...prevInputs,
                startTime: startDateTime.toObject(),
                endTime: endDateTime.toObject()
            }));
        }
    }, [startOfWeek, currentDate]); // maybe take away dependencies //

    React.useEffect(() => {
        if (startTimeString.length > 5) {
            setInputDate({
                startDate: startDateTime.toLocaleString(DateTime.DATE_SHORT),
                endDate: endDateTime.toLocaleString(DateTime.DATE_SHORT),
                startTimeString: startTimeString,
                endTimeString: endTimeString
            });
        }
    }, []); // maybe add startDateTime //

    React.useEffect(() => {
        if (classTimeTarget) {
            const { startTime, endTime, student, coach, location, note } = classTimeTarget;
            setInputs({
                startTime,
                endTime,
                studentArr: student,
                coachName: coach.name,
                location: { name: location._id.name, courtNo: location.courtNo },
                note: note
            });
        }
    }, [classTimeTarget]); // maybe take away dependencies //

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
        let method, body;
        if (classTimeTarget) {
            method = 'put';
            body = { ...inputs, _id: classTimeTarget._id }
        } else {
            method = 'post';
            body = inputs;
        }
        fetch('/class', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(() => {
                setStartOfWeek(prev => ({ ...prev }));
                toggleForm()
            })
            .catch(err => console.log(err));
    }

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {
            setInputDate(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

    }  // add input format restriction

    const studentChange = (e, values) => {
        if (!values) return;
        setInputs(prev => ({
            ...prev,
            studentArr: values
        }));
    }

    const selectChange = (e, field) => {
        const { value } = e.target;
        if (!value) return;
        if (field === 'startTimeString' || field === 'endTimeString') {
            setInputDate(prev => ({
                ...prev,
                [field]: value
            }));
        } else if (field === 'location') {
            setInputs(prev => {
                const newInputs = { ...prev };
                newInputs.location.name = value;
                return newInputs;
            });
        } else if (field === 'courtNo') {
            setInputs(prev => {
                const newInputs = { ...prev };
                newInputs.location.courtNo = parseInt(value);
                return newInputs;
            });
        } else {
            setInputs(prev => ({
                ...prev,
                [field]: value
            }));
        }
    }

    React.useEffect(() => {
        if (inputDate.startDate) {
            const { startDate, endDate, startTimeString, endTimeString } = inputDate;
            const format = 'dd/MM/yyyy h:mm a';
            const startTime =
                DateTime.fromFormat(`${startDate} ${startTimeString}`, format).toObject();
            const endTime =
                DateTime.fromFormat(`${endDate} ${endTimeString}`, format).toObject();

            setInputs(prev => ({
                ...prev,
                startTime: startTime,
                endTime: endTime
            }));
        }
    }, [inputDate]);

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
    );

    const customPop = (props) => (
        <Popper {...props} sx={popStyle} style={{ width: '85px' }} />
    )

    const popStyle = {
        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)',
        "& .MuiAutocomplete-listbox": {
            '& li': {
                padding: '1px 0px 1px 10px'
            }
        }
    }

    const dateStyle = {
        '& .MuiFilledInput-root': {
            borderRadius: '0',
            borderTopLeftRadius: '0.4em',
            borderBottomLeftRadius: '0.4em',
            '& .MuiFilledInput-input': {
                paddingRight: '0px'
            }
        }
    }

    const timeStyle = {
        '& .MuiTextField-root': {
            '& .MuiFilledInput-root': {
                borderRadius: '0',
                borderTopRightRadius: '0.4em',
                borderBottomRightRadius: '0.4em'
            }
        }
    }

    return (
        <div className="form-container">
            <form className="class-form" onSubmit={handleSubmit}>
                <div className="form-time">
                    <div className="form-time-start">
                        <TextField
                            label="Start"
                            name="startDate"
                            value={inputDate.startDate}
                            onChange={handleChange}
                            variant="filled"
                            size="small"
                            sx={dateStyle}
                        />
                        <Autocomplete
                            options={timeOptions.slice(0, 72)}
                            renderInput={params => textInput(params, '')}
                            onSelect={e => selectChange(e, 'startTimeString')}
                            value={inputDate.startTimeString}
                            PopperComponent={customPop}
                            size="small"
                            autoHighlight
                            popupIcon={null}
                            sx={timeStyle}
                        />
                    </div>
                    <div className="form-time-end">
                        <TextField
                            label="End"
                            name="endDate"
                            value={inputDate.endDate}
                            onChange={handleChange}
                            variant="filled"
                            size="small"
                            sx={dateStyle}
                        />
                        <Autocomplete
                            options={timeOptions.slice(1)}
                            renderInput={params => textInput(params, '')}
                            onSelect={e => selectChange(e, 'endTimeString')}
                            value={inputDate.endTimeString}
                            PopperComponent={customPop}
                            size="small"
                            autoHighlight
                            popupIcon={null}
                            sx={timeStyle}
                        />
                    </div>
                </div>
                <Autocomplete
                    options={studentOptions}
                    renderInput={params => textInput(params, 'Student')}
                    value={inputs.studentArr}
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
                    onSelect={e => selectChange(e, 'coachName')}
                    size="small"
                    autoHighlight
                />
                <div className="form-location">
                    <Autocomplete
                        options={locationOptions}
                        isOptionEqualToValue={(option, value) => true}
                        renderInput={params => textInput(params, 'Location')}
                        value={inputs.location.name}
                        onSelect={e => selectChange(e, 'location')}
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
                </div>
                <TextField
                    label="Note"
                    name="note"
                    value={inputs.note}
                    onChange={handleChange}
                    variant="filled"
                    multiline={true}
                    size="small"
                    rows={2}
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