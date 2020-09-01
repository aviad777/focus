import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import moment from 'moment';

class Stats extends Component {
    async componentDidMount() {

    }

    calculateDayWorkTime = (days) => {
        const date = moment(Date.now() - days * 1000 * 60 * 60 * 24).format('L')
        return this.props.loggedInUser.sessions[date].length * 45;
    }

    

    sessionSummary = (from, to) => {
        return <div>
            <h4>{moment().format('dddd')}, {moment().format("MMM Do YYYY")}.</h4>
            <p>So far your have worked today for {this.calculateDayWorkTime(0)} minutes.</p>
            {/* <p>{from.diff(to, 'days')}</p> */}

            Since Monday, August 3, 2020 (29 days ago) to Sunday, August 30, 2020 (2 days ago),
            you have finished 14 work sessions for a total of 10 hours and 30 minutes.
            This means you have been working 21 minutes per day on average (including today).

        </div>
    }

    render() {
        return this.props.loggedInUser && (
            <div>
                <h2>Stats</h2>
                {this.sessionSummary(moment(1/10/2010), moment(1/11/2020))}
                




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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);