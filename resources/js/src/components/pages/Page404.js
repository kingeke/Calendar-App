import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../routes/NavLinks'
import MainLayout from '../layouts/MainLayout'

export default function Page404() {
    return (
        <MainLayout>
            <Jumbotron>
                <h1>404 Page Not Found</h1>
                <p>Please use this button to go back to home page.</p>
                <p>
                    <NavLink exact to={routeLinks.index} className="btn btn-primary"><i className="fa fas fa-home"></i> Home</NavLink>
                </p>
            </Jumbotron>
        </MainLayout>
    )
}
