import React from 'react'
import { View } from 'react-native'

import investmentsData from '../../investmentsData'

import { connect } from 'react-redux'

import { TableRow } from '../common/TableRow'

class RiskTable extends React.Component {

    renderRow = () => {
        const tableContentItems = investmentsData.risks
        const { riskLevel } = this.props.riskState
        let tableRows = []

        for (var i = 0; i <= tableContentItems.length-1; i++) {
            tableRows.push(<TableRow key={i} selected={(riskLevel === i+1) ? true : false} data={tableContentItems[i]} />)
        }

        return tableRows
    }

    render() {
        const tableHeaderItems = investmentsData.investments
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TableRow data={tableHeaderItems} />
                {this.renderRow()}
            </View>
        );
    }
}

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(RiskTable)