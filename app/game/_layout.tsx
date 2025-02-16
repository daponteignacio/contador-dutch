import { UIContext } from '@/context/ui'
import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'
import React, { useContext } from 'react'

const GameLayout = () => {

    const { isDarkMode } = useContext(UIContext)

    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: isDarkMode ? colors.blue[800] : colors.blue[100] } }}>
            <Stack.Screen name="create" options={{ title: "Nuevo juego" }} />
            <Stack.Screen name="[oldGameId]" options={{ title: "Historial" }} />
        </Stack>
    )
}

export default GameLayout