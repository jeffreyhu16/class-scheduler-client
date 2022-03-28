import React from 'react'
import Calendar from './calendars/Calendar'
import { renderContext } from './contexts/RenderContext';
import Sidebar from './Sidebar'

export default function Main(props) {

    const { breakPoint } = props;
    const { dayView, coachAll } = React.useContext(renderContext);

    return (
        <main className="main-flex">
            {(dayView || !coachAll) && breakPoint[1080] && <Sidebar />}
            <Calendar breakPoint={breakPoint}/>
        </main>
    )
}