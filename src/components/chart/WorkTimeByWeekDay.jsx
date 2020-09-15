import React, { Component } from 'react'

import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
class WorkTimeByWeekDay extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        this.setState({ data: this.props.weekDayDataBuilder(this.props.fromDate, this.props.toDate) });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.fromDate) !== JSON.stringify(this.props.fromDate) || JSON.stringify(prevProps.toDate) !== JSON.stringify(this.props.toDate)) {

            this.setState({ data: this.props.weekDayDataBuilder(this.props.fromDate, this.props.toDate) });
        }
    }

    render() {
        return <div className="chart">

            <ResponsiveBar
                data={this.state.data}
                keys={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
                indexBy='weekday'
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                layout="horizontal"
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'weekdays',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    }
}

export default WorkTimeByWeekDay;

// const data = [
//     {
//       "weekday": "Sunday",
//       "Sunday": 76
//     },
//     {
//       "weekday": "Monday",
//       "Monday": 157
//     },
//     {
//       "country": "AF",
//       "hot dog": 26,
//       "hot dogColor": "hsl(352, 70%, 50%)",
//       "burger": 113,
//       "burgerColor": "hsl(146, 70%, 50%)",
//       "sandwich": 64,
//       "sandwichColor": "hsl(318, 70%, 50%)",
//       "kebab": 65,
//       "kebabColor": "hsl(86, 70%, 50%)",
//       "fries": 1,
//       "friesColor": "hsl(254, 70%, 50%)",
//       "donut": 129,
//       "donutColor": "hsl(220, 70%, 50%)"
//     },
//     {
//       "country": "AG",
//       "hot dog": 199,
//       "hot dogColor": "hsl(133, 70%, 50%)",
//       "burger": 42,
//       "burgerColor": "hsl(213, 70%, 50%)",
//       "sandwich": 115,
//       "sandwichColor": "hsl(51, 70%, 50%)",
//       "kebab": 127,
//       "kebabColor": "hsl(47, 70%, 50%)",
//       "fries": 50,
//       "friesColor": "hsl(91, 70%, 50%)",
//       "donut": 74,
//       "donutColor": "hsl(129, 70%, 50%)"
//     },
//     {
//       "country": "AI",
//       "hot dog": 158,
//       "hot dogColor": "hsl(136, 70%, 50%)",
//       "burger": 136,
//       "burgerColor": "hsl(88, 70%, 50%)",
//       "sandwich": 161,
//       "sandwichColor": "hsl(281, 70%, 50%)",
//       "kebab": 37,
//       "kebabColor": "hsl(201, 70%, 50%)",
//       "fries": 191,
//       "friesColor": "hsl(253, 70%, 50%)",
//       "donut": 58,
//       "donutColor": "hsl(202, 70%, 50%)"
//     },
//     {
//       "country": "AL",
//       "hot dog": 88,
//       "hot dogColor": "hsl(212, 70%, 50%)",
//       "burger": 28,
//       "burgerColor": "hsl(98, 70%, 50%)",
//       "sandwich": 58,
//       "sandwichColor": "hsl(122, 70%, 50%)",
//       "kebab": 22,
//       "kebabColor": "hsl(97, 70%, 50%)",
//       "fries": 26,
//       "friesColor": "hsl(277, 70%, 50%)",
//       "donut": 123,
//       "donutColor": "hsl(324, 70%, 50%)"
//     },
//     {
//       "country": "AM",
//       "hot dog": 185,
//       "hot dogColor": "hsl(138, 70%, 50%)",
//       "burger": 88,
//       "burgerColor": "hsl(59, 70%, 50%)",
//       "sandwich": 61,
//       "sandwichColor": "hsl(328, 70%, 50%)",
//       "kebab": 45,
//       "kebabColor": "hsl(168, 70%, 50%)",
//       "fries": 119,
//       "friesColor": "hsl(255, 70%, 50%)",
//       "donut": 137,
//       "donutColor": "hsl(185, 70%, 50%)"
//     }
//   ]