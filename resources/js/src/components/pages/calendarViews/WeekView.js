import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import moment from 'moment'

export default function WeekView({ headers, tableData, handleCreateAppointment, handleEdit, currentDate }) {
    return (
        <Table responsive="lg" bordered className="calendar-table week mt-3">
            <thead>
                <tr>
                    <th>Time</th>
                    {
                        headers && headers.map((item, index) => (
                            <th key={index} className={handleThClass(item, currentDate)}>{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableData && tableData.length > 0 && tableData.map((columns, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                columns && columns.length > 0 && columns.map((appointment, columnIndex) => (
                                    <td key={columnIndex} title={handleTitle(appointment)} onClick={() =>
                                        (appointment.title || appointment.class) ?
                                            appointment.title && handleEdit(appointment) :
                                            handleCreateAppointment(headers[columnIndex - 1], tableData[rowIndex][0])
                                    }>
                                        <div className={handleTdClass(appointment)}>
                                            {
                                                columnIndex == 0 && typeof tableData[rowIndex][columnIndex] != 'object' &&
                                                <p>{tableData[rowIndex][columnIndex]}</p>
                                            }
                                            {
                                                appointment.title &&
                                                <p>
                                                    <span className="date">{appointment.title}</span>
                                                </p>
                                            }
                                        </div>
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

const handleThClass = (item, currentDate) => {
    return `${moment(currentDate).format('YYYY')} ${item}` === moment().format('YYYY ddd DD/MM') ? 'active' : ''
}

const handleTitle = (appointment) => {
    return (appointment.title || appointment.class) ? '' : 'Create an appointment?'
}

const handleTdClass = (appointment) => {
    return appointment.title ? 'active' : appointment.class
}

WeekView.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.array),
    currentDate: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    handleCreateAppointment: PropTypes.func,
    handleEdit: PropTypes.func,
}