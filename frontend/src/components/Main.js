import React from 'react'
import Calendar from './calendars/Calendar'
import { dataContext } from './contexts/DataContext'
import Sidebar from './Sidebar'

export default function Main() {

    const { location, coach } = React.useContext(dataContext);
    return (
        <main className="main-flex">
            {coach !== 'all' && <Sidebar />}
            <Calendar />
        </main>
    )
}