import projectService from '../services/ProjectService.js'



export function loadProjects() {
    return dispatch => {
        projectService.query()
            .then(projects => dispatch({ type: 'SET_PROJECTS', projects }))

    }
}

export function removeProject(projectId) {
    return dispatch => {
        projectService.remove(projectId)
            .then(() => dispatch({ type: 'REMOVE_PROJECT', projectId }))
    }
}

export function addProject(project) {
    return dispatch => {
        projectService.save(project)
            .then(project => dispatch({ type: 'ADD_PROJECT', project }))

    }
}

export function updateProject(project) {
    return dispatch => {
        projectService.save(project)
            .then(() => dispatch({ type: 'UPDATE_PROJECT', project }))

    }
}
export function setProject(projectId) {
    return dispatch => {
        projectService.get(projectId)
            .then(project => dispatch({ type: 'SET_PROJECT', project }))
    }
}



// export function setProjects(projects) {
//     return { type: 'SET_PROJECTS', projects }
// }


// export function setProject(project) {
//     return { type: 'SET_PROJECT', project }
// }

// export function updateProject(project) {
//     console.log('project on save project ACTIONS:', project);

//     const type = 'UPDATE_PROJECT';
//     return { type, project };
// }






