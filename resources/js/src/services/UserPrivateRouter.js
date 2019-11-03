import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { UserAuth } from './AuthService'

export default function UserPrivateRouter({ component: Component, ...rest }) {

    return (
        <Route {...rest} render={props => {
            if (UserAuth.isAuthenticated) {
                return (
                    <Component {...props} />
                )
            }
            else {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        }


        } />
    )
}