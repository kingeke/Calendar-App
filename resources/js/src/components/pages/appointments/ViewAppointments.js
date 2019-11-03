import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../../routes/ApiLinks'
import { routeLinks } from '../../../routes/NavLinks'
import { setAppointment, setAppointments } from '../../../store/actions/appointmentActions'
import { formAction } from '../../../store/actions/formActions'
import { FormatDate } from '../../assets/Parsers'
import AppointmentsTableComponent from '../../layouts/AppointmentsTableComponent'
import { Loader } from '../../layouts/CustomLayouts'
import MainLayout from '../../layouts/MainLayout'
import TableLayout from '../../layouts/TableLayout'

export class ViewAppointments extends Component {

    day = this.props.match.params.day
    start = moment(this.day).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    end = moment(this.day).endOf('day').format('YYYY-MM-DD HH:mm:ss')

    state = {
        formSending: false,
        showTable: false
    }

    componentDidMount = () => {
        this.props.setAppointments(this.start, this.end)
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (nextProps.formSuccess) {
                    this.props.setAppointments(this.start, this.end)
                }
            })
        }
        if (nextProps.appointments != this.props.appointments) {
            this.setState({
                showTable: true
            })
        }
    }

    handleEdit = (appointment) => {
        this.props.setAppointment(appointment)
    }

    handleDelete = (uuid) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            this.setState({
                formSending: true,
                showTable: false
            }, () => {
                this.props.deleteAppointment(uuid)
            })
        }
    }

    render() {

        const { appointments } = this.props

        const { formSending, showTable } = this.state

        const columns = ['S/N', 'Actions', 'Title', 'Start', 'End', 'Description']

        const fields = ['s_n', 'actions', 'title', 'start', 'end', 'description']

        const actions = ['edit', 'delete']

        return (
            <MainLayout show={showTable}>
                <Card>
                    <Card.Header>
                        <h2>Appointments on <FormatDate date={this.day} /></h2>
                    </Card.Header>
                    <div className="p-3">
                        <Loader show={formSending} position="left" />
                    </div>
                    <Card.Body>
                        {
                            showTable && appointments && appointments.length > 0 ?
                                <TableLayout loading={showTable} columns={columns}>
                                    {
                                        appointments.map((appointment, index) => (
                                            <AppointmentsTableComponent
                                                handleDelete={this.handleDelete}
                                                handleEdit={this.handleEdit}
                                                actions={actions}
                                                appointment={appointment}
                                                fields={fields}
                                                day={this.day}
                                                timeOnly
                                                serial={index + 1}
                                                key={index}
                                            />
                                        ))
                                    }
                                </TableLayout>
                                :
                                <div className="text-center">
                                    <p>No Appointments here</p>
                                </div>
                        }
                    </Card.Body>
                </Card>
            </MainLayout >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAppointments: (start, end) => dispatch(setAppointments(start, end)),
        deleteAppointment: (uuid) => dispatch(formAction('delete', `${userAPILinks.appointment}/${uuid}`)),
        setAppointment: (appointment) => (dispatch(setAppointment(null, appointment)))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        appointments: app.appointments.appointments,
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

ViewAppointments.propTypes = {
    appointments: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    setAppointments: PropTypes.func,
    setAppointment: PropTypes.func,
    deleteAppointment: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAppointments)