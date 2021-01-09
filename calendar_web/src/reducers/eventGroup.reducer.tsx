import {eventGroupConstants} from "../constants/eventGroup.constants";


export function eventsGroup(state = {items: []}, action: any) {
    switch (action.type) {
        case eventGroupConstants.DELETE_GROUP_EVENTS_REQUEST:
            return {
                ...state,
                items: state.items.map((item: any) =>
                    item.id === action.id ? {...item, deleting: true} : item)
            }
        case eventGroupConstants.DELETE_GROUP_EVENTS_SUCCESS:
            return {
                items: state.items.filter((item: any) => item.id !== action.id)
            }
        case eventGroupConstants.DELETE_GROUP_EVENTS_FAILURE:
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
        case eventGroupConstants.CREATE_GROUP_EVENTS_REQUEST:
            return {
                ...state
            }
        case eventGroupConstants.CREATE_GROUP_EVENTS_SUCCESS:
            return {}
        case eventGroupConstants.CREATE_GROUP_EVENTS_FAILURE:
            return {}
        case eventGroupConstants.GET_GROUP_EVENT_REQUEST:
            return {
                loading: true
            }
        case eventGroupConstants.GET_GROUP_EVENT_SUCCESS:
            return {
                event: action.group_events
            }
        case eventGroupConstants.GET_GROUP_EVENT_FAILURE:
            return {error: action.error}
        case eventGroupConstants.GET_GROUP_EVENTS_REQUEST:
            return {
                loading: true
            }
        case eventGroupConstants.GET_GROUP_EVENTS_SUCCESS:
            return {
                items: action.group_events
            }
        case eventGroupConstants.GET_GROUP_EVENTS_FAILURE:
            return {error: action.error}
        default:
            return state
    }
}