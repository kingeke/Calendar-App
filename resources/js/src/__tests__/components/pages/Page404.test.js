import Page404 from "../../../components/pages/Page404"
import { Jumbotron } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { routeLinks } from "../../../routes/NavLinks"

describe('<Page404 />', () => {
    it('should render the component correctly', () => {
        const component = shallow(<Page404 />)

        expect(component.find(Jumbotron).exists()).toBeTruthy()
        expect(component.find('h1').text()).toEqual('404 Page Not Found')
        expect(component.find('p').first().text()).toEqual('Please use this button to go back to home page.')
        expect(component.find(NavLink).find({ to: routeLinks.index }).exists()).toBeTruthy()
    })
})
