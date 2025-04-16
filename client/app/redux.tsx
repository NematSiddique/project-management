// helps keep a persistent reference to teh store
import { useRef } from "react"; 

// to manage global state

import { 
  combineReducers, 
  configureStore, // function from Redux Toolkit that creates a store with built-in middleware
} from "@reduxjs/toolkit"; 

// to connect react with redux
import {
  TypedUseSelectorHook,
  useDispatch, // react hook interacting with redux
  useSelector, // react hook interacting with redux
  Provider, // component that makes the Redux store available to the React app
} from "react-redux"; 
import globalReducer from "@/state"; // a user-defined reducer that manages global state
import { api } from "@/state/api"; // for making api requests
import { setupListeners } from "@reduxjs/toolkit/query"; // helper function from RTK Query that enables automatic refetching of data

// persists Redux state across page reloads
import {
  persistStore, // Functions from Redux Persist that help keep the Redux store state even after page reloads
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; 
import { PersistGate } from "redux-persist/integration/react"; // component from Redux Persist that delays rendering until the state is rehydrated
import createWebStorage from "redux-persist/lib/storage/createWebStorage"; // used to store persisted data in localStorage

/* setting-up REDUX PERSISTENCE */ 

// creates a storage object that uses localStorage for web and no-op storage (pa placeholder) for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// checks if the code is running in the browser or on the server
const storage =
  typeof window === "undefined" // uses no-op storage
    ? createNoopStorage()
    : createWebStorage("local"); // otherwise local

const persistConfig = {
  key: "root", // key used in localStorage to store the state
  storage, // uses the previously defined storage method
  whitelist: ["global"], // only persist the global slice of the state
};

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// persistReducer wraps rootReducer with persistence, so Redux state can be saved and restored after reloads
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* creating REDUX STORE */

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES */

// creating typscript types and custom hooks for the Redux store and its state
export type AppStore = ReturnType<typeof makeStore>; // type for the Redux store
export type RootState = ReturnType<AppStore["getState"]>; // type for the root state (state of the whole app)
export type AppDispatch = AppStore["dispatch"]; // type for the Redux dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>(); // custom hook for dispatching actions with correct types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // custom hook for selecting data from the Redux store with correct type

/* creating the store PROVIDER component */

// thsi component wraps the entire app with redux
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(); // ensures the store is created only once
  if (!storeRef.current) {
    storeRef.current = makeStore(); // initializes the Redux store if it doesn’t exist
    setupListeners(storeRef.current.dispatch); // enables automatic refetching of API data when certain conditions change
  }
  const persistor = persistStore(storeRef.current); // creates a persistor to save and restore Redux state

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}> 
        {children}
      </PersistGate> 
    </Provider>
  ); // delays rendering until the persisted state has been loaded
}