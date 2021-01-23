import {userConstants} from "../constants/user.constants";


export function users(state = {}, action: any) {
    switch (action.type){
        case userConstants.GET_USERS_REQUEST:
            return {
                getting: true,
                users: {}
            }
        case userConstants.GET_USERS_SUCCESS:
            return {
                getting: true,
                users: action.users
            }
        case userConstants.GET_USERS_FAILURE:
            return {
                getting: false,
            }
        default:
            return state
    }
}
