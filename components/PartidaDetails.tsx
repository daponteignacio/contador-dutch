import { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { UIContext } from '@/context/ui';
import { FinishMode, Game } from '@/interfaces/game';
import { Feather } from '@expo/vector-icons';

export const PartidaDetails = ({ currentGame }: { currentGame: Game }) => {
    const { dynamicCardBackgroundColor, dynamicCardTextColor } = useContext(UIContext);

    const finishMode = currentGame.finishMode === FinishMode.FIRST_TO_LOSE ? "Primero en perder" : "Último en ganar";

    const pointsAvg = currentGame.players.reduce((acc, player) => acc + player.score, 0) / currentGame.players.length;

    return (
        <View style={[styles.card, { backgroundColor: dynamicCardBackgroundColor }]}>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Límite</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentGame.scoreLimit}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Promedio</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{Math.trunc(pointsAvg)}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Creación</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentGame.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Modo</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{finishMode}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        marginBottom: 35,
        gap: 20
    },
    header: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: "#888888",
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333333",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailItem: {
        width: "48%",
    },
    addButton: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        borderRadius: 10,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
});
