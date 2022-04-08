import React from 'react'
import isEqual from 'lodash'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'
import { dataContext } from '../contexts/DataContext'
import { renderContext } from '../contexts/RenderContext'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import CalendarCopy from './CalendarCopy'

export default function Calendar(props) {

    const { breakPoint } = props;
    const { location } = React.useContext(dataContext);
    const { weekView, coachAll } = React.useContext(renderContext);
    const [isGlow, setIsGlow] = React.useState({
        day: [],
        location: { Camberwell: [], "St Roch's": [] },
        quarterHour: []
    });

    let i = 0;
    let calendarDays = [...Array(7)].map(() => {
        return <CalendarDay day={++i} setIsGlow={setIsGlow} />
    });

    const camberwell = location.name === 'Camberwell';
    const wideView = weekView && coachAll;
    const scrollView = weekView && coachAll && camberwell;

    const calendarStyles = {
        width: wideView || !breakPoint[1280] ? '100%' : '81%'
    }

    const flexStyles = {
        width: scrollView ? '180em' : '100%'
    }

    return (
        <ScrollSync>
            <div className="calendar" style={calendarStyles}>
                <div className="calendar-head-sticky" >
                    <ScrollSyncPane>
                        <div className="calendar-head-scroll">
                            <div className="calendar-head-flex" style={flexStyles}>
                                <CalendarCopy />
                                <CalendarHead isGlow={isGlow} />
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>
                <ScrollSyncPane>
                    <div className="calendar-body-scroll" >
                        <div className="calendar-body-flex" style={flexStyles}>
                            <div className="calendar-time">
                                <CalendarTime isGlow={isGlow} />
                            </div>
                            {weekView ? calendarDays : <CalendarDay setIsGlow={setIsGlow} />}
                        </div>
                    </div>
                </ScrollSyncPane>
            </div>
        </ScrollSync>
    )
}