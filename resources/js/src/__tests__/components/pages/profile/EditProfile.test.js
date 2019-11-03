import { EditProfile } from "../../../../components/pages/profile/EditProfile"
import { Name, Email } from "../../../../components/layouts/Forms"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<EditProfile />', () => {
    var mockState = {
        name: fakerStatic.name.findName(),
        email: fakerStatic.internet.email(),
    }

    it('should render the component correctly', () => {

        const component = shallow(
            <EditProfile
                user={mockState}
            />
        )

        expect(component.state().name).toEqual(mockState.name)
        expect(component.state().email).toEqual(mockState.email)
        expect(component.find(Name).exists()).toBeTruthy()
        expect(component.find(Email).exists()).toBeTruthy()
        expect(component.find(CustomButton).find({ title: 'Update' }).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(<EditProfile user={mockState} />)

        var name = component.find(Name)
        var email = component.find(Email)

        expect(name.exists()).toBeTruthy()
        expect(email.exists()).toBeTruthy()

        simulateChange(name, mockState.name, 'name')
        simulateChange(email, mockState.email, 'email')

        expect(component.state().name).toEqual(mockState.name)
        expect(component.state().email).toEqual(mockState.email)
    })

    it('should show loading button when form is sending', () => {
        const component = shallow(
            <EditProfile user={mockState} />
        )
        component.state().formSending = true
        component.instance().forceUpdate()
        expect(component.find(CustomButton).find({ title: 'Update' }).props().loading).toBeTruthy()
    })

    it('should call handleSubmit function when the button is clicked', () => {

        var update = jest.fn()

        const component = shallow(
            <EditProfile
                user={mockState}
                update={update}
            />
        )

        const handleSubmit = jest.spyOn(component.instance(), 'handleSubmit')

        component.instance().forceUpdate()

        var updateBtn = component.find(CustomButton).find({ title: 'Update' })

        updateBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(update).toBeCalled()
        expect(update).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })
})
