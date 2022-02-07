import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import "./App.css";
import Routes from "./Routes.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  let theme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#43b049",
        contrastText: "#fff",
      },
      // secondary: {
      //   main: "#edf2ff",
      // },
    },
  });

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
