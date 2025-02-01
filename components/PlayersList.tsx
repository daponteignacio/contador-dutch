import React, { useContext } from "react";
import { Player } from "@/interfaces/game";
import { colors } from "@/styles/colors";
import { Entypo } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Animated, { Layout, SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { UIContext } from "@/context/ui";

interface PlayersListProps {
    jugadores: Player[];
    setJugadores: (jugadores: Player[]) => void;
}

export const PlayersList = ({
    jugadores = [],
    setJugadores,
}: PlayersListProps) => {

    const {
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
    } = useContext(UIContext)

    return (
        <ScrollView style={styles.scrollContainer}>
            {jugadores.map((jugador) => (
                <Animated.View
                    key={jugador.id}
                    style={[
                        styles.jugadorItem,
                        {
                            backgroundColor: dynamicCardBackgroundColor,
                            elevation: 5,
                        },
                    ]}
                    entering={SlideInLeft}
                    exiting={SlideOutRight}
                    layout={Layout}
                >
                    <Text style={{ fontSize: 16, color: dynamicCardTextColor, }}>
                        {jugador.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setJugadores(jugadores.filter((j) => j.id !== jugador.id))}
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
