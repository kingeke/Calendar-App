import WeekView from "../../../../components/pages/calendarViews/WeekView"
import { Table } from "react-bootstrap"

describe('<WeekView />', () => {
    it('should render the component correctly', () => {

        const component = shallow(<WeekView />)

        expect(component.find(Table).exists()).toBeTruthy()
        expect(component.find('th').text()).toEqual('Time')
    })

    it('should call the handleCreateAppointment function when the user clicks on the date element', () => {

        var handleCreateAppointment = jest.fn()

        var tableData = [
            [
                '8 AM',
                {}
            ]
        ]

        const component = shallow(
            <WeekView
                headers={['Sun']}
                handleCreateAppointment={handleCreateAppointment}
                tableData={tableData}
            />
        )

        component.find('td').last().simulate('click')
        expect(handleCreateAppointment).toBeCalled()
        expect(handleCreateAppointment).toBeCalledWith("Sun", "8 AM")
        expect(handleCreateAppointment).toBeCalledTimes(1)
    })

    it('should call the handleEdit function when the user clicks on the date element', () => {

        var handleEdit = jest.fn()

        var tableData = [
            [
                '8 AM',
                {
                    title: "sint",
                }
            ]
        ]

        const component = shallow(
            <WeekView
                headers={['Sun']}
                handleEdit={handleEdit}
                tableData={tableData}
            />
        )

        component.find('td').last().simulate('click')
        expect(handleEdit).toBeCalled()
        expect(handleEdit).toBeCalledWith({ title: 'sint' })
        expect(handleEdit).toBeCalledTimes(1)
    })
})
