import { useContext } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import CustomButton from "@/components/CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "@/styles/colors";
import { useMore } from "@/hooks/useMore";
import { UIContext } from "@/context/ui";
import { globalStyles } from "@/styles/globals";

const MoreScreen = () => {
  const { handleRating, handleEmail } = useMore();

  const {
    isDarkMode,
    toggleDarkMode,
    dynamicBackgroundColor,
    dynamicTextColor
  } = useContext(UIContext);

  return (
    <View style={[globalStyles.screenContainer, { backgroundColor: dynamicBackgroundColor }]}>
      {/* Sección de valoración */}
      <View style={styles.section}>
        <Text style={[styles.header, { color: dynamicTextColor }]}>
          Califica nuestra app
        </Text>
        <CustomButton
          title="Calificar en la tienda"
          onPress={handleRating}
          bgColor={colors.green["500"]}
          icon={
            Platform.OS === "android" ? (
              <MaterialCommunityIcons name="google-play" size={20} color={colors.white} />
            ) : (
              <MaterialCommunityIcons name="apple" size={20} color={colors.white} />
            )
          }
        />
      </View>

      {/* Sección de sugerencias */}
      <View style={styles.section}>
        <Text style={[styles.header, { color: dynamicTextColor }]}>
          Sugerencias
        </Text>
        <Text style={[styles.paragraph, { color: dynamicTextColor }]}>
          Si tienes alguna sugerencia o quieres reportar un error, envíanos un correo:
        </Text>
        <CustomButton
          title="Enviar correo"
          onPress={handleEmail}
          bgColor={colors.blue["500"]}
          icon={<MaterialCommunityIcons name="email" size={20} color={colors.white} />}
        />
      </View>

      {/* Sección de modo claro/oscuro */}
      <View style={styles.section}>
        <Text style={[styles.header, { color: dynamicTextColor }]}>
          Apariencia
        </Text>
        <View style={styles.darkModeToggle}>
          <Text style={[styles.paragraph, { color: dynamicTextColor }]}>
            Modo oscuro
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>

      {/* Footer */}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: dynamicTextColor }]}>
          © {new Date().getFullYear()} Dutch Contador. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
  },
  darkModeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});

export default MoreScreen;
