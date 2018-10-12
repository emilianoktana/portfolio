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
        }),
        valuesForTransfer: ''
    }

    setCurrentAmountValue = (amount, investment) => {   
        const newValues = this.state.tableValues.map(item => {
            if (item.investment === investment) {
                return {
                    investment: item.investment,
                    currentAmount: parseFloat(amount),
                    difference: item.difference,
                    newAmount: item.newAmount
                }
            }
            return { ...item }
        })
    
        this.setState({
            ...this.state, tableValues: newValues
        })
    }

    getTotalAmount = () => {
        let totalAmount = 0
        this.state.tableValues.forEach((element) => {
            totalAmount += element.currentAmount
        })
        return totalAmount
    }

    calculateDifferencesForEnteredAmounts = (totalAmount) => {
        const newValues = this.state.tableValues.map((item, index) => {
            var currentPercentage = ((item.currentAmount * 100) / totalAmount).toFixed(2)
            var idealPercentage = investmentsData.risks[this.props.riskState.riskLevel-1][index]
            var difference = 0
            var newAmount = 0

            if (idealPercentage > 0) {
                newAmount = ((idealPercentage * item.currentAmount) / currentPercentage).toFixed(2)
                difference = parseFloat((item.currentAmount - newAmount).toFixed(2))
            } else {
                difference = item.currentAmount
            }
            
            return {
                investment: item.investment,
                currentAmount: item.currentAmount,
                difference: difference,
                newAmount: newAmount
            }
        })

        const transfers = []

        this.setState({
            ...this.state, tableValues: newValues, valuesForTransfer: transfers
        })

        // Items that needs to remove all the amount
        var investmentsToRemoveAmount = newValues.filter(item => item.difference === item.currentAmount)
        // Items that needs a transfer
        var investmentsToAddAmount = newValues.filter(item => item.difference < 0)

        /*investmentsToRemoveAmount.forEach((toRemove) => {
            var firstInvestmentToAdd = investmentsToAddAmount[0]
            var transferAmount = 0

            while (toRemove.difference > 0) {
                if (toRemove.difference < Math.abs(firstInvestmentToAdd.difference)) {
                    transferAmount = toRemove.difference
                } else {
                    transferAmount = toRemove.difference - Math.abs(firstInvestmentToAdd.difference)
                }

                toRemove.difference = toRemove.difference - transferAmount
                transfers.push('Transfer ' + transferAmount + ' from ' + toRemove.investment + ' to ' + firstInvestmentToAdd.investment)

                if (firstInvestmentToAdd.newAmount === toRemove.difference + transferAmount) {
                    investmentsToAddAmount.shift()
                }
            }
        })*/
        
        console.log(transfers)
    }

    rebalanceAction = () => {
        // Get the total amount
        const totalAmount = this.getTotalAmount()
        // Calculate all the differences using the ideal percentages
        this.calculateDifferencesForEnteredAmounts(totalAmount)

    }

    renderIdealPercentagesRow = () => {
        return (
            <TableRow data={investmentsData.risks[this.props.riskState.riskLevel-1]}/>
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
                                                <TextInput style={styles.textInput} onChangeText={(text) => { this.setCurrentAmountValue(text, val) }} />
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <Text>
                                                    {(Math.abs(this.state.tableValues[index].difference) === this.state.tableValues[index].currentAmount) ? `-${Math.abs(this.state.tableValues[index].difference)}` : `+${Math.abs(this.state.tableValues[index].difference)}` }
                                                </Text>
                                            </View>
                                            <View style={commonStyles.cell}>
                                                <Text>
                                                    {this.state.tableValues[index].newAmount}
                                                </Text>
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