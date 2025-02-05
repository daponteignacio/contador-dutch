import { ReactNode } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
    View,
    useColorScheme
} from "react-native";
import * as Haptics from "expo-haptics";
import { colors } from "@/styles/colors";

interface CustomButtonProps {
    bgColor?: string;
    disabled?: boolean;
    onPress: () => void;
    textColor?: string;
    title?: string; // Ahora opcional
    icon?: ReactNode; // Nuevo prop para aceptar un ícono
    variant?: "solid" | "outline";
    styles?: StyleProp<ViewStyle>; // Prop para agregar estilos extra al botón
}

export const CustomButton = ({
    bgColor = colors.blue[600],
    disabled = false,
    onPress,
    textColor,
    title,
    icon,
    variant = "solid",
    styles: extraStyles, // renombramos para evitar conflicto con los estilos internos
}: CustomButtonProps) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const getStyles = () => {
        const backgroundColor = disabled
            ? colors.grey[500]
            : variant === "outline"
                ? isDarkMode
                    ? colors.grey["900"]
                    : "#FFFFFF"
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
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            } as StyleProp<ViewStyle>,
            text: {
                fontSize: 18,
                fontWeight: "bold",
                color: textColorFinal,
                textAlign: "center",
            } as StyleProp<TextStyle>,
        };
    };

    const computedStyles = getStyles();

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[computedStyles.container, extraStyles]} // Se combinan los estilos internos con los extra
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onPress();
            }}
        >
            {title && <Text style={computedStyles.text}>{title}</Text>}
        </TouchableOpacity>
    );
};

export default CustomButton;
