import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import { FormatNumber } from '../../assets/Parsers'

export default function MonthView({ headers, tableData, handleCreateAppointment, handleShowAppointments, currentDate }) {
    return (
        <Table responsive="lg" bordered className="calendar-table month mt-3">
            <thead>
                <tr>
                    {
                        headers && headers.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableData && tableData.length > 0 && tableData.map((columns, index) => (
                        <tr key={index}>
                            {
                                columns && columns.length > 0 && columns.map((day, index) => (
                                    <td key={index}>
                                        <p className={`text-right ${handleTdClassName(day.date, currentDate)}`} onClick={() => day.date && handleCreateAppointment(day.date)} title={day.date && 'Create an appointment?'}>
                                            <span className={day.date ? 'date' : ''}>{day.date}</span>
                                        </p>
                                        {
                                            day.appointments &&
                                            <small title="View Appointments" className="appointments bg-info text-white rounded p-2" onClick={() => handleShowAppointments(day.date)}><FormatNumber number={day.appointments} /> Appointment(s)</small>
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

const handleTdClassName = (day, currentDate) => {
    return `${moment(currentDate).format('YYYY MMMM')} ${day}` === moment().format('YYYY MMMM D') ? 'active' : ''
}

MonthView.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.array),
    currentDate: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    handleCreateAppointment: PropTypes.func,
    handleShowAppointments: PropTypes.func,
}