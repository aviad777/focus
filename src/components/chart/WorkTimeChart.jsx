import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'



// gets dates and renders a chart for the user with the number of minutes worked on each project




class WorkTimeChart extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        const { chartDataBuilder, fromDate, toDate, sessions } = this.props;
        this.setState({ data: chartDataBuilder(fromDate, toDate, sessions) });
    }

    componentDidUpdate(prevProps) {
        const { chartDataBuilder, fromDate, toDate, sessions } = this.props;
        if (JSON.stringify(prevProps.fromDate) !== JSON.stringify(fromDate) || JSON.stringify(prevProps.toDate) !== JSON.stringify(toDate)) {

            this.setState({ data: chartDataBuilder(fromDate, toDate, sessions) });
        }
    }
    render() {
        return (
            <div className="chart">
                <ResponsiveLine
                    data={this.state.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        useUTC: false,
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                        stacked: false,
                    }}
                    axisLeft={{
                        legend: 'linear scale',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 2 days',
                        legend: 'time scale',
                        legendOffset: -12,
                    }}
                    curve='monotoneX'
                    enablePointLabel={true}
                    // pointSymbol={CustomSymbol}
                    pointSize={16}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    useMesh={true}
                    enableSlices={false}
                />
            </div>
        )
    }
}
export default WorkTimeChart;




