
import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

class WorkTimePie extends Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const { pieDataBuilder, fromDate, toDate, user } = this.props;
        this.setState({ data: pieDataBuilder(fromDate, toDate, user) });
    }

    componentDidUpdate(prevProps) {
        const { pieDataBuilder, fromDate, toDate, user } = this.props;
        if (JSON.stringify(prevProps.fromDate) !== JSON.stringify(fromDate) || JSON.stringify(prevProps.toDate) !== JSON.stringify(toDate)) {

            this.setState({ data: pieDataBuilder(fromDate, toDate, user) });
        }
    }

    render() {
        return (
            <div className="chart" >
                <ResponsivePie
                    width={900}
                    height={500}
                    data={this.state.data}
                    animate={true}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    motionStiffness={90}
                    motionDamping={15}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                />
            </div>
        )
    }
}
export default WorkTimePie;
