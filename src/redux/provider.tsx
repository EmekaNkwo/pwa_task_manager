"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { persistor, store } from "./store";
import localforage from "localforage";

const storage = localforage.createInstance({
    name: 'TaskManager',
});
export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}
