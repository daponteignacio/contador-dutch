import React, { useRef } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Confetti = () => {
    const animationRef = useRef(null);

    const handlePress = () => {
        if (animationRef.current) {
            animationRef.current.play();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Show Confetti" onPress={handlePress} />
            </View>
            <LottieView
                ref={animationRef}
                source={require('@/assets/confeti.json')}
                autoPlay={false}
                loop={false}
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        zIndex: 1, // Eleva el botón por encima de la animación
    },
    animation: {
        width: width * 2, // Escala horizontalmente
        height: height * 2, // Escala verticalmente
        position: 'absolute',
        zIndex: 0, // Asegura que la animación esté detrás del botón
        transform: [{ scale: 1.2 }], // Escala la animación
    },
});

export default Confetti;
