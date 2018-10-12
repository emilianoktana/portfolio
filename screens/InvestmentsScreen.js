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

    state = { 
        tableValues: investmentsData.investments.map((val, index) => {
            return ({
                investment: val,
                currentAmount: 0,
                difference: '',
                newAmount: 0
            })
        })
    }

    setCurrentAmountValue = (amount, investment) => {   
        console.log(amount)
        /*const newValues = this.state.tableValues.map(item => {
            if (item.investment === investment) {
                return {
                    investment: item.investment,
                    currentAmount: parseInt(amount),
                    difference: item.difference,
                    newAmount: item.newAmount
                }
            }
            return { ...item }
        })
        this.setState({
            ...this.state, tableValues: newValues
        })*/
    }

    renderIdealPercentagesRow = () => {
        return (
            <TableRow data={investmentsData.risks[this.props.riskState.riskLevel]}/>
        )
    }

    rebalanceAction = () => {
        console.log(this.state)
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
                                                <TextInput style={styles.textInput} onChange={(text) => { this.setCurrentAmountValue(text, val) }} />
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <Text></Text>
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <Text></Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={commonStyles.blueButton} onPress={this.rebalanceAction}>
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