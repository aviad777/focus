import React, { Component } from 'react'


export default function Modal({ status, toggleModal, onStartNewSession, onFinishSession, onStartBreak }) {

    const startNewSession = () => {
        toggleModal();
        onStartNewSession();
    }
    const finishSession = () => {
        toggleModal();
        onFinishSession();
    }
    const startBreak = () => {
        toggleModal();
        onStartBreak();
    }

    if (status === 'break') {
        return <div>
            <h3>GOOD JOB! Let's start a new session</h3>
            <button onClick={() => startNewSession()}>Ok let's go</button>
            <button onClick={() => finishSession()}>No Thanks</button>
        </div>
    }
    if (status === 'work') {
        return <div>
            <h3>GOOD JOB! Let's start a new session</h3>
            <button onClick={() => startBreak()}>Take a Break</button>
            <button onClick={() => startNewSession()}>Skip Break, start another session</button>
        </div>
    }
}

