import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import investmentsData from '../../investmentsData'

import PieChart from 'react-native-pie-chart';

import { connect } from 'react-redux'

class Chart extends React.Component {
    
    render () {
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