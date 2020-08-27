import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';

import Timer from '../components/Timer';

class Home extends Component {
    state = {
        currProjectId: null
    }

    async componentDidMount() {
    }
    onChangeProject = (e) => {
        this.setState({ currProjectId: e.target.options[e.target.selectedIndex].value })
    }
    getCurrProject = () => {
        return this.props.loggedInUser.projects.find(project => project.id === this.state.currProjectId)
    }

    render() {
        return ( this.props.loggedInUser &&
       
            <div>
                <h2>Home</h2>
                <select onChange={(e) => this.onChangeProject(e)}>
                    <option></option>
                    {
                        // this.props.loggedInUser &&
                        this.props.loggedInUser.projects.map(project =>
                            <option key={project.id} value={project.id}>{project.name}</option>)
                    }
                </select>
            {this.state.currProjectId  && <Timer currProject={this.getCurrProject()} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);