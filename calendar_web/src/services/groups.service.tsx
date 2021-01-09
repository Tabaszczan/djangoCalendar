import config from "./utils"
import {authHeader} from "../helpers/auth-header";
import {handleResponse} from "./user.service";

export const groupsService = {
    getGroups,
    addGroup,
    deleteGroup: _deleteGroup,
    getGroup,
    updateGroup,
}

function getGroups() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}groups/`, requestOptions).then(handleResponse)
}

function addGroup(group: any) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    }
    return fetch(`${config.apiUrl}groups/`, requestOptions).then(handleResponse)
}

function _deleteGroup(id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}groups/${id}`, requestOptions).then(handleResponse)
}

function getGroup(id: any){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}groups/${id}/`, requestOptions).then(handleResponse)
}

function updateGroup(group: any){
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    }
    return fetch(`${config.apiUrl}groups/${group.id}/`, requestOptions).then(handleResponse)
}