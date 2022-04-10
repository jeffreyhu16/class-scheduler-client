import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import store from './redux/store'
import { Provider } from 'react-redux'
import './style.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.querySelector('#root')
);
