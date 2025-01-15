import { useContext } from "react";
import { UIContext } from "@/context/ui";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { colors } from "@/styles/colors";

interface PlayerScoreCounterProps {
    player: { score: number };
    handleAddPoints: (points: number) => void;
    handleSubtractPoints: (points: number) => void;
}

export const PlayerScoreCounter = ({ player, handleAddPoints, handleSubtractPoints, }: PlayerScoreCounterProps) => {

    const { dynamicButtonBackgroundColor, dynamicButtonTextColor, } = useContext(UIContext);

    return (
        <View style={styles.counter}>
            <View style={styles.buttons}>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.pointsButton, { backgroundColor: colors.red[600] }]}
                        onPress={() => handleSubtractPoints(10)}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>-10</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pointsButton, { backgroundColor: colors.blue[600] }]}
                        onPress={() => handleAddPoints(10)}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>+10</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.pointsButton, { backgroundColor: colors.red[500] }]}
                        onPress={() => handleSubtractPoints(1)}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>-1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pointsButton, { backgroundColor: colors.blue[500] }]}
                        onPress={() => handleAddPoints(1)}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>+1</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    counter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 1,
        height: '100%',
        flexShrink: 1,
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        flex: 1,
        gap: 10,
    },
    pointsButton: {
        flex: 1,
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    addButton: {
        backgroundColor: colors.blue[500],
    },
    subtractButton: {
        backgroundColor: colors.red[500],
    },
    input: {
        flex: 2,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
