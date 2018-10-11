import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { SELECTED_ROW_COLOR, WHITE_COLOR } from '../../constants/Colors'

export const TableRow = (props) => {
    const selectedBackground = (props.selected) ? SELECTED_ROW_COLOR : WHITE_COLOR
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: selectedBackground }}>
            <View style={styles.cell}>
                <Text>{ props.data[0] }</Text>
            </View> 
            <View style={styles.cell}>
                <Text>{ props.data[1] }</Text>
            </View>
            <View style={styles.cell}>
                <Text>{ props.data[2] }</Text>
            </View>
            <View style={styles.cell}>
                <Text>{ props.data[3] }</Text>
            </View>
            <View style={styles.cell}>
                <Text>{ props.data[4] }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        flex: 1, 
        alignSelf: 'stretch', 
        borderWidth: 1,
        padding: 5
    }
})