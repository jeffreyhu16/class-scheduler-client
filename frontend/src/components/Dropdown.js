import React from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dropdown(props) {

    const { label, data } = props;
    const [ on, setOn ] = React.useState(false);

    const listItems = data.map(data => {
        return (
            <div className="dropdown-menu-list-item">
                {data.name}
            </div>
        )
    });

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
            <div>{label}</div>
            <FontAwesomeIcon icon={faCaretDown} className="icon-caret-down" />
            <div className="dropdown-menu-list" style={styles}>
                {listItems}
            </div>
        </div>  
    )
}