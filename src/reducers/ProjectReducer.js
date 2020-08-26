const initialState = {
    projects: [],
    currProject: null

}


export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: [...action.projects]
            }

        case 'SET_PROJECT':
            return {
                ...state,
                currProject: { ...action.project }
            }

        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.project]
            }

        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (project.id === action.project.id) return action.project;
                    return project;
                })
            }

        case 'REMOVE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.projectId)
            }

        default: return state;
    }
}