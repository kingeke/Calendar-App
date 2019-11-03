import { ViewAppointments } from "../../../../components/pages/appointments/ViewAppointments"
import { FormatDate } from "../../../../components/assets/Parsers"
import { Loader } from "../../../../components/layouts/CustomLayouts"
import AppointmentsTableComponent from "../../../../components/layouts/AppointmentsTableComponent"

describe('<ViewAppointments />', () => {

    var props = {
        match: {
            params: {
                day: '2019-09-11'
            }
        },
        history: {
            push: jest.fn()
        },
        appointments: false
    }

    var setAppointments = jest.fn()

    it('should render the component correctly', () => {
        const component = shallow(<ViewAppointments {...props} setAppointments={setAppointments} />)

        expect(component.find('h2').text()).toEqual('Appointments on <FormatDate />')
        expect(component.find(Loader).exists()).toBeTruthy()
        expect(setAppointments).toBeCalled()
        expect(setAppointments).toBeCalledTimes(1)
        expect(component.find(AppointmentsTableComponent).exists()).toBeFalsy()
    })

    it('should render no appointments when appointments are null', () => {

        const component = shallow(<ViewAppointments {...props} setAppointments={setAppointments} />)

        component.state().showTable = true
        component.instance().forceUpdate()
        expect(component.find('p').text()).toEqual('No Appointments here')
    })

    it('should render AppointmentsTableComponent when appointments exists', () => {

        props.appointments = [
            {
                completed: 0,
                description: "Facere reprehenderit u",
                end: "2019-11-05 11:00:00",
                start: "2019-11-05 09:00:00",
                title: "et",
                uuid: "bd91de21-4888-456a-ac79-997d364c4ea4",
            }
        ]

        const component = shallow(<ViewAppointments {...props} setAppointments={setAppointments} />)

        component.state().showTable = true
        component.instance().forceUpdate()
        expect(component.find(AppointmentsTableComponent).exists()).toBeTruthy()
    })

    it('should call handleEdit when the button is clicked', () => {

        var setAppointment = jest.fn()

        const component = shallow(<ViewAppointments {...props} setAppointments={setAppointments} setAppointment={setAppointment} />)

        component.state().showTable = true

        const handleEdit = jest.spyOn(component.instance(), 'handleEdit')
        component.instance().forceUpdate()

        component.find(AppointmentsTableComponent).props().handleEdit(props.appointments[0])

        expect(handleEdit).toBeCalled()
        expect(handleEdit).toBeCalledTimes(1)
        expect(setAppointment).toBeCalled()
        expect(setAppointment).toBeCalledTimes(1)
    })

    it('should call handleDelete when the button is clicked', () => {

        var deleteAppointment = jest.fn()

        const component = shallow(<ViewAppointments {...props} setAppointments={setAppointments} deleteAppointment={deleteAppointment} />)

        component.state().showTable = true

        jest.spyOn(window, 'confirm').mockReturnValue(true)

        const handleDelete = jest.spyOn(component.instance(), 'handleDelete')
        component.instance().forceUpdate()

        component.find(AppointmentsTableComponent).prop('handleDelete')()

        expect(handleDelete).toBeCalled()
        expect(handleDelete).toBeCalledTimes(1)
        expect(deleteAppointment).toBeCalled()
        expect(deleteAppointment).toBeCalledTimes(1)

        expect(component.state('formSending')).toBeTruthy()
        expect(component.state('showTable')).toBeFalsy()
    })
})
