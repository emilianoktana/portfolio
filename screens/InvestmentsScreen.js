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
            var currentPercentage = ((item.currentAmount * 100) / totalAmount).toFixed(1)
            var idealPercentage = investmentsData.risks[this.props.riskState.riskLevel-1][index]
            var difference = 0
            var newAmount = 0

            if (idealPercentage > 0) {
                newAmount = ((idealPercentage * item.currentAmount) / currentPercentage).toFixed(1)
                difference = parseFloat((item.currentAmount - newAmount).toFixed(1))
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
    
        investmentsToRemove.sort((a, b) => (a.difference) - (b.difference)).reverse()
        investmentsToAdd.sort((a, b) => (a.difference) - (b.difference))
        
        investmentsToAdd.forEach((toAdd) => {
            var index = 0
            
            while (toAdd.difference < 0 && investmentsToRemove.length > index) {
                if ((toAdd.difference + investmentsToRemove[index].difference) > 0) {
                    recommendedTransfers.push(`- Transfer ${Math.abs(toAdd.difference).toFixed(1)} from ${toAdd.investment} to ${investmentsToRemove[index].investment}`)
                    investmentsToRemove[index].difference =  toAdd.difference + investmentsToRemove[index].difference
                    toAdd.difference = 0
                } else if (investmentsToRemove[index].difference > 0) {
                    recommendedTransfers.push(`- Transfer ${investmentsToRemove[index].difference.toFixed(1)} from ${investmentsToRemove[index].investment} to ${toAdd.investment}`)
                    toAdd.difference = toAdd.difference + investmentsToRemove[index].difference
                    investmentsToRemove[index].difference = 0
                }
                index++
            }
            
        })

        /*investmentsToRemove.forEach((toRemove) => {
            
            // Get the first investment I can remove money from
            var first = investmentsToAdd[0]
            // Get the total amount I must transfer
            var firstTotalTransfer = first.difference
            // Get the total amount I have to transfer for this investment (toRemove)
            var toRemoveAmount = toRemove.difference
            // Calculate Investment
            
            if (first.investment === 'Insurance') {
                console.log('pepe')
            }

            var calculatedInvestment = (firstTotalTransfer + toRemoveAmount)

            // If its < 0, I have to add more money to achieve the ideal amount
            if (calculatedInvestment < 0) {
                // Register a new transfer
                recommendedTransfers.push(`- Transfer ${toRemoveAmount.toFixed(1)} from ${toRemove.investment} to ${first.investment}`)
                // Update the values
                toRemove.difference = 0
                first.difference = calculatedInvestment
                
                while (toRemove.difference > 0 && investmentsToAdd.length > 0) {
                    calculatedInvestment = (firstTotalTransfer + toRemove.difference)
                    if (calculatedInvestment < 0) {
                        recommendedTransfers.push(`- Transfer ${toRemove.difference.toFixed(1)} from ${toRemove.investment} to ${first.investment}`)
                    } else {
                       investmentsToAdd.shift()
                    }
                }
            } else {
                let amount = toRemoveAmount - calculatedInvestment
                recommendedTransfers.push(`- Transfer ${amount.toFixed(1)} from ${toRemove.investment} to ${first.investment}`)
                toRemove.difference = toRemove.difference - amount
                
                first.difference = 0
            }
            
        })*/
        
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
                                <TouchableHighlight style={commonStyles.blueButton} onPress={this.rebalanceAction}>
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