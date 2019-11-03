import { App } from "../App"
import Routes from "../routes/Routes"
import { Loader } from "../components/layouts/CustomLayouts"

describe('<App />', () => {
    it('should render the component correctly', () => {

        var userProfile = jest.fn()

        let component = shallow(
            <App
                userProfile={userProfile}
            />
        )

        expect(userProfile).toBeCalled()
        expect(userProfile).toBeCalledTimes(1)

        expect(component.find(Routes).exists()).toBeTruthy()
    })

    it('should show the loader if a userLoading is true', () => {

        var userProfile = jest.fn()

        let component = shallow(
            <App
                userProfile={userProfile}
                userLoading={true}
            />
        )

        expect(userProfile).toBeCalled()
        expect(userProfile).toBeCalledTimes(1)

        expect(component.find(Routes).exists()).toBeFalsy()

        expect(component.find(Loader).exists()).toBeTruthy()
    })
})
