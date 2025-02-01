import { useContext, useEffect } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { icons } from '@/constants/icons';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types';
import { colors } from '@/styles/colors';
import { UIContext } from '@/context/ui';

interface TabBarButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    isFocused: boolean;
    routeName: string;
    color: string;
    label: string | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
    }) => React.ReactNode)
}

export const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label,
}: TabBarButtonProps) => {

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, { duration: 300 });
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
        const top = interpolate(scale.value, [0, 1], [0, 9]);
        return {
            transform: [{ scale: scaleValue }],
            top,
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scale.value, [0, 1], [1, 0]) }
    })

    const { dynamicCardTextColor } = useContext(UIContext);

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
        >
            <Animated.View style={[animatedIconStyle]}>
                {icons[routeName]({ color: isFocused ? colors.white : dynamicCardTextColor })}
            </Animated.View>

            <Animated.Text
                style={[{ color: isFocused ? 'blue' : dynamicCardTextColor }, animatedTextStyle]}
            >
                {typeof label === 'string' ? label : label({ focused: isFocused, color: isFocused ? 'blue' : 'black', position: 'below-icon', children: '' })}
            </Animated.Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
})