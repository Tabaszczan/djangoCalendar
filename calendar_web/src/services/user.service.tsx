import config from "./utils"
import {authHeader} from "../helpers/auth-header";

export const userService = {
    login,
    logout,
    register,
    getEvents,
    addEvent,
    updateEvent,
    getEvent,
    delete: _delete,
    getUsers,
    getGroupEvents,
    deleteGroupEvent,
    updateGroupEvent,
    getGroupEvent,
    addGroupEvent,
}

function login(email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    };
    return fetch(`${config.apiUrl}rest-auth/login/`, requestOptions)
        .then(handleResponse)
        .then(object => {
            localStorage.setItem('user', JSON.stringify(object))
            return fetch(`${config.apiUrl}api/token-auth/`, requestOptions)
                .then(handleResponse)
                .then(object => {
                    localStorage.setItem('JWT', JSON.stringify(object))
                    return fetch(`${config.apiUrl}rest-auth/login/`, requestOptions).then(handleResponse)
                })
        })
}

function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('JWT')
}

function register(user: any) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}rest-auth/registration/`, requestOptions).then(handleResponse)
}

function getEvents() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}user_events/`, requestOptions).then(handleResponse)
}
function getGroupEvents() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}group_events/`, requestOptions).then(handleResponse)
}
function _delete(id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}user_events/${id}`, requestOptions).then(handleResponse)
}

function deleteGroupEvent(id: number) {
        const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}group_events/${id}`, requestOptions).then(handleResponse)
}

function updateEvent(event: any) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    }
    return fetch(`${config.apiUrl}user_events/${event.id}/`, requestOptions).then(handleResponse)
}

function updateGroupEvent(event: any) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    }
    return fetch(`${config.apiUrl}group_events/${event.id}/`, requestOptions).then(handleResponse)
}

function getEvent(id: any) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}user_events/${id}/`, requestOptions).then(handleResponse)
}
function getGroupEvent(id: any) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}group_events/${id}/`, requestOptions).then(handleResponse)
}
function addEvent(event: any) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    }
    return fetch(`${config.apiUrl}user_events/`, requestOptions).then(handleResponse)
}
function addGroupEvent(event: any) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    }
    return fetch(`${config.apiUrl}group_events/`, requestOptions).then(handleResponse)
}


function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}users/`, requestOptions).then(handleResponse)
}

export function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }
            const error = data || response.statusText;
            return Promise.reject(error);
        }
        return data
    })
}