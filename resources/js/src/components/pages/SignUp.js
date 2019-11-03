import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userAPILinks } from '../../routes/ApiLinks'
import { routeLinks } from '../../routes/NavLinks'
import { UserAuth } from '../../services/AuthService'
import { formAction } from '../../store/actions/formActions'
import { CustomButton } from '../layouts/CustomInputs'
import { Hr } from '../layouts/CustomLayouts'
import { Email, FormLayout, Name, Password } from '../layouts/Forms'
import MainLayout from '../layouts/MainLayout'
require('parsleyjs')

export class SignUp extends Component {

    formRef = React.createRef()

    initialState = {
        name: '',
        email: '',
        password: '',
        formSending: false
    }

    state = this.initialState

    componentDidMount = () => {
        if (UserAuth.isAuthenticated) {
            this.props.history.push(routeLinks.index)
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (nextProps.formSuccess) {
                    nextProps.history.push('/login')
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
                this.props.register(this.state)
            })
        }
    }

    render() {
        return (
            <MainLayout>
                <section className="container">
                    <div className="text-center">
                        <h4>Welcome{this.state.name ? ` ${this.state.name}` : ''}, we're glad you're joining us.</h4>
                        <Hr />
                        <p>We just need some details and we'll get you right to your calendar.</p>
                    </div>
                    <FormLayout>
                        <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                            <Name name={this.state.name} onChange={this.handleChange} />
                            <Email email={this.state.email} onChange={this.handleChange} />
                            <Password password={this.state.password} onChange={this.handleChange} />
                            <Form.Group>
                                <CustomButton type="submit" variant="success" icon="check" title="Sign Up" loading={this.state.formSending} onClick={this.handleSubmit} />
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
        register: (data) => dispatch(formAction('post', userAPILinks.register, data))
    }
}

const mapStateToProps = ({ app }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess
    }
}

SignUp.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    register: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)