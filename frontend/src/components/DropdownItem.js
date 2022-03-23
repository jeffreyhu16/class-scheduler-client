import React from 'react'
import { dataContext } from './contexts/DataContext'

export default function DropdownItem(props) {
    const { label, item, active, setActive, index } = props;
    const { setCalendarView, setLocation, setCoach } = React.useContext(dataContext);
    const [ on, setOn ] = React.useState([]);
    // location All is only available in Daily view //
    const itemStyles = {
        backgroundColor: on[index] ? '#c9e5ff' : ( active[label][index] ? '#c9e5ff' : '#004b8f' ),
        color: on[index] ? '#00182f' : ( active[label][index] ? '#00182f' : '#fff' )
    }

    function handleClick(item, index) {
        if (label === 'location') {
            if (item.name === 'all') {
                setCalendarView('day');
                setCoach({ name: 'all' });
                setActive(prevActive => ({
                    ...prevActive, 
                    view: [ true, false ]
                }));
            } else 
                setCalendarView('week'); 
            setLocation(item);
        };
        if (label === 'coach') setCoach(item);

        setActive(prevActive => {
            const newActive = { ...prevActive };
            newActive[label].fill(false);
            newActive[label][index] = true;
            return newActive;
        })
    }

    function handleOnMouse(boolean, index) {
        setOn(prevOnArr => {
            const newOnArr = [...prevOnArr];
            newOnArr[index] = boolean;
            return newOnArr;
        });
    }

    return (
        <div
            className="dropdown-menu-list-item"
            onClick={() => handleClick(item, index)}
            onMouseEnter={() => handleOnMouse(true, index)}
            onMouseLeave={() => handleOnMouse(false, index)}
            style={itemStyles}
        >
            {item.name}
        </div>
    )
}