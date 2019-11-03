import { APPOINTMENTS_DEFAULT, APPOINTMENT_DEFAULT, SET_APPOINTMENT, SET_APPOINTMENTS } from "./types"

const initialState = {
    appointment: false,
    appointments: false
}

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPOINTMENTS_DEFAULT:
            return appointmentsDefault(state)
        case APPOINTMENT_DEFAULT:
            return appointmentDefault(state)
        case SET_APPOINTMENTS:
            return setAppointments(state, action)
        case SET_APPOINTMENT:
            return setAppointment(state, action)
        default:
            return state
    }
}

const setAppointments = (state, action) => {
    return {
        ...state,
        appointments: action.appointments
    }
}

const setAppointment = (state, action) => {
    return {
        ...state,
        appointment: action.appointment
    }
}

const appointmentsDefault = (state) => {
    return {
        ...state,
        appointments: false
    }
}

const appointmentDefault = (state) => {
    return {
        ...state,
        appointment: false
    }
}

export default appointmentReducer