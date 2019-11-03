import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeLinks } from './NavLinks';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Page404 from '../components/pages/Page404';
import SignUp from '../components/pages/SignUp';
import ChangePassword from '../components/pages/profile/ChangePassword';
import EditProfile from '../components/pages/profile/EditProfile';
import UserPrivateRouter from '../services/UserPrivateRouter';
import CreateAppointment from '../components/pages/appointments/CreateAppointment';
import EditAppointments from '../components/pages/appointments/EditAppointments';
import ViewAppointments from '../components/pages/appointments/ViewAppointments';
import ImportAppointments from '../components/pages/appointments/ImportAppointments';

export default function Routes() {
    return (
        <Switch>
            <Route exact path={routeLinks.login} component={Login} />
            <Route exact path={routeLinks.signUp} component={SignUp} />

            {/* private routes */}
            <UserPrivateRouter exact path={routeLinks.index} component={Home} />
            <UserPrivateRouter exact path={routeLinks.editProfile} component={EditProfile} />
            <UserPrivateRouter exact path={routeLinks.changePassword} component={ChangePassword} />
            <UserPrivateRouter exact path={`${routeLinks.appointment}/create/:day/:time?`} component={CreateAppointment} />
            <UserPrivateRouter exact path={`${routeLinks.appointment}/edit/:uuid`} component={EditAppointments} />
            <UserPrivateRouter exact path={`${routeLinks.appointments}/import`} component={ImportAppointments} />
            <UserPrivateRouter exact path={`${routeLinks.appointments}/:day`} component={ViewAppointments} />

            {/* 404 page */}
            <Route component={Page404} />
        </Switch>
    )
}