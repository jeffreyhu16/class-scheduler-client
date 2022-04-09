import React from 'react'
import Dropdown from './Dropdown'
import { DateTime, Settings } from 'luxon'
import { faBars, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dataContext } from './contexts/DataContext'
import { renderContext } from './contexts/RenderContext'
import { Backdrop, CircularProgress } from '@mui/material'
Settings.defaultZone = 'Asia/Taipei';

export default function HeaderNav(props) {

    const { breakPoint } = props;
    const { setCalendarView, currentDate, setCurrentDate, startOfWeek, setStartOfWeek, locationData, setLocation, coachData, setCoach } = React.useContext(dataContext);
    const { weekView, dayView } = React.useContext(renderContext)
    const [active, setActive] = React.useState({ view: [, true], location: [, true], coach: [,,, true] });
    const [isHover, setIsHover] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let currentDay, day1, day7, month, year, nextDay, prevDay, nextWeek, prevWeek;

    if (currentDate) {
        const currentDateTime = DateTime.fromObject(currentDate);
        const mon = DateTime.fromObject(startOfWeek);
        const sun = mon.plus({ days: 6 });
        currentDay = currentDateTime.day;
        day1 = mon.day;
        day7 = sun.day;
        month = mon.monthLong;
        year = mon.year;

        nextDay = currentDateTime.plus({ days: 1 }).toObject();
        prevDay = currentDateTime.minus({ days: 1 }).toObject();
        nextWeek = mon.plus({ days: 7 }).toObject();
        prevWeek = mon.minus({ days: 7 }).toObject();
    }

    function toggleView(view) {
        setLoading(true);
        setCalendarView(view);
        if (view === 'week') {
            setLocation(locationData[1]);
            setCoach({ name: 'all' });
            setActive({ view: [false, true], location: [false, false, true], coach: [false, true] });
        }
        if (view === 'day') {
            setLocation({ name: 'all' });
            setCoach({ name: 'all' });
            setActive({ view: [true, false], location: [false, true], coach: [false, true] });
        }
        setTimeout(() => setLoading(false), 1500);
    }

    function shiftTime(direction) {
        setLoading(true);
        if (weekView) {
            if (direction === 'next') setStartOfWeek(nextWeek);
            else setStartOfWeek(prevWeek);
        }
        if (dayView) {
            if (direction === 'next') setCurrentDate(nextDay);
            else setCurrentDate(prevDay);
        }
        setTimeout(() => setLoading(false), 1500);
    }
    
    const castBackground = i => {
        let background;
        if (active.view[i] && !isHover[i]) background = '#c9e5ff';
        if (active.view[i] && isHover[i]) background = '#c9e5fff1';
        if (!active.view[i] && !isHover[i]) background = '#004b8f';
        if (!active.view[i] && isHover[i]) background = '#0055a4';
        return background;
    }

    const activeShadow = '0 0 1rem 0 rgba(255, 255, 255, 0.4)';
    const defaultShadow = '0 0 1rem 0 rgba(0, 0, 0, 0.3)';
    const dayStyles = {
        backgroundColor: castBackground(0),
        color: active.view[0] ? '#00182f' : '#fff',
        boxShadow: active.view[0] ? activeShadow : defaultShadow,
    }
    const weekStyles = {
        backgroundColor: castBackground(1),
        color: active.view[1] ? '#00182f' : '#fff',
        boxShadow: active.view[1] ? activeShadow : defaultShadow
    }

    return (
        <div className="header-nav">
            <div className="header-filter-group">
                {!breakPoint[780] &&
                    <div className="header-nav-dropdown">
                        <FontAwesomeIcon icon={faBars} className="icon-nav-dropdown" />
                    </div>}
                {breakPoint[780] &&
                    <div className="header-toggle-group">
                        <div
                            className="header-toggle-day"
                            onClick={() => toggleView('day')}
                            onMouseEnter={() => setIsHover([ true, false ])}
                            onMouseLeave={() => setIsHover([ false, false ])}
                            style={dayStyles}
                        >
                            Day
                        </div>
                        <div
                            className="header-toggle-week"
                            onClick={() => toggleView('week')}
                            onMouseEnter={() => setIsHover([ false, true ])}
                            onMouseLeave={() => setIsHover([ false, false ])}
                            style={weekStyles}
                        >
                            Week
                        </div>
                    </div>}
                {breakPoint[660] &&
                    <div className="header-dropdown-group">
                        <Dropdown
                            label="location"
                            listData={locationData}
                            active={active}
                            setActive={setActive}
                            setLoading={setLoading}
                        />
                        <Dropdown
                            label="coach"
                            listData={coachData}
                            active={active}
                            setActive={setActive}
                            setLoading={setLoading}
                        />
                    </div>}
            </div>
            <div className="header-date-group">
                {currentDate && 
                    <div className="header-date">
                        <div className="header-date-day">
                            {weekView ? `${day1} - ${day7}` : currentDay}
                        </div>
                        <div className="header-date-month">{month}</div>
                        <div className="header-date-year">{year}</div>
                    </div>
                }
                <div className="toggle-period">
                    <div className="icon-angle-left-container" onClick={() => shiftTime('prev')}>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="icon-angle-left"
                        />
                    </div>
                    <div className="icon-angle-right-container" onClick={() => shiftTime('next')}>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="icon-angle-right"
                        />
                    </div>
                </div>
            </div>
            <Backdrop open={loading} sx={{ zIndex: '5' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}