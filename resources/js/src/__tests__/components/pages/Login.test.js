import { Login } from "../../../components/pages/Login"
import { Email, Password } from "../../../components/layouts/Forms"
import { CustomButton } from "../../../components/layouts/CustomInputs"
import { NavLink } from 'react-router-dom'
import { routeLinks } from "../../../routes/NavLinks"
import { UserAuth } from "../../../services/AuthService"

describe('<Login />', () => {

    var mockState = {
        email: fakerStatic.internet.email(),
        password: fakerStatic.random.word(),
    }

    it('should render the component correctly', () => {
        const component = shallow(<Login />)

        expect(component.find('h4').text()).toEqual('Welcome back.')
        expect(component.find('p').first().text()).toEqual('Hope you know your credentials.')
        expect(component.find(Email).exists()).toBeTruthy()
        expect(component.find(Password).exists()).toBeTruthy()
        expect(component.find(CustomButton).find({ title: 'Login' }).exists()).toBeTruthy()
        expect(component.find(CustomButton).find({ title: 'Use dummy account' }).exists()).toBeTruthy()
        expect(component.find(NavLink).exists()).toBeTruthy()
        expect(component.find(NavLink).find({ to: routeLinks.signUp }).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(<Login />)

        var email = component.find(Email)
        var password = component.find(Password)

        expect(email.exists()).toBeTruthy()
        expect(password.exists()).toBeTruthy()

        simulateChange(email, mockState.email, 'email')
        simulateChange(password, mockState.password, 'password')

        expect(component.state().email).toEqual(mockState.email)
        expect(component.state().password).toEqual(mockState.password)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(
            <Login />
        )
        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Login' }).props().loading).toBeTruthy()

    })

    it('should call handleSubmit function when the button is clicked', () => {

        var login = jest.fn()

        const component = shallow(
            <Login
                login={login}
            />
        )

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var loginBtn = component.find(CustomButton).find({ title: 'Login' })

        loginBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(login).toBeCalled()
        expect(login).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })

    it('should call handleDummyAccount function when the button is clicked', () => {

        var login = jest.fn()

        const component = shallow(
            <Login
                login={login}
            />
        )

        const handleDummyAccount = jest.spyOn(component.instance(), 'handleDummyAccount')

        component.instance().forceUpdate()

        var dummyAccountBtn = component.find(CustomButton).find({ title: 'Use dummy account' })

        dummyAccountBtn.simulate('click')

        expect(handleDummyAccount).toBeCalled()
        expect(handleDummyAccount).toBeCalledTimes(1)
        expect(login).toBeCalled()
        expect(login).toBeCalledTimes(1)
        expect(component.state().email).toEqual('user@email.com')
        expect(component.state().password).toEqual('password')
        expect(component.state().formSending).toBeTruthy()
        expect(component.state().formSending).toBeTruthy()
    })

    it('should push user to dashboard if they are authenticated already', () => {

        UserAuth.isAuthenticated = true

        var history = {
            push: jest.fn()
        }

        shallow(
            <Login
                history={history}
            />
        )

        expect(history.push).toBeCalled()
        expect(history.push).toBeCalledTimes(1)
    })
})
