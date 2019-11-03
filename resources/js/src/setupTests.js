import '@babel/polyfill';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import Faker from 'faker';
import moxios from 'moxios';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from 'sinon';

//set the default serializer for jest to be the from enzyme-to-json
//this produces an easier to read for humans
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

//React 16 enzyme adapter
configure({ adapter: new Adapter() })

//make enzyme functions available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.moxios = moxios;
global.fakerStatic = Faker
global.mockStore = configureStore([thunk])
global.renderConnectComponent = (component, store) => (
    <Provider store={store}>
        <Router>
            {component}
        </Router>
    </Provider>
)
global.simulateChange = (item, value, name) => {
    item.simulate('change', {
        target: {
            value,
            name
        }
    })
}

global.testStore = (initialState) => {
    return createStore(initialState, applyMiddleware(thunk))
}