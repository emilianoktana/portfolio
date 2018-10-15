import React from 'react'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView
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
        transfers: []
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
            var currentPercentage = (item.currentAmount === 0 ? 0 : ((item.currentAmount * 100) / totalAmount)).toFixed(1)
            var idealPercentage = investmentsData.risks[this.props.riskState.riskLevel-1][index]
            var difference = 0
            var newAmount = 0

            if (idealPercentage > 0) {
                if (currentPercentage == 0) {
                    newAmount = ((idealPercentage * totalAmount) / 100)
                    difference = -Math.abs(newAmount)
                } else {
                    newAmount = ((idealPercentage * item.currentAmount) / currentPercentage).toFixed(1)
                    difference = parseFloat((item.currentAmount - newAmount).toFixed(1))
                }
                
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

        this.setState({ ...this.state, tableValues: newValues }, () => this.calculateTransfers())
    }

    calculateTransfers = () => {
        const investmentsToRemove = []
        const investmentsToAdd = []
        const recommendedTransfers = []
        const { tableValues } = this.state

        // Separate the categories that I need to add $ from the ones that I need to remove $
        tableValues.map((item) => {
            if (item.difference < 0) {
                investmentsToAdd.push({ ...item })
            } else {
                investmentsToRemove.push({ ...item })
            }
        })

        // Sort both arrays
        investmentsToRemove.sort((a, b) => (a.difference) - (b.difference)).reverse()
        investmentsToAdd.sort((a, b) => (a.difference) - (b.difference))
        
        // Loop the investments I must add money
        investmentsToAdd.forEach((toAdd) => {
            var index = 0

            // While the account has money, transfer it to another
            while (toAdd.difference < 0 && investmentsToRemove.length > index) {
                // The value I can transfer is bigger than the amount I need
                if ((toAdd.difference + investmentsToRemove[index].difference) > 0) {
                    // Register the transfer
                    recommendedTransfers.push(`- Transfer ${Math.abs(toAdd.difference).toFixed(1)} from ${investmentsToRemove[index].investment} to ${toAdd.investment}`)
                    // Update the values 
                    investmentsToRemove[index].difference =  toAdd.difference + investmentsToRemove[index].difference
                    toAdd.difference = 0
                } else if (investmentsToRemove[index].difference > 0) {
                    // The value I can transfer is smaller than the amount I need to transfer, so I transfer all the money
                    // Register the transfer
                    recommendedTransfers.push(`- Transfer ${investmentsToRemove[index].difference.toFixed(1)} from ${investmentsToRemove[index].investment} to ${toAdd.investment}`)
                    // Update the values
                    toAdd.difference = toAdd.difference + investmentsToRemove[index].difference
                    investmentsToRemove[index].difference = 0
                }
                index++
            }
            
        })
        
        // Set the transfers on the state so I can show them in the UI
        this.setState({ ...this.state, transfers: recommendedTransfers })
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
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
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
                                                        {(this.state.tableValues[index].difference < 0) ? `+${Math.abs(this.state.tableValues[index].difference)}` : `-${Math.abs(this.state.tableValues[index].difference)}` }
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
                                    <TouchableHighlight style={commonStyles.blueButton} disable={!this.state.inputsCompleted} onPress={this.rebalanceAction}>
                                        <Text style={commonStyles.blueButtonText}>
                                            Rebalance
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.transfersContainer}>
                                    {this.state.transfers.map((val, index) => {
                                        return (
                                            <Text style={styles.transferText} key={index}>{val}</Text>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        width: 100,
        height: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    transfersContainer: {
        backgroundColor: WHITE_COLOR,
        marginTop: 20
    },
    transferText: {
        lineHeight: 20
    }
})

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(InvestmentsScreen)