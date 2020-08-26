import axios from 'axios'



const baseUrl = 'http://localhost:3000/projects'

export default {
    query,
    get,
    remove,
    save
}

function query() {
    return axios.get(baseUrl)
        .then(res => res.data)
        .then(projects => projects)
}

function get(id) {
    return axios.get(`${baseUrl}/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

function save(project) {
    if (project.id) {
        return axios.put(`${baseUrl}/${project.id}`, project)
    } else {
        return axios.post(baseUrl, project)
    }
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

