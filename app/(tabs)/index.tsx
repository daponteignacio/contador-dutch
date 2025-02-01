import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideOutRight } from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import { useHome } from "@/hooks/useHome";
import { UIContext } from "@/context/ui";
import { globalStyles } from "@/styles/globals";

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { currentGame, games, handleNewGame, handleDeleteOldGame, router } = useHome();

  const {
    dynamicBackgroundColor,
    dynamicTextColor,
    dynamicCardBackgroundColor,
    dynamicCardTextColor,
  } = useContext(UIContext)

  if (!games.length && !currentGame) {
    return (
      <View
        style={[
          globalStyles.screenContainer,
          { backgroundColor: dynamicBackgroundColor },
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={[styles.headerText, { color: dynamicTextColor }]}>
          No hay partidas guardadas
        </Text>
        <Text
          style={[
            styles.headerText,
            {
              marginBottom: 20,
              color: dynamicTextColor,
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
        { backgroundColor: dynamicBackgroundColor },
      ]}
    >
      <CustomButton title="Nueva partida" onPress={handleNewGame} bgColor={colors.green["500"]} />

      {games.length > 0 && (
        <Text style={[styles.historyTitle, { color: dynamicTextColor }]}>
          Historial de partidas
        </Text>
      )}
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {games.map((game, index) => {

          console.log('game', game)

          return (
            <Animated.View
              key={game?.id}
              entering={SlideInLeft.duration(500).delay(index * 100)}
              exiting={SlideOutRight.duration(500)}
              style={styles.gameCard}
            >
              <TouchableOpacity
                style={[styles.touchableCard, { backgroundColor: dynamicCardBackgroundColor }]}
                onPress={() => router.push(`/game/${game?.id}`)}
                onLongPress={() => handleDeleteOldGame(game?.id)}
              >
                <Text style={[styles.gameDate, { color: dynamicCardTextColor }]}>
                  {game?.date}
                </Text>
                <Text style={[styles.gameScore, { color: dynamicCardTextColor }]}>
                  {game?.scoreLimit} pts
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )
        })}
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
  },
  touchableCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
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
