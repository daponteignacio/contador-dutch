import { useContext, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from '@/context';
import { colors } from '@/styles/colors';
import { Game } from '@/interfaces/game';

interface FinishRoundModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const PlayerScoreCounter = ({
    player,
    handleAddPoints,
    handleSubtractPoints,
    dynamicPlayerCardTextColor,
    dynamicTextColor,
}: {
    player: { score: number };
    handleAddPoints: (points: number) => void;
    handleSubtractPoints: (points: number) => void;
    dynamicPlayerCardTextColor: string;
    dynamicTextColor: string;
}) => {
    return (
        <View style={styles.counter}>
            <TouchableOpacity
                style={[styles.subtractTenButton, styles.pointsButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                onPress={() => handleSubtractPoints(10)}
            >
                <Text style={{ color: dynamicTextColor }}>-10</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.oneButton, styles.pointsButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                onPress={() => handleSubtractPoints(1)}
            >
                <Text style={{ color: dynamicTextColor }}>-1</Text>
            </TouchableOpacity>

            <TextInput
                value={player.score.toString()}
                style={[styles.input, { color: dynamicTextColor }]}
                editable={false}
            />

            <TouchableOpacity
                style={[styles.oneButton, styles.pointsButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                onPress={() => handleAddPoints(1)}
            >
                <Text style={{ color: dynamicTextColor }}>+1</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.addTenButton, styles.pointsButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                onPress={() => handleAddPoints(10)}
            >
                <Text style={{ color: dynamicTextColor }}>+10</Text>
            </TouchableOpacity>
        </View>
    );
};

export const FinishRoundModal = ({
    modalVisible,
    setModalVisible,
}: FinishRoundModalProps) => {
    const { currentGame, finishRound } = useContext(AppContext);

    const [currentGameCopy, setCurrentGameCopy] = useState<Game>({ ...currentGame! });
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const players = currentGameCopy?.players || [];
    const currentPlayer = players[currentPlayerIndex];

    const [error, setError] = useState("");

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const dynamicBackgroundColor = isDarkMode ? colors.grey["950"] : colors.grey["50"];
    const dynamicTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];
    const dynamicPlayerCardTextColor = isDarkMode ? colors.grey[500] : colors.grey[100];

    const handleAddPoints = (newPoints: number) => {
        setCurrentGameCopy((prev) => ({
            ...prev,
            players: prev.players?.map((player) =>
                player.id === currentPlayer.id
                    ? { ...player, score: player.score + newPoints }
                    : player
            ),
        }));
    };

    const handleSubtractPoints = (newPoints: number) => {
        if (currentPlayer.score - newPoints < 0) {
            setError('No puedes ingresar números negativos');
            return;
        }

        setCurrentGameCopy((prev) => ({
            ...prev,
            players: prev.players?.map((player) =>
                player.id === currentPlayer.id
                    ? { ...player, score: player.score - newPoints }
                    : player
            ),
        }));
    };

    const handleNextPlayer = () => {
        if (currentPlayerIndex === players.length - 1) return
        setCurrentPlayerIndex((prev) => prev + 1);
    };

    const handlePreviousPlayer = () => {
        if (currentPlayerIndex === 0) return;
        setCurrentPlayerIndex((prev) => prev - 1);
    };

    const closeModal = () => {
        setCurrentPlayerIndex(0);
        setModalVisible(false);
    };

    const finishRoundAndCloseModal = () => {
        finishRound(currentGameCopy);
        closeModal();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: dynamicBackgroundColor }]}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalHeaderText, { color: dynamicTextColor }]}>Terminar ronda</Text>

                        <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
                            <AntDesign name="closecircle" size={24} color={dynamicTextColor} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <View style={{ marginBottom: 10, marginLeft: 10 }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: dynamicTextColor,
                                }}
                            >
                                {currentPlayer.name}
                            </Text>
                            <Text style={{ color: dynamicTextColor }}>{currentPlayer.score} pts</Text>
                        </View>

                        <PlayerScoreCounter
                            player={currentPlayer}
                            handleAddPoints={handleAddPoints}
                            handleSubtractPoints={handleSubtractPoints}
                            dynamicPlayerCardTextColor={dynamicPlayerCardTextColor}
                            dynamicTextColor={dynamicTextColor}
                        />

                        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
                    </View>

                    <View style={styles.modalFooter}>
                        <View style={styles.bottomModalButtons}>
                            <TouchableOpacity
                                style={[styles.bottomModalButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                                onPress={handlePreviousPlayer}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: dynamicTextColor,
                                    }}
                                >
                                    Anterior
                                </Text>
                            </TouchableOpacity>

                            {currentPlayerIndex === players.length - 1 ? (
                                <TouchableOpacity
                                    style={{ ...styles.bottomModalButton, backgroundColor: colors.blue[500] }}
                                    onPress={finishRoundAndCloseModal}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                                        Finalizar
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.bottomModalButton, { backgroundColor: dynamicPlayerCardTextColor }]}
                                    onPress={handleNextPlayer}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: dynamicTextColor,
                                        }}
                                    >
                                        Siguiente
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        width: '80%',
        height: '50%',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContent: {
        flex: 1,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeModalButton: {
        padding: 10,
        borderRadius: 10,
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 1,
    },
    bottomModalButtons: {
        alignSelf: 'baseline',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomModalButton: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 10,
    },
    pointsButton: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTenButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    oneButton: {},
    subtractTenButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    input: {
        flex: 2,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
