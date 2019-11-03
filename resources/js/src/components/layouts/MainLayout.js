import React, { Fragment } from 'react'
import NavBar from '../assets/NavBar'
import { Container } from 'react-bootstrap'
import { Loader } from './CustomLayouts'

export default function MainLayout({ show = true, children }) {
    return (
        <Fragment>
            <NavBar />
            <Container className="mb-5">
                {
                    show ? children : <Loader />
                }
            </Container>
        </Fragment>
    )
}
