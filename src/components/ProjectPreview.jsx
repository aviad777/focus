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
    handleProjectBlured(projectId) {
        const projects = JSON.parse(JSON.stringify(this.props.loggedInUser.projects));
        const projectIndex = projects.findIndex(proj => proj.id === projectId)
        projects[projectIndex].name = this.state.projectName;
        const userToSave = { ...this.props.loggedInUser, projects}
        this.props.saveUser(userToSave)
        this.setState({ isInEditMode: false })
    }
    handleNameChange(ev) {
        this.setState({ projectName : ev.target.value })
    }
    onRemoveProject(projectId) {
        let projects = this.props.loggedInUser.projects;
        projects = projects.filter(project => project.id !== projectId)
        const userToSave = { ...this.props.loggedInUser, projects }
        this.props.saveUser(userToSave)
        this.setState({ isInEditMode: false })
    }

    render() {
        return (
            < div className="project-item" >
                {this.state.isInEditMode ? <input type="text"
                    defaultValue={this.state.projectName}
                    autoFocus
                onChange={(ev)=>this.handleNameChange(ev)}
                onBlur={() => this.handleProjectBlured(this.props.project.id)}

                />
                : <div><p onClick={() => this.handleProjectClicked()}>{this.state.projectName}</p>
                <button onClick={() => this.onRemoveProject(this.props.project.id)}>remove</button></div>
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
    saveUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPreview)