import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import investmentsData from '../../investmentsData'

import ChartView from 'react-native-highcharts'

import { connect } from 'react-redux'

class Chart extends React.Component {
    
    /*render () {
        const chart_wh = 250
        const { riskLevel } = this.props.riskState
        const series = investmentsData.risks[riskLevel]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

        return (
            <View>
                <PieChart
                    chart_wh={chart_wh}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />
                <View>
                    <Text>References</Text>
                    
                </View>
            </View>
        )
    }*/
    render () {
        const { riskLevel } = this.props.riskState
    
        var Highcharts='Highcharts'

        var conf = {
                chart: {
                    type: 'pie',
                    animation: Highcharts.svg,
                    marginRight: 10
                },
                title: {
                    text: 'Chart values'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
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
                    innerSize: '40%',
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
            <ChartView style={{height:300}} config={conf} options={options}></ChartView>
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