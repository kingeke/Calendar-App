export const endpoint = 'http://127.0.0.1:8000'
export const api = `${endpoint}/api`

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