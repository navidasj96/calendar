// In Next.js, this file would be called: app/providers.jsx
"use client";

import {
    QueryClient,
    QueryClientProvider,
    isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";


function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {

                staleTime: 60 * 1000,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {

        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {

    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {/* force font size for react query dev tools: https://github.com/TanStack/query/issues/6666 */}
            <div style={{ fontSize: "16px" }}>
                <ReactQueryDevtools />
            </div>
        </QueryClientProvider>
    );
}
