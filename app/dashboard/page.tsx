"use client";

import { useQuery } from "@tanstack/react-query";
import { mockApi, mockUser } from "@/lib/mocks";
import { MainNav } from "@/components/main-nav";
import { TravelCard } from "@/components/travel-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconPlus, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
    // 내 여행 목록 가져오기
    const { data: travels, isLoading } = useQuery({
        queryKey: ["my-travels"],
        queryFn: () => mockApi.getMyTravels(),
    });

    return (
        <div className="min-h-screen bg-background">
            <MainNav />

            <main className="container py-8">
                {/* 프로필 섹션 */}
                <Card className="mb-8 overflow-hidden">
                    <div className="h-32 bg-linear-to-r from-violet-500 to-purple-600" />
                    <CardContent className="relative pt-0 pb-6">
                        {/* 프로필 이미지 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                                    {mockUser.profileImage ? (
                                        <Image
                                            src={mockUser.profileImage}
                                            alt={mockUser.nickname}
                                            width={128}
                                            height={128}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl">
                                            👤
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 프로필 정보 */}
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-1">
                                    {mockUser.nickname}
                                </h1>
                                {mockUser.bio && (
                                    <p className="text-muted-foreground mb-3">
                                        {mockUser.bio}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <IconMapPin size={16} />
                                        <span>
                                            {travels?.length || 0}개의 여행
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 업로드 버튼 */}
                            <Link href="/travel/upload">
                                <Button size="lg" className="gap-2">
                                    <IconPlus size={20} />새 여행 기록
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* 여행 기록 리스트 */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">내 여행 기록</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
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
                ) : travels && travels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {travels.map((travel) => (
                            <TravelCard key={travel.id} travel={travel} />
                        ))}
                    </div>
                ) : (
                    <Card className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-4xl">
                                ✈️
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    아직 여행 기록이 없어요
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    첫 여행 기록을 만들어보세요!
                                </p>
                                <Link href="/travel/upload">
                                    <Button className="gap-2">
                                        <IconPlus size={20} />
                                        여행 기록 만들기
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                )}
            </main>
        </div>
    );
}
