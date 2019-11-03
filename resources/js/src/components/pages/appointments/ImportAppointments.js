import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { formatAppointments } from '../../assets/Parsers'
import { CustomButton } from '../../layouts/CustomInputs'
import { Hr } from '../../layouts/CustomLayouts'
import MainLayout from '../../layouts/MainLayout'
require('dropify')
require('parsleyjs')

export class ImportAppointments extends Component {

    formRef = React.createRef()
    fileRef

    initialState = {
        file: '',
        formSending: false
    }

    state = this.initialState

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false,
            }, () => {
                if (nextProps.formSuccess) {
                    if (this.formRef.current) {
                        $(this.formRef.current).parsley().reset();
                    }
                    $(this.fileRef).data('dropify').resetPreview();
                    $(this.fileRef).data('dropify').destroy()
                    $(this.fileRef).data('dropify').init()
                    $(this.fileRef).data('dropify').clearButton.trigger('click')
                }
            })
        }
    }

    setFileRef = (ref) => {
        $(ref).dropify()
        this.fileRef = ref
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    handleSubmit = (e) => {

        var form = $(this.formRef.current).parsley({
            errorsContainer: function (el) {
                return el.$element.closest('.form-group');
            },
        });

        if (e.isTest || form.isValid()) {
            e.preventDefault();
            var file = this.state.file

            if (!file) {
                return alert('Please select a file');
            }

            formatAppointments(file).then(
                (response) => {
                    if (response.status == 'success') {
                        this.setState({
                            formSending: true
                        }, () => {
                            this.props.importAppointments({
                                appointments: response.data
                            })
                        })
                    }
                    else {
                        alert("An unknown error occurred")
                    }
                }
            ).catch(
                err => {
                    alert(err.message)
                }
            )
        }
    }

    render() {

        return (
            <MainLayout show>
                <Row className="my-3">
                    <Col lg={{ span: 6, offset: 3 }}>
                        <Col xs={12} className="my-3">
                            <div className="text-center">
                                <h4>Import Appointments.</h4>
                                <Hr />
                                <p>Select file to import or download sample to create.</p>
                            </div>
                            <Form ref={this.formRef}>
                                <Form.Group>
                                    <input name="file" ref={(ref) => (this.setFileRef(ref))} type="file" required data-allowed-file-extensions="xlsx" onChange={this.handleChange} />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <a href="/AppointmentsSample.xlsx" className="btn btn-info btn-block"><i className="fas fa-fw fa-download"></i> Sample</a>
                                    </Col>
                                    <Col>
                                        <CustomButton block type="submit" icon='upload' loading={this.state.formSending} title="Import" variant='success' onClick={this.handleSubmit} />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Col>
                </Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        importAppointments: (data) => dispatch(formAction('post', userAPILinks.appointments, data))
    }
}

ImportAppointments.propTypes = {
    importAppointments: PropTypes.func,
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportAppointments)
