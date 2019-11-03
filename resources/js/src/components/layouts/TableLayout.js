import $ from 'jquery';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PropTypes from 'prop-types';
import React from 'react';
require('jszip');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');

export default function TableLayout({ columns, children, loading = false }) {
    return (
        <div className="table-responsive">
            <table className='table table-striped table-bordered nowrap' ref={(ref) => setTableRef(ref, loading)} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

TableLayout.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool
}

const setTableRef = (ref, loading) => {
    if (!loading) {
        $(ref).dataTable().fnDestroy()
    }
    if (!$.fn.DataTable.isDataTable(ref) && loading) {
        $(ref).dataTable({
            dom: 'lfBrtipHF',
            buttons: [
                'excel', 'pdf', 'print'
            ],
            paging: true,
            ordering: true
        })
    }
}