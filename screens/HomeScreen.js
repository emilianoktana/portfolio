import React from 'react'
import {
    View, 
    Text,
    Slider,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import { DEFAULT_COLOR, LIGHT_BLUE_COLOR, WHITE_COLOR } from '../constants/Colors'

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
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <View>
                        <Text style={styles.bigText}>Select the risk level:</Text>
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
                        <Text style={styles.bigText}>Selected Risk: { this.props.riskState.riskLevel }</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.button} onPress={ () => {this.setState({ showChart: !this.state.showChart })} }>
                            <Text style={styles.buttonText}>
                                {!this.state.showChart ? 'Show Chart' : 'Show Table'}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        {this.showSelectedContentDisplay()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, { changeRiskLevel })(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DEFAULT_COLOR,
        paddingTop: 50
    },
    slider: {
        marginVertical: 20
    },
    content: {
        paddingHorizontal: 20
    },
    bigText: {
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30
    },
    button: {
        backgroundColor: LIGHT_BLUE_COLOR,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: WHITE_COLOR,
        fontSize: 16
    }
})