import moment from 'moment';

export default {

    getProjNameById,
    calculateSessions,
    calculateSessionsForPie,
    sessionsToTime,
    averageCalc,
    chartDataBuilder,
    pieDataBuilder,
    weekDayDataBuilder,
    updateRank
}

function updateRank(user) {
    const sessionCount = calculateSessions(Date.now()-1000*60*60*24*6, Date.now(), user.sessions).sessionsCount
    
    switch (true) {
        case (sessionCount>=44):
            user.rank = 10 
            break;
        case (sessionCount>=40 && sessionCount<44):
            user.rank = 9 
            break;
        case (sessionCount>=36 && sessionCount<40):
            user.rank = 8 
            break;
        case (sessionCount>=32 && sessionCount<36):
            user.rank = 7
            break;
        case (sessionCount>=28 && sessionCount<32):
            user.rank = 6
            break;
        case (sessionCount>=24 && sessionCount<28):
            user.rank = 5
            break;
        case (sessionCount>=20 && sessionCount<24):
            user.rank = 4
            break;
        case (sessionCount>=16 && sessionCount<20):
            user.rank = 3
            break;
        case (sessionCount>=12 && sessionCount<16):
            user.rank = 2
            break;
        case (sessionCount>=8 && sessionCount<12):
            user.rank = 1
            break;
        default:
            user.rank = 0
            break;
    }
    console.log(sessionCount);
    console.log(user)

    return user
    
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





