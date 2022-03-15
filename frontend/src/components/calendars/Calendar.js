import React from 'react'
import { glowContext } from '../contexts/GlowContext'
import { dataContext } from '../contexts/DataContext'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

export default function Calendar() {
    
    const { location, coach } = React.useContext(dataContext);
    const [ isGlow, setIsGlow ] = React.useState({ day: [], halfHour: [] });

    let i = 0;
    let calendarDays = [...Array(7)].map(() => {
        return (
            <div className={`calendar-day day-${++i}`}>
                <CalendarDay day={i} />
            </div>
        )
    });

    const styles = {
        width: coach === 'all' ? '100%' : '79%'
    }

    return (
        <glowContext.Provider value={{ isGlow, setIsGlow }}>
            <ScrollSync>
                <div className="calendar" style={styles}>
                    <div className="calendar-head-sticky">
                        <ScrollSyncPane>
                            <div className="calendar-head-scroll">
                                <div className="calendar-head-flex">
                                    <div className="calendar-head-empty"></div>
                                    <CalendarHead />
                                </div>
                            </div>
                        </ScrollSyncPane>
                    </div>
                    <ScrollSyncPane>
                        <div className="calendar-body-scroll">
                            <div className="calendar-body-flex">
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