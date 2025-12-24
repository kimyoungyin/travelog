"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { mockApi, mockUser } from "@/lib/mocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    IconLoader2,
    IconChevronLeft,
    IconChevronRight,
    IconX,
    IconMapPin,
    IconClock,
} from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { TravelSpot } from "@/lib/types";

export default function ShowPage() {
    const params = useParams();
    const router = useRouter();
    const travelId = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 여행 데이터 가져오기
    const { data: travel } = useQuery({
        queryKey: ["travel", travelId],
        queryFn: () => mockApi.getTravel(travelId),
    });

    // 로딩 메시지 번갈아 표시
    useEffect(() => {
        if (!travel) return;

        const messages = [
            `${mockUser.nickname}님의 여행을 돌아보고 있어요!`,
            "거의 다 완성됐어요!",
        ];

        const interval = setInterval(() => {
            setLoadingMessage((prev) => (prev + 1) % messages.length);
        }, 3000);

        // 3초 후 로딩 완료
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [travel]);

    const handlePrevious = useCallback(() => {
        if (!travel) return;
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : travel.spots.length - 1
        );
    }, [travel]);

    const handleNext = useCallback(() => {
        if (!travel) return;
        setCurrentIndex((prev) =>
            prev < travel.spots.length - 1 ? prev + 1 : 0
        );
    }, [travel]);

    const handleClose = useCallback(() => {
        router.push(`/travel/${travelId}`);
    }, [travelId, router]);

    // 키보드 네비게이션
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrevious();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, handlePrevious, handleNext, handleClose]);

    if (!travel) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-white">
                    <IconLoader2 className="animate-spin" size={48} />
                    <p>여행 기록을 불러오는 중...</p>
                </div>
            </div>
        );
    }

    const loadingMessages = [
        `${mockUser.nickname}님의 여행을 돌아보고 있어요!`,
        "거의 다 완성됐어요!",
    ];

    // 로딩 화면
    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 text-white">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">
                            ✈️
                        </div>
                    </div>
                    <p className="text-2xl font-semibold animate-pulse">
                        {loadingMessages[loadingMessage]}
                    </p>
                </div>
            </div>
        );
    }

    if (travel.spots.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Card className="p-12 text-center">
                    <p className="text-muted-foreground">
                        표시할 여행 지점이 없습니다
                    </p>
                    <Button onClick={handleClose} className="mt-4">
                        돌아가기
                    </Button>
                </Card>
            </div>
        );
    }

    const currentSpot = travel.spots[currentIndex];
    const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : travel.spots.length - 1;
    const nextIndex =
        currentIndex < travel.spots.length - 1 ? currentIndex + 1 : 0;

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* 닫기 버튼 */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            >
                <IconX size={24} />
            </Button>

            {/* 진행 상황 표시 */}
            <div className="absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-sm font-medium">
                    {currentIndex + 1} / {travel.spots.length}
                </span>
            </div>

            {/* 3D Carousel */}
            <div className="h-screen flex items-center justify-center p-4">
                <div className="relative w-full max-w-7xl h-[80vh] flex items-center justify-center">
                    {/* 이전 카드 (왼쪽) */}
                    <div
                        className="absolute left-0 w-64 opacity-40 scale-75 transition-all duration-500 cursor-pointer hover:opacity-60"
                        onClick={handlePrevious}
                        style={{ transform: "translateX(-20%) rotateY(15deg)" }}
                    >
                        <SlideCard spot={travel.spots[prevIndex]} />
                    </div>

                    {/* 현재 카드 (중앙) */}
                    <div className="relative z-10 w-full max-w-2xl scale-100 transition-all duration-500">
                        <SlideCard spot={currentSpot} isActive />
                    </div>

                    {/* 다음 카드 (오른쪽) */}
                    <div
                        className="absolute right-0 w-64 opacity-40 scale-75 transition-all duration-500 cursor-pointer hover:opacity-60"
                        onClick={handleNext}
                        style={{ transform: "translateX(20%) rotateY(-15deg)" }}
                    >
                        <SlideCard spot={travel.spots[nextIndex]} />
                    </div>
                </div>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                    <IconChevronLeft size={24} />
                </Button>

                <div className="flex gap-2">
                    {travel.spots.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                index === currentIndex
                                    ? "bg-white w-8"
                                    : "bg-white/40 hover:bg-white/60"
                            )}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                    <IconChevronRight size={24} />
                </Button>
            </div>

            {/* 여행 지도로 돌아가기 */}
            <Button
                onClick={handleClose}
                className="absolute bottom-8 right-8 z-50 gap-2"
            >
                <IconMapPin size={18} />
                여행 지도로 돌아가기
            </Button>
        </div>
    );
}

// 슬라이드 카드 컴포넌트
interface SlideCardProps {
    spot: TravelSpot;
    isActive?: boolean;
}

function SlideCard({ spot, isActive = false }: SlideCardProps) {
    return (
        <Card
            className={cn(
                "overflow-hidden transition-all duration-300",
                isActive ? "shadow-2xl" : "shadow-lg"
            )}
        >
            {/* 이미지 */}
            <div className="relative w-full aspect-4/3 bg-muted">
                {spot.photos[0] ? (
                    <Image
                        src={spot.photos[0]}
                        alt={spot.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority={isActive}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <IconMapPin
                            size={64}
                            className="text-muted-foreground"
                        />
                    </div>
                )}
            </div>

            {/* 정보 */}
            {isActive && (
                <div className="p-6 bg-background">
                    <h2 className="text-2xl font-bold mb-3">{spot.title}</h2>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                        <IconMapPin size={16} className="mt-0.5 shrink-0" />
                        <span>{spot.location.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <IconClock size={16} />
                        <span>{formatDateTime(spot.visitedAt)}</span>
                    </div>

                    {spot.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {spot.description}
                        </p>
                    )}
                </div>
            )}
        </Card>
    );
}
