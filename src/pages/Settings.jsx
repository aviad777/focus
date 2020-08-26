import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import ProjectList from '../components/ProjectList';
import AddProject from '../components/AddProject';

class Settings extends Component {
    async componentDidMount() {

    }

    render() {
        return (
            <div>
                <h2>Settings</h2>
                <AddProject />
                {this.props.loggedInUser && this.props.loggedInUser.projects && <ProjectList onDelete={this.props.removeProject} projects={this.props.loggedInUser.projects} />}
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
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);