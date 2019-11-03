export const UserAuth = {
    isAuthenticated: false,
    async authenticate(user) {
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(user))
    },
    async signOut() {
        localStorage.removeItem('user')
        this.isAuthenticated = false
    },
    getUser() {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            return user
        }
        return false
    },
    getHeaders() {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            return {
                'headers': {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                }
            }
        }
        return false
    }
}