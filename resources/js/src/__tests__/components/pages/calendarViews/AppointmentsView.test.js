import AppointmentsView from "../../../../components/pages/calendarViews/AppoinmentsView"
import AppointmentsTableComponent from "../../../../components/layouts/AppointmentsTableComponent"

describe('<AppointmenstView />', () => {
    it('should render the component correctly', () => {

        const component = shallow(<AppointmentsView />)

        expect(component.find('p').text()).toEqual("No appointments here")
        expect(component.find(AppointmentsTableComponent).exists()).toBeFalsy()
    })

    it('should render the AppointmentsTableComponent component if tableData has data', () => {

        const component = shallow(
            <AppointmentsView
                tableData={[
                    {
                        title: fakerStatic.lorem.word(),
                        description: fakerStatic.lorem.paragraph(),
                        start: fakerStatic.date.month(),
                        end: fakerStatic.date.month(),
                        completed: false
                    },
                    {
                        title: fakerStatic.lorem.word(),
                        description: fakerStatic.lorem.paragraph(),
                        start: fakerStatic.date.month(),
                        end: fakerStatic.date.month(),
                        completed: false
                    }
                ]}
            />
        )
        expect(component.find(AppointmentsTableComponent).exists()).toBeTruthy()
        expect(component.find(AppointmentsTableComponent).length).toEqual(2)
    })

    it('should call handleEdit function when called', () => {

        var handleEdit = jest.fn()
        const component = shallow(
            <AppointmentsView
                handleEdit={handleEdit}
                tableData={[
                    {
                        title: fakerStatic.lorem.word(),
                        description: fakerStatic.lorem.paragraph(),
                        start: fakerStatic.date.month(),
                        end: fakerStatic.date.month(),
                        completed: false
                    }
                ]}
            />
        )

        component.find(AppointmentsTableComponent).prop('handleEdit')()

        expect(handleEdit).toBeCalled()
        expect(handleEdit).toBeCalledTimes(1)
    })

    it('should call handleDelete function when called', () => {

        var handleDelete = jest.fn()
        const component = shallow(
            <AppointmentsView
                handleDelete={handleDelete}
                tableData={[
                    {
                        title: fakerStatic.lorem.word(),
                        description: fakerStatic.lorem.paragraph(),
                        start: fakerStatic.date.month(),
                        end: fakerStatic.date.month(),
                        completed: false
                    }
                ]}
            />
        )

        component.find(AppointmentsTableComponent).prop('handleDelete')()

        expect(handleDelete).toBeCalled()
        expect(handleDelete).toBeCalledTimes(1)
    })
})
