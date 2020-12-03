import {groupsService} from "../services/groups.service";
import {groupsConstants} from "../constants/groups.constants";


export const groupsActions = {
    getGroups,
    deleteGroup: _deleteGroup,
}

function getGroups() {
    return (dispatch: any) => {
        groupsService.getGroups().then(
            groups => dispatch(success(groups)),
            error => dispatch(failure(error.toString())),
        )
    }

    function success(groups: any) {
        return {type: groupsConstants.GET_GROUPS_SUCCESS, groups}
    }

    function failure(error: any) {
        return {type: groupsConstants.GET_GROUPS_FAILURE, error}
    }
}

function _deleteGroup(id: number) {
    return (dispatch: any) => {
        dispatch(request(id))
        groupsService.deleteGroup(id).then(
            group => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        )
    }

    function request(id: number) {
        return {type: groupsConstants.DELETE_GROUP_REQUEST, id}
    }

    function success(id: number) {
        return {type: groupsConstants.DELETE_GROUP_SUCCESS, id}
    }

    function failure(id: number, error: string) {
        return {type: groupsConstants.DELETE_GROUP_FAILURE, id, error}
    }
}
