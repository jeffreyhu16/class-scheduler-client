import React from 'react'
import { dataContext } from './contexts/dataContext'

export default function DropdownItem(props) {
    const { label, itemName, activeArr, setActiveArr, index } = props;
    const { setLocation, setCoach } = React.useContext(dataContext);

    const itemStyles = {
        backgroundColor: activeArr[index] ? '#c9e5ff' : '#004b8f',
        color: activeArr[index] ? '#00182f' : '#fff'
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

    return (
        <div
            className="dropdown-menu-list-item"
            onClick={() => handleClick(itemName, index)}
            style={itemStyles}
        >
            {itemName}
        </div>
    )
}