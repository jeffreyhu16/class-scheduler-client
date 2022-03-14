import React from 'react'
import { dataContext } from './contexts/dataContext'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dropdown(props) {

    const { label } = props;
    const [ on, setOn ] = React.useState(false);
    const [ listItemData, setListItemData ] = React.useState();
    const { setLocation, setCoach } = React.useContext(dataContext);

    // create fetch for location & coach data to display //

    React.useEffect(() => {
        fetch(`/${label}`)
        .then(res => res.json())
        .then(data => setListItemData(data))
        .catch(err => console.log(err));
    }, []); // add dependency for fetching when itemData changes //
    

    let listItems;
    if (listItemData) {
        listItems = listItemData.map(data => {
            return (
                <div className="dropdown-menu-list-item" onClick={() => handleClick(data.name)}>
                    {data.name}
                </div>
            )
        });
    }

    function handleClick(item) {
        if (label === 'location') setLocation(item);
        if (label === 'coach') setCoach(item);
    }

    const styles = {
        opacity: on ? '1' : '0',
        transform: on ? 'translateY(0)' : '',
        pointerEvents: on ? 'auto' : 'none'
    }

    return (
        <div 
            className="dropdown-menu" 
            onClick={() => setOn(prevOn => !prevOn)}
        >
            <div className="dropdown-menu-label">{label}</div>
            <FontAwesomeIcon icon={faCaretDown} className="icon-caret-down" />
            <div className="dropdown-menu-list" style={styles}>
                {listItems}
            </div>
        </div>  
    )
}