import { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from '@/context';
import { colors } from '@/styles/colors';
import { Game, PlayerStatus } from '@/interfaces/game';
import { UIContext } from '@/context/ui';
import { PlayerScoreCounter } from './PlayerScoreCounter';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import * as Haptics from "expo-haptics";


// TODO: Cuando se cambia de jugador, los puntos ingresados del anterior deberían preservarse en otra estructura y reiniciarse al cambiar de jugador
// TODO: Cuando se termina la ronda, a cada jugador se le agregan sus puntos (currentPoints + newPoints), se reinicia la estructura de puntos, se hace finishRound() y se cierra el modal.
// TODO: Al querer cerrar el modal, sebe alertarse de que los puntos ingresados se perderán, y se debe confirmar si se desea cerrar el modal. Si se confirma, se cierra el modal y se reinician los puntos.

/* 
    TODO: Hay que agregar un botón de bonus que permite descontar 50 puntos en el caso de que el un jugador haya terminado una ronda con 0 puntos (cortó con su última carta o solo le quedaba el comodín).
    Una alternativa es que no se le sume punto a ese jugador, ya que no sumó, y cuando se termina la ronda se haga la resta de 50 puntos automaticamente pero indicandolo de alguna forma.
    Además, este beneficio debería estar disponible en el menú de creacion del juego como una opción.
*/

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
        dynamicBackgroundColor,
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
        dynamicButtonBackgroundColor,
        dynamicButtonTextColor,
    } = useContext(UIContext);

    const handleAddPoints = (newPoints: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

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

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (error) {
            timeout = setTimeout(() => {
                setError("");
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        }

    }, [error]);

    const handleNextPlayer = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (currentPlayerIndex === players.length - 1) return;
        setCurrentPlayerIndex((prev) => prev + 1);
    };

    const handlePreviousPlayer = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (currentPlayerIndex === 0) return;
        setCurrentPlayerIndex((prev) => prev - 1);
    };

    const closeModal = () => {
        setCurrentPlayerIndex(0);
        setModalVisible(false);
    };

    const finishRoundAndCloseModal = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

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

                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Text style={[{ color: dynamicButtonTextColor, fontSize: 20, fontWeight: 'bold' }]}>
                                    {currentPlayer?.score.toString()}
                                </Text>
                                {/* 
                                <Text style={{ color: dynamicTextColor, fontSize: 16 }}>+</Text>

                                <View
                                    style={{
                                        paddingVertical: 3,
                                        paddingHorizontal: 7,
                                        borderRadius: 10,
                                        backgroundColor: dynamicBackgroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >

                                    <Text style={[{ color: dynamicButtonTextColor, fontSize: 20, fontWeight: 'bold', }]}>
                                        {currentPlayer?.score.toString()}
                                    </Text>
                                </View> */}
                            </View>
                        </View>

                        <PlayerScoreCounter player={currentPlayer} handleAddPoints={handleAddPoints} handleSubtractPoints={handleSubtractPoints} />

                    </View>

                    <Text style={{ color: colors.red[400], textAlign: 'center', marginVertical: 10 }}>{error}</Text>

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