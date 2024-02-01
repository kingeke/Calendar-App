export const endpoint = window.location.origin
export const api = `${endpoint}/backend`

export const userAPILinks = {
    login: `${api}/auth/login`,
    logOut: `${api}/auth/log-out`,
    register: `${api}/auth/sign-up`,
    fetchProfile: `${api}/profile`,
    changePassword: `${api}/profile/change-password`,
    updateProfile: `${api}/profile/update-profile`,
    appointments: `${api}/appointments`,
    appointment: `${api}/appointment`,
}