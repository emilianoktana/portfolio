import React from 'react'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView
} from 'react-native'

import { TableRow } from '../components/common/TableRow'

import investmentsData from '../investmentsData'

import { DEFAULT_COLOR } from '../constants/Colors'
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
                        <Text style={commonStyles.bigText}>Selected Risk Level: {this.props.riskState.riskLevel}</Text>
                        <View style={styles.topTable}>
                            <TableRow data={investmentsData.investments}/>
                            {this.renderIdealPercentagesRow()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    topTable: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(InvestmentsScreen)