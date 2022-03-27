import React from 'react'
import HeaderNav from './HeaderNav'

export default function Header(props) {

    const { breakPoint } = props;
    return (
        <header className="header-flex">
            {
                breakPoint && 
                <div className="header-title">
                    <h1>Class Scheduler</h1>
                </div>
            }
            <HeaderNav />
        </header>
    )
}