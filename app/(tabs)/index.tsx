import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, { SlideInLeft } from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import { AppContext } from "@/context";


const HomeScreen = () => {
  const router = useRouter();
  const { games } = useContext(AppContext);



  const handleNewGame = () => {
    router.push("/game/create");
  };

  return (
    <View style={styles.container}>
      {/* Botón de Nueva Partida */}
      <CustomButton title="Nueva partida" onPress={handleNewGame} bgColor={colors.green[500]} />

      {/* Historial de partidas */}
      <Text style={styles.historyTitle}>Historial de partidas</Text>
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {games.map((game, index) => (
          <Animated.View
            key={game.id}
            entering={SlideInLeft
              .duration(500)
              .delay(index * 200)} // Agregamos delay progresivo
            style={styles.gameCard}
          >
            <TouchableOpacity
              style={styles.touchableCard}
              onPress={() => router.push(`/game/${game.id}`)}
            >
              <Text style={styles.gameDate}>{game.date}</Text>
              <Text style={styles.gameScore}>{game.scoreLimit} pts</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  newGameButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  newGameButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  historyContainer: {
    paddingBottom: 20,
  },
  gameCard: {
    backgroundColor: "#F0F0F0",
    marginBottom: 10,
    borderRadius: 10,
  },
  touchableCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  gameDate: {
    fontSize: 16,
    color: "#333333",
  },
  gameScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default HomeScreen;
