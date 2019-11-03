import ActionButtons from "../../../../components/pages/appointments/ActionButtons"
import { ButtonGroup, Button } from "react-bootstrap"
import { Loader } from "../../../../components/layouts/CustomLayouts"
import moment from "moment"

describe('<ActionButtons /<', () => {
    it('should render the component correctly', () => {
        const component = shallow(<ActionButtons currentDate={moment('2019-11-03 12:00')} />)

        expect(component.find(ButtonGroup).length).toEqual(2)
        expect(component.find('h4').text()).toEqual('2019 November')
        expect(component.find(Button).first().text()).toEqual('Today')
        expect(component.find(Button).at(1).text()).toEqual('Back')
        expect(component.find(Button).at(2).text()).toEqual('Next')
        expect(component.find(Button).at(3).text()).toEqual('month')
        expect(component.find(Button).at(4).text()).toEqual('week')
        expect(component.find(Button).at(5).text()).toEqual('appointments')
    })

    it('should show loader if loading is true and disable buttons', () => {

        const component = shallow(<ActionButtons loading={true} />)

        expect(component.find(Loader).exists()).toBeTruthy()
        expect(component.find(Button).first().prop('disabled')).toBeTruthy()
        expect(component.find(Button).at(1).prop('disabled')).toBeTruthy()
        expect(component.find(Button).at(2).prop('disabled')).toBeTruthy()
        expect(component.find(Button).at(3).prop('disabled')).toBeTruthy()
        expect(component.find(Button).at(4).prop('disabled')).toBeTruthy()
        expect(component.find(Button).at(5).prop('disabled')).toBeTruthy()
    })

    it('should call handleCalendarViewChange on Button click', () => {

        var handleCalendarViewChange = jest.fn()

        const component = shallow(<ActionButtons handleCalendarViewChange={handleCalendarViewChange} />)

        component.find(Button).at(4).simulate('click')

        expect(handleCalendarViewChange).toBeCalled()
        expect(handleCalendarViewChange).toBeCalledTimes(1)
        expect(handleCalendarViewChange).toBeCalledWith('week')
    })

    it('should call handleNextButton on Button click', () => {

        var handleNextButton = jest.fn()

        const component = shallow(<ActionButtons handleNextButton={handleNextButton} />)

        component.find(Button).at(2).simulate('click')

        expect(handleNextButton).toBeCalled()
        expect(handleNextButton).toBeCalledTimes(1)
    })

    it('should call handlePreviousButton on Button click', () => {

        var handlePreviousButton = jest.fn()

        const component = shallow(<ActionButtons handlePreviousButton={handlePreviousButton} />)

        component.find(Button).at(1).simulate('click')

        expect(handlePreviousButton).toBeCalled()
        expect(handlePreviousButton).toBeCalledTimes(1)
    })

    it('should call handleTodayButton on Button click', () => {

        var handleTodayButton = jest.fn()

        const component = shallow(<ActionButtons handleTodayButton={handleTodayButton} />)

        component.find(Button).first().simulate('click')

        expect(handleTodayButton).toBeCalled()
        expect(handleTodayButton).toBeCalledTimes(1)
    })
})
