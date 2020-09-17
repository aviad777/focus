import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import moment from 'moment';

// Shows users achivements and a list of badges

class Badges extends Component {
    state = {
    }

    async componentDidMount() {
    }


    render() {

        if (this.props.loggedInUser) {

            return this.props.loggedInUser && (
                <div>
                    <h2>Badges</h2>
                    {/* badges.map(badge=><BadgePreview badge={badge} />) */} 
                </div>
            )
        } else return "LOADING SHIT";
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

export default connect(mapStateToProps, mapDispatchToProps)(Badges);