import { EditAppointment } from "../../../../components/pages/appointments/EditAppointments"
import { Title, Description, StartDate, EndDate } from "../../../../components/layouts/Forms"
import { CustomButton, DatePickerInput } from "../../../../components/layouts/CustomInputs"

describe('<EditAppointment />', () => {
    var mockState = {
        day: '2019-09-12',
        title: fakerStatic.lorem.word(),
        description: fakerStatic.lorem.paragraph(),
        start: '2019-09-12 11:00:00',
        end: '2019-09-12 12:00:00',
        startSelected: '11 AM',
        endSelected: '12 AM'
    }

    var props = {
        match: {
            params: {
                day: '2019-09-11',
                uuid: 'uuid'
            }
        },
        appointment: {
            title: mockState.title,
            description: mockState.description,
            start: mockState.start,
            end: mockState.end
        }
    }

    it('should render the component correctly', () => {
        const component = shallow(<EditAppointment {...props} />)

        expect(component.find('h4').text()).toEqual('Edit Appointment.')
        expect(component.find(DatePickerInput).exists()).toBeTruthy()
        expect(component.find(Title).exists()).toBeTruthy()
        expect(component.find(Description).exists()).toBeTruthy()
        expect(component.find(StartDate).exists()).toBeTruthy()
        expect(component.find(EndDate).exists()).toBeTruthy()
        expect(component.find(CustomButton).exists()).toBeTruthy()
        expect(component.state('day')).toEqual(mockState.day)
        expect(component.state('title')).toEqual(mockState.title)
        expect(component.state('description')).toEqual(mockState.description)
        expect(component.state('start')).toEqual(mockState.start)
        expect(component.state('end')).toEqual(mockState.end)
    })

    it('should update state when an input changes', () => {
        const component = shallow(<EditAppointment {...props} />)

        const handleDayChange = jest.spyOn(component.instance(), 'handleDayChange')

        component.instance().forceUpdate()

        var title = component.find(Title)
        var description = component.find(Description)
        var startDate = component.find(StartDate)
        var endDate = component.find(EndDate)

        expect(title.exists()).toBeTruthy()
        expect(description.exists()).toBeTruthy()
        expect(startDate.exists()).toBeTruthy()
        expect(endDate.exists()).toBeTruthy()

        handleDayChange(mockState.day, 'day')
        simulateChange(title, mockState.title, 'title')
        simulateChange(description, mockState.description, 'description')
        simulateChange(startDate, 11, 'start')
        simulateChange(endDate, 12, 'end')

        expect(component.state().day).toEqual(mockState.day)
        expect(component.state().title).toEqual(mockState.title)
        expect(component.state().description).toEqual(mockState.description)
        expect(component.state().start).toEqual(mockState.start)
        expect(component.state().end).toEqual(mockState.end)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(<EditAppointment {...props} />)

        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Update' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var updateAppointment = jest.fn()

        const component = shallow(<EditAppointment {...props} updateAppointment={updateAppointment} />)

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var updateAppointmentBtn = component.find(CustomButton).find({ title: 'Update' })

        updateAppointmentBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(updateAppointment).toBeCalled()
        expect(updateAppointment).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })

    it('should not render update button if appointment is completed', () => {

        props.appointment.completed = true

        const component = shallow(<EditAppointment {...props} />)

        expect(component.find(CustomButton).exists()).toBeFalsy()
        expect(component.find('p').text()).toEqual('Appointment completed, no further actions required.')
    })

    it('should call setAppointment function when the appointment is not in props', () => {

        props.appointment = false

        var setAppointment = jest.fn()

        shallow(<EditAppointment {...props} setAppointment={setAppointment} />)

        expect(setAppointment).toBeCalled()
        expect(setAppointment).toBeCalledTimes(1)
    })
})