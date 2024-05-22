import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { taskApi } from "./api/taskApi";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import pendingTaskUpdateSlice from "./slice/pendingTaskSlice";
import localforage from "localforage";


const rootReducer = combineReducers({
    pendingUpdate: pendingTaskUpdateSlice,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["pendingUpdate"], // Whitelist the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authApi.middleware, taskApi.middleware]),
});
const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };