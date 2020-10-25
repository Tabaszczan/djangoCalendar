import {userService} from "../services/user.service";
import {userConstants} from "../constants/user.constants";
import { history } from '../helpers/history';
import {alertActions} from "./alert.actions";

export const userActions = {
    logout,
    login,
    register,
}

function login(email: string, password: string, from: any) {
    return (dispatch: any) => {
        dispatch(request({email}));
        userService.login(email, password).then(
            email => {
                dispatch(success(email))
                history.push(from)
                window.location.reload()
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
