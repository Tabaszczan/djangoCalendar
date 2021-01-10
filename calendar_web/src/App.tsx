import React, {useEffect} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Home} from "./components/home/Home";
import {
    Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import {history} from './helpers/history'
import {alertActions} from "./actions/alert.actions";
import {PrivateRoute} from "./components/PrivateRoute";
import {Login} from "./components/login/Login";
import {useDispatch, useSelector} from 'react-redux';
import {Register} from "./components/register/Register";
import Alert from '@material-ui/lab/Alert';
import {AlertTitle} from "@material-ui/lab";
import {Provider} from "react-redux";
import {store} from "./helpers/store";
import {EventCreate} from "./components/events/EventCreate";
import {EventUpdate} from "./components/events/EventUpdate";
import {GroupsList} from "./components/groups/GroupsList";
import {GroupCreate} from "./components/groups/GroupCreate";
import {GroupUpdate} from "./components/groups/GroupUpdate";
import {EventGroupCreate} from "./components/events/EventGroupCreate";
import {EventGroupUpdate} from "./components/events/EventGroupUpdate";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#ff6434',
            main: '#dd2c00',
            dark: '#a30000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffa06d',
            main: '#ff6e40',
            dark: '#c53d13',
            contrastText: '#000000',
        }
    }
});


function App() {
    const alert = useSelector((state: any) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear())
        })
    }, [dispatch])
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                {alert.message &&
                <Alert severity={"error"}>
                    <AlertTitle>Error</AlertTitle>
                    {alert.message}
                </Alert>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <PrivateRoute path="/event/add" component={EventCreate}/>
                        <PrivateRoute path="/event-group/add" component={EventGroupCreate}/>
                        <PrivateRoute path="/event-group/update/:id" component={EventGroupUpdate}/>
                        <PrivateRoute path="/event/update/:id" component={EventUpdate}/>
                        <PrivateRoute path="/groups/" component={GroupsList}/>
                        <Route path="/group/update/:id" component={GroupUpdate}/>
                        <PrivateRoute path="/add/groups" component={GroupCreate}/>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        </Provider>
    );
}


export {App};
