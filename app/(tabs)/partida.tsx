import { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { FinishRoundModal } from "@/components/FinishRoundModal";
import { AppContext } from "@/context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { colors } from "@/styles/colors";

// TODO: Revisar bug que al volver de la vista de creacion de partida se sigue mostrando la flecha del stack navigator siendo que estoy en un tab navigator
// TODO: En la vista de partida debe verificarse si hay una partida en curso, caso contrario se muestra un cartel diciendo que creee una.
// TODO: implementar eliminacion de jugador
// TODO: implementar modal se siguiente ronda
// TODO: implementar finalizacion de partida

const Page = () => {
  const { currentGame } = useContext(AppContext);
  const players = currentGame?.players || [];

  const getColor = (index: number) => {
    if (players.every((player) => player.score === players[0].score)) {
      return ["#05a2e6", "#37b1e6"];
    }

    const maxScore = Math.max(...players.map((player) => player.score));
    const minScore = Math.min(...players.map((player) => player.score));

    if (players[index].score === maxScore) {
      return ["#f53636", "#f26b6b"];
    } else if (players[index].score === minScore) {
      return ["#05e62e", "#3ddb5a"];
    } else {
      return ["#05a2e6", "#37b1e6"];
    }
  };

  const getAverage = () => {
    const totalScore = players.reduce((acc, player) => acc + player.score, 0);
    return totalScore / players.length;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const finishRound = () => {
    setModalVisible(true);
  };

  const parseDate = (date: Date) => {
    return new Date(date).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handlePlayerPress = (playerName: string) => {
    Alert.alert(
      "Eliminar jugador",
      `¿Estás seguro de que quieres eliminar a ${playerName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => removeJugador(playerName), // Llama a removeJugador con el nombre del jugador
        },
      ]
    );
  };

  const removeJugador = (playerName: string) => {
    // Aquí implementarás la lógica para eliminar al jugador
    console.log(`Jugador eliminado: ${playerName}`);
  };

  if (!currentGame) {
    return (
      <View style={{
        ...styles.container,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text style={{ ...styles.headerText, textAlign: "center" }}>No hay una partida en curso</Text>
        <Text style={{ ...styles.headerText, textAlign: "center", fontWeight: 'normal', marginBottom: 20 }}>Cree una nueva partida para comenzar</Text>
        <CustomButton
          title="Nueva partida"
          onPress={() => router.push("/(tabs)")}
          bgColor={colors.green[500]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FinishRoundModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>El juego termina en {currentGame?.scoreLimit} puntos</Text>
          <Text style={styles.date}>{currentGame?.date ? parseDate(new Date(currentGame.date)) : "Fecha no disponible"}</Text>
        </View>

        <Text style={styles.averageText}>Media: {getAverage()} pts</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {players.map((player, index) => {
          const [colorA, colorB] = getColor(index);

          return (
            <TouchableOpacity key={index} onPress={() => handlePlayerPress(player.name)}>
              <View style={[styles.playerCard]}>
                <View
                  style={{
                    backgroundColor: colorA,
                    flex: 4,
                    padding: 16,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: colorB,
                    flex: 1,
                    padding: 16,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.playerScore}>{player.score} pts</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Botón de finalizar */}
      <TouchableOpacity style={styles.finishRoundButton} onPress={finishRound}>
        <Text style={styles.finisihRoundText}>Siguiente ronda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.finishButton}>
        <Text style={styles.finishButtonText}>Finalizar partida</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  averageText: {
    fontSize: 14,
    color: "#333333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  playerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  playerName: {
    fontSize: 16,
    color: "#333333",
  },
  playerScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  finishButton: {
    backgroundColor: "#e01f1f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  finishRoundButton: {
    backgroundColor: "#05a2e6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  finisihRoundText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Page;
