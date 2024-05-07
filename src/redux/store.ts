import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { taskApi } from "./api/taskApi";


const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authApi.middleware, taskApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
