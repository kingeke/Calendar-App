import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../routes/NavLinks'
import { UserAuth } from '../../services/AuthService'
import { loginAction } from '../../store/actions/authActions'
import { CustomButton } from '../layouts/CustomInputs'
import { Hr } from '../layouts/CustomLayouts'
import { Email, FormLayout, Password } from '../layouts/Forms'
import MainLayout from '../layouts/MainLayout'
require('parsleyjs')

export class Login extends Component {

    formRef = React.createRef()

    initialState = {
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
        if (nextProps.formError) {
            this.setState({
                formSending: false
            })
        }
        if (nextProps.user) {
            nextProps.history.push(routeLinks.index)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDummyAccount = () => {
        this.setState({
            email: 'user@email.com',
            password: 'password'
        }, () => {
            this.setState({
                formSending: true
            }, () => {
                this.props.login(this.state)
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
                this.props.login(this.state)
            })
        }
    }

    render() {

        return (
            <MainLayout>
                <section className="container">
                    <div className="text-center">
                        <h4>Welcome back.</h4>
                        <Hr />
                        <p>Hope you know your credentials.</p>
                    </div>
                    <FormLayout>
                        <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                            <Email email={this.state.email} onChange={this.handleChange} />
                            <Password password={this.state.password} onChange={this.handleChange} />
                            <Form.Group>
                                <CustomButton block type="submit" icon='sign-in-alt' loading={this.state.formSending} title="Login" variant="success" onClick={this.handleSubmit} />
                                <div className='mt-5 text-center'>
                                    <CustomButton type="button" icon="user" title="Use dummy account" varian="info" onClick={this.handleDummyAccount} />
                                </div>
                            </Form.Group>
                        </Form>
                        <div className="text-center mt-5">
                            <p>Don't have an account ? <NavLink exact to={routeLinks.signUp}>Sign Up Now</NavLink></p>
                        </div>
                    </FormLayout>
                </section>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(loginAction(data))
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        user: users.auth.user
    }
}

Login.propTypes = {
    user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    login: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
