import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUsers, login } from '../actions/UserActions.js';
import WorkTimeByDayChart from '../components/chart/WorkTimeByDayChart.jsx'
import WorkTimeByProjectsPie from '../components/chart/WorkTimeByProjectsPie.jsx'
import moment from 'moment';
import data from '../data.js';

class Stats extends Component {
    state = {
        fromDate: "",
        toDate: "",
        // data: []
    }
    async componentDidMount() {
        await this.setState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
        // setTimeout(() => {
        //     this.setState({ data: this.chartDataBuilder(this.state.fromDate, this.state.toDate) });
        // }, 1500);
    }

    // componentDidUpdate(prevProps) {
    //     if (JSON.stringify(prevProps.loggedInUser) !== JSON.stringify(this.props.loggedInUser)) {

    //         this.setState({ data: this.chartDataBuilder(this.state.fromDate, this.state.toDate) });
    //     }
    // }

    // calculateDayWorkTime = (days) => {
    //     const date = moment(Date.now() - days * 1000 * 60 * 60 * 24).format('YYYY-MM-DD')
    //     return this.props.loggedInUser.sessions[date].length * 45;
    // }

    // gets date range return object : number of sessions and days 

    getProjNameById = (id) => {
        return this.props.loggedInUser.projects.find(proj => id === proj.id).name
    }

    calculateSessions = (from, to) => {
        let sessionsCount = 0;
        let daysCount = 0;
        const { sessions } = this.props.loggedInUser
        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            // console.log(i.format('YYYY-MM-DD'));
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
            // console.log(i.format('YYYY-MM-DD'));
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
        console.log('session count', sessionsCount);
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
        // console.log(daysCount, sessionsCount);

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
        const daysCount = this.calculateSessions(from, to).daysCount;

        for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
            var x = i.format('YYYY-MM-DD');
            var y = this.calculateSessions(i, i).sessionsCount;
            // console.log('data on loop is:', x, y);
            data[0].data.push({ x, y });
        }
        console.log('data is:', data);
        return data;
    }

    pieDataBuilder = (from, to) => {

        var data = [];
        var color = "hsl(110, 70%, 50%)";
        // const daysCount = this.calculateSessionsForPie(from, to).daysCount;
        const pieData = this.calculateSessionsForPie(from, to);
        console.log('pie data', pieData);
        // var sum = 0;
        for (const i in pieData.sessionsCount) {
            // sum += pieData[i];
            const id = this.getProjNameById(i);
            const label = id;
            const value = pieData.sessionsCount[i];
            data.push({ id, label, value, color });
        }
        console.log('pie data is', data);
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

        // console.log(sessionsCount, 'sessionsCount');
        // console.log(daysCount, 'daysCount');
        // console.log(hours, 'hours');
        // console.log(mins, 'mins');
        // console.log(avgHours, 'avgHours');
        // console.log(avgMins, 'avgMins');

        return <div>

            <p>Since {moment(this.state.fromDate).format('dddd')}, {moment(this.state.fromDate).format("MMM Do YYYY")} (29 days ago)
            to {moment(this.state.toDate).format('dddd')}, {moment(this.state.toDate).format("MMM Do YYYY")} (2 days ago),
            you have finished {sessionsCount} work sessions for a total of {hours ? hours + ' hours and ' + mins + ' minutes' : mins + ' minutes'}.
            This means you have been working {avgHours ? avgHours + ' hours and ' + avgMins + ' minutes' : avgMins + ' minutes'} per day on average (including today).
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
                {/* <p>So far your have worked today for {this.calculateDayWorkTime(0)} minutes.</p> */}
                <label htmlFor="fromDate">From: </label>
                <input type="date" name="fromDate" value={this.state.fromDate} onChange={(e) => { this.setState({ fromDate: e.target.value }) }} />
                <label htmlFor="toDate">To: </label>
                <input type="date" name="toDate" value={this.state.toDate} onChange={(e) => { this.setState({ toDate: e.target.value }) }} />
                {this.sessionSummary()}

                <WorkTimeByDayChart chartDataBuilder={this.chartDataBuilder} fromDate={this.state.fromDate} toDate={this.state.toDate} />
                <WorkTimeByProjectsPie pieDataBuilder={this.pieDataBuilder} fromDate={this.state.fromDate} toDate={this.state.toDate} />
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