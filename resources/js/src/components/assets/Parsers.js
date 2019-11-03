import moment from "moment";
import xlsx from 'xlsx'

export const range = (num, useNumber = true, variable = false) => {
    return Array.from({ length: num }, (x, i) => useNumber ? i + 1 : variable);
}

export const chunk = (arr, len) => {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

export const FormatNumber = ({ number }) => {
    return (
        number.toLocaleString()
    )
}

export const FormatDate = ({ date, withTime = false, timeOnly = false, fromNow = false }) => {
    return (
        fromNow ? moment(date).fromNow() : timeOnly ? moment(date).format('LT') : moment(date).format(`${withTime ? 'Do MMM, YYYY - LT' : 'Do MMM, YYYY'}`)
    )
}

export const WorkHours = [
    { label: '8 AM', value: 8 },
    { label: '9 AM', value: 9 },
    { label: '10 AM', value: 10 },
    { label: '11 AM', value: 11 },
    { label: '12 PM', value: 12 },
    { label: '1 PM', value: 13 },
    { label: '2 PM', value: 14 },
    { label: '3 PM', value: 15 },
    { label: '4 PM', value: 16 },
    { label: '5 PM', value: 17 }
]

export const formatAppointments = (file) => {

    if (!file) {
        alert('Please select a file')
        return
    }

    return new Promise((resolve) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            data = new Uint8Array(data);
            var workbook = xlsx.read(data, { type: 'array' });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var result = xlsx.utils.sheet_to_json(worksheet);
            if (result.length == 0) {
                alert('No data found');
                callback(null);
            }
            var status = sortAppointmentData(result);
            if (status['status'] == 'error') {
                alert(status['message']);
            }
            else if (status['status'] == 'success') {

                var response = {
                    status: 'success',
                    data: JSON.stringify(status['data'])
                }

                resolve(response)
            }
        }

        reader.readAsArrayBuffer(file);
    })
}

function sortAppointmentData(data) {
    var no = 0;
    for (var i in data) {
        try {
            checkData(data[i]['Title'], 'Title', (no + 2));
            checkData(data[i]['Start'], 'Start', (no + 2));
            checkData(data[i]['End'], 'End', (no + 2));

            data[i]['Start'] = parseDate(data[i]['Start'], no);
            data[i]['End'] = parseDate(data[i]['End'], no);

            if (moment(data[i]['Start']).isSameOrAfter(moment(data[i]['End']))) {
                throw `The start date must be before the end date on row ${no + 2}`
            }

            no++;

        }
        catch (err) {
            var status = {
                status: 'error',
                message: err ? err : `Something is wrong on row ${no + 2}, please check`
            }
            return status;
        }
    }

    var status = {
        status: 'success',
        no: no,
        data: data
    }

    return status;
}

const checkData = (data, title, no) => {
    if (data == null) {
        throw `${title} is required on row ${no}, please check`
    }
}

const parseDate = (string, no) => {
    var date = Date.parse(string.replace(/-/g, ' '));
    if (isNaN(date)) {
        throw `The date on row ${no + 2} is invalid, it should be a real date`
    }
    else {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}