import React from 'react'
import Header from './Header'
import Main from './Main'
import { weekContext } from './contexts/weekContext';

export default function App() {

    const [startOfWeek, setStartOfWeek] = React.useState();

    React.useEffect(() => {
        fetch('/date/getStartOfWeek')
        .then(res => res.json())
        .then(data => setStartOfWeek(data))
        .catch(err => console.log(err));
    }, []); 

    return (
        <weekContext.Provider value={{ startOfWeek, setStartOfWeek }}>
            <Header/>
            <Main/>
        </weekContext.Provider>
    )
}