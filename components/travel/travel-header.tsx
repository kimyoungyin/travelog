"use client";

import { Travel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    IconHeart,
    IconPlayerPlay,
    IconPencil,
    IconLock,
    IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface TravelHeaderProps {
    travel: Travel;
    canEdit?: boolean;
    onLikeToggle?: () => void;
}

export function TravelHeader({
    travel,
    canEdit = false,
    onLikeToggle,
}: TravelHeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
            <div className="container">
                <div className="flex items-center justify-between py-4 gap-4">
                    {/* 좌측: 제목 + 국가 + 기간 */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold mb-2 truncate">
                            {travel.title}
                        </h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* 국가 플래그 */}
                            <div className="flex items-center gap-1">
                                {travel.countries.map((country) => (
                                    <span
                                        key={country.code}
                                        className="text-xl"
                                        title={country.name}
                                    >
                                        {country.flag}
                                    </span>
                                ))}
                            </div>

                            {/* 여행 기간 */}
                            <span className="text-sm text-muted-foreground">
                                {formatDate(travel.startDate)} -{" "}
                                {formatDate(travel.endDate)}
                            </span>
                        </div>
                    </div>

                    {/* 우측: 액션 버튼들 */}
                    <div className="flex items-center gap-2">
                        {/* 좋아요 버튼 */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={onLikeToggle}
                        >
                            <IconHeart size={18} />
                            <span className="hidden sm:inline">
                                {travel.likes}
                            </span>
                        </Button>

                        {/* 슬라이드쇼 버튼 */}
                        <Link href={`/travel/${travel.id}/show`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <IconPlayerPlay size={18} />
                                <span className="hidden sm:inline">
                                    슬라이드쇼
                                </span>
                            </Button>
                        </Link>

                        {/* 공개 상태 */}
                        <Badge
                            variant={travel.isPublic ? "default" : "secondary"}
                        >
                            {travel.isPublic ? (
                                <>
                                    <IconWorld size={14} className="mr-1" />
                                    공개
                                </>
                            ) : (
                                <>
                                    <IconLock size={14} className="mr-1" />
                                    비공개
                                </>
                            )}
                        </Badge>

                        {/* 수정 버튼 (권한 있을 때만) */}
                        {canEdit && (
                            <Button
                                variant="default"
                                size="sm"
                                className="gap-2"
                            >
                                <IconPencil size={18} />
                                <span className="hidden sm:inline">수정</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
