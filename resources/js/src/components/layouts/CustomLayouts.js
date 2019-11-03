import React, { Fragment } from 'react';
import { Container, Row, Spinner, Col } from 'react-bootstrap';
import { FormatDate } from '../assets/Parsers';
import { CustomButton } from './CustomInputs';

export const Hr = ({ width = '100px', color = '#f05f40', align = 'center' }) => (
    <hr align={align} style={{ maxWidth: width, borderWidth: '3px', borderColor: color }} />
)

export const Loader = ({ show = true, position = 'center' }) => {
    return (
        <Fragment>
            {
                show &&
                <div className={`d-flex justify-content-${position}`}>
                    <Spinner animation="border" />
                </div>
            }
        </Fragment>
    );
}

export const AppointmentsLayout = ({ appointment, handleEdit, index }) => (
    <Container>
        <p>Title: {appointment.title}</p>
        {
            appointment.description &&
            <p>Description: {appointment.description}</p>
        }
        <p>Starting: <FormatDate date={appointment.start} timeOnly /></p>
        <p>Ending: <FormatDate date={appointment.end} timeOnly /></p>
        <Row className="mb-4">
            <Col>
                <CustomButton
                    type="button"
                    title="Edit"
                    variant="info"
                    onClick={() => handleEdit(appointment, index)}
                />
                <CustomButton
                    type="button"
                    title="Delete"
                    variant="danger"
                    className="mx-3"
                />
                <CustomButton
                    type="button"
                    title="Mark Completed"
                    variant="success"
                />
            </Col>
        </Row>
        <Hr align="left" width="200px" />
    </Container>
)