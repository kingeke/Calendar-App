import * as Notifications from "../../../components/includes/Notifications"
import * as AuthService from "../../../services/AuthService"
import { userProfile } from "../../../store/actions/profileActions"
import authReducer from "../../../store/reducers/authReducer"
import { SET_USER } from "../../../store/reducers/types"

describe('<authActions />', () => {

    var store = mockStore(authReducer(authReducer, {}))

    var user = {
        name: fakerStatic.name.findName(),
        email: fakerStatic.internet.email()
    }

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(authReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<userProfile />', () => {

        it('should return false if localStorage has no user', () => {

            var getUserFn = jest.spyOn(AuthService.UserAuth, 'getUser')

            store.dispatch(userProfile())

            var newActions = store.getActions()

            var dispatchTypes = newActions.map((a => a.type))

            expect(dispatchTypes).toEqual([SET_USER])

            expect(newActions).toEqual([
                {
                    type: SET_USER,
                    user: false
                }
            ])

            expect(getUserFn).toBeCalled()
            expect(getUserFn).toBeCalledTimes(1)
        })

        it('should return with user when received 200', () => {

            jest.spyOn(AuthService.UserAuth, 'getUser').mockReturnValue(true)

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        user,
                        token: 'token'
                    }
                })
            })

            return store.dispatch(userProfile()).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_USER])

                expect(newActions).toEqual([
                    {
                        type: SET_USER,
                        user
                    }
                ])
            })
        })

        it('should return with false when response.status is not success', () => {

            jest.spyOn(AuthService.UserAuth, 'getUser').mockReturnValue(true)

            var signOutFn = jest.spyOn(AuthService.UserAuth, 'signOut')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        user,
                        token: 'token'
                    }
                })
            })

            return store.dispatch(userProfile()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_USER])

                expect(newActions).toEqual([
                    {
                        type: SET_USER,
                        user: false
                    }
                ])

                expect(signOutFn).toBeCalled()
                expect(signOutFn).toBeCalledTimes(1)
            })
        })

        it('should return with false when status is not 200', () => {

            jest.spyOn(AuthService.UserAuth, 'getUser').mockReturnValue(true)

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            var message = fakerStatic.lorem.paragraph()

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 404,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(userProfile()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_USER])

                expect(newActions).toEqual([
                    {
                        type: SET_USER,
                        user: false
                    }
                ])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })
})
