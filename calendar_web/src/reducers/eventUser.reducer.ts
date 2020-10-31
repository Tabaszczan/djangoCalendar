import {userConstants} from "../constants/user.constants";


export function events(state = {}, action: any) {
    switch (action.type) {
        case userConstants.GET_EVENTS_REQUEST:
            return {
                loading: true
            }
        case userConstants.GET_EVENTS_SUCCESS:
            return {
                items: action.events
            }
        case userConstants.GET_EVENTS_FAILURE:
            return {error: action.error}

        default:
            return state
    }
}