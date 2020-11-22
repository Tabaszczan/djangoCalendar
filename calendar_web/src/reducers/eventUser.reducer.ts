import {eventUserConstants} from "../constants/eventUser.constants";


export function events(state = {
    items: []
}, action: any) {
    switch (action.type) {
        case eventUserConstants.GET_EVENTS_REQUEST:
            return {
                loading: true
            }
        case eventUserConstants.GET_EVENTS_SUCCESS:
            return {
                items: action.events
            }
        case eventUserConstants.GET_EVENTS_FAILURE:
            return {error: action.error}
        case eventUserConstants.DELETE_EVENTS_REQUEST:
            return {
                ...state,
                items: state.items.map((item: any) =>
                    item.id === action.id ? {...item, deleting: true} : item)
            }
        case eventUserConstants.DELETE_EVENTS_SUCCESS:
            return {
                items: state.items.filter((item: any) => item.id !== action.id)
            }
        case eventUserConstants.DELETE_EVENTS_FAILURE:
            return {
                ...state,
                items: state.items.map((item: any) => {
                    if (item.id === action.id) {
                        const {deleting, ...itemCopy} = item
                        return {...itemCopy, deleteError: action.error}
                    }
                    return item
                })
            }
        case eventUserConstants.CREATE_EVENTS_REQUEST:
            return {
                ...state
            }
        case eventUserConstants.CREATE_EVENTS_SUCCESS:
            return {}
        case eventUserConstants.CREATE_EVENTS_FAILURE:
            return {}
        case eventUserConstants.GET_EVENT_REQUEST:
            return {
                loading: true
            }
        case eventUserConstants.GET_EVENT_SUCCESS:
            return {
                event: action.event
            }
        case eventUserConstants.GET_EVENT_FAILURE:
            return {error: action.error}
        default:
            return state
    }
}