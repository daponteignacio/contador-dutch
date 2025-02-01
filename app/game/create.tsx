import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import Entypo from '@expo/vector-icons/Entypo';
import { PlayersList } from "@/components/PlayersList";
import { useCreate } from "@/hooks/useCreate";
import { useContext, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { ScrollView } from "react-native";
import { FinishMode, Player } from "@/interfaces/game";
import { UIContext } from "@/context/ui";

const CreatePage = () => {
    const { state, setState, addJugador, handleCreateGame } = useCreate();

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const [selectedIndex, setSelectedIndex] = useState(0);

    const explainModes = () => {
        Alert.alert(
            "Modo de finalización",
            "Primero en perder: El juego termina con el primer jugador en alcanzar el límite de puntos.\n\n" +
            "Último en ganar: El juego termina con el último jugador en pie sin pasar el límite de puntos.",
            [{ text: "Entendido" }]
        );
    };

    const {
        dynamicBackgroundColor,
        dynamicTextColor,
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
    } = useContext(UIContext);

    const [values, setValues] = useState(['Primero en perder', 'Último en ganar']);
    const [selectedValue, setSelectedValue] = useState(values[0]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // Ajusta el valor de keyboardVerticalOffset según tu layout (por ejemplo, si usas un header)
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    { backgroundColor: dynamicBackgroundColor },
                ]}
            >
                <View style={styles.main}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            marginBottom: 10,
                        }}
                    >
                        <View style={styles.inputGroup}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: dynamicTextColor },
                                ]}
                            >
                                Nombre de la partida
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: dynamicCardBackgroundColor,
                                        color: dynamicCardTextColor,
                                        borderColor: dynamicCardTextColor,
                                    },
                                ]}
                                placeholder="Ingrese un nombre"
                                placeholderTextColor={colors.grey["200"]}
                                value={state.gameName}
                                onChangeText={(text) => setState(prev => ({ ...prev, gameName: text }))}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: dynamicTextColor },
                                ]}
                            >
                                Límite de puntos
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: dynamicCardBackgroundColor,
                                        color: dynamicCardTextColor,
                                        borderColor: dynamicCardTextColor,
                                    },
                                ]}
                                placeholder="200"
                                placeholderTextColor={colors.grey["200"]}
                                value={state.scoreLimit.toString()}
                                keyboardType="number-pad"
                                onChangeText={(text) => setState(prev => ({ ...prev, scoreLimit: text }))}
                            />
                        </View>
                    </View>


                    <View style={{ gap: 10, justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                        <View style={{ flexDirection: "row", gap: 10, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text
                                style={[
                                    styles.inputLabel,
                                    { color: dynamicTextColor },
                                ]}
                            >
                                Modo de finalización
                            </Text>

                            <TouchableOpacity onPress={explainModes}>
                                <AntDesign name="infocirlceo" size={24} color={colors.blue["500"]} />
                            </TouchableOpacity>
                        </View>

                        <SegmentedControl
                            values={values}
                            style={{ height: 50, backgroundColor: dynamicCardBackgroundColor }}
                            tintColor={dynamicBackgroundColor}
                            fontStyle={{ color: dynamicTextColor }}
                            selectedIndex={selectedIndex}
                            onChange={(event) => {
                                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                                setState(prev => ({ ...prev, finishMode: event.nativeEvent.selectedSegmentIndex === 0 ? FinishMode.FIRST_TO_LOSE : FinishMode.LAST_TO_WIN }));
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text
                            style={[
                                styles.inputLabel,
                                { color: dynamicTextColor },
                            ]}
                        >
                            Jugadores
                        </Text>
                        <View style={{ gap: 10 }}>
                            <Text style={{ color: dynamicTextColor }}>Ingrese el nombre del jugador</Text>

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            flex: 1,
                                            backgroundColor: dynamicCardBackgroundColor,
                                            color: dynamicCardTextColor,
                                            borderColor: dynamicCardTextColor,
                                        },
                                    ]}
                                    placeholder="Nombre del jugador"
                                    placeholderTextColor={colors.grey["200"]}
                                    value={state.currentPlayerName}
                                    onChangeText={(text) => setState(prev => ({ ...prev, currentPlayerName: text }))}
                                />
                                <TouchableOpacity
                                    disabled={state.currentPlayerName.trim() === ""}
                                    onPress={() => {
                                        addJugador(state.currentPlayerName);
                                        setState(prev => ({ ...prev, currentPlayerName: "" }));
                                    }}
                                    style={{
                                        backgroundColor: state.currentPlayerName.trim() === ""
                                            ? colors.grey["500"]
                                            : colors.blue["700"],
                                        padding: 10,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Entypo name="add-user" size={24} color={colors.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <PlayersList jugadores={state.players} setJugadores={((players: Player[]) => setState(prev => ({ ...prev, players })))} />
                </View>

                <View style={{ alignItems: "center", width: "100%" }}>
                    <CustomButton
                        title="Iniciar Partida"
                        onPress={handleCreateGame}
                        bgColor={colors.green["500"]}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    main: {
        flex: 1,
    },
    inputGroup: {
        flex: 1,
        gap: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
    },
});

export default CreatePage;
