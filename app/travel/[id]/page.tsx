"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { mockApi } from "@/lib/mocks";
import { TravelHeader } from "@/components/travel/travel-header";
import { TravelMap } from "@/components/travel/travel-map";
import { TravelSidebar } from "@/components/travel/travel-sidebar";
import { DetailSidebar } from "@/components/travel/detail-sidebar";
import { MainNav } from "@/components/main-nav";
import { Card } from "@/components/ui/card";
import { IconLoader2 } from "@tabler/icons-react";

export default function TravelPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    const travelId = params.id as string;
    const selectedSpotId = searchParams.get("spot");

    // 여행 데이터 가져오기
    const { data: travel, isLoading } = useQuery({
        queryKey: ["travel", travelId],
        queryFn: () => mockApi.getTravel(travelId),
    });

    // 좋아요 토글 mutation
    const likeMutation = useMutation({
        mutationFn: () => mockApi.toggleLike(travelId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["travel", travelId] });
        },
    });

    // 지점 선택 핸들러
    const handleSpotClick = (spotId: string) => {
        router.push(`/travel/${travelId}?spot=${spotId}`, { scroll: false });
    };

    // DetailSidebar 닫기
    const handleCloseDetail = () => {
        router.push(`/travel/${travelId}`, { scroll: false });
    };

    // 이전/다음 지점 이동
    const handlePreviousSpot = () => {
        if (!travel || !selectedSpotId) return;
        const currentIndex = travel.spots.findIndex(
            (s) => s.id === selectedSpotId
        );
        if (currentIndex > 0) {
            handleSpotClick(travel.spots[currentIndex - 1].id);
        }
    };

    const handleNextSpot = () => {
        if (!travel || !selectedSpotId) return;
        const currentIndex = travel.spots.findIndex(
            (s) => s.id === selectedSpotId
        );
        if (currentIndex < travel.spots.length - 1) {
            handleSpotClick(travel.spots[currentIndex + 1].id);
        }
    };

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <MainNav />
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="flex flex-col items-center gap-4">
                        <IconLoader2
                            className="animate-spin text-primary"
                            size={48}
                        />
                        <p className="text-muted-foreground">
                            여행 기록을 불러오는 중...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // 데이터 없음
    if (!travel) {
        return (
            <div className="min-h-screen bg-background">
                <MainNav />
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <Card className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-4xl">
                                😢
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    여행 기록을 찾을 수 없습니다
                                </h3>
                                <p className="text-muted-foreground">
                                    존재하지 않거나 삭제된 여행입니다
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const selectedSpot = selectedSpotId
        ? travel.spots.find((s) => s.id === selectedSpotId)
        : null;

    const selectedSpotIndex = selectedSpotId
        ? travel.spots.findIndex((s) => s.id === selectedSpotId)
        : -1;

    // 권한 체크 (실제로는 Supabase Auth로 확인)
    const canEdit = travel.userId === "user-1"; // Mock

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <MainNav />

            <TravelHeader
                travel={travel}
                canEdit={canEdit}
                onLikeToggle={() => likeMutation.mutate()}
            />

            <div className="flex-1 relative flex">
                {/* 좌측 사이드바 */}
                <aside className="hidden lg:block w-80 border-r bg-muted/30 overflow-hidden">
                    <TravelSidebar
                        spots={travel.spots}
                        selectedSpotId={selectedSpotId || undefined}
                        onSpotClick={handleSpotClick}
                    />
                </aside>

                {/* 메인 지도 영역 */}
                <main className="flex-1 relative">
                    <TravelMap
                        spots={travel.spots}
                        selectedSpotId={selectedSpotId || undefined}
                        onSpotClick={handleSpotClick}
                    />
                </main>

                {/* 우측 상세 사이드바 */}
                <DetailSidebar
                    spot={selectedSpot || null}
                    isOpen={!!selectedSpot}
                    onClose={handleCloseDetail}
                    onPrevious={handlePreviousSpot}
                    onNext={handleNextSpot}
                    canEdit={canEdit}
                    hasPrevious={selectedSpotIndex > 0}
                    hasNext={selectedSpotIndex < travel.spots.length - 1}
                />
            </div>

            {/* 모바일 하단 사이드바 버튼 */}
            {travel.spots.length > 0 && (
                <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
                    <button
                        onClick={() => {
                            // 모바일에서 사이드바 토글 (간단한 구현)
                            if (!selectedSpotId) {
                                handleSpotClick(travel.spots[0].id);
                            }
                        }}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg font-medium"
                    >
                        {travel.spots.length}개 지점 보기
                    </button>
                </div>
            )}
        </div>
    );
}
