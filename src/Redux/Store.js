import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";
const initialState = {};
const middleware = [thunk];

const win = window;
const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middleware),
          win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
        )
      )
    : createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
      );
export default store;
