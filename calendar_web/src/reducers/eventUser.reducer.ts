import {userConstants} from "../constants/user.constants";


export function events(state = {
    items: []
}, action: any) {
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
        case userConstants.DELETE_EVENTS_REQUEST:
            return {
                ...state,
                items: state.items.map((item: any) => 
                item.id === action.id ? {...item, deleting:true}: item)
            }
        case userConstants.DELETE_EVENTS_SUCCESS:
            return {
                items: state.items.filter((item: any) => item.id !== action.id)
            }
        case userConstants.DELETE_EVENTS_FAILURE:
            return {
                ...state,
                items: state.items.map((item: any) => {
                    if (item.id === action.id){
                        const {deleting, ...itemCopy} = item
                        return{...itemCopy, deleteError: action.error}
                    }
                    return item
                })
            }
        case userConstants.CREATE_EVENTS_REQUEST:
            return {
                ...state
            }

        default:
            return state
    }
}