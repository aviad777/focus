import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

import Modal from './Modal'
import { loadUsers, saveUser } from '../actions/UserActions.js';


// count down for the user and once the count down is over, saves the session and show the correct modal



class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
        timeIsPaused: false,
        status: 'off',
        isModalOpen: false,
        sessionDurationMins: 45,
        sessionStartTime: Date.now(),
        currProjectId: null
    }

    componentDidMount() {
        this.setState({ currProjectId: this.props.loggedInUser.currProjectId })
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    runTimer = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, timeIsPaused, status } = this.state

            if (timeIsPaused === false) {
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Finish the Countdown

                        clearInterval(this.myInterval)
                        // status => 'off'

                        if (status === 'work') {
                            // Modal - confirm: break or next session?
                            this.toggleModal();
                            this.saveSession();
                        }
                        else if (status === 'break') {
                            // Modal - confirm: start next session?
                            this.toggleModal();
                        }
                        else if (status === 'off') {
                            // Modal - confirm: start next session?
                        }
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                }
            }
        }, 1000)
    }

    toggleModal = () => {
        this.setState(prevState => ({ ...prevState, isModalOpen: !this.state.isModalOpen }))
    }

    togglePause = () => {
        this.setState(prevState => ({ ...prevState, timeIsPaused: !this.state.timeIsPaused }))
    }

    onStartNewSession = () => {

        const sessionDuration = { minutes: 0, seconds: 10 }
        this.setState(prevState => ({ ...prevState, status: 'work', minutes: sessionDuration.minutes, seconds: sessionDuration.seconds }))
        this.runTimer()
    }

    onFinishSession = () => {
        this.setState(prevState => ({ ...prevState, status: 'off' }))
        this.saveSession()
    }

    saveSession = () => {
        const { sessionStartTime, sessionDurationMins } = this.state;
        const { currProjectId } = this.props.loggedInUser;
        // NOTE count++ , projName , duration, timeStart
        const userToSave = JSON.parse(JSON.stringify(this.props.loggedInUser));
        const key = moment().format('YYYY-MM-DD');
        const sessionToSave = {
            "timeStart": sessionStartTime,
            "duration": sessionDurationMins,
            "projectId": currProjectId
        };

        if (key in userToSave.sessions) {
            userToSave.sessions[key].push(sessionToSave)
        }
        else {
            userToSave.sessions[key] = []
            userToSave.sessions[key].push(sessionToSave)
        }
        // SET-USER
        this.props.saveUser(userToSave);
    }


    onStartBreak = () => {
        this.setState(prevState => ({ ...prevState, status: 'break', minutes: 0, seconds: 10 }))
        this.runTimer()
    }


    render() {
        const { minutes, seconds, isModalOpen, status } = this.state
        return (
            <div>
                {status === 'work'
                    ? <h3>on work session</h3>
                    : status === 'break' ? <h3>on a break</h3>
                        : status === 'off' ? <button onClick={() => this.onStartNewSession()}>Start</button> : <div></div>
                }

                {minutes === 0 && seconds === 0
                    ? (status === 'work' || status === 'break') ? <h3>done</h3> : <div></div>
                    : <div>
                        <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                        <button onClick={() => this.togglePause()}>Pause</button>
                    </div>
                }
                {isModalOpen && <Modal status={status}
                    toggleModal={this.toggleModal}
                    onStartNewSession={this.onStartNewSession}
                    onFinishSession={this.onFinishSession}
                    onStartBreak={this.onStartBreak} />}
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
    saveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
