import moment from 'moment';

export default {

    getProjNameById,
    calculateSessions,
    calculateSessionsForPie,
    sessionsToTime,
    averageCalc,
    chartDataBuilder,
    pieDataBuilder,
    weekDayDataBuilder
}


function getProjNameById(id, projects) {
    return projects.find(proj => id === proj.id).name;
}

// gets date range return object : number of sessions and days 
function calculateSessions(from, to, sessions) {
    let sessionsCount = 0;
    let daysCount = 0;
    // const { sessions } = this.props.loggedInUser
    for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
        sessionsCount += sessions[i.format('YYYY-MM-DD')] ? sessions[i.format('YYYY-MM-DD')].length : 0;
        daysCount += 1
    }
    return { sessionsCount, daysCount }
}



// gets date range return object : number of sessions and days 
function calculateSessionsForPie(from, to, sessions) {
    let sessionsCount = {};
    let daysCount = 0;
    // const { sessions } = this.props.loggedInUser
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
function sessionsToTime(sessionsCount, duration) {
    const totalMins = sessionsCount * duration
    const mins = (totalMins % 60)
    const hours = Math.floor(totalMins / 60)
    // return `${hours} hours ${mins? `and ${mins} minutes` :''}`
    return { hours, mins }
}

// gets number of days and sessions returns AVERAGE hours and minutes object
function averageCalc(daysCount, sessionsCount, duration) {
    const averageMins = sessionsCount * duration / daysCount
    let mins = averageMins
    let hours = 0
    if (averageMins >= 60) {
        mins = (averageMins % 60)
        hours = Math.floor(averageMins / 60)
    }
    return { hours, mins }
}


// gets dates and the sessions and creates the data object for nivo 
// (x is the date, and y is the session's count)

function chartDataBuilder(from, to, sessions) {
    var data = [];
    var id = "all proj";
    var color = "hsl(110, 70%, 50%)";
    data.push({ id, color, data: [] })
    for (let i = moment(from); i.isSameOrBefore(moment(to)); i = i.add(1, 'days')) {
        var x = i.format('YYYY-MM-DD');
        var y = calculateSessions(i, i, sessions).sessionsCount;
        data[0].data.push({ x, y });
    }
    return data;
}



// gets dates and the user and creates the data object for nivo 
// (id, label, value, color )
function pieDataBuilder(from, to, user) {

    var data = [];
    var color = "hsl(110, 70%, 50%)";
    const pieData = calculateSessionsForPie(from, to, user.sessions);
    for (const i in pieData.sessionsCount) {
        // sum += pieData[i];
        const id = getProjNameById(i, user.projects);
        const label = id;
        const value = pieData.sessionsCount[i];
        data.push({ id, label, value, color });
    }
    return data;
}

// gets dates and the user sessions and creates the data array for nivo 
// (each day of the week and the avarage number of seesions )
function weekDayDataBuilder(from, to, sessions) {
    var data = [];
    var week = { 'Sunday': [], 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [] };
    // const { sessions } = this.props.loggedInUser

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





