"use client";

import { TravelSpot } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { IconMapPin, IconClock } from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TravelSidebarProps {
    spots: TravelSpot[];
    selectedSpotId?: string;
    onSpotClick: (spotId: string) => void;
}

export function TravelSidebar({
    spots,
    selectedSpotId,
    onSpotClick,
}: TravelSidebarProps) {
    return (
        <div className="h-full overflow-y-auto p-4 space-y-3">
            {spots.map((spot, index) => {
                const isSelected = spot.id === selectedSpotId;
                const isFirst = index === 0;

                return (
                    <button
                        key={spot.id}
                        onClick={() => onSpotClick(spot.id)}
                        className={cn(
                            "w-full text-left transition-all duration-200",
                            isSelected && "scale-[1.02]"
                        )}
                    >
                        <Card
                            className={cn(
                                "overflow-hidden hover:shadow-lg transition-all",
                                isSelected && "ring-2 ring-primary shadow-lg",
                                isFirst &&
                                    !isSelected &&
                                    "ring-2 ring-yellow-400"
                            )}
                        >
                            {/* 이미지 */}
                            <div className="relative h-32 w-full bg-muted">
                                {spot.photos[0] ? (
                                    <Image
                                        src={spot.photos[0]}
                                        alt={spot.title}
                                        fill
                                        className="object-cover"
                                        sizes="300px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <IconMapPin
                                            size={40}
                                            className="text-muted-foreground"
                                        />
                                    </div>
                                )}

                                {/* 순서 번호 */}
                                <div
                                    className={cn(
                                        "absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md",
                                        isFirst
                                            ? "bg-yellow-400 text-yellow-900"
                                            : "bg-primary text-primary-foreground"
                                    )}
                                >
                                    {index + 1}
                                </div>

                                {isFirst && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                        시작
                                    </div>
                                )}
                            </div>

                            {/* 내용 */}
                            <div className="p-3">
                                <h3 className="font-semibold mb-1 line-clamp-1">
                                    {spot.title}
                                </h3>

                                <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
                                    <IconMapPin
                                        size={14}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <span className="line-clamp-1">
                                        {spot.location.address}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <IconClock size={14} />
                                    <span>
                                        {formatDateTime(spot.visitedAt)}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </button>
                );
            })}
        </div>
    );
}
