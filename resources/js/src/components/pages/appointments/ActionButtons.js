import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import { Loader } from '../../layouts/CustomLayouts'

export default function ActionButtons({ handleCalendarViewChange, handleNextButton, handlePreviousButton, handleTodayButton, currentDate, calenderView, loading }) {

    var calenderViews = ['month', 'week', 'appointments']

    return (
        <Row className="my-5">
            <Col lg={4} className="mb-3">
                <ButtonGroup>
                    <Button disabled={loading} variant="outline-dark" onClick={handleTodayButton}>Today</Button>
                    <Button disabled={loading} variant="outline-dark" onClick={handlePreviousButton}>Back</Button>
                    <Button disabled={loading} variant="outline-dark" onClick={handleNextButton}>Next</Button>
                </ButtonGroup>
            </Col>
            <Col lg={4} className="text-lg-center mb-3">
                <h4>{moment(currentDate).format('YYYY MMMM')}</h4>
            </Col>
            <Col lg={4} className="text-lg-right">
                <ButtonGroup>
                    {
                        calenderViews.map((view, index) => (
                            <Button
                                disabled={loading}
                                variant="outline-dark"
                                key={index}
                                className={['text-capitalize', calenderView === view ? 'active' : '']}
                                onClick={() => handleCalendarViewChange(view)}
                            >
                                {view}
                            </Button>
                        ))
                    }
                </ButtonGroup>
            </Col>
            <Col sm={12} className="my-3">
                <Loader show={loading} position="left" />
            </Col>
        </Row>
    )
}

ActionButtons.propTypes = {
    handleCalendarViewChange: PropTypes.func,
    handleNextButton: PropTypes.func,
    handlePreviousButton: PropTypes.func,
    handleTodayButton: PropTypes.func,
    currentDate: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    calendarView: PropTypes.string,
    loading: PropTypes.bool
}