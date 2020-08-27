import React from 'react'
// import projectService from './../services/projectService.js'

import { saveUser } from '../actions/UserActions.js';
import { makeId } from '../services/utils.js'
import { connect } from 'react-redux';


class AddProject extends React.Component {
    state = {
        project: ''
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
        const userToSave = JSON.parse(JSON.stringify(this.props.loggedInUser));
        ev.preventDefault();
        let project = {}
        project.name = this.state.project;
        project.id = makeId();
        userToSave.projects.unshift(project);
        console.log('project on submit:', project);
        console.log('handle submit add project:', this.state);
        this.props.saveUser(userToSave);
        this.setState({ project: '' });
    }



    render() {
        console.log('project edit');
        const { project } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="project">new project:
                            <input type="text" name="project" placeholder="type in project." value={project} onChange={this.handleChange} />
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
        loggedInUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    saveUser
}



export default connect(mapStateToProps, mapDispatchToProps)(AddProject)