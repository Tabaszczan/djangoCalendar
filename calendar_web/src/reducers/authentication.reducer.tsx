import {userConstants} from "../constants/user.constants";

let user: any = JSON.parse(localStorage.getItem('user') as any);
const initialState = user ? {loggedIn: true, user} : {}
export function authentication(state = initialState, action: any) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return{
                loggingIn: true,
                user: action.email
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.email
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}