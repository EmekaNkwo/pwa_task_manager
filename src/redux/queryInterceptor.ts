import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { signOut } from "@/util/supabase/action";
import { baseUrl } from "./apiConfig";

// export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl + "/api/",
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem("task_token");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("Accept", "application/json");
        return headers;
    },
});

export const baseQueryWithInterceptor: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result: any = await baseQuery(args, api, extraOptions);
    // api.dispatch(updateIdleTimeOut());
    // Check if the response has a status code of 401
    if (result.error?.status === 401 || result.error?.originalStatus === 401) {
        // api.dispatch(setNotAuthorized())
        sessionStorage.removeItem("task_token");
    }
    if (result.error?.status === 403 || result.error?.originalStatus === 403) {
        // api.dispatch(setNotAuthorized())
        // message.error("Method Not Allowed");
        signOut()
        window.location.href = "/";
    }
    if (result.error?.status === 404 || result.error?.originalStatus === 404) {
        // message.error("Not Found");
    }
    if (result.error?.status === 503 || result.error?.originalStatus === 503) {
        // api.dispatch(setNotAuthorized())
        // message.error("Under Maintenance");
    }
    if (result.error?.status === 500 || result.error?.originalStatus === 500) {
        // api.dispatch(setServerError())
        // message.error("Server Error");
    }
    return result;
};

export const baseQueryForAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result: any = await baseQuery(args, api, extraOptions);
    // api.dispatch(updateIdleTimeOut());
    if (result.error?.status === 503 || result.error?.originalStatus === 503) {
        sessionStorage.removeItem("task_token");
    }

    if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    }
    return result;
};
