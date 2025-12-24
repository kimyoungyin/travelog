'use client'

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // SSR에서는 클라이언트에서 즉시 refetch하지 않도록 staleTime 설정
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        // Server: 항상 새로운 query client 생성
        return makeQueryClient()
    } else {
        // Browser: query client가 없을 때만 새로 생성
        // React가 초기 렌더링 중 suspend될 때 client를 다시 만들지 않도록 중요
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

