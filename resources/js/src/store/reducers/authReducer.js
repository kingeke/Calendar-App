import { AUTH_DEFAULT, SET_USER } from "./types"

const initialState = {
    userLoading: true,
    user: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DEFAULT:
            return authDefault(state)
        case SET_USER:
            return setUser(state, action)
        default:
            return state
    }
}

const setUser = (state, action) => {
    return {
        ...state,
        userLoading: false,
        user: action.user
    }
}

const authDefault = (state) => {
    return {
        ...state,
        userLoading: true,
        user: false
    }
}

export default authReducer