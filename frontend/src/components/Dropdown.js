import React from 'react'
import DropdownItem from './DropdownItem'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dropdown(props) {

    const { label, listData, active, setActive } = props;
    const [ isOn, setIsOn ] = React.useState(false);
    const [ listItemData, setListItemData ] = React.useState();
    
    // // change default location from all to camberwell //
    // React.useEffect(() => {
    //     fetch(`/${label}`)
    //         .then(res => res.json())
    //         .then(data => setListItemData([ { name: 'all' }, ...data ]))
    //         .catch(err => console.log(err));
    // }, []); // set logic for refetch when new items are added //

    let listItems, i = 0;
    if (listData) {
        listItems = listData.map(item => {
            return (
                <DropdownItem 
                    label={label} 
                    item={item}
                    active={active}
                    setActive={setActive}
                    index={++i}
                />
            )
        });
    }

    const listStyles = {
        opacity: isOn ? '1' : '0',
        transform: isOn ? 'translateY(0)' : 'translateY(-0.4em)',
        pointerEvents: isOn ? 'auto' : 'none'
    }

    return (
        <div
            className="dropdown-menu"
            onClick={() => setIsOn(prev => !prev)}
        >
            <div className="dropdown-menu-label">{label}</div>
            <FontAwesomeIcon icon={faCaretDown} className="icon-caret-down" />
            <div className="dropdown-menu-list" style={listStyles}>
                {listItems}
            </div>
        </div>
    )
}