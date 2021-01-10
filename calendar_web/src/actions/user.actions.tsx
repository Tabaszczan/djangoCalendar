import {userService} from "../services/user.service";
import {userConstants} from "../constants/user.constants";
import {history} from '../helpers/history';
import {alertActions} from "./alert.actions";
import {eventUserConstants} from "../constants/eventUser.constants";
import {eventGroupConstants} from "../constants/eventGroup.constants";

export const userActions = {
    logout,
    login,
    register,
    getEvents,
    addEvent,
    updateEvent,
    getEvent,
    delete: _delete,
    getUsers,
    getGroupEvents,
    deleteEventGroup,
    addGroupEvent,
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

function getGroupEvents() {
    return (dispatch: any) => {
        userService.getGroupEvents().then(
            group_events => dispatch(success(group_events)),
            error => dispatch(failure(error.toString())),
        )
    }

    function success(group_events: any) {
        return {type: eventGroupConstants.GET_GROUP_EVENTS_SUCCESS, group_events}
    }

    function failure(error: any) {
        return {type: eventGroupConstants.GET_GROUP_EVENTS_FAILURE, error}
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
function deleteEventGroup(id: number) {
    return (dispatch: any) => {
        dispatch(request(id));

        userService.deleteGroupEvent(id)
            .then(
                event_group => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            )
    }

    function request(id: number) {
        return {type: eventGroupConstants.DELETE_GROUP_EVENTS_REQUEST, id}
    }

    function success(id: number) {
        return {type: eventGroupConstants.DELETE_GROUP_EVENTS_SUCCESS, id}
    }

    function failure(id: number, error: string) {
        return {type: eventGroupConstants.DELETE_GROUP_EVENTS_FAILURE, id, error}
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

function addGroupEvent(event_group: any) {
    return (dispatch: any) => {
        dispatch(request(event_group))
        userService.addGroupEvent(event_group).then(
            event_group => {
                dispatch(success(event_group))
                history.push('')
            },
            error => {
                dispatch(failure(event_group, error.toString()))
            }
        )
    }

    function request(event_group: any) {
        return {type: eventGroupConstants.CREATE_GROUP_EVENTS_REQUEST, event_group}
    }

    function success(event_group: any) {
        return {type: eventGroupConstants.CREATE_GROUP_EVENTS_SUCCESS, event_group}
    }

    function failure(event_group: any, error: any) {
        return {type: eventGroupConstants.CREATE_GROUP_EVENTS_FAILURE, event_group, error}
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
                history.push('event/update/' + id)
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

function getUsers() {
    return (dispatch: any) => {
        userService.getUsers().then(
            users => dispatch(success(users)),
            error => dispatch(failure(error.toString())),
        )
    }

    function success(users: any) {
        return {type: userConstants.GET_USERS_SUCCESS, users}
    }

    function failure(error: any) {
        return {type: userConstants.GET_USERS_FAILURE, error}
    }
}