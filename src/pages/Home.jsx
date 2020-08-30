import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login, saveUser } from '../actions/UserActions.js';

import Timer from '../components/Timer';

class Home extends Component {
    state = {
        currProjectId: null
    }

    async componentDidMount() {
    }
    onChangeProject = (e) => {
        const currProjectId = e.target.options[e.target.selectedIndex].value;
        this.setState({ currProjectId })
        const userToSave = { ...this.props.loggedInUser, currProjectId}
        this.props.saveUser(userToSave)
    }
    getCurrProjectId = () => {
        return this.props.loggedInUser.currProjectId;
    }

    render() {
        return ( this.props.loggedInUser &&
            <div>
                <h2>Home</h2>
                <select onChange={(e) => this.onChangeProject(e)}>
                    <option></option>
                    {
                        this.props.loggedInUser.projects.map(project =>
                            <option key={project.id} value={project.id}>{project.name}</option>)
                    }
                </select>
            {this.state.currProjectId  && <Timer />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    loadUsers,
    login,
    saveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);