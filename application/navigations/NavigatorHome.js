import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import SplashScreen from "../screens/SplashScreen";
import VistaPrincipal from "../screens/VistaPrincipal";
import VistaDetallesPersonaje from "../screens/VistaDetallesPersonaje";
const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MyStack = (props) => {
  function abrirPrincipal() {
    props.navigationRedux.reset({
      index: 0,
      routes: [{ name: "vistaPrincipal" }],
    });
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerTitleStyle: {
            color: "#327cbc",
            fontSize: 18,
          },
          headerTintColor: "#327cbc",
          headerStyle: {
            backgroundColor: "white",
            height: 60,
          },
          headerBackTitleVisible: false,
          
          headerTitle: () => {
            return (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#327cbc" }}
                >
                  Rick and Morty
                </Text>
            );
          },
        }}
      >
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: forFade,
            cardStyle:{backgroundColor:'white'}
          }}
        />
        <Stack.Screen
          name="vistaPrincipal"
          component={VistaPrincipal}
          options={{ title: "Listado", gestureEnabled: false,cardStyle:{backgroundColor:'white'} }}
        />
        <Stack.Screen
          name="vistaDetalles"
          component={VistaDetallesPersonaje}
          options={{ title: "Detalles", gestureEnabled: false,cardStyle:{backgroundColor:'white'} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
