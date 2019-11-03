import $ from 'jquery'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { CustomButton, DatePickerInput } from '../../layouts/CustomInputs'
import { Hr } from '../../layouts/CustomLayouts'
import { Description, EndDate, FormLayout, StartDate, Title } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

export class CreateAppointment extends Component {

    formRef = React.createRef()

    day = this.props.match.params.day
    time = this.props.match.params.time

    initialState = {
        day: this.day,
        formSending: false,
        title: '',
        description: '',
        start: this.time ? moment(this.day).add(this.time, 'hours').format('YYYY-MM-DD HH:mm:ss') : '',
        end: '',
        startSelected: this.time || '',
        endSelected: ''
    }

    state = this.initialState

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (this.formRef.current) {
                    $(this.formRef.current).parsley().reset();
                };
                if (nextProps.formSuccess) {
                    this.setState(this.initialState)
                }
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
                this.props.createAppointment(this.state)
            })
        }
    }


    render() {

        const { description, endSelected, formSending, startSelected, title, day } = this.state

        return (
            <MainLayout>
                <section className="container">
                    <div className="text-center">
                        <h4>Create Appointment.</h4>
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
                            <Form.Group>
                                <CustomButton
                                    type="submit"
                                    icon="calendar-alt"
                                    title="Create"
                                    loading={formSending}
                                    variant="success"
                                    onClick={this.handleSubmit}
                                />
                            </Form.Group>
                        </Form>
                    </FormLayout>
                </section>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAppointment: (data) => dispatch(formAction('post', `${userAPILinks.appointment}/create`, data))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

CreateAppointment.propTypes = {
    createAppointment: PropTypes.func,
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointment)