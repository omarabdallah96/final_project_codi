import React, { useContext } from 'react';
import SessionContext from './session/SessionContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Account from '../pages/Account';
import Home from '../pages/Home';
import Profile from '../pages/Profile/Profile';

export default function Routes() {
    
    const {
        session: { user: { token } }
    } = useContext(SessionContext);

    return (
        <Switch>
            <PublicRoute path="/account" component={Account} token={token} />
            <PrivateRoute path="/" component={Home} token={token} exact />
            <PrivateRoute path="/profile" component={Profile} token={token} />
            <Route component={NotFound} />
        </Switch>
    );
}

function PublicRoute({ path, component: Component, token, ...props }) {
    return (
        <Route {...props} path={path} render={props => token ?
            <Redirect to="/" /> :
            <Component {...props} />
        } />
    )
}

function PrivateRoute({ path, component: Component, token, ...props }) {
    return (
        <Route {...props} path={path} render={props => token ?
            <Component {...props} /> :
            <Redirect to="/account" />
        } />
    )
}