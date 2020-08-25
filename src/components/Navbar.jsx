import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';

class Navbar extends Component {
    async componentDidMount() {
        await this.props.loadUsers();
        console.log(this.props.users);
        const loggedInUser = this.props.users[0]
        console.log('loggedInUser', loggedInUser);
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
        this.props.login(loggedInUser)
    }

    render() {
        return (
            <div>
                <div>FOCUS</div>
                <ul>
                    <li>Settings</li>
                    <li>Badges</li>
                    <li>Stats</li>
                    <li>Log in</li>
                </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);