import React from "react";
import { Player } from "@/interfaces/game";
import { colors } from "@/styles/colors";
import { Entypo } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Animated, { Layout, SlideInLeft, SlideOutRight } from "react-native-reanimated";

interface PlayersListProps {
    jugadores: Player[];
    setJugadores: (jugadores: Player[]) => void;
}

export const PlayersList = ({
    jugadores = [],
    setJugadores,
}: PlayersListProps) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    return (
        <ScrollView style={styles.scrollContainer}>
            {jugadores.map((jugador) => (
                <Animated.View
                    key={jugador.id}
                    style={[
                        styles.jugadorItem,
                        {
                            backgroundColor: isDarkMode ? colors.grey["900"] : colors.grey["100"], // Fondo dinámico
                            borderColor: isDarkMode ? colors.grey["800"] : colors.grey["300"], // Bordes dinámicos
                            borderWidth: 1,
                        },
                    ]}
                    entering={SlideInLeft} // Animación al ingresar
                    exiting={SlideOutRight} // Animación al salir
                    layout={Layout} // Animación al reorganizar
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: isDarkMode ? colors.grey["200"] : colors.grey["900"], // Texto dinámico
                        }}
                    >
                        {jugador.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setJugadores(jugadores.filter((j) => j.id !== jugador.id));
                        }}
                        style={styles.deleteButton}
                    >
                        <Entypo name="trash" size={20} color={colors.white} />
                    </TouchableOpacity>
                </Animated.View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        marginVertical: 20,
        padding: 10,
    },
    jugadorItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: colors.red[500],
        padding: 10,
        borderRadius: 10,
    },
});
