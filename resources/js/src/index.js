import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ScrollToTop from './components/includes/ScrollToTop';
import rootReducer from './store/reducers/rootReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './includes/custom.css'
import './includes/parsley.css'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </Provider>
    , document.getElementById('root'));