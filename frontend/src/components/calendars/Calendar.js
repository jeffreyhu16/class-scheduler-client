import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'
import { glowContext } from '../contexts/GlowContext'
import { dataContext } from '../contexts/DataContext'
import { renderContext } from '../contexts/RenderContext'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import CalendarCopy from './CalendarCopy'

export default function Calendar(props) {
    
    const { breakPoint } = props;
    const { location } = React.useContext(dataContext);
    const { weekView, coachAll } = React.useContext(renderContext);
    const [ isGlow, setIsGlow ] = React.useState({ day: [], court: [], quarterHour: [] });

    let i = 0;
    let calendarDays = [...Array(7)].map(() => {
        return <CalendarDay day={++i} />
    });

    const camberwell = location.name === 'Camberwell';
    const wideview = weekView && coachAll && camberwell;

    const calendarStyles = {
        width: wideview || !breakPoint[1080] ? '100%' : '81%'
    }
    
    const flexStyles = {
        width: wideview ? '180em' : '100%'
    }

    return (
        <glowContext.Provider value={{ isGlow, setIsGlow }}>
            <ScrollSync>
                <div className="calendar" style={calendarStyles}>
                    <div className="calendar-head-sticky" >
                        <ScrollSyncPane>
                            <div className="calendar-head-scroll">
                                <div className="calendar-head-flex" style={flexStyles}>
                                    <CalendarCopy/>
                                    <CalendarHead />
                                </div>
                            </div>
                        </ScrollSyncPane>
                    </div>
                    <ScrollSyncPane>
                        <div className="calendar-body-scroll" >
                            <div className="calendar-body-flex" style={flexStyles}>
                                <div className="calendar-time">
                                    <CalendarTime />
                                </div>
                                {weekView ? calendarDays : <CalendarDay/>}
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>
            </ScrollSync>
        </glowContext.Provider>
    )
}