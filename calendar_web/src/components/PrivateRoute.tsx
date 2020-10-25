import React from "react";
import {Route, Redirect} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}: any) => (
    <Route {...rest} render={props => {
        if (!localStorage.getItem('user')) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
        return <Component {...props}/>
    }
    }
    />
)

