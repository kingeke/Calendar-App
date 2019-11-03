import authReducer from "../../../store/reducers/authReducer"
import { SET_USER, AUTH_DEFAULT } from "../../../store/reducers/types"

describe('<authReducer />', () => {
    it('should return the default state', () => {
        var state = authReducer(undefined, {})

        expect(state).toEqual({
            userLoading: true,
            user: false
        })
    })

    it('should return the user if received SET_USER', () => {

        var user = {
            name: fakerStatic.name.findName(),
            email: fakerStatic.internet.email(),
            uuid: fakerStatic.lorem.text()
        }

        var state = authReducer(undefined, {
            type: SET_USER,
            user
        })

        expect(state).toEqual({
            userLoading: false,
            user
        })
    })

    it('should return the default state if received AUTH_DEFAULT', () => {

        var state = authReducer(undefined, {
            type: AUTH_DEFAULT
        })

        expect(state).toEqual({
            userLoading: true,
            user: false
        })
    })
})
