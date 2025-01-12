import React, { useRef, useEffect, useContext, Fragment } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Tabs, usePathname, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "@/styles/colors";
import { AppContext } from "@/context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentGame } = useContext(AppContext);
  const pathname = usePathname();

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (currentGame) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [currentGame]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.blue[700],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 70,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Nuevo juego",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="partida"
        options={{
          title: "Partida",
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialCommunityIcons name="cards" size={28} color={color} />
              {currentGame && pathname !== '/partida' && (
                <Fragment>
                  <Animated.View style={{
                    ...styles.greenDot, transform: [{ scale: pulseAnim }], opacity: pulseAnim.interpolate({ inputRange: [1, 1.5], outputRange: [1, 0] }), backgroundColor: colors.green[500]
                  }} />
                  <View style={styles.greenDot} />
                </Fragment>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: "Reglas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Más",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="more-horiz" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  greenDot: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green[500],
  },
});