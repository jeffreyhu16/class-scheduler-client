import React from 'react'
import { dataContext } from '../contexts/DataContext'
import { renderContext } from '../contexts/RenderContext'

export default function DropdownItem(props) {
    const { label, item, active, setActive, setLoading, index } = props;
    const { setCalendarView, setLocation, setCoach } = React.useContext(dataContext);
    const { locationAll, coachAll } = React.useContext(renderContext)
    const [on, setOn] = React.useState([]);
    
    const itemStyles = {
        backgroundColor: on[index] ? '#c9e5ff' : (active[label][index] ? '#c9e5ff' : '#004b8f'),
        color: on[index] ? '#00182f' : (active[label][index] ? '#00182f' : '#fff')
    }

    function handleClick(item, index) {
        setLoading(true);
        const itemAll = item.name === 'all';
        if (label === 'location') {
            if (itemAll && coachAll) {
                setCalendarView('day');
                setActive(prevActive => ({
                    ...prevActive,
                    view: [true, false]
                }));
            }
            setLocation(item);
        };

        if (label === 'coach') {
            if (itemAll && locationAll) {   
                setCalendarView('day');
                setActive(prevActive => ({
                    ...prevActive,
                    view: [true, false]
                }));
            }
            setCoach(item);
        };
        setActive(prevActive => {
            const newActive = { ...prevActive };
            newActive[label].fill(false);
            newActive[label][index] = true;
            return newActive;
        });
        setTimeout(() => setLoading(false), 1500);
    }

    function handleOnMouse(boolean, index) {
        setOn(prevOnArr => {
            const newOnArr = [...prevOnArr];
            newOnArr[index] = boolean;
            return newOnArr;
        });
    }

    return (
        <>
            <div
                className="dropdown-menu-list-item"
                onClick={() => handleClick(item, index)}
                onMouseEnter={() => handleOnMouse(true, index)}
                onMouseLeave={() => handleOnMouse(false, index)}
                style={itemStyles}
            >
                {item.name}
            </div>
            
        </>
    )
}