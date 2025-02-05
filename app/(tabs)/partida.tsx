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
import { globalStyles } from "@/styles/globals";
import { Feather } from "@expo/vector-icons";
import { AddPlayerModal } from "@/components/AddPlayerModal";

const PartidaScreen = () => {

  const {
    currentGame,
    losersSorted,
    modales,
    playersSorted,
    addPlayer,
    getColor,
    handleFinalizarPartida,
    handlePlayerPress,
    nextRound,
    setModales,
  } = usePartida();

  const {
    dynamicBackgroundColor,
    dynamicCardBackgroundColor,
    dynamicCardTextColor,
  } = useContext(UIContext);

  if (!currentGame) return <NoGameScreen />;

  return (
    <View style={[globalStyles.screenContainer, { backgroundColor: dynamicBackgroundColor }]}>
      <FinishRoundModal modalVisible={modales.finishRoundModalVisible} setModalVisible={(visible: boolean) => setModales({ ...modales, finishRoundModalVisible: visible })} />
      <AddPlayerModal modalVisible={modales.addPlayerModalVisible} setModalVisible={(visible: boolean) => setModales({ ...modales, addPlayerModalVisible: visible })} />

      <PartidaDetails currentGame={currentGame} />

      <ScrollView contentContainerStyle={styles.listContainer} style={{ marginBottom: 20 }}>
        {playersSorted.map((player, index) => {
          const [colorA, colorB] = getColor(index);

          return (
            <TouchableOpacity key={index} onPress={() => handlePlayerPress(player.id)}>
              <Animated.View
                style={[styles.playerCard, { backgroundColor: colorA }]}
                key={player.id}
                layout={LinearTransition.delay(index * 100)}
                entering={BounceIn}
                exiting={BounceOut}
              >
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerScore}>{player.score} pts</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}

        {losersSorted.length > 0 && <Text style={{ color: dynamicCardTextColor, fontSize: 16, marginBottom: 10, marginTop: 20 }}>Perdedores</Text>}

        {losersSorted.map((player, index) => {
          return (
            <Animated.View
              style={[styles.playerCard, { backgroundColor: dynamicCardBackgroundColor }]}
              key={index}
              layout={LinearTransition.delay(index * 100)}
              entering={BounceIn}
              exiting={BounceOut}
            >
              <Text style={[styles.loserName, { color: dynamicCardTextColor }]}>{player.name} {player.status === PlayerStatus.GONE && "(Se fue)"}</Text>
              <Text style={[styles.loserScore, { color: dynamicCardTextColor }]}>{player.score} pts</Text>
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={{ gap: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.partidaButton, { backgroundColor: colors.yellow["500"] }]}
          onPress={addPlayer}
        >
          <Feather name="plus" size={24} color="#FFFFFF" />
          <Feather name="user" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.partidaButton, { backgroundColor: colors.red["500"] }]}
          onPress={handleFinalizarPartida}
        >
          <Feather name="x" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.partidaButton, { backgroundColor: colors.blue["500"] }]}
          onPress={nextRound}
        >
          <Feather name="chevron-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  partidaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
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
    height: 50,
    paddingHorizontal: 20,
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
