import Axios from "axios";
import { FORM_ERROR, FORM_SUCCESS, FORM_DEFAULT } from "../reducers/types";
import { UserAuth } from "../../services/AuthService";
import { showNotification } from "../../components/includes/Notifications";

export const formAction = (method, url, data) => {
    return (dispatch) => {

        return Axios({
            method,
            url,
            data,
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {
                let data = response.data

                if (data.status === 'success') {

                    showNotification(data.message, 'success')

                    dispatch({
                        type: FORM_SUCCESS,
                        message: data.message
                    })
                }
                else {

                    showNotification(data.message, 'danger')

                    dispatch({
                        type: FORM_ERROR,
                        message: data.message
                    })
                }

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        ).catch(
            error => {

                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger')

                dispatch({
                    type: FORM_ERROR,
                    message: message
                })

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        )
    }
}