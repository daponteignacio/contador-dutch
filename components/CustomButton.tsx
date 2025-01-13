import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, View, useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";
import { colors } from "@/styles/colors";

// TODO: Agregar respuestas hapitcas al interactuar con botones

interface CustomButtonProps {
    bgColor?: string;
    disabled?: boolean;
    onPress: () => void;
    textColor?: string;
    title?: string; // Ahora opcional
    icon?: ReactNode; // Nuevo prop para aceptar un ícono
    variant?: "solid" | "outline";
}

export const CustomButton = ({
    bgColor = colors.blue[600],
    disabled = false,
    onPress,
    textColor,
    title,
    icon,
    variant = "solid",
}: CustomButtonProps) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark"; // Detecta si está en modo oscuro

    const getStyles = () => {
        const backgroundColor = disabled
            ? colors.grey[500]
            : variant === "outline"
                ? isDarkMode
                    ? colors.grey["900"] // Fondo oscuro en modo oscuro
                    : "#FFFFFF" // Fondo blanco en modo claro
                : bgColor;

        const textColorFinal = disabled
            ? colors.grey[500]
            : variant === "outline"
                ? colors.blue[600]
                : textColor || "#FFFFFF";

        const borderColor = disabled
            ? colors.grey[500]
            : variant === "outline"
                ? colors.blue[600]
                : "transparent";

        return {
            container: {
                backgroundColor,
                borderColor,
                borderWidth: variant === "outline" ? 2 : 0,
                paddingVertical: 14,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row", // Para alinear texto e ícono
                marginBottom: 20,
                width: "100%",
            } as StyleProp<ViewStyle>,
            text: {
                fontSize: 18,
                fontWeight: "bold",
                color: textColorFinal,
                marginLeft: icon && title ? 8 : 0, // Espacio entre ícono y texto
            } as StyleProp<TextStyle>,
        };
    };

    const styles = getStyles();

    return (
        <TouchableOpacity
            disabled={disabled}
            style={styles.container}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onPress()
            }}
        >
            {icon && <View>{icon}</View>}
            {title && <Text style={styles.text}>{title}</Text>}
        </TouchableOpacity>
    );
};

export default CustomButton;
