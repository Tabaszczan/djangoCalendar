import {groupsService} from "../services/groups.service";
import {groupsConstants} from "../constants/groups.constants";
import {history} from '../helpers/history';

export const groupsActions = {
    getGroups,
    deleteGroup: _deleteGroup,
    addGroup,
    getGroup,
    updateGroup,
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

function addGroup(group: any) {
    return (dispatch: any) => {
        dispatch(request(group))
        groupsService.addGroup(group).then(
            group => {
                dispatch(success(group))
                history.goBack()
            },
            error => {
                dispatch(failure(group, error.toString()))
            }
        )
    }
    function request(group: any) {
        return {type: groupsConstants.CREATE_GROUP_REQUEST, group}
    }
     function success(group: any) {
        return {type: groupsConstants.CREATE_GROUP_SUCCESS, group}
    }

    function failure(group: any, error: any) {
        return {type: groupsConstants.CREATE_GROUP_FAILURE, group, error}
    }
}

function getGroup(id: number){

    return(dispatch: any) => {
        dispatch(request(id))
        groupsService.getGroup(id).then(
            group => {
                dispatch(success(group))
                history.push('/group/update/'+ id)
            },
            error => {
                dispatch(failure(id,error.toString()))
            }
        )
    }


    function request(id: any){
        return {type: groupsConstants.GET_GROUP_REQUEST, id}
    }
    function success(group: any){
        return{type: groupsConstants.GET_GROUP_SUCCESS, group}
    }
    function failure(group: any, error: any){
        return{type: groupsConstants.GET_GROUP_FAILURE, group, error}
    }
}

function updateGroup(group: any) {

    return (dispatch: any) => {
        dispatch(request(group))
        groupsService.updateGroup(group).then(
            group => {
                dispatch(success(group))
                history.push('/groups/')
            },
            error => {
                dispatch(failure(group, error.toString()))
            }
        )
    }
    function request(group: any) {
        return{type: groupsConstants.UPDATE_GROUP_REQUEST, group}
    }
    function success(group: any) {
        return{type: groupsConstants.UPDATE_GROUP_SUCCESS, group}
    }
    function failure(group: any, error: any) {
        return{type: groupsConstants.UPDATE_GROUP_FAILURE, group, error}
    }
}