import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import "./App.css";
import Routes from "./Routes.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
function App() {
  if (process.env.NODE_ENV === "production") {
    window.console.log = () => {};
    window.console.info = () => {};
    window.console.error = () => {};
    window.console.warn = () => {};
  }
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
          <Toaster />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
