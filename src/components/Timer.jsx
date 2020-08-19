import React, { Component } from 'react'
import Modal from './Modal'

export default class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
        timeIsPaused: false,
        status: 'off',
        isModalOpen: false
    }

    componentDidMount() {
        this.runTimer();
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
                        }
                        else if (status === 'break') {
                            // Modal - confirm: start next session?
                            this.toggleModal();
                        }
                        else if (status === 'off') {
                            // Modal - confirm: start next session?
                            console.log('hello');
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
        this.setState(prevState => ({ ...prevState, status: 'work', minutes: 0, seconds: 10 }))
        this.runTimer()
        console.log(this.state);
    }

    onFinishSession = () => {
        this.setState(prevState => ({ ...prevState, status: 'off' }))
    }

    onStartBreak = () => {
        this.setState(prevState => ({ ...prevState, status: 'break', minutes: 0, seconds: 10 }))
        this.runTimer()
    }

    render() {
        const { minutes, seconds, timeIsPaused, isModalOpen, status } = this.state
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