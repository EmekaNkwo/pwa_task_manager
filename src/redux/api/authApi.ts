/* eslint-disable no-mixed-spaces-and-tabs */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryForAuth } from "../queryInterceptor";

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: baseQueryForAuth,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: 20,
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        verifyEmail: builder.query({
            query: (token) => ({
                url: "auth/verify-email",
                params: {
                    oobCode: token,
                },
            }),
        }),
        verifyResetPassword: builder.query({
            query: (token) => ({
                url: "auth/reset-code/verify",
                params: {
                    oobCode: token,
                },
            }),
        }),
        updatePassword: builder.mutation({
            query: (body) => ({
                url: "auth/reset-password",
                body,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useLazyVerifyEmailQuery,
    useLazyVerifyResetPasswordQuery,
    useUpdatePasswordMutation,
} = authApi;
