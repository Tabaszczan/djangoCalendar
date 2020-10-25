import config from "./utils"

export const userService = {
    login,
    logout,
    register,
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
            localStorage.setItem('user', JSON.stringify(object.user))
            return fetch(`${config.apiUrl}api/token-auth/`, requestOptions)
                .then(handleResponse)
                .then(object => {
                    localStorage.setItem('JWT', JSON.stringify(object))
                    return object
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
    console.log(JSON.stringify(user))
    return fetch(`${config.apiUrl}rest-auth/registration/`, requestOptions).then(handleResponse)
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
