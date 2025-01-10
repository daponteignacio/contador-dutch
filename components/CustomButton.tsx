import { colors } from '@/styles/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface CustomButtonProps {
    bgColor?: string;
    disabled?: boolean;
    onPress: () => void;
    textColor?: string;
    title: string;
    variant?: 'solid' | 'outline';
}


export const CustomButton = ({
    bgColor = colors.blue[600],
    disabled = false,
    onPress,
    textColor = "#FFFFFF",
    title,
    variant = 'solid'
}: CustomButtonProps) => {

    const getBgColor = () => {
        switch (variant) {
            case 'solid':
                if (disabled) {
                    return colors.grey[500];
                }
                return bgColor;
            case 'outline':
                if (disabled) {
                    return colors.grey[500];
                }
                return "#FFFFFF";
            default:
                return bgColor;
        }
    }

    const getTextColor = () => {
        switch (variant) {
            case 'solid':
                if (disabled) {
                    return colors.grey[500];
                }
                return "#FFFFFF";
            case 'outline':
                if (disabled) {
                    return colors.grey[500];
                }
                return colors.blue[600];
            default:
                return "#FFFFFF";
        }
    }

    const getBorderColor = () => {
        switch (variant) {
            case 'solid':
                return 'transparent';
            case 'outline':
                if (disabled) {
                    return colors.grey[500];
                }
                return colors.blue[600];
            default:
                return 'transparent';
        }
    }


    return (
        <TouchableOpacity
            disabled={disabled}
            style={{
                backgroundColor: getBgColor(),
                borderColor: getBorderColor(),
                borderWidth: variant === 'outline' ? 2 : 0,
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
                marginBottom: 20,
                width: "100%",
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: textColor,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default CustomButton

