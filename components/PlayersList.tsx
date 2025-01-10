import React from "react";
import { Player } from "@/interfaces/game";
import { colors } from "@/styles/colors";
import { Entypo } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout, SlideInLeft, SlideOutRight } from "react-native-reanimated";

interface PlayersListProps {
    jugadores: Player[];
    setJugadores: (jugadores: Player[]) => void;
}

export const PlayersList = ({
    jugadores = [],
    setJugadores,
}: PlayersListProps) => {
    return (
        <ScrollView style={styles.scrollContainer}>
            {jugadores.map((jugador) => (
                <Animated.View
                    key={jugador.id}
                    style={styles.jugadorItem}
                    entering={SlideInLeft} // Animación al ingresar
                    exiting={SlideOutRight} // Animación al salir
                    layout={Layout} // Animación al reorganizar
                >
                    <Text style={{ fontSize: 16 }}>{jugador.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setJugadores(jugadores.filter((j) => j.id !== jugador.id));
                        }}
                        style={styles.deleteButton}
                    >
                        <Entypo name="trash" size={24} color="white" />
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
        padding: 16,
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: colors.red[500],
        padding: 10,
        borderRadius: 10,
    },
});
