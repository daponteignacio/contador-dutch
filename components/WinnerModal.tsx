import { Player } from '@/interfaces/game';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WinnerModal = ({ winner, visible, onClose }: { winner?: Player; visible: boolean; onClose: () => void }) => {

    const animationRef = useRef<LottieView>(null);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            {/* <LottieView
                ref={animationRef}
                source={require('@/assets/confeti.json')}
                autoPlay={false}
                loop={false}
                style={{
                    width: width * 2, // Escala horizontalmente
                    height: height * 2, // Escala verticalmente
                    // position: 'absolute',
                    zIndex: 0, // Asegura que la animación esté detrás del botón
                    transform: [{ scale: 1.2 }], // Escala la animación
                }}
            /> */}
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>¡Felicitaciones!</Text>
                    {winner && <Text style={styles.winnerText}>{winner.name} ha ganado el juego 🎉</Text>}
                    <CustomButton title="Terminar" onPress={() => {
                        if (animationRef.current) {
                            animationRef.current.reset();
                        }
                        onClose();
                    }} />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    winnerText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});
