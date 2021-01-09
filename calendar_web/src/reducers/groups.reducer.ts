import {groupsConstants} from "../constants/groups.constants";


export function groups(state = {
    items: []
}, action: any) {
    switch (action.type) {
        case groupsConstants.GET_GROUPS_REQUEST:
            return {
                loading: true
            }
        case groupsConstants.GET_GROUPS_SUCCESS:
            return {
                items: action.groups
            }
        case groupsConstants.GET_GROUPS_FAILURE:
            return {
                error: action.error
            }
        case groupsConstants.DELETE_GROUP_REQUEST:
            return {
                ...state,
                items: state.items.map((item: any) =>
                    item.id === action.id ? {...item, deleting: true} : item)
            }
        case groupsConstants.DELETE_GROUP_SUCCESS:
            return {
                items: state.items.filter((item: any) => item.id !== action.id)
            }
        case groupsConstants.DELETE_GROUP_FAILURE:
            return {
                ...state,
                items: state.items.map((item: any) => {
                    if(item.id === action.id) {
                        const {deleting, ...itemCopy} = item
                        return {...itemCopy, deleteError: action.error}
                    }
                    return item
                })
            }
        case groupsConstants.CREATE_GROUP_REQUEST:
            return {
                ...state
            }
        case groupsConstants.CREATE_GROUP_SUCCESS:
            return {}
        case groupsConstants.CREATE_GROUP_FAILURE:
            return {}
        case groupsConstants.GET_GROUP_REQUEST:
            return {
                loading: true
            }
        case groupsConstants.GET_GROUP_SUCCESS:
            return {
                group: action.group
            }
        case groupsConstants.GET_GROUP_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }

}