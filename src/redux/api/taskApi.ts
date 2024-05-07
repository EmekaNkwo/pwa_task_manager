/* eslint-disable no-mixed-spaces-and-tabs */
import { createApi, } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptor";

export const taskApi = createApi({
    reducerPath: "workItems",
    baseQuery: baseQueryWithInterceptor,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: 20,
    tagTypes: ["works"],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "works",
            providesTags: ["works"],
        }),
        createTask: builder.mutation({
            query: ({ ...data }) => ({
                url: "works",
                body: data,
                method: "POST",
            }),
            invalidatesTags: ["works"],
        }),
        updateTask: builder.mutation({
            query: ({ data }) => ({
                url: `works`,
                body: {
                    _id: data._id,
                    ...data
                },
                method: "PATCH",
            }),
            invalidatesTags: ["works"],
        }),
        deleteTask: builder.mutation({
            query: ({ data }) => ({
                url: `works`,
                method: "DELETE",
                body: {
                    _id: data._id
                }
            }),
            invalidatesTags: ["works"],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = taskApi;
