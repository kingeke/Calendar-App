import { FORM_DEFAULT, FORM_ERROR, FORM_SUCCESS } from "./types";

const initialState = {
    formError: false,
    formSuccess: false
}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORM_DEFAULT:
            return formDefault(state)
        case FORM_ERROR:
            return formError(state, action)
        case FORM_SUCCESS:
            return formSuccess(state, action)
        default:
            return state
    }
}

const formSuccess = (state, action) => {
    return {
        ...state,
        formError: false,
        formSuccess: action.message,
    }
}

const formError = (state, action) => {
    return {
        ...state,
        formSuccess: false,
        formError: action.message
    }
}

const formDefault = (state) => {
    return {
        ...state,
        formError: false,
        formSuccess: false,
    }
}

export default formReducer