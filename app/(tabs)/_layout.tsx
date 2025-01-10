import { Platform } from "react-native";
import { Tabs } from "expo-router";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "@/styles/colors";

// TODO: Cuando hay una partida en curso agregar un icono animado a la tab de Partida que desaparece solo si estoy en la pantalla de la partida.
// TODO: Habilitar respuesta háptica en las tabs.
// TODO: Sacar highlite cuando aprieto una tab.


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: colors.blue[700],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {

          height: 70, // Altura de la tab bar
          backgroundColor: Colors[colorScheme ?? "light"].background, // Fondo dinámico
          // borderRadius: 20, // Bordes redondeados
          // marginHorizontal: 16, // Separación horizontal para el efecto flotante
          // marginBottom: 20, // Separación del borde inferior
          // position: "absolute", // Posicionar flotante
          // borderTopWidth: 0, // Eliminar borde superior
          // elevation: 10, // Sombra en Android
          // shadowColor: "#000", // Sombra en iOS
          // shadowOpacity: 0.2,
          // shadowOffset: { width: 0, height: 4 },
          // shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Ajustar tamaño del texto
          marginBottom: 10, // Separar texto del borde inferior
        },
        tabBarIconStyle: {
          marginTop: 5, // Espacio adicional entre icono y texto
        },
        animation: 'fade'
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
            <MaterialCommunityIcons name="cards" size={28} color={color} />
          ), // Icono de naipes
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: "Reglas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />
          ), // Icono de listado
        }}
      />
    </Tabs>
  );
}
