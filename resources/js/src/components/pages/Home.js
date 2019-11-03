import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userAPILinks } from '../../routes/ApiLinks'
import { routeLinks } from '../../routes/NavLinks'
import { setAppointment, setAppointments } from '../../store/actions/appointmentActions'
import { formAction } from '../../store/actions/formActions'
import { chunk, range, WorkHours } from '../assets/Parsers'
import { showNotification } from '../includes/Notifications'
import MainLayout from '../layouts/MainLayout'
import ActionButtons from './appointments/ActionButtons'
import AppointmentsView from './calendarViews/AppoinmentsView'
import MonthView from './calendarViews/MonthView'
import WeekView from './calendarViews/WeekView'
import PropTypes from 'prop-types'

export class Home extends Component {

    initialState = {
        loading: false,
        calenderView: 'month',
        start: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        headers: moment.weekdays(),
        currentDate: moment.now(),
        tableData: [],
        tableReady: false,
        workHours: WorkHours,
    }

    state = this.initialState

    componentDidMount = () => {
        this.setState({
            calenderView: sessionStorage.getItem('calenderView') || 'month'
        }, () => {
            this.handleCalendarViewChange(this.state.calenderView)
        })
    }

    componentWillUnmount = () => {
        sessionStorage.setItem('calenderView', this.state.calenderView)
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.appointments) {
            this.setState({
                loading: false
            }, () => {
                this.handleAppointments(nextProps.appointments)
            })
        }
        if (nextProps.formSuccess) {
            this.fetchAppointments()
        }
    }

    handleAppointments = (appointments = this.props.appointments) => {

        var tableData = this.state.tableData
        var tableHeaders = this.state.headers

        if (this.state.calenderView === 'month') {
            Object.keys(appointments).map((date) => {
                tableData.map((rows, rowIndex) => {
                    rows.map((day, dateIndex) => {
                        if (day.date == date) {
                            tableData[rowIndex][dateIndex].appointments = appointments[date].length
                        }
                    })
                })
            })
        }

        else if (this.state.calenderView === 'week') {
            Object.keys(appointments).map((day) => {
                var dayIndex = tableHeaders.indexOf(day)
                if (dayIndex != -1) {
                    appointments[day].map((appointment, appointmentIndex) => {

                        var range = []

                        for (var i = 0; i <= moment(appointment.end).diff(moment(appointment.start), 'hours'); i++) {
                            range.push(moment(appointment.start).add(i, 'hours').format('h A'))
                        }

                        range.map((time, index) => {
                            tableData.map((rows, rowIndex) => {
                                rows.map((columns) => {
                                    if (columns === time) {
                                        if (index === 0) {
                                            tableData[rowIndex][dayIndex + 1] = appointments[day][appointmentIndex]
                                        }
                                        else {
                                            tableData[rowIndex][dayIndex + 1] = { class: 'active' }
                                        }
                                    }
                                })
                            })
                        })
                    })
                }
            })
        }

        else {
            tableData = appointments
        }

        this.setState({
            tableData,
            tableReady: true
        })
    }

    fetchAppointments = () => {
        this.setState({
            loading: true,
            tableReady: false
        }, () => {
            this.props.setAppointments(this.state.start, this.state.end, this.state.calenderView)
        })
    }

    //buttons
    handleNextButton = () => {

        var calenderView = this.state.calenderView

        if (calenderView === 'week') {
            this.setState({
                start: moment(this.state.currentDate).add(7, 'days').startOf('week').format('YYYY-MM-DD HH:mm:ss'),
                end: moment(this.state.currentDate).add(7, 'days').endOf('week').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment(this.state.currentDate).add(7, 'days')
            }, () => {
                var headers = []

                for (var i = 0; i <= 6; i++) {
                    headers.push(moment(this.state.currentDate).startOf('week').add(i, 'day').format('ddd DD/MM'))
                }

                this.setState({
                    headers
                }, () => {
                    this.handleWeekView()
                })
            })
        }

        else {
            this.setState({
                start: moment(this.state.currentDate).add(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                end: moment(this.state.currentDate).add(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment(this.state.currentDate).add(1, 'month')
            }, () => {
                if (calenderView === 'month') {
                    this.handleMonthView()
                }
                else {
                    this.fetchAppointments()
                }
            })
        }

    }

    handlePreviousButton = () => {
        var calenderView = this.state.calenderView

        if (calenderView === 'week') {

            this.setState({
                start: moment(this.state.currentDate).subtract(7, 'days').startOf('week').format('YYYY-MM-DD HH:mm:ss'),
                end: moment(this.state.currentDate).subtract(7, 'days').endOf('week').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment(this.state.currentDate).subtract(7, 'days')
            }, () => {
                var headers = []

                for (var i = 0; i <= 6; i++) {
                    headers.push(moment(this.state.currentDate).startOf('week').add(i, 'day').format('ddd DD/MM'))
                }

                this.setState({
                    headers
                }, () => {
                    this.handleWeekView()
                })
            })
        }

        else {

            this.setState({
                start: moment(this.state.currentDate).subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                end: moment(this.state.currentDate).subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment(this.state.currentDate).subtract(1, 'month')
            }, () => {
                if (calenderView === 'month') {
                    this.handleMonthView()
                } else {
                    this.fetchAppointments()
                }
            })
        }
    }

    handleTodayButton = () => {
        var calenderView = this.state.calenderView

        if (calenderView === 'week') {

            this.setState({
                start: moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'),
                end: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment.now()
            }, () => {

                var headers = []

                for (var i = 0; i <= 6; i++) {
                    headers.push(moment(this.state.currentDate).startOf('week').add(i, 'day').format('ddd DD/MM'))
                }

                this.setState({
                    headers
                }, () => {
                    this.handleWeekView()
                })
            })
        }

        else {
            this.setState({
                start: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
                currentDate: moment.now()
            }, () => {
                if (calenderView === 'month') {
                    this.handleMonthView()
                } else {
                    this.fetchAppointments()
                }
            })
        }
    }

    handleCalendarViewChange = (calenderView) => {

        this.setState({
            start: moment(this.state.currentDate).startOf(calenderView === 'week' ? 'week' : 'month').format('YYYY-MM-DD HH:mm:ss'),
            end: moment(this.state.currentDate).endOf(calenderView === 'week' ? 'week' : 'month').format('YYYY-MM-DD HH:mm:ss')
        }, () => {

            var headers

            if (calenderView === 'week') {

                headers = []

                for (var i = 0; i <= 6; i++) {
                    headers.push(moment(this.state.currentDate).startOf('week').add(i, 'day').format('ddd DD/MM'))
                }
            }
            else {
                headers = moment.weekdays()
            }

            this.setState({
                headers,
                tableReady: false,
                calenderView
            }, () => {
                if (calenderView === 'month') {
                    this.handleMonthView()
                }
                else if (calenderView === 'week') {
                    this.handleWeekView()
                }
                else {
                    this.fetchAppointments()
                }
            })
        })
    }

    //table views
    handleMonthView = (date = this.state.currentDate) => {

        var startOfMonthIndex = this.state.headers.indexOf(moment(date).startOf('month').format('dddd'))

        var tableData = range(moment(date).daysInMonth())

        for (var i = 0; i <= startOfMonthIndex - 1; i++) {
            tableData.unshift('')
        }

        for (var i = 0; i <= tableData.length - 1; i++) {
            tableData[i] = { date: tableData[i] }
        }

        tableData = chunk(tableData, 7)

        while (tableData[tableData.length - 1].length != 7) {
            tableData[tableData.length - 1].push({ date: '' })
        }

        this.setState({
            tableData
        }, () => {
            this.fetchAppointments()
        })
    }

    handleWeekView = () => {

        var tableData = range(8 * this.state.workHours.length, false, {})

        tableData[0] = this.state.workHours[0].label

        var index = 0;
        var weekTimesIndex = 1;

        for (var i = 0; i <= tableData.length - 1; i++) {
            if (i === index + 8) {
                index += 8
                tableData[i] = this.state.workHours[weekTimesIndex].label
                weekTimesIndex++;
            }
        }

        tableData = chunk(tableData, 8)

        this.setState({
            tableData
        }, () => {
            this.fetchAppointments()
        })
    }

    //appointments
    handleCreateAppointment = (date, time = false) => {
        if (date) {
            if (this.state.calenderView === 'month') {
                var day = moment(this.state.currentDate).startOf('month').add(date - 1, 'days').format('YYYY-MM-DD')

                if (moment(day).isBefore(moment(), 'date')) {
                    showNotification("You can't create an appointment on a day that has passed.", 'danger')
                }
                else {
                    this.props.history.push(`${routeLinks.appointment}/create/${day}`)
                }
            }
            else if (this.state.calenderView === 'week') {

                var selectedDate = date.split(' ')[1]

                var selectedMonth = selectedDate.split('/')[1]

                var selectedDay = selectedDate.split('/')[0]

                selectedMonth = parseInt(moment(this.state.currentDate).format('MM')) - parseInt(selectedMonth)

                var selectedTime = WorkHours.find((items) => {
                    return items.label == time
                })

                selectedDate = moment(this.state.currentDate).subtract(selectedMonth, 'months').startOf('month').add(selectedDay - 1, 'days').add(selectedTime.value, 'hours')

                if (selectedDate.isBefore(moment())) {
                    showNotification("You can't create an appointment on a day that has passed.", 'danger')
                }

                else {
                    this.props.history.push(`${routeLinks.appointment}/create/${moment(selectedDate).format('YYYY-MM-DD')}/${selectedTime.value}`)
                }
            }
        }
    }

    handleEdit = (appointment) => {
        this.props.setAppointment(appointment)

        this.props.history.push(`${routeLinks.appointment}/edit/${appointment.uuid}`)
    }

    handleDelete = (uuid) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            this.props.deleteAppointment(uuid)
            this.fetchAppointments()
        }
    }

    handleShowAppointments = (date) => {

        var day = moment(this.state.currentDate).startOf('month').add(date - 1, 'days').format('YYYY-MM-DD')

        this.props.history.push(`${routeLinks.appointments}/${day}`)
    }

    render() {

        const { headers, currentDate, tableData, calenderView, loading, tableReady } = this.state

        const { user } = this.props

        return (
            <MainLayout>
                <h4>Welcome to your calendar {user.name}.</h4>
                <p>Click on a day to create an appointment</p>

                <ActionButtons
                    calenderView={calenderView}
                    currentDate={currentDate}
                    handleCalendarViewChange={this.handleCalendarViewChange}
                    handleNextButton={this.handleNextButton}
                    handlePreviousButton={this.handlePreviousButton}
                    handleTodayButton={this.handleTodayButton}
                    loading={loading}
                />

                {
                    calenderView === 'month' && tableReady &&
                    <MonthView
                        handleCreateAppointment={this.handleCreateAppointment}
                        handleShowAppointments={this.handleShowAppointments}
                        currentDate={currentDate}
                        headers={headers}
                        tableData={tableData}
                    />
                }
                {
                    calenderView === 'week' && tableReady &&
                    <WeekView
                        currentDate={currentDate}
                        headers={headers}
                        tableData={tableData}
                        handleCreateAppointment={this.handleCreateAppointment}
                        handleEdit={this.handleEdit}
                    />
                }
                {
                    calenderView === 'appointments' && tableReady &&
                    <AppointmentsView
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        showTable={tableReady}
                        tableData={tableData}
                    />
                }
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAppointments: (start, end, view) => dispatch(setAppointments(start, end, view)),
        setAppointment: (appointment) => dispatch(setAppointment(null, appointment)),
        deleteAppointment: (uuid) => dispatch(formAction('delete', `${userAPILinks.appointment}/${uuid}`)),
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        appointments: app.appointments.appointments,
        user: users.auth.user,
        formSuccess: app.form.formSuccess
    }
}

Home.propTypes = {
    user: PropTypes.object,
    appointments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.array]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    setAppointments: PropTypes.func,
    setAppointment: PropTypes.func,
    deleteAppointment: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)