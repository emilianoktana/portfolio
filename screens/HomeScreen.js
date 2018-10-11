import React from 'react'
import {
    View, 
    Text,
    Slider,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import { defaultColor, lightBlueColor, whiteColor } from '../constants/Colors'

import { connect } from 'react-redux'

import { changeRiskLevel } from '../actions'

import RiskTable from '../components/home/RiskTable'

class HomeScreen extends React.Component {
    constructor (props) {
        super(props)

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
                        <TouchableHighlight style={styles.button}>
                            <Text style={styles.buttonText}>Show Table</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button}>
                            <Text style={styles.buttonText}>Show Chart</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <RiskTable />
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
        backgroundColor: defaultColor,
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
        backgroundColor: lightBlueColor,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: whiteColor,
        fontSize: 16
    }
})