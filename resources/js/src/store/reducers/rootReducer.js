import { combineReducers } from 'redux'
import formReducer from './formReducer'
import authReducer from './authReducer'
import appointmentReducer from './appointmentReducer'

const rootReducer = combineReducers({
    app: combineReducers({
        form: formReducer,
        appointments: appointmentReducer
    }),
    users: combineReducers({
        auth: authReducer
    }),
})

export default rootReducer