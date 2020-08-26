import React from 'react'
// import projectService from './../services/projectService.js'
import { setProjects, addProject } from '../actions/ProjectActions.js'



import { connect } from 'react-redux';


class AddProject extends React.Component {
    state = {
        task: ''
    }

    // componentDidMount() {
    //     const projects = projectService.query();
    //     this.props.setProjects(projects);
    // }

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        let project = { task: this.state.task, done: false };
        console.log('project on submit:', project);

        this.props.addProject(project);
        console.log('handle submit add project:', this.state);

        this.setState({ task: '' })

    }



    render() {
        console.log('project edit');
        const { task } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="task">task:
                            <input type="text" name="task" placeholder="type in project." value={task} onChange={this.handleChange} />
                        </label>
                    </div>

                    <button>Add</button>
                </form>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
}


const mapDispatchToProps = {
    addProject
}



export default connect(mapStateToProps, mapDispatchToProps)(AddProject)