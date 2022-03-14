import React from 'react'
import Header from './Header'
import Main from './Main'
import { dataContext } from './contexts/dataContext';

export default function App() {

    const [ startOfWeek, setStartOfWeek ] = React.useState();
    const [ location, setLocation ] = React.useState();
    const [ coach, setCoach ] = React.useState();

    React.useEffect(() => {
        fetch('/date/startOfWeek')
        .then(res => res.json())
        .then(data => setStartOfWeek(data))
        .catch(err => console.log(err));
    }, []); 

    return (
        <dataContext.Provider value={{ 
            startOfWeek, 
            setStartOfWeek,
            location,
            setLocation,
            coach,
            setCoach
        }}>
            <Header/>
            <Main/>
        </dataContext.Provider>
    )
}