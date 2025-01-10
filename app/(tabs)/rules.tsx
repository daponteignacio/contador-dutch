import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';

const RulesPage = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70 }}>
            <Text style={styles.title}>Reglas del Juego</Text>

            {/* Introducción */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-outline" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Introducción</Text>
            </View>
            <Text style={styles.text}>
                Este es un juego de cartas que puede usarse con cartas españolas o de póker. Sin embargo, nos centraremos en el mazo de cartas españolas.
            </Text>

            {/* Objetivo */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="target" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Objetivo</Text>
            </View>
            <Text style={styles.text}>
                El objetivo del juego es evitar alcanzar el límite de puntos establecido. Gana el jugador que suma la menor cantidad de puntos al final de la partida.
            </Text>

            {/* Preparación */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-playing-outline" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Preparación</Text>
            </View>
            <Text style={styles.text}>
                1. Establece un límite de puntos.{"\n"}
                2. Reparte 4 cartas a cada jugador.{"\n"}
                3. Cada jugador puede ver solo 2 de sus cartas una vez al inicio y debe recordarlas.{"\n"}
                4. El resto del mazo se coloca en el centro de la mesa.{"\n"}
                5. El jugador que reparte voltea la carta superior del mazo para iniciar la partida.
            </Text>

            {/* Desarrollo */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="cards-diamond-outline" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Desarrollo</Text>
            </View>
            <Text style={styles.text}>
                - En su turno, cada jugador debe tomar una carta del mazo o la carta que tiró el jugador anterior y luego tirar una carta de su mano.{"\n"}
                - Si toma una carta del mazo, puede verla. Si no le sirve, puede tirarla directamente al mazo boca arriba.{"\n"}
                - Ejemplos: Si el jugador anterior tiró un 5 y tengo un 6, me conviene tomar el 5 y dejar mi 6 para reducir mi puntaje. Sin embargo, si el jugador anterior tiró un 9, no me conviene tomarlo, por lo que debo tomar una carta del mazo. Si esa carta me sirve (por ejemplo, un 3), puedo quedármela y dejar el 5. Si no me sirve (es mayor), la tiro en la mesa y continúa el siguiente jugador.{"\n"}
                - Nunca se puede tirar una carta directamente sin tomar una primero (salvo que se use la regla de "espejito").
            </Text>
            <Text style={styles.bulletPoint}>
                - El comodín puede valer el número que el jugador decida, pero debe anunciarlo en voz alta. Puede ser especialmente útil para hacer "espejito", incluso fuera de su turno.
            </Text>
            <Text style={styles.text}>
                - El juego también puede terminar si un jugador se queda sin cartas, además de cuando otro jugador alcanza el límite de puntos definido.
            </Text>

            {/* Cartas Especiales */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="star-outline" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Cartas Especiales</Text>
            </View>
            <Text style={styles.text}>
                - 10: El jugador puede ver una de sus cartas.{"\n"}
                - 11: El jugador puede intercambiar una de sus cartas con otro jugador.{"\n"}
                - 12: El jugador puede ver una de sus cartas y una de un oponente.
            </Text>
            <Text style={styles.text}>
                Si un jugador no usa la acción de una carta especial, la acción puede ser usada por el siguiente jugador.
            </Text>

            {/* Espejito */}
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="mirror" size={24} color={colors.blue[500]} />
                <Text style={styles.sectionTitle}>Espejito</Text>
            </View>
            <Text style={styles.text}>
                Si un jugador tira una carta con un número X y otro jugador tiene una carta con el mismo número, este último puede tirarla inmediatamente, saltándose el turno de los jugadores anteriores. La ronda continúa con el jugador a la derecha del que hizo "espejito".
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 8, // Espaciado entre el icono y el texto
    },
    text: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
        lineHeight: 24,
    },
    bulletPoint: {
        fontSize: 16,
        color: "#555",
        marginLeft: 20,
        marginBottom: 10,
        lineHeight: 24,
    },
});

export default RulesPage;
