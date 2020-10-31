import {userService} from "../services/user.service";
import {userConstants} from "../constants/user.constants";
import { history } from '../helpers/history';
import {alertActions} from "./alert.actions";

export const userActions = {
    logout,
    login,
    register,
    getEvents,
}

function login(email: string, password: string, from: any) {
    return (dispatch: any) => {
        dispatch(request({email}));
        userService.login(email, password).then(
            email => {
                dispatch(success(email))
                history.push(from)
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(JSON.stringify(error)))
            }
        )
    }

    function request(email: any) {
        return {type: userConstants.LOGIN_REQUEST, email}
    }

    function success(email: any) {
        return {type: userConstants.LOGIN_SUCCESS, email}
    }

    function failure(error: any) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}
function logout() {
    userService.logout()
    return {type: userConstants.LOGOUT};
}

function register(user: any) {
    return (dispatch: any) => {
        dispatch(request({user}))
        userService.register(user).then(
            user => {
                dispatch(success(user))
                history.push('/login')
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.error(error.toString()))
            }
        )
    }

    function request(email: any) {
        return {type: userConstants.REGISTER_REQUEST, email}
    }

    function success(email: any) {
        return {type: userConstants.REGISTER_SUCCESS, email}
    }

    function failure(error: any) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}
function getEvents() {
    return (dispatch: any) => {
        userService.getEvents().then(
            events => dispatch(success(events)),
            error => dispatch(failure(error.toString())),
        )
    }
    function success(events: any) { return { type: userConstants.GET_EVENTS_SUCCESS, events } }
    function failure(error: any) { return { type: userConstants.GET_EVENTS_FAILURE, error } }
}

function _delete(id: number) {
    return (dispatch: any) => {
        dispatch(request(id));

    }
    function request(id: number) {return {type: userConstants.DELETE_EVENTS_REQUEST, id}}
    function success(id: number) {return {type: userConstants.DELETE_EVENTS_SUCCESS, id}}
    function error(id: number, error: string) {return {type: userConstants.DELETE_EVENTS_SUCCESS, id, error}}
}