import { UIContext } from '@/context/ui';
import { FinishMode, Game } from '@/interfaces/game';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native'

export const OldGameDetails = ({ currentOldGame }: { currentOldGame: Game }) => {

    const {
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
    } = useContext(UIContext)

    const finishMode = currentOldGame?.finishMode === FinishMode.FIRST_TO_LOSE ? "Primero en perder" : "Último en ganar";

    return (
        <View style={[styles.card, { backgroundColor: dynamicCardBackgroundColor, gap: 20 }]}>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Partida</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentOldGame?.name}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Creación</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentOldGame?.date}</Text>
                </View>
            </View>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Modo de finalización</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{finishMode}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={[styles.label, { color: dynamicCardTextColor }]}>Límite</Text>
                    <Text style={[styles.value, { color: dynamicCardTextColor }]}>{currentOldGame?.scoreLimit} pts</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    backButton: {
        alignSelf: "flex-start",
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
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
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#666666",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailItem: {
        width: "48%",
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
    playerList: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    playerCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    playerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    winnerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "gold",
    },
    littleStar: {
        width: 30,
        height: 30,
        resizeMode: 'contain', // Asegura que la imagen se ajuste dentro del cuadro
        marginHorizontal: 5, // Añade espacio entre las estrellas y el texto
    }

});