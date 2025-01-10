import CustomButton from "@/components/CustomButton";
import { Player } from "@/interfaces/game";
import { colors } from "@/styles/colors";
import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { AppContext } from "@/context";
import { router } from "expo-router";
import { PlayersList } from "@/components/PlayersList";

// TODO: Al tener el teclado levantado para escribir el nombre de un jugador se pega el boton de iniciar partida y si por error se apreta se puede mostrar uno de los mensajes de error encimado sobre todo el contenido.
// TODO: Para agregar un jugador el boton de agregar jugador debe primero cerrar el teclado y luego en un segundo click agregar el jugador.

const Create = () => {
    const { newGame } = useContext(AppContext);

    const [form, setForm] = useState({
        nombre: "",
        limite: "",
    });

    const [error, setError] = useState("");
    const [jugadorName, setJugadorName] = useState("");
    const [jugadores, setJugadores] = useState<Player[]>([]);

    const addJugador = (name: string) => {
        if (name.trim() === "") return;

        const newJugador: Player = {
            id: jugadores.length + 1,
            name,
            score: 0,
        };

        setJugadores([...jugadores, newJugador]);
    };


    const handleCreateGame = () => {

        // if (form.nombre.trim() === "") {
        //     setError("Debe ingresar un nombre para la partida");
        //     return;
        // }

        const parsedNumber = parseInt(form.limite);
        if (isNaN(parsedNumber)) {
            setError("El límite de puntos debe ser un número entero");
            return;
        }

        if (parsedNumber < 0) {
            setError("El límite de puntos debe ser mayor a 0");
            return;
        }

        // if (jugadores.length < 2) {
        //     setError("Debe haber al menos 2 jugadores para iniciar la partida");
        //     return;
        // }

        setError("");

        newGame(form.nombre, parsedNumber, jugadores);
        router.replace("/(tabs)/partida");
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Nombre de la partida</Text>
                    <TextInput
                        style={styles.headerInput}
                        placeholder="Nombre de la partida"
                        value={form.nombre}
                        onChangeText={text => setForm({
                            ...form,
                            nombre: text,
                        })}
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Límite de puntos</Text>
                    <TextInput
                        style={styles.headerInput}
                        placeholder="Límite de puntos"
                        value={form.limite.toString()}
                        keyboardType="number-pad"
                        onChangeText={text => {
                            setForm({
                                ...form,
                                limite: text,
                            });
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.headerText}>Jugadores</Text>
                    <View style={{
                        gap: 10,
                    }}>
                        <Text>Ingrese el nombre del jugador</Text>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={{
                                    ...styles.headerInput,
                                    flex: 1,
                                }}
                                placeholder="Nombre del jugador"
                                value={jugadorName}
                                onChangeText={text => setJugadorName(text)}
                            />
                            <TouchableOpacity
                                disabled={jugadorName.trim() === ""}
                                onPress={() => {
                                    addJugador(jugadorName);
                                    setJugadorName("");
                                }}
                                style={{
                                    backgroundColor: jugadorName.trim() === "" ? colors.grey[500] : colors.blue[500],
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Entypo name="add-user" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <PlayersList jugadores={jugadores} setJugadores={setJugadores} />

            </View>

            <View style={{ alignItems: "center", width: "100%", }}>
                <Text style={styles.errorText}>{error}</Text>
                <CustomButton
                    title="Iniciar Partida"
                    onPress={handleCreateGame}
                    bgColor={colors.green[500]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    main: {
        flex: 1,
    },
    header: {
        gap: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    headerInput: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CCCCCC",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
    },
    errorText: {
        color: colors.red[500],
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Create;
