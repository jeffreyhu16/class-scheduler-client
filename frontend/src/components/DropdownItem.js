import React from 'react'
import { dataContext } from './contexts/DataContext'

export default function DropdownItem(props) {
    const { label, item, activeArr, setActiveArr, index } = props;
    const { setLocation, setCoach } = React.useContext(dataContext);
    const [ on, setOn ] = React.useState([]);
    // location All is only available in Daily view //
    const itemStyles = {
        backgroundColor: on[index] ? '#c9e5ff' : (activeArr[index] ? '#c9e5ff' : '#004b8f'),
        color: on[index] ? '#00182f' : (activeArr[index] ? '#00182f' : '#fff')
    }

    function handleClick(name, index) {
        if (label === 'location') setLocation(name);
        if (label === 'coach') setCoach(name);

        setActiveArr(prevActiveArr => {
            const newActiveArr = [...prevActiveArr].fill(false);
            newActiveArr[index] = true;
            return newActiveArr;
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