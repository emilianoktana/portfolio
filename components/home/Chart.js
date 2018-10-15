import React from 'react'
import { Dimensions } from 'react-native'
import investmentsData from '../../investmentsData'

import ChartView from 'react-native-highcharts'

import { connect } from 'react-redux'

class Chart extends React.Component {

    render () {
        const { riskLevel } = this.props.riskState
        const windowWidth = Dimensions.get('window').width - 40
        
        const chartConfig = {
                chart: {
                    type: 'pie',
                    width: windowWidth
                },
                title: {
                    text: 'Chart values'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            distance: -40,
                            color: 'white',
                            style: { fontSize: 13 }
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Risk Percentage',
                    innerSize: '30%',
                    animation: {
                        duration: 500,
                    },
                    dataLabels: {
                        enabled: true,
                        y: -5
                    },
                    data: (function () {
                        let data = []
                        const values = investmentsData.risks[riskLevel-1]
                        const labels = investmentsData.investments
                        
                        for (let i = 0; i <= values.length-1; i++) {
                            data.push([labels[i].substr(0, 3) + ' ' + values[i] + '%', values[i]])
                        }
                        return data
                    }())
                }]
        }
 
        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        }

        return (
            <ChartView style={{ height: 500, width: windowWidth }} config={chartConfig} options={options} />
        )
    }
}

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(Chart)