import { ImportAppointments } from "../../../../components/pages/appointments/ImportAppointments"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<ImportAppointments />', () => {
    it('should render the component correctly', () => {
        const component = shallow(<ImportAppointments />)

        expect(component.find('h4').text()).toEqual('Import Appointments.')
        expect(component.find('p').text()).toEqual('Select file to import or download sample to create.')
        expect(component.find(CustomButton).find({ title: 'Import' }).exists()).toBeTruthy()
        expect(component.find('a').find({ href: '/AppointmentsSample.xlsx' }).exists()).toBeTruthy()
        expect(component.find('a').text()).toEqual(' Sample')
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(<ImportAppointments />)

        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Import' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var importAppointments = jest.fn()

        const component = shallow(<ImportAppointments importAppointments={importAppointments} />)

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        jest.spyOn(window, 'alert').mockImplementation(() => { })

        component.instance().forceUpdate()

        var importAppointmentsBtn = component.find(CustomButton).find({ title: 'Import' })

        component.find('input').simulate('change', { target: { name: 'file', files: ['a file'] } })

        importAppointmentsBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
    })
})
