import React from 'react'
import HeaderNav from './HeaderNav'

export default function Header() {

    return (
        <header>
            <div className="header-container">
                <div className="header-title">
                    <h1>Class Scheduler</h1>
                </div>
                <HeaderNav />
            </div>
        </header>
    )
}