import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PendingTaskState {
    pending: Array<Record<string, any>>;

}

const initialState: PendingTaskState = {
    pending: [],
};

const pendingTaskUpdateSlice = createSlice({
    name: "pendingTasks",
    initialState,
    reducers: {
        SET_PENDING_TASKS_UPDATE: (state, action) => {
            return {
                ...state, pending:
                    [...state.pending, action.payload],
            };
        },

        CLEAR_PENDING_TASK_UPDATE: (state) => {
            return {
                ...state,
                pending: initialState.pending,

            };
        },
    },
});

export const { SET_PENDING_TASKS_UPDATE, CLEAR_PENDING_TASK_UPDATE } = pendingTaskUpdateSlice.actions;
export default pendingTaskUpdateSlice.reducer;
