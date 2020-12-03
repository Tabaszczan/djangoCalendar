import config from "./utils"
import {authHeader} from "../helpers/auth-header";

export const groupsService = {
    getGroups,
    addGroup,
    deleteGroup: _deleteGroup,
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
   return  fetch(`${config.apiUrl}groups/${id}`, requestOptions).then(handleResponse)
}


function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = data || response.statusText;
            return Promise.reject(error);
        }
        return data
    })
}