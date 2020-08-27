
import React, { Component } from 'react'
export default class ProjectPreview extends Component {
    state = {
        isInEditMode: false,
        projectName: '',
    }

    componentDidMount() {
        this.setState(prevState => ({ ...prevState, projectName: props.project.name }))
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
        userToSave.projects.unshift(project);
        console.log('project on submit:', project);
        console.log('handle submit add project:', this.state);
        this.props.saveUser(userToSave);
        this.setState({ project: '' });
    }



    handleChange = ({ target }, idx = -1) => {
        const field = target.name;
        const value = (field === 'isDone') ? target.checked : target.value;
        let cloneChkList = this.state.checkList.slice();
        if (field === 'isDone') {
            cloneChkList[idx].isDone = value;
            this.setState({ checkList: cloneChkList }, () => {
                this.handleSaveBoard();
            });
        }
        else {
            if (idx === -1)
                (this.state.onAdd ? this.setState({ todoText: value }) : this.setState({ checklistTitle: value }))

            else {

                cloneChkList[idx].txt = value;
            }
        }
        this.setState({ checkList: cloneChkList });
    }

    handleFocus = (ev) => ev.target.select();

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }


    render() {
        <div className="project-item" >
            {isInEditMode ? <input type="text"
                value={this.state.projectName}
                onBlur={() => setEditing(false)}
                onKeyDown={e => handleKeyDown(e, type)} />
                : <p>{props.project.name}</p>}
        </div>
    }
}
