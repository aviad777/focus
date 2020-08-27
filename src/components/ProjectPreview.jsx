import React, { Component } from 'react'

import { saveUser } from '../actions/UserActions.js';
import { connect } from 'react-redux';

class ProjectPreview extends Component {

    state = {
        isInEditMode: false,
        projectName: ''
    }

    componentDidMount() {
        const { props } = this
        this.setState(prevState => ({ ...prevState, projectName: props.project.name }))
    }

    handleProjectClicked() {
        this.setState({ isInEditMode: true })
    }
    handleProjectBlured() {
        const projects = this.props.loggedInUser.projects;
        projects[this.props.index].name = this.state.projectName;
        const userToSave = { ...this.props.loggedInUser, projects }
        this.props.saveUser(userToSave)
        this.setState({ isInEditMode: false })
    }
    handleProjectChange(ev) {
        this.setState({ projectName: ev.target.value })
    }

    render() {
        return (
            < div className="project-item" >
                {this.state.isInEditMode ? <input type="text"
                    defaultValue={this.state.projectName}
                    autoFocus
                    onChange={(ev) => this.handleProjectChange(ev)}
                    onBlur={() => this.handleProjectBlured()}

                />
                    : <p onClick={() => this.handleProjectClicked()}>{this.props.project.name}</p>
                }
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPreview)