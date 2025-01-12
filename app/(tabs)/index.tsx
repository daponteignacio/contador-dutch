import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import { useHome } from "@/hooks/useHome";

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { currentGame, games, handleNewGame, router } = useHome();

  if (!games.length && !currentGame) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? colors.grey["950"] : colors.grey["50"] },
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={[styles.headerText, { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] }]}>
          No hay partidas guardadas
        </Text>
        <Text
          style={[
            styles.headerText,
            {
              marginBottom: 20,
              color: isDarkMode ? colors.grey["200"] : colors.grey["900"],
              fontWeight: "normal",
            },
          ]}
        >
          Cree una nueva partida para comenzar
        </Text>
        <CustomButton title="Nueva partida" onPress={handleNewGame} bgColor={colors.green["500"]} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.grey["950"] : colors.grey["50"] },
      ]}
    >
      <CustomButton title="Nueva partida" onPress={handleNewGame} bgColor={colors.green["500"]} />

      {games.length > 0 && (
        <Text style={[styles.historyTitle, { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] }]}>
          Historial de partidas
        </Text>
      )}
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {games.map((game, index) => (
          <Animated.View
            key={game.id}
            entering={SlideInLeft.duration(500).delay(index * 200)}
            style={[
              styles.gameCard,
              { backgroundColor: isDarkMode ? colors.grey["800"] : colors.grey["100"] },
            ]}
          >
            <TouchableOpacity
              style={styles.touchableCard}
              onPress={() => router.push(`/game/${game.id}`)}
            >
              <Text style={[styles.gameDate, { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] }]}>
                {game.date}
              </Text>
              <Text style={[styles.gameScore, { color: isDarkMode ? colors.grey["200"] : colors.grey["900"] }]}>
                {game.scoreLimit} pts
              </Text>
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
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyContainer: {
    paddingBottom: 20,
  },
  gameCard: {
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
  },
  gameScore: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
