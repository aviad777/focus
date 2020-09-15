import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import WorkTimeChart from '../components/chart/WorkTimeChart.jsx'
import WorkTimePie from '../components/chart/WorkTimePie.jsx'
import WorkTimeByWeekDay from '../components/chart/WorkTimeByWeekDay.jsx'
import moment from 'moment';
import StatsService from '../services/StatsService.js';


// gets the dates and calls the charts from the components using the NIVO charts library


class Stats extends Component {
    state = {
        fromDate: '',
        toDate: '',
    }

    async componentDidMount() {
        await this.setState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') });
    }




    // creates the text for stats
    SessionSummary = () => {
        const { fromDate, toDate } = this.state;
        const { sessions } = this.props.loggedInUser;
        const sessionsCount = StatsService.calculateSessions(fromDate, toDate, sessions).sessionsCount;
        const daysCount = StatsService.calculateSessions(fromDate, toDate, sessions).daysCount;

        const hours = StatsService.sessionsToTime(sessionsCount, 45).hours;
        const mins = StatsService.sessionsToTime(sessionsCount, 45).mins;
        const avgHours = StatsService.averageCalc(daysCount, sessionsCount, 45).hours;
        const avgMins = StatsService.averageCalc(daysCount, sessionsCount, 45).mins;


        return <div>
            <p>Since {moment(fromDate).format('dddd')}, {moment(fromDate).format("MMM Do YYYY")} ({moment().diff(moment(fromDate), 'days')} days ago)
            to {moment(toDate).format('dddd')}, {moment(toDate).format("MMM Do YYYY")} ({moment().diff(moment(this.state.toDate), 'days')} days ago),
            you have finished {sessionsCount} work sessions for a total of {hours ? hours + ' hour(s) and ' + mins + ' minutes' : mins + ' minutes'}.
            This means you have been working {avgHours ? avgHours + ' hour(s) and ' : ''} {Math.floor(avgMins) + ' minutes'} per day on average (including today).
            </p>
        </div>
    }



    render() {

        if (this.props.loggedInUser) {

            const { fromDate, toDate } = this.state;
            const { sessions } = this.props.loggedInUser;

            return this.props.loggedInUser && (
                <div>
                    <h2>Stats</h2>
                    <h4>{moment().format('dddd')}, {moment().format("MMM Do YYYY")}.</h4>
                    <label htmlFor="fromDate">From: </label>
                    <input type="date" name="fromDate" value={fromDate} onChange={(e) => { this.setState({ fromDate: e.target.value }) }} />
                    <label htmlFor="toDate">To: </label>
                    <input type="date" name="toDate" value={toDate} onChange={(e) => { this.setState({ toDate: e.target.value }) }} />
                    {this.SessionSummary()}
                    <WorkTimeChart chartDataBuilder={StatsService.chartDataBuilder} fromDate={fromDate} toDate={toDate} sessions={sessions} />
                    <WorkTimePie pieDataBuilder={StatsService.pieDataBuilder} fromDate={fromDate} toDate={toDate} user={this.props.loggedInUser} />
                    {moment(this.state.toDate).diff(moment(fromDate), 'days') >= 6 &&
                        <WorkTimeByWeekDay sessions={sessions} weekDayDataBuilder={StatsService.weekDayDataBuilder} fromDate={fromDate} toDate={toDate} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);