import formReducer from "../../../store/reducers/formReducer"
import { FORM_SUCCESS, FORM_ERROR, FORM_DEFAULT } from "../../../store/reducers/types"

describe('<formReducer />', () => {
    it('should return the default state', () => {
        var state = formReducer(undefined, {})

        expect(state).toEqual({
            formError: false,
            formSuccess: false
        })
    })

    it('should return formSuccess when received FORM_SUCCESS', () => {

        var message = fakerStatic.lorem.word()

        var state = formReducer(undefined, {
            type: FORM_SUCCESS,
            message
        })

        expect(state).toEqual({
            formError: false,
            formSuccess: message
        })
    })

    it('should return formError when received FORM_ERROR', () => {

        var message = fakerStatic.lorem.word()

        var state = formReducer(undefined, {
            type: FORM_ERROR,
            message
        })

        expect(state).toEqual({
            formError: message,
            formSuccess: false
        })
    })

    it('should return default state when received FORM_DEFAULT', () => {

        var state = formReducer(undefined, {
            type: FORM_DEFAULT
        })

        expect(state).toEqual({
            formError: false,
            formSuccess: false
        })
    })
})
