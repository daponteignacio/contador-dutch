import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useContext, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TabBarButton } from './TabBarButton'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { colors } from '@/styles/colors'
import { UIContext } from '@/context/ui'
import { Feather, Ionicons } from "@expo/vector-icons";


export const FloatingTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const [dimensions, setDimensions] = useState({ width: 100, height: 20 })

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (event: LayoutChangeEvent) => {
        setDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        })
    }

    const tabPositionX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        }
    })

    const { dynamicCardBackgroundColor } = useContext(UIContext)

    return (
        <View onLayout={onTabbarLayout} style={[styles.tabBar, { backgroundColor: dynamicCardBackgroundColor }]}>
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        position: 'absolute',
                        backgroundColor: colors.blue[700],
                        borderRadius: 30,
                        marginHorizontal: 12,
                        height: dimensions.height - 15,
                        width: buttonWidth - 25,
                    }]}
            />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]

                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? 'blue' : 'black'}
                        label={label}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 35,
        elevation: 3,
    },
})