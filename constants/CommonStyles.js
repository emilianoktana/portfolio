import { StyleSheet } from 'react-native'

import { DEFAULT_COLOR, LIGHT_BLUE_COLOR, WHITE_COLOR } from './Colors'

export const commonStyles = StyleSheet.create({
    safeArea: {
        flex: 1, 
        backgroundColor: DEFAULT_COLOR
    },
    container: {
        flex: 1,
        backgroundColor: DEFAULT_COLOR,
        paddingVertical: 20
    },
    content: {
        paddingHorizontal: 20
    },
    bigText: {
        fontSize: 18
    },
    blueButton: {
        backgroundColor: LIGHT_BLUE_COLOR,
        padding: 10,
        borderRadius: 5,
        flex: 1
    },
    blueButtonText: {
        color: WHITE_COLOR,
        fontSize: 16,
        textAlign: 'center'
    }
})