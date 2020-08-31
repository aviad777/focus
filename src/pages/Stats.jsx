import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import moment from 'moment';

class Settings extends Component {
    async componentDidMount() {

    }

    daily_summary = () => {


        return <div>
            <h4>{moment().format('dddd')}, {moment().format("MMM Do YYYY")}.</h4>


        </div>
    }

    render() {
        return (
            <div>
                <h2>Stats</h2>
                {this.daily_summary()}



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