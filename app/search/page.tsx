"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import { mockApi } from "@/lib/mocks";
import { MainNav } from "@/components/main-nav";
import { TravelCard } from "@/components/travel-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconSearch, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [searchInput, setSearchInput] = useState(query);
    const observerTarget = useRef<HTMLDivElement>(null);

    // 무한 스크롤 쿼리
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ["search-travels", query],
            queryFn: ({ pageParam = 0 }) =>
                mockApi.searchTravels(query, pageParam, 9),
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            initialPageParam: 0,
        });

    // Intersection Observer로 무한 스크롤 구현
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const element = observerTarget.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.5,
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [handleObserver]);

    // 검색 실행
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
        } else {
            router.push("/search");
        }
    };

    const allTravels = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="min-h-screen bg-background">
            <MainNav />

            <main className="container py-8">
                {/* 검색 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">여행 검색</h1>

                    {/* 검색바 */}
                    <form
                        onSubmit={handleSearch}
                        className="relative max-w-2xl"
                    >
                        <IconSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            size={20}
                        />
                        <Input
                            type="text"
                            placeholder="여행 제목이나 설명으로 검색하세요..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 h-12 text-base"
                        />
                    </form>

                    {query && (
                        <p className="mt-4 text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                &quot;{query}&quot;
                            </span>
                            에 대한 검색 결과
                        </p>
                    )}
                </div>

                {/* 로딩 상태 */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <div className="h-48 bg-muted animate-pulse" />
                                <CardContent className="p-4 space-y-3">
                                    <div className="h-6 bg-muted animate-pulse rounded" />
                                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : allTravels.length > 0 ? (
                    <>
                        {/* 여행 카드 그리드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTravels.map((travel) => (
                                <TravelCard key={travel.id} travel={travel} />
                            ))}
                        </div>

                        {/* 무한 스크롤 트리거 */}
                        <div
                            ref={observerTarget}
                            className="py-8 flex justify-center"
                        >
                            {isFetchingNextPage && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <IconLoader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                    <span>더 불러오는 중...</span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Card className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-4xl">
                                🔍
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    검색 결과가 없습니다
                                </h3>
                                <p className="text-muted-foreground">
                                    다른 키워드로 검색해보세요
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </main>
        </div>
    );
}
