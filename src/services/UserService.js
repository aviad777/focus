import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

function getUsers() {
    return HttpService.get('users')
}

function getById(userId) {
    return HttpService.get(`users/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`users/${userId}`)
}

function update(user) {
    return HttpService.put(`users/${user.id}`, user)
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    return user;
}