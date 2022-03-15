import React from 'react'
import HeaderNav from './HeaderNav'

export default function Header() {

    return (
        <header className="header-flex">
            <div className="header-title">
                <h1>Class Scheduler</h1>
            </div>
            <HeaderNav />
        </header>
    )
}