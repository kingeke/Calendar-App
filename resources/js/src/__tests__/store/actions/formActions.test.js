import * as Notifications from "../../../components/includes/Notifications"
import { formAction } from "../../../store/actions/formActions"
import formReducer from "../../../store/reducers/formReducer"
import { FORM_DEFAULT, FORM_ERROR, FORM_SUCCESS } from "../../../store/reducers/types"

describe('<formActions />', () => {

    var store = mockStore(formReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(formReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<formAction />', () => {
        it('should return formSuccess if the status is 200', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        message
                    }
                })
            })

            return store.dispatch(formAction('get', '/')).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([FORM_SUCCESS, FORM_DEFAULT])

                expect(newActions).toEqual([
                    {
                        type: FORM_SUCCESS,
                        message
                    },
                    {
                        type: FORM_DEFAULT,
                    }
                ])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'success')
            })
        })

        it('should return formError if the status is not success', () => {

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

            return store.dispatch(formAction('get', '/')).then(() => {
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

        it('should return formError if received anything else', () => {

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

            return store.dispatch(formAction('get', '/')).then(() => {
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

})
