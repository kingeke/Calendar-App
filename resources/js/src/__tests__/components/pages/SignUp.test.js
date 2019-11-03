import { SignUp } from "../../../components/pages/SignUp"
import { Name, Email, Password } from "../../../components/layouts/Forms"
import { CustomButton } from "../../../components/layouts/CustomInputs"
import { UserAuth } from "../../../services/AuthService"

describe('<SignUp />', () => {
    var mockState = {
        name: fakerStatic.name.findName(),
        email: fakerStatic.internet.email(),
        password: fakerStatic.random.word(),
    }

    it('should render the component correctly', () => {

        const component = shallow(<SignUp />)

        expect(component.find('h4').text()).toEqual("Welcome, we're glad you're joining us.")
        expect(component.find('p').first().text()).toEqual("We just need some details and we'll get you right to your calendar.")
        expect(component.find(Name).exists()).toBeTruthy()
        expect(component.find(Email).exists()).toBeTruthy()
        expect(component.find(Password).exists()).toBeTruthy()
        expect(component.find(CustomButton).find({ title: 'Sign Up' }).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(<SignUp />)

        var name = component.find(Name)
        var email = component.find(Email)
        var password = component.find(Password)

        expect(name.exists()).toBeTruthy()
        expect(email.exists()).toBeTruthy()
        expect(password.exists()).toBeTruthy()

        simulateChange(name, mockState.name, 'name')
        simulateChange(email, mockState.email, 'email')
        simulateChange(password, mockState.password, 'password')

        expect(component.state().name).toEqual(mockState.name)
        expect(component.state().email).toEqual(mockState.email)
        expect(component.state().password).toEqual(mockState.password)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(
            <SignUp />
        )
        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Sign Up' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var register = jest.fn()

        const component = shallow(
            <SignUp
                register={register}
            />
        )

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var signUpBtn = component.find(CustomButton).find({ title: 'Sign Up' })

        signUpBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(register).toBeCalled()
        expect(register).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })

    it('should push user to dashboard if they are authenticated already', () => {

        UserAuth.isAuthenticated = true

        var history = {
            push: jest.fn()
        }

        shallow(
            <SignUp
                history={history}
            />
        )

        expect(history.push).toBeCalled()
        expect(history.push).toBeCalledTimes(1)
    })
})
