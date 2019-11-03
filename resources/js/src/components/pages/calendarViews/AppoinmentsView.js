import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppointmentsTableComponent from '../../layouts/AppointmentsTableComponent'
import TableLayout from '../../layouts/TableLayout'

export default function AppointmentsView({ tableData, handleDelete, handleEdit, showTable }) {

    const columns = ['S/N', 'Actions', 'Title', 'Start', 'End', 'Description']

    const fields = ['s_n', 'actions', 'title', 'start', 'end', 'description']

    const actions = ['edit', 'delete']

    return (
        <Fragment>
            {
                tableData && tableData.length > 0 ?
                    <TableLayout loading={showTable} columns={columns}>
                        {
                            tableData.map((appointment, index) => (
                                <AppointmentsTableComponent
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    actions={actions}
                                    appointment={appointment}
                                    fields={fields}
                                    serial={index + 1}
                                    key={index}
                                    withTime
                                />
                            ))
                        }
                    </TableLayout>
                    :
                    <div className="text-center border">
                        <p className="my-auto py-3">No appointments here</p>
                    </div>
            }
        </Fragment>
    )
}

AppointmentsView.propTypes = {
    tableData: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.array]),
    day: PropTypes.string,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    showTable: PropTypes.bool
}