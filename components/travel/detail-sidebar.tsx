"use client";

import { TravelSpot } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
    IconX,
    IconChevronLeft,
    IconChevronRight,
    IconPencil,
    IconMapPin,
    IconClock,
} from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DetailSidebarProps {
    spot: TravelSpot | null;
    isOpen: boolean;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    canEdit?: boolean;
    hasPrevious?: boolean;
    hasNext?: boolean;
}

export function DetailSidebar({
    spot,
    isOpen,
    onClose,
    onPrevious,
    onNext,
    canEdit = false,
    hasPrevious = false,
    hasNext = false,
}: DetailSidebarProps) {
    return (
        <>
            {/* 오버레이 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* 사이드바 */}
            <div
                className={cn(
                    "fixed lg:absolute top-0 right-0 h-full w-full sm:w-96 bg-background shadow-2xl z-50 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {spot && (
                    <div className="h-full flex flex-col">
                        {/* 헤더 */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="font-semibold text-lg">
                                여행 지점 상세
                            </h2>
                            <div className="flex items-center gap-2">
                                {canEdit && (
                                    <Button variant="ghost" size="icon">
                                        <IconPencil size={18} />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                >
                                    <IconX size={20} />
                                </Button>
                            </div>
                        </div>

                        {/* 내용 */}
                        <div className="flex-1 overflow-y-auto">
                            {/* 사진 갤러리 */}
                            <div className="space-y-2 p-4">
                                {spot.photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted"
                                    >
                                        <Image
                                            src={photo}
                                            alt={`${spot.title} - ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="400px"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* 정보 */}
                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        {spot.title}
                                    </h3>

                                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                                        <IconMapPin
                                            size={16}
                                            className="mt-0.5 hrink-0"
                                        />
                                        <span>{spot.location.address}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <IconClock size={16} />
                                        <span>
                                            {formatDateTime(spot.visitedAt)}
                                        </span>
                                    </div>
                                </div>

                                {spot.description && (
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            설명
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {spot.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 네비게이션 버튼 */}
                        <div className="border-t p-4">
                            <div className="flex items-center justify-between gap-2">
                                {hasPrevious ? (
                                    <Button
                                        variant="outline"
                                        onClick={onPrevious}
                                        className="flex-1 gap-2"
                                    >
                                        <IconChevronLeft size={18} />
                                        이전 지점
                                    </Button>
                                ) : (
                                    <div className="flex-1" />
                                )}

                                {hasNext ? (
                                    <Button
                                        variant="outline"
                                        onClick={onNext}
                                        className="flex-1 gap-2"
                                    >
                                        다음 지점
                                        <IconChevronRight size={18} />
                                    </Button>
                                ) : (
                                    <div className="flex-1" />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
