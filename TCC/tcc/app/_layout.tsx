import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

// Importando as telas
import MenuScreen from "./drawer/menu";
import ProfileScreen from "./profile";
import ServicesScreen from "./services";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppLayout() {
  return <DrawerNavigator />;
}

// ✅ Criamos um Drawer que engloba o TabNavigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main" // Define a rota inicial
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

// ✅ Criamos o Tab Navigator dentro do Drawer
function TabNavigator() {
  const [isTabVisible, setIsTabVisible] = useState(true);

  return (
    <Tab.Navigator
      initialRouteName="Menu" // Define a rota inicial
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Services") iconName = "list";
          else if (route.name === "Menu") iconName = "menu";
          else if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: isTabVisible ? {} : { display: "none" },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Services">
        {({ route }) => <ScreenComponent name="Services" route={route} setIsTabVisible={setIsTabVisible} />}
      </Tab.Screen>
      <Tab.Screen name="Menu">
        {({ route }) => <ScreenComponent name="Menu" route={route} setIsTabVisible={setIsTabVisible} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {({ route }) => <ScreenComponent name="Profile" route={route} setIsTabVisible={setIsTabVisible} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// ✅ Componente para telas
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

type ScreenProps = {
  name: string;
  route: any;
  setIsTabVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function ScreenComponent({ name, route, setIsTabVisible }: ScreenProps) {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Atualiza a visibilidade do menu inferior com base na tela atual
    setIsTabVisible(route.name === "Menu");

    // Adiciona um listener para detectar quando o usuário volta para a tela
    const unsubscribe = navigation.addListener("focus", () => {
      setIsTabVisible(route.name === "Menu");
    });

    // Remove o listener ao desmontar o componente
    return unsubscribe;
  }, [route.name, setIsTabVisible, navigation]);

  const handleGoBack = () => {
    // Sempre volta para o menu principal
    navigation.navigate("Menu");
    setIsTabVisible(true); // Garante que o menu inferior reapareça
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Botão para abrir o menu lateral */}
      {name === "Menu" && (
        <TouchableOpacity
          onPress={() => navigation.openDrawer && navigation.openDrawer()}
          style={{ position: "absolute", left: 15, top: 15 }}
        >
          <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>
      )}

      {/* Botão de voltar */}
      {name !== "Menu" && (
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ position: "absolute", left: 15, top: 15 }}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
      )}

      <Text style={{ fontSize: 24 }}>{name}</Text>
    </View>
  );
}