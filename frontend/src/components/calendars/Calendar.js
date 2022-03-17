import React from 'react'
import { glowContext } from '../contexts/GlowContext'
import { dataContext } from '../contexts/DataContext'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

export default function Calendar() {
    
    const { location, coach } = React.useContext(dataContext);
    const [ isGlow, setIsGlow ] = React.useState({ day: [], court: [], quarterHour: [] });

    let i = 0;
    let calendarDays = [...Array(7)].map(() => {
        return <CalendarDay day={++i} />
    });

    const calendarStyles = {
        width: coach.name === 'all' ? '100%' : '79%'
    }

    const flexStyles = {
        width: coach.name === 'all' ? '180em' : '99%'
    }

    return (
        <glowContext.Provider value={{ isGlow, setIsGlow }}>
            <ScrollSync>
                <div className="calendar" style={calendarStyles}>
                    <div className="calendar-head-sticky">
                        <ScrollSyncPane>
                            <div className="calendar-head-scroll">
                                <div className="calendar-head-flex" style={flexStyles}>
                                    <div className="calendar-head-empty"></div>
                                    <CalendarHead />
                                </div>
                            </div>
                        </ScrollSyncPane>
                    </div>
                    <ScrollSyncPane>
                        <div className="calendar-body-scroll">
                            <div className="calendar-body-flex" style={flexStyles}>
                                <div className="calendar-time">
                                    <CalendarTime />
                                </div>
                                {calendarDays}
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>
            </ScrollSync>
        </glowContext.Provider>
    )
}