import MonthView from "../../../../components/pages/calendarViews/MonthView"
import { Table } from "react-bootstrap"

describe('<MonthView />', () => {
    it('should render the component correctly', () => {

        const component = shallow(<MonthView />)

        expect(component.find(Table).exists()).toBeTruthy()
    })

    it('should call the handleCreateAppointment function when the user clicks on the date element', () => {

        var handleCreateAppointment = jest.fn()

        var tableData = [
            [
                {
                    date: 2
                }
            ]
        ]

        const component = shallow(
            <MonthView
                handleCreateAppointment={handleCreateAppointment}
                tableData={tableData}
            />
        )

        component.find('p').simulate('click')
        expect(handleCreateAppointment).toBeCalled()
        expect(handleCreateAppointment).toBeCalledWith(2)
        expect(handleCreateAppointment).toBeCalledTimes(1)
    })

    it('should call the handleShowAppointments function when the user clicks on the date element', () => {

        var handleShowAppointments = jest.fn()

        var tableData = [
            [
                {
                    date: 2,
                    appointments: 3
                }
            ]
        ]

        const component = shallow(
            <MonthView
                handleShowAppointments={handleShowAppointments}
                tableData={tableData}
            />
        )

        component.find('small').simulate('click')
        expect(handleShowAppointments).toBeCalled()
        expect(handleShowAppointments).toBeCalledWith(2)
        expect(handleShowAppointments).toBeCalledTimes(1)
    })
})
