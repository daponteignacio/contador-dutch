import { colors } from '@/styles/colors';
import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { UIContext } from '@/context/ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const NoGameScreen = () => {
    const { dynamicBackgroundColor, dynamicTextColor } = useContext(UIContext);

    return (
        <View style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}>
            {/* Icono de fondo centrado */}
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    size={400}
                    name="cards-playing-club-multiple-outline"
                    color={dynamicTextColor}
                    style={{
                        transform: [{ rotate: "30deg" }],
                        opacity: 0.1,
                    }}
                />
            </View>

            {/* Contenido (texto y botón) centrado por encima del icono */}
            <View style={styles.contentContainer}>
                <Text style={[styles.label, { color: dynamicTextColor }]}>
                    No hay una partida en curso
                </Text>
                <Text
                    style={[
                        styles.label,
                        { color: dynamicTextColor, fontWeight: "normal", marginBottom: 20 }
                    ]}
                >
                    Cree una nueva partida para comenzar
                </Text>
                <CustomButton
                    title="Nueva partida"
                    onPress={() => router.push("/game/create")}
                    bgColor={colors.green["500"]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        // Este contenedor posiciona el icono de forma absoluta y lo centra
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
    },
    label: {
        fontSize: 14,
        color: "#888888",
        marginBottom: 5,
        textAlign: "center",
    },
    // Puedes mantener o agregar el resto de estilos que necesites...
});
