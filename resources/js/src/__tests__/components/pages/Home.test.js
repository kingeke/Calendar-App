import { Home } from "../../../components/pages/Home"
import MonthView from "../../../components/pages/calendarViews/MonthView"
import WeekView from "../../../components/pages/calendarViews/WeekView"
import AppointmentsView from "../../../components/pages/calendarViews/AppoinmentsView"
import ActionButtons from "../../../components/pages/appointments/ActionButtons"

describe('<Home />', () => {

    var setAppointments = jest.fn()
    const user = {
        name: 'John Doe'
    }

    it('should render the component', () => {

        const component = shallow(
            <Home
                user={user}
                setAppointments={setAppointments}
            />
        )
        expect(component.find(ActionButtons).exists()).toBeTruthy()
        expect(component.find('h4').text()).toEqual(`Welcome to your calendar ${user.name}.`)
        expect(component.find('p').text()).toEqual('Click on a day to create an appointment')
    })

    describe('<MonthView />', () => {
        it('should render the <MonthView /> if calenderView is month and the tableReady is true', () => {

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                />
            )

            component.state().tableReady = true
            component.instance().forceUpdate()

            expect(component.find(MonthView).exists()).toBeTruthy()
            expect(component.find(WeekView).exists()).toBeFalsy()
            expect(component.find(AppointmentsView).exists()).toBeFalsy()
        })

        it('should call the handleCreateAppointment function when it is called', () => {

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                />
            )

            const handleCreateAppointment = jest.spyOn(component.instance(), 'handleCreateAppointment')
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(MonthView).prop('handleCreateAppointment')()
            expect(handleCreateAppointment).toBeCalled()
            expect(handleCreateAppointment).toBeCalledTimes(1)
        })

        it('should call the handleShowAppointments function when it is called', () => {

            var history = {
                push: jest.fn()
            }

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                    history={history}
                />
            )

            const handleShowAppointments = jest.spyOn(component.instance(), 'handleShowAppointments')
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(MonthView).prop('handleShowAppointments')()
            expect(handleShowAppointments).toBeCalled()
            expect(handleShowAppointments).toBeCalledTimes(1)
            expect(history.push).toBeCalled()
            expect(history.push).toBeCalledTimes(1)
        })
    })

    describe('<WeekView />', () => {
        it('should render the <WeekView /> if calenderView is week and the tableReady is true', () => {

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                />
            )

            component.state().calenderView = 'week'
            component.state().tableReady = true
            component.instance().forceUpdate()

            expect(component.find(MonthView).exists()).toBeFalsy()
            expect(component.find(WeekView).exists()).toBeTruthy()
            expect(component.find(AppointmentsView).exists()).toBeFalsy()
        })

        it('should call the handleCreateAppointment function when it is called', () => {

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                />
            )

            const handleCreateAppointment = jest.spyOn(component.instance(), 'handleCreateAppointment')
            component.state().calenderView = 'week'
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(WeekView).prop('handleCreateAppointment')()
            expect(handleCreateAppointment).toBeCalled()
            expect(handleCreateAppointment).toBeCalledTimes(1)
        })

        it('should call the handleEdit function when it is called', () => {

            var setAppointment = jest.fn()

            var history = {
                push: jest.fn()
            }

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                    setAppointment={setAppointment}
                    history={history}
                />
            )

            const handleEdit = jest.spyOn(component.instance(), 'handleEdit')
            component.state().calenderView = 'week'
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(WeekView).prop('handleEdit')({ start: '' })
            expect(handleEdit).toBeCalled()
            expect(handleEdit).toBeCalledTimes(1)
            expect(setAppointment).toBeCalled()
            expect(setAppointment).toBeCalledTimes(1)
            expect(history.push).toBeCalled()
            expect(history.push).toBeCalledTimes(1)
        })
    })

    describe('<AppointmentView />', () => {
        it('should render the <AppointmentView /> if calenderView is appointments and the tableReady is true', () => {

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                />
            )

            component.state().calenderView = 'appointments'
            component.state().tableReady = true
            component.instance().forceUpdate()

            expect(component.find(MonthView).exists()).toBeFalsy()
            expect(component.find(WeekView).exists()).toBeFalsy()
            expect(component.find(AppointmentsView).exists()).toBeTruthy()
        })

        it('should call the handleDelete function when it is called', () => {

            var deleteAppointment = jest.fn()

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                    deleteAppointment={deleteAppointment}
                />
            )

            jest.spyOn(window, 'confirm').mockReturnValue(true)
            const handleDelete = jest.spyOn(component.instance(), 'handleDelete')
            const fetchAppointments = jest.spyOn(component.instance(), 'fetchAppointments')
            component.state().calenderView = 'appointments'
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(AppointmentsView).prop('handleDelete')()
            expect(handleDelete).toBeCalled()
            expect(handleDelete).toBeCalledTimes(1)
            expect(fetchAppointments).toBeCalled()
            expect(fetchAppointments).toBeCalledTimes(1)
            expect(deleteAppointment).toBeCalled()
            expect(deleteAppointment).toBeCalledTimes(1)
        })

        it('should call the handleEdit function when it is called', () => {

            var setAppointment = jest.fn()

            var history = {
                push: jest.fn()
            }

            const component = shallow(
                <Home
                    user={user}
                    setAppointments={setAppointments}
                    setAppointment={setAppointment}
                    history={history}
                />
            )

            const handleEdit = jest.spyOn(component.instance(), 'handleEdit')
            component.state().calenderView = 'appointments'
            component.state().tableReady = true
            component.instance().forceUpdate()
            component.find(AppointmentsView).prop('handleEdit')({ start: '' })
            expect(handleEdit).toBeCalled()
            expect(handleEdit).toBeCalledTimes(1)
            expect(setAppointment).toBeCalled()
            expect(setAppointment).toBeCalledTimes(1)
            expect(history.push).toBeCalled()
            expect(history.push).toBeCalledTimes(1)
        })
    })

    it('should call the handleCalendarViewChange function when it is called', () => {

        const component = shallow(
            <Home
                user={user}
                setAppointments={setAppointments}
            />
        )

        const handleCalendarViewChange = jest.spyOn(component.instance(), 'handleCalendarViewChange')

        component.instance().forceUpdate()
        component.find(ActionButtons).prop('handleCalendarViewChange')('week')

        expect(handleCalendarViewChange).toBeCalled()
        expect(handleCalendarViewChange).toBeCalledTimes(1)
        expect(component.state().calenderView).toEqual('week')
    })

    it('should call the handleNextButton function when it is called', () => {

        const component = shallow(
            <Home
                user={user}
                setAppointments={setAppointments}
            />
        )

        const handleNextButton = jest.spyOn(component.instance(), 'handleNextButton')
        const fetchAppointments = jest.spyOn(component.instance(), 'fetchAppointments')
        const handleMonthView = jest.spyOn(component.instance(), 'handleMonthView')

        component.instance().forceUpdate()
        component.find(ActionButtons).prop('handleNextButton')()

        expect(handleNextButton).toBeCalled()
        expect(handleNextButton).toBeCalledTimes(1)
        expect(fetchAppointments).toBeCalled()
        expect(fetchAppointments).toBeCalledTimes(1)
        expect(handleMonthView).toBeCalled()
        expect(handleMonthView).toBeCalledTimes(1)
    })

    it('should call the handlePreviousButton function when it is called', () => {

        const component = shallow(
            <Home
                user={user}
                setAppointments={setAppointments}
            />
        )

        const handlePreviousButton = jest.spyOn(component.instance(), 'handlePreviousButton')
        const fetchAppointments = jest.spyOn(component.instance(), 'fetchAppointments')
        const handleMonthView = jest.spyOn(component.instance(), 'handleMonthView')

        component.instance().forceUpdate()
        component.find(ActionButtons).prop('handlePreviousButton')()

        expect(handlePreviousButton).toBeCalled()
        expect(handlePreviousButton).toBeCalledTimes(1)
        expect(fetchAppointments).toBeCalled()
        expect(fetchAppointments).toBeCalledTimes(1)
        expect(handleMonthView).toBeCalled()
        expect(handleMonthView).toBeCalledTimes(1)
    })

    it('should call the handleTodayButton function when it is called', () => {

        const component = shallow(
            <Home
                user={user}
                setAppointments={setAppointments}
            />
        )

        const handleTodayButton = jest.spyOn(component.instance(), 'handleTodayButton')
        const fetchAppointments = jest.spyOn(component.instance(), 'fetchAppointments')
        const handleMonthView = jest.spyOn(component.instance(), 'handleMonthView')

        component.instance().forceUpdate()
        component.find(ActionButtons).prop('handleTodayButton')()

        expect(handleTodayButton).toBeCalled()
        expect(handleTodayButton).toBeCalledTimes(1)
        expect(fetchAppointments).toBeCalled()
        expect(fetchAppointments).toBeCalledTimes(1)
        expect(handleMonthView).toBeCalled()
        expect(handleMonthView).toBeCalledTimes(1)
    })
})
