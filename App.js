import { useEffect, useState } from "react";
import { View } from "react-native";
import NavigatorHome from "./application/navigations/NavigatorHome";
import { Provider } from "react-redux";
import store from "./application/reducers/Store";
const App = (props) => {
  const [paginaCargada, setPaginaCargada] = useState(false);

  useEffect(() => {
    setPaginaCargada(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {paginaCargada ? (
        <Provider store={store}>
          <NavigatorHome></NavigatorHome>
        </Provider>
      ) : null}
    </View>
  );
};

export default App;
