import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Bem-vindo à Home!</Text>
      <Button title="Abrir Menu" onPress={() => router.push("./drawer/menu")} />
    </View>
  );
}
