import React from 'react'
import {
    View, 
    Text,
    Slider,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    SafeAreaView
} from 'react-native'

import { DEFAULT_COLOR, LIGHT_BLUE_COLOR, WHITE_COLOR } from '../constants/Colors'
import { commonStyles } from '../constants/CommonStyles'

import { connect } from 'react-redux'

import { changeRiskLevel } from '../actions'

import RiskTable from '../components/home/RiskTable'
import Chart from '../components/home/Chart'

class HomeScreen extends React.Component {
    state = {
        showChart: false
    }

    showSelectedContentDisplay = () => {
        return (!this.state.showChart) ? <RiskTable /> : <Chart />
    }

    render () {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <ScrollView style={commonStyles.content}>
                        <View>
                            <Text style={commonStyles.bigText}>Select the risk level:</Text>
                            <Slider
                            minimumValue={1}
                            maximumValue={10}
                            style={styles.slider}
                            step={1}
                            value={this.props.riskState.riskLevel}
                            onValueChange={val => { this.props.changeRiskLevel(val) }}
                            />
                        </View>
                        <View>
                            <Text style={commonStyles.bigText}>Selected Risk: { this.props.riskState.riskLevel }</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={commonStyles.blueButton} onPress={ () => {this.setState({ showChart: !this.state.showChart })} }>
                                <Text style={commonStyles.blueButtonText}>
                                    {!this.state.showChart ? 'Show Chart' : 'Show Table'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View>
                            {this.showSelectedContentDisplay()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, { changeRiskLevel })(HomeScreen)

const styles = StyleSheet.create({
    slider: {
        marginVertical: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 30
    }
})