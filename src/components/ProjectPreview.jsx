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
    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    }

    // handleSubmit = (ev) => {
    //     const userToSave = JSON.parse(JSON.stringify(this.props.loggedInUser));
    //     ev.preventDefault();
    //     let project = {}
    //     project.name = this.state.project;
    //     project.id = makeId();
    //     userToSave.projects.unshift(project);
    //     console.log('project on submit:', project);
    //     console.log('handle submit add project:', this.state);
    //     this.props.saveUser(userToSave);
    //     this.setState({ project: '' });
    // }



    // handleChange = ({ target }, idx = -1) => {
    //     const field = target.name;
    //     const value = (field === 'isDone') ? target.checked : target.value;
    //     let cloneChkList = this.state.checkList.slice();
    //     if (field === 'isDone') {
    //         cloneChkList[idx].isDone = value;
    //         this.setState({ checkList: cloneChkList }, () => {
    //             this.handleSaveBoard();
    //         });
    //     }
    //     else {
    //         if (idx === -1)
    //             (this.state.onAdd ? this.setState({ todoText: value }) : this.setState({ checklistTitle: value }))

    //         else {

    //             cloneChkList[idx].txt = value;
    //         }
    //     }
    //     this.setState({ checkList: cloneChkList });
    // }

    // handleFocus = (ev) => ev.target.select();

    // handleKeyPress(e) {
    //     if (e.keyCode === 13) {
    //         e.target.blur();
    //     }
    // }

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
        this.setState({ projectName : ev.target.value })

    }


    render() {
        return (
            < div className="project-item" >
                {this.state.isInEditMode ? <input type="text"
                    defaultValue={this.state.projectName}
                    autoFocus
                onChange={(ev)=>this.handleProjectChange(ev)}
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