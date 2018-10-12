import React from 'react'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableHighlight
} from 'react-native'

import { TableRow } from '../components/common/TableRow'

import investmentsData from '../investmentsData'

import { WHITE_COLOR } from '../constants/Colors'
import { commonStyles } from '../constants/CommonStyles'

import { connect } from 'react-redux'
class InvestmentsScreen extends React.Component {

    renderIdealPercentagesRow = () => {
        return (
            <TableRow data={investmentsData.risks[this.props.riskState.riskLevel]}/>
        )
    }

    render () {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <ScrollView style={commonStyles.content}>
                        <Text style={commonStyles.bigText}>Risk Level: {this.props.riskState.riskLevel}</Text>
                        <View style={styles.table}>
                            <TableRow data={investmentsData.investments}/>
                            {this.renderIdealPercentagesRow()}
                        </View>
                        <View>
                            <Text style={commonStyles.bigText}>Enter your current porfolio:</Text>
                            <View style={styles.table}>
                                <TableRow data={['Current $', 'Diff', 'New $']} />
                                {investmentsData.investments.map((val, index) => {
                                    return (
                                        <View key={index} style={commonStyles.containerCell}>
                                            <View style={commonStyles.cell}>
                                                <Text style={commonStyles.smallText}>{ val }</Text>
                                                <TextInput style={styles.textInput}/>
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <TextInput style={styles.textInput}/>
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <TextInput style={styles.textInput}/>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={commonStyles.blueButton}>
                                    <Text style={commonStyles.blueButtonText}>
                                        Rebalance
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    table: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderWidth: 1,
        padding: 5,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        width: 100,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    }
})

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(InvestmentsScreen)