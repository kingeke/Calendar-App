import React, { Fragment } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../routes/NavLinks'
import { connect } from 'react-redux'
import { logOutAction } from '../../store/actions/authActions'
import moment from 'moment'
import PropTypes from 'prop-types'

function NavBar({ user, logOut }) {
    return (
        <Navbar bg="dark" variant="dark" expand="md" className="mb-5">
            <NavLink className="navbar-brand" exact to={routeLinks.index}>Calendar App</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {
                        !user &&
                        <Fragment>
                            <NavLink className="nav-link" exact to={routeLinks.login}>Login</NavLink>
                            <NavLink className="nav-link" exact to={routeLinks.signUp}>Sign Up</NavLink>
                        </Fragment>
                    }
                    {
                        user &&
                        <Fragment>
                            <NavLink className="nav-link" exact to={routeLinks.index}>Home</NavLink>
                            <NavDropdown title="Calendar" alignRight>
                                <NavLink className="dropdown-item" exact to={`${routeLinks.appointment}/create/${moment().format('YYYY-MM-DD')}`}>Create Appointment</NavLink>
                                <NavLink className="dropdown-item" exact to={`${routeLinks.appointments}/import`}>Import Appointments</NavLink>
                            </NavDropdown>
                            <NavDropdown title="Profile" alignRight>
                                <NavLink className="dropdown-item" exact to={routeLinks.editProfile}>Edit Profile</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.changePassword}>Change Password</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.login} onClick={() => logOut()}>Log Out</NavLink>
                            </NavDropdown>
                        </Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOutAction())
    }
}

const mapStateToProps = ({ users }) => {
    return {
        user: users.auth.user
    }
}

NavBar.propTypes = {
    logOut: PropTypes.func,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)