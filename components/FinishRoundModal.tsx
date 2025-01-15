import { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from '@/context';
import { colors } from '@/styles/colors';
import { Game, PlayerStatus } from '@/interfaces/game';
import { UIContext } from '@/context/ui';
import { PlayerScoreCounter } from './PlayerScoreCounter';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';


interface FinishRoundModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export const FinishRoundModal = ({
    modalVisible,
    setModalVisible,
}: FinishRoundModalProps) => {
    const { currentGame, finishRound } = useContext(AppContext);
    const [currentGameCopy, setCurrentGameCopy] = useState<Game>({ ...currentGame! });

    useEffect(() => {
        setCurrentGameCopy({ ...currentGame! });
    }, [currentGame])

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const players = (currentGameCopy?.players || []).filter((player) => player.status === PlayerStatus.PLAYING);
    const currentPlayer = players[currentPlayerIndex];

    const [error, setError] = useState("");

    const {
        dynamicTextColor,
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
        dynamicButtonBackgroundColor,
        dynamicButtonTextColor,
    } = useContext(UIContext);

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

        const playerCopy = currentGame?.players.find((player) => player.id === currentPlayer.id);
        const player = players.find((player) => player.id === currentPlayer.id);


        if ((player?.score ?? 0) - newPoints < (playerCopy?.score ?? 0)) {
            console.log(playerCopy, player);
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
        if (currentPlayerIndex === players.length - 1) return;
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
                <View style={[styles.modalView, { backgroundColor: dynamicCardBackgroundColor }]}>
                    <View style={styles.modalHeader}>

                        <Text style={[styles.modalHeaderText, { color: dynamicCardTextColor }]}>Terminar ronda</Text>

                        <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
                            <AntDesign name="closecircle" size={24} color={dynamicTextColor} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Animated.Text
                                entering={FadeIn}
                                layout={LinearTransition}
                                style={{ fontWeight: 'bold', fontSize: 16, color: dynamicTextColor }}
                            >
                                {currentPlayer?.name}
                            </Animated.Text>

                            <Text style={[{ color: dynamicButtonTextColor, fontSize: 20, fontWeight: 'bold' }]}>
                                {currentPlayer?.score.toString()}
                            </Text>
                        </View>

                        <PlayerScoreCounter player={currentPlayer} handleAddPoints={handleAddPoints} handleSubtractPoints={handleSubtractPoints} />

                        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
                    </View>

                    <View style={styles.modalFooter}>
                        <View style={styles.bottomModalButtons}>
                            <TouchableOpacity
                                style={[styles.bottomModalButton, { backgroundColor: dynamicButtonBackgroundColor }]}
                                onPress={handlePreviousPlayer}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: dynamicButtonTextColor,
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
                                        Terminar ronda
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.bottomModalButton, { backgroundColor: dynamicButtonBackgroundColor }]}
                                    onPress={handleNextPlayer}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: dynamicButtonTextColor
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
    modalContent: {
        flex: 1,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});
