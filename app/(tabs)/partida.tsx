import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FinishRoundModal } from "@/components/FinishRoundModal";
import CustomButton from "@/components/CustomButton";
import Animated, { BounceIn, BounceOut, LinearTransition } from "react-native-reanimated";
import { colors } from "@/styles/colors";
import { usePartida } from "@/hooks/usePartida";
import { NoGameScreen } from "@/components/NoGameScreen";
import { UIContext } from "@/context/ui";
import { PartidaDetails } from "@/components/PartidaDetails";
import { PlayerStatus } from "@/interfaces";

const PartidaScreen = () => {

  const {
    currentGame,
    losersSorted,
    modalVisible,
    playersSorted,
    getColor,
    handleFinalizarPartida,
    handlePlayerPress,
    nextRound,
    setModalVisible,
  } = usePartida();

  const {
    dynamicBackgroundColor,
    dynamicCardBackgroundColor,
    dynamicCardTextColor,
  } = useContext(UIContext);

  if (!currentGame) return <NoGameScreen />;

  return (
    <View style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}>
      <FinishRoundModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <PartidaDetails currentGame={currentGame} />

      <ScrollView contentContainerStyle={styles.listContainer} style={{ marginBottom: 20 }}>
        {playersSorted.map((player, index) => {
          const [colorA, colorB] = getColor(index);

          return (
            <TouchableOpacity key={index} onPress={() => handlePlayerPress(player.id)}>
              <Animated.View
                style={styles.playerCard}
                key={player.id}
                layout={LinearTransition.delay(index * 100)}
                entering={BounceIn}
                exiting={BounceOut}
              >
                <View style={[styles.playerNameContainer, { backgroundColor: colorA }]}>
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>

                <View style={[styles.playerScoreContainer, { backgroundColor: colorB }]}>
                  <Text style={styles.playerScore}>{player.score} pts</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
        {losersSorted.map((player, index) => {
          return (
            <Animated.View
              style={styles.playerCard}
              key={index}
              layout={LinearTransition.delay(index * 100)}
              entering={BounceIn}
              exiting={BounceOut}
            >
              <View
                style={[styles.playerNameContainer, { backgroundColor: dynamicCardBackgroundColor }]}
              >
                <Text style={[styles.loserName, { color: dynamicCardTextColor }]}>{player.name} {player.status === PlayerStatus.GONE && "(Se fue)"}</Text>
              </View>

              <View style={[styles.playerScoreContainer, { backgroundColor: dynamicCardBackgroundColor }]}>
                <Text style={[styles.loserScore, { color: dynamicCardTextColor }]}>{player.score} pts</Text>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>

      <CustomButton title="Siguiente ronda" onPress={nextRound} bgColor={colors.blue["500"]} variant="outline" />
      <CustomButton title="Finalizar partida" onPress={handleFinalizarPartida} bgColor={colors.red["500"]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  playerNameContainer: {
    flex: 4,
    padding: 16,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playerName: {
    fontSize: 16,
  },
  loserName: {
    fontSize: 16,
    color: colors.grey[200],
  },
  playerScoreContainer: {
    flex: 1,
    padding: 16,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  playerScore: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loserScore: {
    fontSize: 16,
    color: "#FF0000",
    fontWeight: "bold",
  },
});

export default PartidaScreen;
