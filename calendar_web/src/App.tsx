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
        // eslint-disable-next-line
    }, [])
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <div>
                    <div>
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
                                <Route path="/event/add" component={EventCreate}/>
                                <Route path="/event/update/:id" component={EventUpdate}/>
                                <Route path="/groups/" component={GroupsList}/>
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </MuiThemeProvider>
        </Provider>
    );
}


export {App};
