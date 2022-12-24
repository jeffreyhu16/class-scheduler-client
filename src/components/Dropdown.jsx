import React from 'react'
import DropdownItem from './DropdownItem'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Dropdown(props) {

    const { label, listData, active, setActive } = props;
    const [ isOn, setIsOn ] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let listItems, i = 0;
    if (listData) {
        listItems = listData.map((item, i) => {
            return (
                <DropdownItem 
                    key={i}
                    label={label} 
                    item={item}
                    active={active}
                    setActive={setActive}
                    setLoading={setLoading}
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
            <Backdrop open={loading} sx={{ zIndex: '5' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}