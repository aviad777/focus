import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import WorkTimeByDayChart from '../components/chart/WorkTimeByDayChart.jsx'
import WorkTimeByProjectsPie from '../components/chart/WorkTimeByProjectsPie.jsx'
import WorkTimeByWeekDay from '../components/chart/WorkTimeByWeekDay.jsx'
import moment from 'moment';

class Stats extends Component {
    state = {
        fromDate: "",
        toDate: "",
    }
    async componentDidMount() {
        await this.setState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
    }

    getProjNameById = (id) => {
        return this.props.loggedInUser.projects.find(proj => id === proj.id).name
    }
    
    // gets date range return object : number of sessions and days 
    calculateSessions = (from, to) => {
        let sessionsCount = 0;
        let daysCount = 0;
        const { sessions } = this.props.loggedInUser
        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            sessionsCount += sessions[i.format('YYYY-MM-DD')] ? sessions[i.format('YYYY-MM-DD')].length : 0;
            daysCount += 1
        }
        return { sessionsCount, daysCount }
    }
    // gets date range return object : number of sessions and days 
    calculateSessionsForPie = (from, to, projectId) => {
        let sessionsCount = {};
        let daysCount = 0;
        const { sessions } = this.props.loggedInUser
        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            if (sessions[i.format('YYYY-MM-DD')]) {
                sessions[i.format('YYYY-MM-DD')].forEach(session => {
                    if (sessionsCount[session.projectId])
                        sessionsCount[session.projectId]++;
                    else
                        sessionsCount[session.projectId] = 1;
                });

            }
            daysCount += 1
        }
        return { sessionsCount, daysCount }
    }
    //  gets number of session returns hours and minutes object
    sessionsToTime = (sessionsCount, duration) => {
        const totalMins = sessionsCount * duration
        const mins = (totalMins % 60)
        const hours = Math.floor(totalMins / 60)
        // return `${hours} hours ${mins? `and ${mins} minutes` :''}`
        return { hours, mins }
    }

    // gets number of days and sessions returns AVERAGE hours and minutes object
    averageCalc = (daysCount, sessionsCount, duration) => {
        const averageMins = sessionsCount * duration / daysCount
        let mins = averageMins
        let hours = 0
        if (averageMins >= 60) {
            mins = (averageMins % 60)
            hours = Math.floor(averageMins / 60)
        }
        return { hours, mins }
    }

    chartDataBuilder = (from, to) => {
        var data = [];
        var id = "all proj";
        var color = "hsl(110, 70%, 50%)";

        data.push({ id, color, data: [] })

        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            var x = i.format('YYYY-MM-DD');
            var y = this.calculateSessions(i, i).sessionsCount;
            data[0].data.push({ x, y });
        }
        return data;
    }

    pieDataBuilder = (from, to) => {

        var data = [];
        var color = "hsl(110, 70%, 50%)";
        const pieData = this.calculateSessionsForPie(from, to);
        for (const i in pieData.sessionsCount) {
            // sum += pieData[i];
            const id = this.getProjNameById(i);
            const label = id;
            const value = pieData.sessionsCount[i];
            data.push({ id, label, value, color });
        }
        return data;
    }

    weekDayDataBuilder = (from, to) => {
        var data = [];
        var week = { 'Sunday': [], 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [] };
        const { sessions } = this.props.loggedInUser

        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            const key = moment(i).format('dddd');
            if (sessions[i.format('YYYY-MM-DD')]) {
                const sessionCount = sessions[i.format('YYYY-MM-DD')].length
                week[key].push(sessionCount)
            }
            else {
                week[key].push(0)
            }
        }

        for (var day in week) {
            week[day] = week[day].length ? (week[day].reduce((a, b) => a + b) / week[day].length).toFixed(1) : 0;
        }

        for (day in week) {
            const dayToPush = { "weekday": day, [day]: week[day] }
            data.push(dayToPush)
        }
        
        return data;
    }


    // creates the text for stats
    sessionSummary = () => {
        const sessionsCount = this.calculateSessions(this.state.fromDate, this.state.toDate).sessionsCount;
        const daysCount = this.calculateSessions(this.state.fromDate, this.state.toDate).daysCount;

        const hours = this.sessionsToTime(sessionsCount, 45).hours;
        const mins = this.sessionsToTime(sessionsCount, 45).mins;

        const avgHours = this.averageCalc(daysCount, sessionsCount, 45).hours
        const avgMins = this.averageCalc(daysCount, sessionsCount, 45).mins

        return <div>

            <p>Since {moment(this.state.fromDate).format('dddd')}, {moment(this.state.fromDate).format("MMM Do YYYY")} ({moment().diff(moment(this.state.fromDate), 'days')} days ago)
            to {moment(this.state.toDate).format('dddd')}, {moment(this.state.toDate).format("MMM Do YYYY")} ({moment().diff(moment(this.state.toDate), 'days')} days ago),
            you have finished {sessionsCount} work sessions for a total of {hours ? hours + ' hour(s) and ' + mins + ' minutes' : mins + ' minutes'}.
            This means you have been working {avgHours ? avgHours + ' hour(s) and ' : ''} {Math.floor(avgMins) + ' minutes'} per day on average (including today).
            </p>

        </div>
    }
    render() {
        this.props.loggedInUser && (this.chartDataBuilder(this.state.fromDate, this.state.toDate));
        this.props.loggedInUser && (this.pieDataBuilder(this.state.fromDate, this.state.toDate));

        return this.props.loggedInUser && (
            <div>
                <h2>Stats</h2>
                <h4>{moment().format('dddd')}, {moment().format("MMM Do YYYY")}.</h4>
                <label htmlFor="fromDate">From: </label>
                <input type="date" name="fromDate" value={this.state.fromDate} onChange={(e) => { this.setState({ fromDate: e.target.value }) }} />
                <label htmlFor="toDate">To: </label>
                <input type="date" name="toDate" value={this.state.toDate} onChange={(e) => { this.setState({ toDate: e.target.value }) }} />
                {this.sessionSummary()}
                <WorkTimeByDayChart chartDataBuilder={this.chartDataBuilder} fromDate={this.state.fromDate} toDate={this.state.toDate} />
                <WorkTimeByProjectsPie pieDataBuilder={this.pieDataBuilder} fromDate={this.state.fromDate} toDate={this.state.toDate} />
                {moment(this.state.toDate).diff(moment(this.state.fromDate), 'days')>=6 &&
                    <WorkTimeByWeekDay weekDayDataBuilder={this.weekDayDataBuilder} fromDate={this.state.fromDate} toDate={this.state.toDate} />}
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