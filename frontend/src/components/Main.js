import React from 'react'
import Calendar from './calendars/Calendar'
import Navbar from './Navbar'

export default function Main() {

    return (
        <main>
            <div className="main-page-container">
                <Navbar/>
                <Calendar/>
            </div>
        </main>
    )
}