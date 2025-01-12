import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import Entypo from '@expo/vector-icons/Entypo';
import { PlayersList } from "@/components/PlayersList";
import { useCreate } from "@/hooks/useCreate";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { ScrollView } from "react-native";

const CreatePage = () => {
    const {
        form,
        jugadores,
        jugadorName,
        finishMode,
        addJugador,
        handleCreateGame,
        setForm,
        setJugadores,
        setJugadorName,
        setFinishMode
    } = useCreate();

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

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: isDarkMode ? colors.grey["950"] : colors.grey["50"] },
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
                                { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] },
                            ]}
                        >
                            Nombre de la partida
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDarkMode ? colors.grey["800"] : colors.white,
                                    color: isDarkMode ? colors.grey["200"] : colors.grey["900"],
                                    borderColor: isDarkMode ? colors.grey["700"] : colors.grey["300"],
                                },
                            ]}
                            placeholder="Ingrese un nombre"
                            placeholderTextColor={isDarkMode ? colors.grey["600"] : colors.grey["200"]}
                            value={form.nombre}
                            onChangeText={(text) =>
                                setForm({
                                    ...form,
                                    nombre: text,
                                })
                            }
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.inputLabel,
                                { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] },
                            ]}
                        >
                            Límite de puntos
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDarkMode ? colors.grey["800"] : colors.white,
                                    color: isDarkMode ? colors.grey["200"] : colors.grey["900"],
                                    borderColor: isDarkMode ? colors.grey["700"] : colors.grey["300"],
                                },
                            ]}
                            placeholder="200"
                            placeholderTextColor={isDarkMode ? colors.grey["600"] : colors.grey["200"]}
                            value={form.limite.toString()}
                            keyboardType="number-pad"
                            onChangeText={(text) => setForm({ ...form, limite: text })}
                        />
                    </View>
                </View>


                <View style={{ gap: 10, justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                    <View style={{ flexDirection: "row", gap: 10, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text
                            style={[
                                styles.inputLabel,
                                { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] },
                            ]}
                        >
                            Modo de finalización
                        </Text>

                        <TouchableOpacity onPress={explainModes}>
                            <AntDesign name="infocirlceo" size={24} color={colors.blue["500"]} />
                        </TouchableOpacity>
                    </View>

                    <SegmentedControl
                        values={['Primero en perder', 'Último en ganar']}
                        style={{ height: 50 }}
                        selectedIndex={selectedIndex}
                        onChange={(event) => {
                            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                            setFinishMode(event.nativeEvent.selectedSegmentIndex === 0 ? "first-to-lose" : "last-to-win");
                        }}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text
                        style={[
                            styles.inputLabel,
                            { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] },
                        ]}
                    >
                        Jugadores
                    </Text>
                    <View style={{ gap: 10 }}>
                        <Text
                            style={[
                                { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] },
                            ]}
                        >
                            Ingrese el nombre del jugador
                        </Text>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        flex: 1,
                                        backgroundColor: isDarkMode ? colors.grey["800"] : colors.white,
                                        color: isDarkMode ? colors.grey["200"] : colors.grey["900"],
                                        borderColor: isDarkMode ? colors.grey["700"] : colors.grey["300"],
                                    },
                                ]}
                                placeholder="Nombre del jugador"
                                placeholderTextColor={isDarkMode ? colors.grey["600"] : colors.grey["200"]}
                                value={jugadorName}
                                onChangeText={(text) => setJugadorName(text)}
                            />
                            <TouchableOpacity
                                disabled={jugadorName.trim() === ""}
                                onPress={() => {
                                    addJugador(jugadorName);
                                    setJugadorName("");
                                }}
                                style={{
                                    backgroundColor: jugadorName.trim() === ""
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

                <PlayersList jugadores={jugadores} setJugadores={setJugadores} />
            </View>

            <View style={{ alignItems: "center", width: "100%" }}>
                <CustomButton
                    title="Iniciar Partida"
                    onPress={handleCreateGame}
                    bgColor={colors.green["500"]}
                />
            </View>
        </ScrollView>
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
