import { UIContext } from '@/context/ui'
import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'
import React, { useContext } from 'react'

export const State = () => {

    const { isDarkMode } = useContext(UIContext)

    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: isDarkMode ? colors.blue[800] : colors.blue[100] } }}>
            <Stack.Screen name="(tabs)" options={{ title: "Dutch" }} />
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}
