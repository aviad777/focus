import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import Rank from './Rank.jsx';
// import { Link } from 'react-router-dom';

class Navbar extends Component {
    async componentDidMount() {
        await this.props.loadUsers();
        const loggedInUser = this.props.users[0]
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
        this.props.login(loggedInUser)
    }

    render() {
        return (
            <div>
                <a href="/">FOCUS</a>
                <ul>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/badges">Badges</a></li>
                    <li><a href="/stats">Stats</a></li>
                    <li>Log in</li>
                </ul>
                <Rank user={this.props.loggedInUser} saveUser={this.props.saveUser}/>
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