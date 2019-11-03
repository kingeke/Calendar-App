import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { userAPILinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { SET_USER } from "../reducers/types";

export const userProfile = () => {
    return (dispatch) => {

        let user = UserAuth.getUser()

        if (user) {
            return Axios.get(userAPILinks.fetchProfile, UserAuth.getHeaders()).then(
                response => {
                    let data = response.data

                    if (data.status === 'success') {

                        UserAuth.isAuthenticated = true
                        return dispatch({
                            type: SET_USER,
                            user: data.user
                        })

                    }
                    else {
                        return UserAuth.signOut().then(() => {
                            return dispatch({
                                type: SET_USER,
                                user: false
                            })
                        })
                    }
                }
            ).catch(
                error => {
                    let message = (error.response && error.response.data && error.response.data.message) || error.message

                    showNotification(message, 'danger');

                    return dispatch({
                        type: SET_USER,
                        user: false
                    })
                }
            )
        }
        else {
            return dispatch({
                type: SET_USER,
                user: false
            })
        }
    }
}