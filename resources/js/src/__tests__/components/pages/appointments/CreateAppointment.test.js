import { CreateAppointment } from "../../../../components/pages/appointments/CreateAppointment"
import { Title, Description, StartDate, EndDate } from "../../../../components/layouts/Forms"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<CreateAppointment />', () => {
    var mockState = {
        title: fakerStatic.lorem.word(),
        description: fakerStatic.lorem.paragraph(),
        start: '2019-09-11 11:00:00',
        end: '2019-09-11 12:00:00',
        startSelected: '11 AM',
        endSelected: '12 AM'
    }

    var props = {
        match: {
            params: {
                day: '2019-09-11',
                time: '11',
            }
        }
    }

    it('should render the component correctly', () => {
        const component = shallow(<CreateAppointment {...props} />)

        expect(component.find('h4').text()).toEqual('Create Appointment.')
        expect(component.find(Title).exists()).toBeTruthy()
        expect(component.find(Description).exists()).toBeTruthy()
        expect(component.find(StartDate).exists()).toBeTruthy()
        expect(component.find(EndDate).exists()).toBeTruthy()
        expect(component.find(CustomButton).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(<CreateAppointment {...props} />)

        var title = component.find(Title)
        var description = component.find(Description)
        var startDate = component.find(StartDate)
        var endDate = component.find(EndDate)

        expect(title.exists()).toBeTruthy()
        expect(description.exists()).toBeTruthy()
        expect(startDate.exists()).toBeTruthy()
        expect(endDate.exists()).toBeTruthy()

        simulateChange(title, mockState.title, 'title')
        simulateChange(description, mockState.description, 'description')
        simulateChange(startDate, 11, 'start')
        simulateChange(endDate, 12, 'end')

        expect(component.state().title).toEqual(mockState.title)
        expect(component.state().description).toEqual(mockState.description)
        expect(component.state().start).toEqual(mockState.start)
        expect(component.state().end).toEqual(mockState.end)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(<CreateAppointment {...props} />)

        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Create' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var createAppointment = jest.fn()

        const component = shallow(<CreateAppointment {...props} createAppointment={createAppointment} />)

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var createAppointmentBtn = component.find(CustomButton).find({ title: 'Create' })

        createAppointmentBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(createAppointment).toBeCalled()
        expect(createAppointment).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })

})
