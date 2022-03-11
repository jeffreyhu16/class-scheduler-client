import React from 'react'
import { DateTime } from 'luxon'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { weekContext } from './contexts/weekContext'

export default function HeaderNav() {

    const { startOfWeek, setStartOfWeek } = React.useContext(weekContext);
    let day1, day7, month, year, nextWeek, lastWeek;

    if (startOfWeek) {
        const mon = DateTime.fromObject(startOfWeek);
        const sun = mon.plus({ days: 6 });
        day1 = mon.day;
        day7 = sun.day;
        month = mon.monthLong;
        year = mon.year;

        nextWeek = mon.plus({ days: 7 }).toObject();
        lastWeek = mon.minus({ days: 7 }).toObject();
    }

    function shiftWeek(direction) {
        if (direction === 'next') {
            setStartOfWeek(nextWeek);
        } else {
            setStartOfWeek(lastWeek);
        }
    }

    return (
        <div className="header-nav">
            <div className="header-toggle-group">
                <div className="header-toggle-day">Day</div>
                <div className="header-toggle-week">Week</div>
            </div>
            <div className="header-date-group">
                <div className="toggle-period">
                    <FontAwesomeIcon 
                        icon={faAngleLeft} 
                        onClick={() => shiftWeek('prev')}
                        className="icon-angle-left"
                    />
                    <FontAwesomeIcon 
                        icon={faAngleRight} 
                        onClick={() => shiftWeek('next')}
                        className="icon-angle-right" 
                    />
                </div>
                <div className="header-date">
                    <div className="header-date-day">{day1} - {day7}</div>
                    <div className="header-date-month">{month}</div>
                    <div className="header-date-year">{year}</div>
                </div>
            </div>
        </div>
    )
}