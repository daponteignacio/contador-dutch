import { Stack } from 'expo-router'
import React from 'react'

const GameLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="create" options={{ title: "Nuevo juego" }} />
            <Stack.Screen name="[oldGameId]" options={{ title: "Historial" }} />
        </Stack>
    )
}

export default GameLayout