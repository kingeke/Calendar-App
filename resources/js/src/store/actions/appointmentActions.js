import { APPOINTMENTS_DEFAULT, SET_APPOINTMENTS, APPOINTMENT_DEFAULT, SET_APPOINTMENT } from "../reducers/types"
import Axios from "axios"
import { userAPILinks } from "../../routes/ApiLinks"
import { UserAuth } from "../../services/AuthService"
import { showNotification } from "../../components/includes/Notifications"

export const appointmentsDefaultAction = () => {
    return {
        type: APPOINTMENTS_DEFAULT,
    }
}

export const appointmentDefaultAction = () => {
    return {
        type: APPOINTMENT_DEFAULT
    }
}

export const setAppointments = (start, end, view = false) => {
    return (dispatch) => {
        return Axios.get(userAPILinks.appointments, {
            params: {
                start,
                end,
                view
            },
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {
                var data = response.data

                if (data.status == 'success') {
                    return dispatch({
                        type: SET_APPOINTMENTS,
                        appointments: data.appointments
                    })
                }

                else {

                    showNotification(data.message, 'danger')

                    return dispatch({
                        type: APPOINTMENTS_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger')

                return dispatch({
                    type: APPOINTMENTS_DEFAULT
                })
            }
        )
    }
}

export const setAppointment = (uuid, appointment = false) => {
    return (dispatch) => {
        if (appointment) {
            return dispatch({
                type: SET_APPOINTMENT,
                appointment
            })
        }
        else {
            return Axios.get(`${userAPILinks.appointment}/${uuid}`, UserAuth.getHeaders()).then(
                response => {
                    var data = response.data

                    if (data.status == 'success') {
                        return dispatch({
                            type: SET_APPOINTMENT,
                            appointment: data.appointment
                        })
                    }

                    else {

                        showNotification(data.message, 'danger')

                        return dispatch({
                            type: APPOINTMENT_DEFAULT
                        })
                    }
                }
            ).catch(
                error => {
                    let message = (error.response && error.response.data && error.response.data.message) || error.message

                    showNotification(message, 'danger')

                    return dispatch({
                        type: APPOINTMENT_DEFAULT
                    })
                }
            )
        }
    }
}