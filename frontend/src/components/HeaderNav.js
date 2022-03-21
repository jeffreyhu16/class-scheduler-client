import React from 'react'
import { DateTime } from 'luxon'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dataContext } from './contexts/DataContext'
import Dropdown from './Dropdown'

export default function HeaderNav() {

    const { calendarView, setCalendarView, currentDate,setCurrentDate, startOfWeek, setStartOfWeek, locationData,setLocation, coachData, setCoach } = React.useContext(dataContext);
    const [ active, setActive ] = React.useState({ location: [ , , true ], coach: [ , , true ] });
    let currentDay, day1, day7, month, year, nextDay, prevDay, nextWeek, prevWeek;

    if (currentDate && startOfWeek) {
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
        setCalendarView(view);
        setCoach({ name: 'all' });
        if (view === 'week') {
            setLocation({ name: 'Camberwell', numOfCourts: 5 });
            setActive({ location: [ false, false, true ], coach: [ false, true ] });
        }
        else {
            setLocation({ name: 'all' });
            setActive({ location: [ false, true ], coach: [ false, true ] });
        }
    }

    function shiftTime(direction) {
        if (calendarView === 'week') {
            if (direction === 'next') setStartOfWeek(nextWeek);
            else setStartOfWeek(prevWeek);
        } else {
            if (direction === 'next') setCurrentDate(nextDay);
            else setCurrentDate(prevDay);
        }
    }

    return (
        <div className="header-nav">
            <div className="header-filter-group">
                <div className="header-toggle-group">
                    <div className="header-toggle-day" onClick={() => toggleView('day')}>Day</div>
                    <div className="header-toggle-week" onClick={() => toggleView('week')}>Week</div>
                </div>
                <div className="header-dropdown-group">
                    <Dropdown
                        label="location"
                        listData={locationData}
                        active={active}
                        setActive={setActive}
                    />
                    <Dropdown
                        label="coach"
                        listData={coachData}
                        active={active}
                        setActive={setActive}
                    />
                </div>
            </div>
            <div className="header-date-group">
                <div className="header-date">
                    <div className="header-date-day">
                        {calendarView === 'week' ? `${day1} - ${day7}` : currentDay}
                    </div>
                    <div className="header-date-month">{month}</div>
                    <div className="header-date-year">{year}</div>
                </div>
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
        </div>
    )
}