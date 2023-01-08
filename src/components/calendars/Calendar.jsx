import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarTime from './CalendarTime'
import CalendarDay from './CalendarDay'
import { dataContext } from '../../contexts/DataContext'
import { renderContext } from '../../contexts/RenderContext'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import CalendarCopy from './CalendarCopy'

export default function Calendar(props) {

    const { breakPoint } = props;
    const { coach, location } = React.useContext(dataContext);
    const { weekView, coachAll, printMode } = React.useContext(renderContext);

    let i = 0;
    let calendarDays = [...Array(7)].map((k, i) => {
        return <CalendarDay key={i} day={++i} />
    });

    const camberwell = location.name === 'Camberwell';
    const wideView = weekView && coachAll;
    const scrollView = weekView && coachAll && camberwell;

    let flexView;
    if (scrollView) flexView = '180em';
    else if (!breakPoint[780]) flexView = '41.2875em';
    else flexView = '100%';

    const styles = {
        calendar: {
            width: wideView || !breakPoint[1280] ? '100%' : 'calc(100% - 300px)'
        },
        label: {
            fontSize: printMode ? '1.25rem' : '1rem'
        },
        flexView: {
            width: flexView
        }
    }

    return (
        <ScrollSync>
            <div id="calendar" className="calendar" style={styles.calendar}>
                <div className="coach-label-container">
                    <div className="coach-label" style={styles.label}>{coach.name}</div>
                </div>
                <div className="calendar-head-sticky" >
                    <ScrollSyncPane>
                        <div className="calendar-head-scroll">
                            <div className="calendar-head-flex" style={styles.flexView}>
                                <CalendarHead />
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>
                <div className="calendar-body-group">
                    <div className="calendar-time">
                        <CalendarTime />
                    </div>
                    <ScrollSyncPane>
                        <div className="calendar-body-scroll" >
                            <div className="calendar-body-flex" style={styles.flexView}>
                                {weekView ? calendarDays : <CalendarDay />}
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>
            </div>
        </ScrollSync>
    )
}