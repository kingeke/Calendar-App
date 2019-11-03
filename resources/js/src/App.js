import React, { Component, Fragment } from 'react'
import Routes from './routes/Routes'
import { connect } from 'react-redux'
import { userProfile } from './store/actions/profileActions'
import { Container, Row, Col } from 'react-bootstrap'
import { Loader } from './components/layouts/CustomLayouts'
import PropTypes from 'prop-types'

export class App extends Component {

    componentDidMount = () => {
        this.props.userProfile()
    }

    render() {
        const { userLoading } = this.props

        return (
            <Fragment>
                {
                    !userLoading ? <Routes /> :
                        <Container>
                            <Row className="vh-100">
                                <Col className="my-auto">
                                    <Loader />
                                </Col>
                            </Row>
                        </Container>
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ users }) => {
    return {
        userLoading: users.auth.userLoading
    }
}

App.propTypes = {
    userLoading: PropTypes.bool,
    userProfile: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)