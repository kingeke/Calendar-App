import appointmentReducer from "../../../store/reducers/appointmentReducer"
import { SET_APPOINTMENTS, SET_APPOINTMENT, APPOINTMENTS_DEFAULT, APPOINTMENT_DEFAULT } from "../../../store/reducers/types"

describe('<appointmentReducer />', () => {
    it('should return the default state', () => {
        var state = appointmentReducer(undefined, {})

        expect(state).toEqual({
            appointments: false,
            appointment: false
        })
    })

    it('should return the appointments if received SET_APPOINTMENTS', () => {

        var appointments = [
            {
                title: fakerStatic.lorem.word(),
                description: fakerStatic.lorem.paragraph(),
                start: '2019-10-11 11:00:00',
                end: '2019-10-11 12:00:00',
                completed: false
            },
            {
                title: fakerStatic.lorem.word(),
                description: fakerStatic.lorem.paragraph(),
                start: '2019-10-11 11:00:00',
                end: '2019-10-11 12:00:00',
                completed: false
            }
        ]

        var state = appointmentReducer(undefined, {
            type: SET_APPOINTMENTS,
            appointments
        })

        expect(state).toEqual({
            appointments,
            appointment: false
        })

        expect(state.appointments.length).toEqual(appointments.length)
    })

    it('should set appointments to false if received APPOINTMENTS_DEFAULT', () => {

        var state = appointmentReducer(undefined, {
            type: APPOINTMENTS_DEFAULT
        })

        expect(state).toEqual({
            appointments: false,
            appointment: false
        })
    })

    it('should return the appointment if received SET_APPOINTMENT', () => {

        var appointment = {
            title: fakerStatic.lorem.word(),
            description: fakerStatic.lorem.paragraph(),
            start: '2019-10-11 11:00:00',
            end: '2019-10-11 12:00:00',
            completed: false
        }

        var state = appointmentReducer(undefined, {
            type: SET_APPOINTMENT,
            appointment
        })

        expect(state).toEqual({
            appointments: false,
            appointment
        })
    })

    it('should set appointment to false if received APPOINTMENT_DEFAULT', () => {

        var state = appointmentReducer(undefined, {
            type: APPOINTMENT_DEFAULT
        })

        expect(state).toEqual({
            appointments: false,
            appointment: false
        })
    })
})
