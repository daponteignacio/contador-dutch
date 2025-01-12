import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from "react-native";
import { FinishRoundModal } from "@/components/FinishRoundModal";
import CustomButton from "@/components/CustomButton";
import Animated, { BounceIn, BounceOut, LinearTransition } from "react-native-reanimated";
import { colors } from "@/styles/colors";
import { usePartida } from "@/hooks/usePartida";
import { router } from "expo-router";

// TODO: Revisar bug que al volver de la vista de creación de partida se sigue mostrando la flecha del stack navigator siendo que estoy en un tab navigator
// TODO: En la vista de partida debe verificarse si hay una partida en curso, caso contrario se muestra un cartel diciendo que cree una.
// TODO: implementar eliminación de jugador
// TODO: implementar modal de siguiente ronda

const PartidaScreen = () => {

  const {
    currentGame,
    players,
    modalVisible,
    setModalVisible,
    getColor,
    getAverage,
    finishRound,
    handlePlayerPress,
    handleFinalizarPartida,
  } = usePartida();

  const colorScheme = useColorScheme(); // Detecta el esquema de color
  const isDarkMode = colorScheme === "dark"; // Verifica si está en modo oscuro

  const dynamicBackgroundColor = isDarkMode ? colors.grey["950"] : colors.grey["50"];
  const dynamicTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];
  const dynamicSubTextColor = isDarkMode ? colors.grey["400"] : colors.grey["600"];
  const dynamicDetailsCardColor = isDarkMode ? colors.grey[900] : colors.white;
  const dynamicGameCardLabelColor = isDarkMode ? colors.grey[300] : colors.grey[600];
  const dynamicGameCardValueColor = isDarkMode ? colors.white : colors.white;
  const dynamicPlayerCardBackgroundColor = isDarkMode ? colors.grey["800"] : colors.grey["100"];
  const dynamicPlayerCardTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];

  if (!currentGame) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: dynamicBackgroundColor,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[styles.label, { color: dynamicTextColor }]}>
          No hay una partida en curso
        </Text>
        <Text
          style={[
            styles.label,
            {
              color: dynamicTextColor,
              fontWeight: "normal",
              marginBottom: 20,
            },
          ]}
        >
          Cree una nueva partida para comenzar
        </Text>
        <CustomButton
          title="Nueva partida"
          onPress={() => router.push("/game/create")}
          bgColor={colors.green["500"]}
        />
      </View>
    );
  }

  const finishMode = currentGame.finishMode === "first-to-lose" ? "Primero en perder" : "Último en ganar";

  return (
    <View style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}>
      <FinishRoundModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={[styles.card, { backgroundColor: dynamicDetailsCardColor }]}>
        <View style={styles.header}>
          <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Límite</Text>
          <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{currentGame.scoreLimit} pts</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Creación</Text>
            <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{currentGame.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Modo</Text>
            <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{finishMode}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} style={{ marginBottom: 20, }}>
        {players.map((player, index) => {
          const [colorA, colorB] = getColor(index);

          return (
            <TouchableOpacity key={index} onPress={() => handlePlayerPress(player.id)}>
              <Animated.View
                style={[styles.playerCard]}
                key={player.id}
                layout={LinearTransition.delay(index * 100)}
                entering={BounceIn}
                exiting={BounceOut}
              >
                <View
                  style={{
                    backgroundColor: colorA,
                    flex: 4,
                    padding: 16,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <Text style={styles.playerName}>
                    {player.name}
                  </Text>
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
                  <Text style={styles.playerScore}>
                    {player.score} pts
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <CustomButton title="Siguiente ronda" onPress={finishRound} bgColor={colors.blue["500"]} variant="outline" />
      <CustomButton title="Finalizar partida" onPress={handleFinalizarPartida} bgColor={colors.red["500"]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  date: {
    fontSize: 14,
  },
  averageText: {
    fontSize: 14,
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
  },
  playerScore: {
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: 35,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },

});

export default PartidaScreen;
