import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { SELECTED_ROW_COLOR, WHITE_COLOR } from '../../constants/Colors'
import { commonStyles } from '../../constants/CommonStyles'

export const TableRow = (props) => {

    const selectedBackground = (props.selected) ? SELECTED_ROW_COLOR : WHITE_COLOR
    
    return (
        <View style={[{ backgroundColor: selectedBackground }, commonStyles.containerCell ]}>
            {props.data.map((val, index) => 
                <View key={index} style={commonStyles.cell}>
                    <Text>{ props.data[index] }</Text>
                </View>)
            }
        </View>
    )
}