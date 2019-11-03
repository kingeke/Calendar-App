import { authDefault, loginAction, logOutAction, setUser } from "../../../store/actions/authActions"
import authReducer from "../../../store/reducers/authReducer"
import { AUTH_DEFAULT, SET_USER, FORM_DEFAULT, FORM_ERROR } from "../../../store/reducers/types"
import * as Notifications from "../../../components/includes/Notifications"
import * as AuthService from "../../../services/AuthService"

describe('<authActions />', () => {

    var store = mockStore(authReducer(undefined, {}))

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

    describe('<setUser />', () => {
        it('should return with type SET_USER and user', () => {

            var action = setUser(user)

            expect(action).toEqual({
                type: SET_USER,
                user
            })
        })
    })

    describe('<authDefault />', () => {
        it('should return with type AUTH_DEFAULT and user as false', () => {

            var action = authDefault()

            expect(action).toEqual({
                type: AUTH_DEFAULT
            })
        })
    })

    describe('<loginAction />', () => {

        it('should return with user when received 200', () => {

            var authenticateFn = jest.spyOn(AuthService.UserAuth, 'authenticate')

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

            jest.spyOn(window.localStorage.__proto__, 'setItem');
            window.localStorage.__proto__.setItem = jest.fn();

            return store.dispatch(loginAction({ email: user.email, password: 'password' })).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([FORM_DEFAULT, SET_USER])

                expect(newActions).toEqual([
                    {
                        type: FORM_DEFAULT
                    },
                    {
                        type: SET_USER,
                        user
                    }
                ])

                expect(localStorage.setItem).toBeCalled()
                expect(localStorage.setItem).toBeCalledTimes(1)
                expect(localStorage.setItem).toBeCalledWith('user', "{\"token\":\"token\"}")
                expect(AuthService.UserAuth.isAuthenticated).toBeTruthy()
                expect(authenticateFn).toBeCalled()
            })
        })

        it('should return false if status is not success and show user the error message', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(loginAction({ email: user.email, password: 'password' })).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([FORM_ERROR, FORM_DEFAULT])

                expect(newActions).toEqual([
                    {
                        type: FORM_ERROR,
                        message
                    },
                    {
                        type: FORM_DEFAULT,
                    }
                ])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })

        it('should return false if status code is not 200 and show error to user', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(loginAction({ email: user.email, password: 'password' })).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([FORM_ERROR, FORM_DEFAULT])

                expect(newActions).toEqual([
                    {
                        type: FORM_ERROR,
                        message
                    },
                    {
                        type: FORM_DEFAULT,
                    }
                ])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })

    describe('<logOutAction />', () => {

        it('should return with user when received 200', () => {

            var message = fakerStatic.lorem.paragraph()

            var getHeadersFn = jest.spyOn(AuthService.UserAuth, 'getHeaders')
            var signOutFn = jest.spyOn(AuthService.UserAuth, 'signOut')

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        message
                    }
                })
            })

            jest.spyOn(window.localStorage.__proto__, 'removeItem');
            window.localStorage.__proto__.removeItem = jest.fn();

            return store.dispatch(logOutAction()).then(() => {

                expect(getHeadersFn).toBeCalled()
                expect(getHeadersFn).toBeCalledTimes(1)

                expect(signOutFn).toBeCalled()
                expect(signOutFn).toBeCalledTimes(1)

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
                expect(notificationFn).toBeCalledWith(message, 'success')
            })
        })

        it('should return with user when received anything other than 200', () => {

            var getHeadersFn = jest.spyOn(AuthService.UserAuth, 'getHeaders')
            var signOutFn = jest.spyOn(AuthService.UserAuth, 'signOut')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400
                })
            })

            jest.spyOn(window.localStorage.__proto__, 'removeItem');
            window.localStorage.__proto__.removeItem = jest.fn();

            return store.dispatch(logOutAction()).then(() => {

                expect(getHeadersFn).toBeCalled()
                expect(getHeadersFn).toBeCalledTimes(1)

                expect(signOutFn).toBeCalled()
                expect(signOutFn).toBeCalledTimes(1)

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_USER, SET_USER])

                expect(newActions).toEqual([
                    {
                        type: SET_USER,
                        user: false
                    },
                    {
                        type: SET_USER,
                        user: false
                    }
                ])
            })
        })
    })
})
