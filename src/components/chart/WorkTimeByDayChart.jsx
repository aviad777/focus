import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'

class WorkTimeByDayChart extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        // await this.setState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
        // setTimeout(() => {
        this.setState({ data: this.props.chartDataBuilder(this.props.fromDate, this.props.toDate) });
        // }, 1500);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.fromDate) !== JSON.stringify(this.props.fromDate) || JSON.stringify(prevProps.toDate) !== JSON.stringify(this.props.toDate)) {

            this.setState({ data: this.props.chartDataBuilder(this.props.fromDate, this.props.toDate) });
        }
    }
    render() {
        console.log(this.state.data)
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
export default WorkTimeByDayChart;




