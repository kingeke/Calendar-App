import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { ConfirmPassword, FormLayout, Password } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
import { Hr } from '../../layouts/CustomLayouts'
require('parsleyjs')

export class ChangePassword extends Component {

    formRef = React.createRef()

    initialState = {
        currentPassword: '',
        password: '',
        password_confirmation: '',
        formSending: false
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

    handleSubmit = (e) => {
        var form = $(this.formRef.current).parsley()

        if (e.isTest || form.isValid()) {
            e.preventDefault()
            this.setState({
                formSending: true
            }, () => {
                this.props.changePassword(this.state)
            })
        }
    }

    render() {
        return (
            <MainLayout>
                <section className="container">
                    <div className="text-center">
                        <h4>Change Password.</h4>
                        <Hr />
                    </div>
                    <FormLayout>
                        <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                            <Password password={this.state.currentPassword} onChange={this.handleChange} id={false} label="Current Password" name="currentPassword" placeholder="Enter your current password" />

                            <Password password={this.state.password} onChange={this.handleChange} placeholder="Enter your new password" />

                            <ConfirmPassword password_confirmation={this.state.password_confirmation} onChange={this.handleChange} placeholder="Re-enter your new password" />

                            <CustomButton type="submit" icon='check' loading={this.state.formSending} title='Change' variant='success' onClick={this.handleSubmit} />
                        </Form>
                    </FormLayout>
                </section>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (data) => dispatch(formAction('put', userAPILinks.changePassword, data))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

ChangePassword.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    changePassword: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)