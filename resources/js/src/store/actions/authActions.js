import Axios from "axios";
import { SET_USER, AUTH_DEFAULT, FORM_ERROR, FORM_DEFAULT } from "../reducers/types";
import { userAPILinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { showNotification } from "../../components/includes/Notifications";

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const authDefault = () => {
    return {
        type: AUTH_DEFAULT
    }
}

export const loginAction = (data) => {
    return (dispatch) => {
        return Axios.post(userAPILinks.login, data).then(
            response => {
                let data = response.data

                if (data.status === 'success') {

                    const user = {
                        token: data.token
                    }

                    UserAuth.authenticate(user).then(() => {
                        return dispatch({
                            type: SET_USER,
                            user: data.user
                        })
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

export const logOutAction = () => {
    return (dispatch) => {

        var headers = UserAuth.getHeaders()

        return UserAuth.signOut().then(() => {

            dispatch({
                type: SET_USER,
                user: false
            })

            return Axios.post(userAPILinks.logOut, null, headers).then(
                response => {
                    let data = response.data

                    return showNotification(data.message, 'success')
                }
            ).catch(
                error => {
                    return dispatch({
                        type: SET_USER,
                        user: false
                    })
                }
            )
        })
    }
}
