import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';

import ProjectList from '../components/ProjectList';
import AddProject from '../components/AddProject';

class Settings extends Component {


    render() {
        const { loggedInUser } = this.props;
        return (
            <div>
                <h2>Settings</h2>

                <AddProject />
                {loggedInUser && loggedInUser.projects &&
                    <ProjectList projects={loggedInUser.projects} />}
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