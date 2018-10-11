import React from 'react'
import { View, Text } from 'react-native'

import investmentsData from '../../investmentsData'

import { connect } from 'react-redux'

import { TableRow } from './TableRow'

class RiskTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tableHeaderItems = investmentsData.investments
        const tableContentItems = investmentsData.risks
        const { riskLevel } = this.props.riskState
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TableRow data={tableHeaderItems} />
                <TableRow selected={(riskLevel === 1) ? true : false} data={tableContentItems["1"]} />
                <TableRow selected={(riskLevel === 2) ? true : false} data={tableContentItems["2"]} />
                <TableRow selected={(riskLevel === 3) ? true : false} data={tableContentItems["3"]} />
                <TableRow selected={(riskLevel === 4) ? true : false} data={tableContentItems["4"]} />
                <TableRow selected={(riskLevel === 5) ? true : false} data={tableContentItems["5"]} />
                <TableRow selected={(riskLevel === 6) ? true : false} data={tableContentItems["6"]} />
                <TableRow selected={(riskLevel === 7) ? true : false} data={tableContentItems["7"]} />
                <TableRow selected={(riskLevel === 8) ? true : false} data={tableContentItems["8"]} />
                <TableRow selected={(riskLevel === 9) ? true : false} data={tableContentItems["9"]} />
                <TableRow selected={(riskLevel === 10) ? true : false} data={tableContentItems["10"]} />
            </View>
        );
    }
}

const mapStateToProps = ({ riskState }) => ({ riskState })

export default connect(mapStateToProps, {})(RiskTable)