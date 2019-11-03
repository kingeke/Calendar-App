import { ChangePassword } from "../../../../components/pages/profile/ChangePassword"
import { ConfirmPassword, Password } from "../../../../components/layouts/Forms"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<ChangePassword />', () => {
    var mockState = {
        currentPassword: fakerStatic.random.word(),
        password: fakerStatic.random.word(),
    }

    mockState.password_confirmation = mockState.password

    it('should render the component correctly', () => {

        const component = shallow(<ChangePassword />)

        expect(component.find(Password).exists()).toBeTruthy()
        expect(component.find(Password).length).toEqual(2)
        expect(component.find(ConfirmPassword).exists()).toBeTruthy()
        expect(component.find(CustomButton).find({ title: 'Change' }).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(<ChangePassword />)

        var currentPassword = component.find(Password).first()
        var password = component.find(Password).last()
        var password_confirmation = component.find(ConfirmPassword).last()

        expect(currentPassword.exists()).toBeTruthy()
        expect(password.exists()).toBeTruthy()
        expect(password_confirmation.exists()).toBeTruthy()

        simulateChange(currentPassword, mockState.currentPassword, 'currentPassword')
        simulateChange(password, mockState.password, 'password')
        simulateChange(password_confirmation, mockState.password_confirmation, 'password_confirmation')

        expect(component.state().currentPassword).toEqual(mockState.currentPassword)
        expect(component.state().password).toEqual(mockState.password)
        expect(component.state().password_confirmation).toEqual(mockState.password_confirmation)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(
            <ChangePassword />
        )
        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Change' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var changePassword = jest.fn()

        const component = shallow(
            <ChangePassword
                changePassword={changePassword}
            />
        )

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var changeBtn = component.find(CustomButton).find({ title: 'Change' })

        changeBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(changePassword).toBeCalled()
        expect(changePassword).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })
})
