import { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { UIContext } from '@/context/ui';
import { Game } from '@/interfaces/game';

export const PartidaDetails = ({ currentGame }: { currentGame: Game }) => {

    const { dynamicCardBackgroundColor, dynamicCardTextColor, } = useContext(UIContext);

    const finishMode = currentGame.finishMode === "first-to-lose" ? "Primero en perder" : "Último en ganar";

    return (
        <View style={[styles.card, { backgroundColor: dynamicCardBackgroundColor }]}>
            <View style={styles.header}>
                <Text style={[styles.label, { color: dynamicCardTextColor }]}>Límite</Text>
                <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentGame.scoreLimit} pts</Text>
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
    )
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
    },
    header: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: "#888888",
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
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
});
