import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ServicesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão de voltar no canto superior esquerdo */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Tela de Serviços</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10, // Deixa o botão pequeno
  },
  title: {
    marginTop: 60, // Para não ficar coberto pelo botão
    fontSize: 24,
  },
});
