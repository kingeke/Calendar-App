import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeLinks } from '../../routes/NavLinks';
import { FormatDate } from '../assets/Parsers';
import PropTypes from 'prop-types'

export default function AppointmentsTableComponent({ appointment, fields, actions, serial, handleEdit, handleDelete, withTime, timeOnly }) {

    const data = fields.map((value, index) => {
        return (
            <td key={index} className={value == 'actions' ? 'text-center' : ''}>

                {value === 's_n' && serial}

                {value === 'title' && appointment.title}

                {value === 'description' && appointment.description}

                {value === 'start' && <FormatDate date={appointment.start} withTime={withTime} timeOnly={timeOnly} />}

                {value === 'end' && <FormatDate date={appointment.end} withTime={withTime} timeOnly={timeOnly} />}

                {value === 'completed' && (appointment.completed ? 'Yes' : 'No')}

                {
                    value == 'actions' && (!appointment.completed ?
                        actions.map((value, index) => {
                            return (
                                <span key={index}>
                                    {
                                        value == 'edit' &&
                                        <NavLink key={index} exact to={`${routeLinks.appointment}/edit/${appointment.uuid}`} onClick={() => (handleEdit(appointment))}><i className="fas fa-edit text-info mr-2" title="Edit Appointment"></i></NavLink>
                                    }
                                    {
                                        value == 'delete' &&
                                        <span key={index} onClick={() => handleDelete(appointment.uuid)}><i className="fas fa-trash text-danger mx-2" title="Delete Appointment"></i></span>
                                    }
                                </span>
                            )
                        })
                        :
                        <span key={index}>
                            <p>Completed</p>
                        </span>)
                }
            </td>
        )
    })

    return (
        <tr>
            {data}
        </tr>
    )
}

AppointmentsTableComponent.propTypes = {
    appointment: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.string),
    serial: PropTypes.number,
    day: PropTypes.string,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}