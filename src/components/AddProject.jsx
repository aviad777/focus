import React from 'react'

import { saveUser } from '../actions/UserActions.js';
import { makeId } from '../services/utils.js'
import { connect } from 'react-redux';


class AddProject extends React.Component {
    state = {
        project: ''
    }

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
        project.timeCreated = Date.now();
        userToSave.projects.unshift(project);
        this.props.saveUser(userToSave);
        this.setState({ project: '' });
    }

    render() {
        const { project } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="project">new project:
                            <input autoFocus type="text" name="project" placeholder="type in project name" value={project} onChange={this.handleChange} />
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