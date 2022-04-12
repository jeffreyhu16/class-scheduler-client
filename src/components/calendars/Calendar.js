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
    const { location } = React.useContext(dataContext);
    const { weekView, coachAll } = React.useContext(renderContext);

    let i = 0;
    let calendarDays = [...Array(7)].map(() => {
        return <CalendarDay day={++i} />
    });

    const camberwell = location.name === 'Camberwell';
    const wideView = weekView && coachAll;
    const scrollView = weekView && coachAll && camberwell;

    let flexView;
    if (scrollView) flexView = '180em';
    else if (!breakPoint[780]) flexView = '41.2875em';
    else flexView = '100%';

    const calendarStyles = {
        width: wideView || !breakPoint[1280] ? '100%' : 'calc(100% - 300px)'
    }

    const flexStyles = {
        width: flexView
    }

    return (
        <ScrollSync>
            <div className="calendar" style={calendarStyles}>
                <CalendarCopy />
                <div className="calendar-head-sticky" >
                    <ScrollSyncPane>
                        <div className="calendar-head-scroll">
                            <div className="calendar-head-flex" style={flexStyles}>
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
                            <div className="calendar-body-flex" style={flexStyles}>
                                {weekView ? calendarDays : <CalendarDay />}
                            </div>
                        </div>
                    </ScrollSyncPane>
                </div>

            </div>
        </ScrollSync>
    )
}