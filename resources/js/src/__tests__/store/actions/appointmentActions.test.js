import * as Notifications from "../../../components/includes/Notifications"
import { appointmentDefaultAction, appointmentsDefaultAction, setAppointment, setAppointments } from "../../../store/actions/appointmentActions"
import appointmentReducer from "../../../store/reducers/appointmentReducer"
import { APPOINTMENTS_DEFAULT, APPOINTMENT_DEFAULT, SET_APPOINTMENT, SET_APPOINTMENTS } from "../../../store/reducers/types"

describe('<appointmentActions />', () => {

    var store = mockStore(appointmentReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(appointmentReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<appointmentDefaultAction />', () => {
        it('should return with type APPOINTMENT_DEFAULT', () => {

            var action = appointmentDefaultAction()

            expect(action).toEqual({
                type: APPOINTMENT_DEFAULT
            })
        })
    })

    describe('<appointmentsDefaultAction />', () => {
        it('should return with type APPOINTMENTS_DEFAULT', () => {
            var action = appointmentsDefaultAction()

            expect(action).toEqual({
                type: APPOINTMENTS_DEFAULT
            })
        })
    })

    describe('<setAppointments />', () => {

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

        it('should return with appointments when received 200', () => {

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        appointments
                    }
                })
            })

            return store.dispatch(setAppointments('2019-09-11 00:00:00', '2019-09-11 23:59:59', 'month')).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_APPOINTMENTS])

                expect(newActions).toEqual([{
                    type: SET_APPOINTMENTS,
                    appointments
                }])
            })
        })

        it('should return false if status is not success and show user the error message notification', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(setAppointments('2019-09-11 00:00:00', '2019-09-11 23:59:59', 'month')).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([APPOINTMENTS_DEFAULT])

                expect(newActions).toEqual([{
                    type: APPOINTMENTS_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })

        it('should return false if status code is not 200 and show the user the error message', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(setAppointments('2019-09-11 00:00:00', '2019-09-11 23:59:59', 'month')).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([APPOINTMENTS_DEFAULT])

                expect(newActions).toEqual([{
                    type: APPOINTMENTS_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })

    describe('<setAppointment />', () => {
        var appointment = {
            title: fakerStatic.lorem.word(),
            description: fakerStatic.lorem.paragraph(),
            start: '2019-10-11 11:00:00',
            uuid: fakerStatic.lorem.word(),
            end: '2019-10-11 12:00:00',
            completed: false
        }

        it('should return with appointment when received 200 and a uuid', () => {

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        appointment
                    }
                })
            })

            return store.dispatch(setAppointment(appointment.uuid)).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_APPOINTMENT])

                expect(newActions).toEqual([{
                    type: SET_APPOINTMENT,
                    appointment
                }])
            })
        })

        it('should return with appointment when received an appointment', () => {
            store.dispatch(setAppointment(null, appointment))
            var newActions = store.getActions()
            var dispatchTypes = newActions.map((a => a.type))

            expect(dispatchTypes).toEqual([SET_APPOINTMENT])

            expect(newActions).toEqual([{
                type: SET_APPOINTMENT,
                appointment
            }])
        })

        it('should return false if status is not success and show the user the error message', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(setAppointment(appointment.uuid)).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([APPOINTMENT_DEFAULT])

                expect(newActions).toEqual([{
                    type: APPOINTMENT_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })

        it('should return false if status code is not 200 and show the user the error message', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(setAppointment(appointment.uuid)).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([APPOINTMENT_DEFAULT])

                expect(newActions).toEqual([{
                    type: APPOINTMENT_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })

})
