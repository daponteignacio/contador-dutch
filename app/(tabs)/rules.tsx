import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useContext } from "react";
import { UIContext } from "@/context/ui";


const RulesScreen = () => {

    const {
        dynamicBackgroundColor,
        dynamicTextColor,
    } = useContext(UIContext);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}
            contentContainerStyle={{ paddingBottom: 150 }}
        >
            <Text style={[styles.title, { color: dynamicTextColor }]}>
                Reglas del Juego
            </Text>

            {/* Introducción */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-outline" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Introducción
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                Este es un juego de cartas que puede usarse con cartas españolas o de póker. Sin embargo, nos centraremos en el mazo de cartas españolas.
            </Text>

            {/* Objetivo */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="target" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Objetivo
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                El objetivo del juego sumar la menor cantidad de puntos en cada ronda evitando alcanzar el límite de puntos establecido. Gana el jugador que suma la menor cantidad de puntos al final de la partida.
            </Text>

            {/* Preparación */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-playing-outline" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Preparación
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                1. Establece un límite de puntos.{"\n"}
                2. Reparte 4 cartas a cada jugador.{"\n"}
                3. Cada jugador puede ver solo 2 de sus cartas una vez al inicio de la ronda y debe recordarlas ya que no podrá volver a verlas a menos que tire una carta especial.{"\n"}
                4. El resto del mazo se coloca en el centro de la mesa.{"\n"}
                5. El jugador que reparte voltea la carta superior del mazo para iniciar la partida.
            </Text>

            {/* Desarrollo */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-diamond-outline" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Desarrollo
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                - En su turno, cada jugador debe tomar una carta del mazo o la carta que tiró el jugador anterior y luego tirar una carta de su mano.{"\n"}
                - Si toma una carta del mazo, puede verla. Si no le sirve, puede tirarla directamente al mazo boca arriba.{"\n"}
                - Ejemplos: Si el jugador anterior tiró un 5 y tengo un 6, me conviene tomar el 5 y dejar mi 6 para reducir mi puntaje. Sin embargo, si el jugador anterior tiró un 9, no me conviene tomarlo, por lo que debo tomar una carta del mazo. Si esa carta me sirve (por ejemplo, un 3), puedo quedármela y dejar el 5. Si no me sirve (es mayor), la tiro en la mesa y continúa el siguiente jugador.{"\n"}
                - Nunca se puede tirar una carta directamente sin tomar una primero (salvo que se use la regla de "espejito").
            </Text>
            <Text style={[styles.bulletPoint, { color: dynamicTextColor }]}>
                - El comodín puede valer el número que el jugador decida, pero debe anunciarlo en voz alta. Puede ser especialmente útil para hacer "espejito", incluso fuera de su turno.
            </Text>


            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="flag" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Fin de una ronda
                </Text>
            </View>

            <Text style={[styles.text, { color: dynamicTextColor }]}>
                - La ronda termina cuando un jugador, en su turno, tira una carta boca abajo con valor 5 o menos, aunque también puede terminar si un jugador se queda sin cartas.
            </Text>


            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="flag-checkered" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Fin del juego
                </Text>
            </View>

            <Text style={[styles.text, { color: dynamicTextColor }]}>
                - El juego puede terminar segun la modalidad elegida: "Primero en perder" o "Primero en ganar".{"\n"}{"\n"}
                - En "Primero en perder", el juego termina con el primer jugador en alcanzar el límite de puntos establecido.{"\n"}{"\n"}
                - En "Primero en ganar", el juego termina cuando queda un solo jugador en pie sin haber alcanzado el límite de puntos.
            </Text>


            {/* Cartas Especiales */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="star-outline" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Cartas Especiales
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                - 10: El jugador puede ver una de sus cartas.{"\n"}
                - 11: El jugador puede intercambiar una de sus cartas con otro jugador.{"\n"}
                - 12: El jugador puede ver una de sus cartas y una de un oponente.
            </Text>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                Si un jugador no usa la acción de una carta especial, la acción puede ser usada por el siguiente jugador.
            </Text>

            {/* Espejito */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="mirror" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Espejito
                </Text>
            </View>
            <Text style={[styles.text, { color: dynamicTextColor }]}>
                Si un jugador tira una carta con un número X y otro jugador tiene una carta con el mismo número, este último puede tirarla inmediatamente, saltándose el turno de los jugadores anteriores. La ronda continúa con el jugador a la derecha del que hizo "espejito".
            </Text>

            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="alert-circle-outline" size={24} color={dynamicTextColor} />
                <Text style={[styles.sectionTitle, { color: dynamicTextColor }]}>
                    Penalizaciones
                </Text>
            </View>

            <Text style={[styles.text, { color: dynamicTextColor }]}>
                - Si se hace un espejito con una carta incorrecta el jugador tomar de nuevo su carta y recibe una carta extra del mazo como castigo.{"\n"}
                - Levantar un carta del mazo fuera de su turno es penalizado con una carta extra del mazo.{"\n"}
                - Cortar la ronda con una carta mayor a 5 es penalizado con una carta extra del mazo.
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8, // Espaciado entre el icono y el texto
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
    },
    bulletPoint: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
        lineHeight: 24,
    },
});

export default RulesScreen;
