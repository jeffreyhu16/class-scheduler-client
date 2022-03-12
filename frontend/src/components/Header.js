import React from 'react'
import HeaderNav from './HeaderNav'

export default function Header() {

    return (
        <div className="header-container">
            <header className="header-flex">
                <div className="header-title">
                    <h1>Class Scheduler</h1>
                </div>
                <HeaderNav />
            </header>
        </div>
    )
}