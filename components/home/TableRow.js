import React from 'react'
import {
    View,
    Text
} from 'react-native'

export const TableRow = (props) => {
    const selectedBackground = (props.selected) ? '#86ccf7' : "#fff"
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: selectedBackground }}>
            <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1, borderRightWidth: 0 }}>
                <Text>{ props.data[0] }</Text>
            </View> 
            <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1, borderRightWidth: 0 }}>
                <Text>{ props.data[1] }</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1, borderRightWidth: 0 }}>
                <Text>{ props.data[2] }</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1, borderRightWidth: 0 }}>
                <Text>{ props.data[3] }</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }}>
                <Text>{ props.data[4] }</Text>
            </View>
        </View>
    )
}