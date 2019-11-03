import $ from 'jquery'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../../routes/ApiLinks'
import { setAppointment } from '../../../store/actions/appointmentActions'
import { formAction } from '../../../store/actions/formActions'
import { CustomButton, DatePickerInput } from '../../layouts/CustomInputs'
import { Hr } from '../../layouts/CustomLayouts'
import { Description, EndDate, FormLayout, StartDate, Title } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

export class EditAppointment extends Component {

    formRef = React.createRef()

    uuid = this.props.match.params.uuid

    initialState = {
        day: moment(this.props.appointment.start).format('YYYY-MM-DD'),
        formSending: false,
        title: this.props.appointment.title,
        description: this.props.appointment.description || '',
        start: this.props.appointment.start,
        end: this.props.appointment.end,
        startSelected: moment(this.props.appointment.start).format('H'),
        endSelected: moment(this.props.appointment.end).format('H'),
    }

    state = this.initialState

    componentDidMount = () => {
        if (!this.props.appointment) {
            this.props.setAppointment(this.uuid)
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (this.formRef.current) {
                    $(this.formRef.current).parsley().reset();
                };
            })
        }
        if (nextProps.appointment != this.props.appointment) {
            this.setState({
                title: nextProps.appointment.title,
                description: nextProps.appointment.description || '',
                start: nextProps.appointment.start,
                end: nextProps.appointment.end,
                startSelected: moment(nextProps.appointment.start).format('H'),
                endSelected: moment(nextProps.appointment.end).format('H'),
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDateChange = (e) => {

        var selectedTime = e.target.value

        var time = moment(this.state.day).startOf('day').add(selectedTime, 'hours').format('YYYY-MM-DD HH:mm:ss');

        this.setState({
            [e.target.name]: time,
            [`${e.target.name}Selected`]: selectedTime
        })
    }

    handleDayChange = (date, name) => {
        this.setState({
            [name]: moment(date).format('YYYY-MM-DD'),
        }, () => {
            this.setState({
                start: moment(this.state.day).add(this.state.startSelected, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                end: moment(this.state.day).add(this.state.endSelected, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            })
        })
    }

    handleSubmit = (e) => {

        var form = $(this.formRef.current).parsley()

        if (e.isTest || form.isValid()) {
            e.preventDefault()
            this.setState({
                formSending: true
            }, () => {
                this.props.updateAppointment(this.uuid, this.state)
            })
        }
    }


    render() {

        const { description, endSelected, formSending, startSelected, title, day } = this.state

        const { appointment } = this.props

        return (
            <MainLayout show={appointment}>
                <section className="container">
                    <div className="text-center">
                        <h4>Edit Appointment.</h4>
                        <Hr />
                    </div>
                    <FormLayout>
                        <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                            <DatePickerInput
                                format="YYYY-MM-DD"
                                handleDateChange={this.handleDayChange}
                                labelName="Appointment Date"
                                name="day"
                                verticalPosition="bottom"
                                value={day}
                                placeholder="Enter appointment date"
                            />
                            <Title
                                onChange={this.handleChange}
                                title={title}
                            />
                            <Description
                                description={description}
                                onChange={this.handleChange}
                            />
                            <Row>
                                <Col sm={6}>
                                    <StartDate
                                        onChange={this.handleDateChange}
                                        start={startSelected}
                                    />
                                </Col>
                                <Col>
                                    <EndDate
                                        onChange={this.handleDateChange}
                                        end={endSelected}
                                    />
                                </Col>
                            </Row>
                            {
                                !appointment.completed ?
                                    <Form.Group>
                                        <CustomButton
                                            type="submit"
                                            icon="calendar-alt"
                                            title="Update"
                                            loading={formSending}
                                            variant="success"
                                            onClick={this.handleSubmit}
                                        />
                                    </Form.Group>
                                    :
                                    <p>Appointment completed, no further actions required.</p>
                            }
                        </Form>
                    </FormLayout>
                </section>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAppointment: (uuid, data) => dispatch(formAction('put', `${userAPILinks.appointment}/${uuid}`, data)),
        setAppointment: (uuid) => dispatch(setAppointment(uuid))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        appointment: app.appointments.appointment
    }
}

EditAppointment.propTypes = {
    setAppointment: PropTypes.func,
    updateAppointment: PropTypes.func,
    appointment: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)