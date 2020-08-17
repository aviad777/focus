import React, { Component } from 'react'

export default class Timer extends Component {
    state = {
        minutes: 300,
        seconds: 0,
        timeIsPaused: false
    }

    componentDidMount() {

        this.myInterval = setInterval(() => {
            const { seconds, minutes, timeIsPaused } = this.state
            if (timeIsPaused === false) {
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(this.myInterval)
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

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    togglePause = () => {
        this.setState(prevState => ({ ...prevState, timeIsPaused: !this.state.timeIsPaused }))
    }



    render() {
        const { minutes, seconds, timeIsPaused } = this.state
        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? <h1>Busted!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                <button onClick={() => this.togglePause()} >Pause</button>
            </div>

        )
    }
}