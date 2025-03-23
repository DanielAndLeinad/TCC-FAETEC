import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Página de Configurações</Text>
      <Button title="Abrir Menu" onPress={() => router.push("./drawer/menu")} />
    </View>
  );
}
