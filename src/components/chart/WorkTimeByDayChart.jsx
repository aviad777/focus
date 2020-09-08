import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'

// import data from '../../data'
// const data = [
//     {
//         "id": "japan",
//         "color": "hsl(110, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 153
//             },
//             {
//                 "x": "helicopter",
//                 "y": 149
//             },
//             {
//                 "x": "boat",
//                 "y": 252
//             },
//             {
//                 "x": "train",
//                 "y": 225
//             },
//             {
//                 "x": "subway",
//                 "y": 217
//             },
//             {
//                 "x": "bus",
//                 "y": 89
//             },
//             {
//                 "x": "car",
//                 "y": 178
//             },
//             {
//                 "x": "moto",
//                 "y": 249
//             },
//             {
//                 "x": "bicycle",
//                 "y": 55
//             },
//             {
//                 "x": "horse",
//                 "y": 24
//             },
//             {
//                 "x": "skateboard",
//                 "y": 78
//             },
//             {
//                 "x": "others",
//                 "y": 85
//             }
//         ]
//     },
//     {
//         "id": "france",
//         "color": "hsl(13, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 81
//             },
//             {
//                 "x": "helicopter",
//                 "y": 213
//             },
//             {
//                 "x": "boat",
//                 "y": 262
//             },
//             {
//                 "x": "train",
//                 "y": 269
//             },
//             {
//                 "x": "subway",
//                 "y": 88
//             },
//             {
//                 "x": "bus",
//                 "y": 225
//             },
//             {
//                 "x": "car",
//                 "y": 178
//             },
//             {
//                 "x": "moto",
//                 "y": 223
//             },
//             {
//                 "x": "bicycle",
//                 "y": 27
//             },
//             {
//                 "x": "horse",
//                 "y": 298
//             },
//             {
//                 "x": "skateboard",
//                 "y": 184
//             },
//             {
//                 "x": "others",
//                 "y": 224
//             }
//         ]
//     },
//     {
//         "id": "us",
//         "color": "hsl(112, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 88
//             },
//             {
//                 "x": "helicopter",
//                 "y": 86
//             },
//             {
//                 "x": "boat",
//                 "y": 174
//             },
//             {
//                 "x": "train",
//                 "y": 146
//             },
//             {
//                 "x": "subway",
//                 "y": 280
//             },
//             {
//                 "x": "bus",
//                 "y": 193
//             },
//             {
//                 "x": "car",
//                 "y": 26
//             },
//             {
//                 "x": "moto",
//                 "y": 7
//             },
//             {
//                 "x": "bicycle",
//                 "y": 277
//             },
//             {
//                 "x": "horse",
//                 "y": 40
//             },
//             {
//                 "x": "skateboard",
//                 "y": 245
//             },
//             {
//                 "x": "others",
//                 "y": 238
//             }
//         ]
//     },
//     {
//         "id": "germany",
//         "color": "hsl(333, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 264
//             },
//             {
//                 "x": "helicopter",
//                 "y": 187
//             },
//             {
//                 "x": "boat",
//                 "y": 292
//             },
//             {
//                 "x": "train",
//                 "y": 208
//             },
//             {
//                 "x": "subway",
//                 "y": 298
//             },
//             {
//                 "x": "bus",
//                 "y": 176
//             },
//             {
//                 "x": "car",
//                 "y": 42
//             },
//             {
//                 "x": "moto",
//                 "y": 209
//             },
//             {
//                 "x": "bicycle",
//                 "y": 237
//             },
//             {
//                 "x": "horse",
//                 "y": 175
//             },
//             {
//                 "x": "skateboard",
//                 "y": 75
//             },
//             {
//                 "x": "others",
//                 "y": 108
//             }
//         ]
//     },
//     {
//         "id": "norway",
//         "color": "hsl(100, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 203
//             },
//             {
//                 "x": "helicopter",
//                 "y": 60
//             },
//             {
//                 "x": "boat",
//                 "y": 90
//             },
//             {
//                 "x": "train",
//                 "y": 166
//             },
//             {
//                 "x": "subway",
//                 "y": 8
//             },
//             {
//                 "x": "bus",
//                 "y": 0
//             },
//             {
//                 "x": "car",
//                 "y": 35
//             },
//             {
//                 "x": "moto",
//                 "y": 222
//             },
//             {
//                 "x": "bicycle",
//                 "y": 217
//             },
//             {
//                 "x": "horse",
//                 "y": 208
//             },
//             {
//                 "x": "skateboard",
//                 "y": 97
//             },
//             {
//                 "x": "others",
//                 "y": 260
//             }
//         ]
//     }
// ]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.



class Chart extends Component {

    render() {
        return (
            <div className="chart">
                <ResponsiveLine
                    data={this.props.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'dark2' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        )
    }






}
export default Chart;





