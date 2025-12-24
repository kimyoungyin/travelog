"use client";

import { TravelSpot } from "@/lib/types";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";

interface TravelMapProps {
    spots: TravelSpot[];
    selectedSpotId?: string;
    onSpotClick: (spotId: string) => void;
}

export function TravelMap({
    spots,
    selectedSpotId,
    onSpotClick,
}: TravelMapProps) {
    if (spots.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">지도 데이터가 없습니다</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            {/* 지도 배경 (실제로는 Google Maps가 들어갈 자리) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <IconMapPin size={120} className="text-muted-foreground" />
            </div>

            {/* 지도 마커들 (간단한 시각화) */}
            <div className="absolute inset-0 p-12">
                <div className="relative w-full h-full">
                    {spots.map((spot, index) => {
                        // 화면 상의 위치를 계산 (간단한 원형 배치)
                        const angle = (index / spots.length) * 2 * Math.PI;
                        const radius = 35; // 중심에서의 거리 (%)
                        const x = 50 + radius * Math.cos(angle);
                        const y = 50 + radius * Math.sin(angle);

                        const isSelected = spot.id === selectedSpotId;
                        const isFirst = index === 0;

                        return (
                            <button
                                key={spot.id}
                                onClick={() => onSpotClick(spot.id)}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                    isSelected
                                        ? "z-20 scale-125"
                                        : "z-10 hover:scale-110"
                                }`}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                }}
                            >
                                <div
                                    className={`relative rounded-full overflow-hidden border-4 transition-colors ${
                                        isSelected
                                            ? "border-primary shadow-xl"
                                            : isFirst
                                            ? "border-yellow-400 shadow-lg"
                                            : "border-white shadow-md"
                                    }`}
                                >
                                    {spot.photos[0] ? (
                                        <Image
                                            src={spot.photos[0]}
                                            alt={spot.title}
                                            width={
                                                isSelected
                                                    ? 80
                                                    : isFirst
                                                    ? 70
                                                    : 60
                                            }
                                            height={
                                                isSelected
                                                    ? 80
                                                    : isFirst
                                                    ? 70
                                                    : 60
                                            }
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`bg-primary flex items-center justify-center ${
                                                isSelected
                                                    ? "w-20 h-20"
                                                    : isFirst
                                                    ? "w-[70px] h-[70px]"
                                                    : "w-15 h-15"
                                            }`}
                                        >
                                            <IconMapPin
                                                className="text-white"
                                                size={24}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* 순서 번호 */}
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                    {index + 1}
                                </div>
                            </button>
                        );
                    })}

                    {/* 연결선 (Polyline 시뮬레이션) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {spots.map((spot, index) => {
                            if (index === spots.length - 1) return null;

                            const angle1 = (index / spots.length) * 2 * Math.PI;
                            const angle2 =
                                ((index + 1) / spots.length) * 2 * Math.PI;
                            const radius = 35;
                            const x1 = 50 + radius * Math.cos(angle1);
                            const y1 = 50 + radius * Math.sin(angle1);
                            const x2 = 50 + radius * Math.cos(angle2);
                            const y2 = 50 + radius * Math.sin(angle2);

                            return (
                                <line
                                    key={`line-${spot.id}`}
                                    x1={`${x1}%`}
                                    y1={`${y1}%`}
                                    x2={`${x2}%`}
                                    y2={`${y2}%`}
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="3"
                                    strokeDasharray="5,5"
                                    opacity="0.6"
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Google Maps 안내 */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-muted-foreground">
                💡 실제 배포 시 Google Maps API가 적용됩니다
            </div>
        </div>
    );
}
