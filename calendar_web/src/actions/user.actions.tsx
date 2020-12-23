import {userService} from "../services/user.service";
import {userConstants} from "../constants/user.constants";
import {history} from '../helpers/history';
import {alertActions} from "./alert.actions";
import {eventUserConstants} from "../constants/eventUser.constants";

export const userActions = {
    logout,
    login,
    register,
    getEvents,
    addEvent,
    updateEvent,
    getEvent,
    delete: _delete,
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

    function success(events: any) {
        return {type: eventUserConstants.GET_EVENTS_SUCCESS, events}
    }

    function failure(error: any) {
        return {type: eventUserConstants.GET_EVENTS_FAILURE, error}
    }
}

function _delete(id: number) {
    return (dispatch: any) => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                event => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            )
    }

    function request(id: number) {
        return {type: eventUserConstants.DELETE_EVENTS_REQUEST, id}
    }

    function success(id: number) {
        return {type: eventUserConstants.DELETE_EVENTS_SUCCESS, id}
    }

    function failure(id: number, error: string) {
        return {type: eventUserConstants.DELETE_EVENTS_FAILURE, id, error}
    }
}


function addEvent(event: any) {
    return (dispatch: any) => {
        dispatch(request(event))
        userService.addEvent(event).then(
            event => {
                dispatch(success(event))
                history.push('')
            },
            error => {
                dispatch(failure(event, error.toString()))
            }
        )
    }

    function request(event: any) {
        return {type: eventUserConstants.CREATE_EVENTS_REQUEST, event}
    }

    function success(event: any) {
        return {type: eventUserConstants.CREATE_EVENTS_SUCCESS, event}
    }

    function failure(event: any, error: any) {
        return {type: eventUserConstants.CREATE_EVENTS_FAILURE, event, error}
    }
}

function updateEvent(event: any) {
    return (dispatch: any) => {
        dispatch(request(event))
        userService.updateEvent(event).then(
            event => {
                dispatch(success(event))
                history.push('')
            },
            error => {
                dispatch(failure(event, error.toString()))
            }
        )
    }

    function request(event: any) {
        return {type: eventUserConstants.UPDATE_EVENT_REQUEST, event}
    }

    function success(event: any) {
        return {type: eventUserConstants.UPDATE_EVENT_SUCCESS, event}
    }

    function failure(event: any, error: any) {
        return {type: eventUserConstants.UPDATE_EVENT_FAILURE, event, error}
    }
}

function getEvent(id: number) {
    return (dispatch: any) => {
        dispatch(request(id))
        userService.getEvent(id).then(
            event => {
                dispatch(success(event))
                history.push('event/update/'+id)
            },
            error => {
                dispatch(failure(id, error.toString()))
            }
        )
    }

    function request(id: any) {
        return {type: eventUserConstants.GET_EVENT_REQUEST, id}
    }

    function success(event: any) {
        return {type: eventUserConstants.GET_EVENT_SUCCESS, event}
    }

    function failure(event: any, error: any) {
        return {type: eventUserConstants.GET_EVENT_FAILURE, event, error}
    }
}