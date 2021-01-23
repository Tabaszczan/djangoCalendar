export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user') as any)
    let JWT = JSON.parse(localStorage.getItem('JWT') as any)
    if (user && JWT.access) {
        return {'Authorization': 'Bearer ' + JWT.access} as any;
    } else {
        return {};
    }
}