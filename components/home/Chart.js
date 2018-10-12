import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import investmentsData from '../../investmentsData'

import ChartView from 'react-native-highcharts'

import { connect } from 'react-redux'

class Chart extends React.Component {

    render () {
        const { riskLevel } = this.props.riskState

        const chartConfig = {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Chart values'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            distance: -40,
                            color: 'white'
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
                        y: -10
                    },
                    data: (function () {
                        let data = []
                        const values = investmentsData.risks[riskLevel-1]
                        const labels = investmentsData.investments
                        
                        for (let i = 0; i <= values.length; i++) {
                            data.push([labels[i] + ' ' + values[i] + '%', values[i]])
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
            <ChartView style={{ height:500 }} config={chartConfig} options={options} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    }
  });

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(Chart)