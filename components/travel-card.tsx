import Link from "next/link";
import Image from "next/image";
import { Travel } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconHeart, IconCalendar } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";

interface TravelCardProps {
    travel: Travel;
    className?: string;
}

export function TravelCard({ travel, className }: TravelCardProps) {
    return (
        <Link href={`/travel/${travel.id}`} className={className}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                {/* 커버 이미지 */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <Image
                        src={travel.coverImage}
                        alt={travel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* 좋아요 배지 */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-white text-sm">
                        <IconHeart size={16} fill="currentColor" />
                        <span>{travel.likes}</span>
                    </div>
                </div>

                <CardContent className="p-4">
                    {/* 제목 */}
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {travel.title}
                    </h3>

                    {/* 설명 */}
                    {travel.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {travel.description}
                        </p>
                    )}

                    {/* 국가 플래그 */}
                    <div className="flex items-center gap-2 mb-3">
                        {travel.countries.map((country) => (
                            <span
                                key={country.code}
                                className="text-2xl"
                                title={country.name}
                            >
                                {country.flag}
                            </span>
                        ))}
                    </div>

                    {/* 날짜와 지점 개수 */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <IconCalendar size={14} />
                            <span>
                                {formatDate(travel.startDate)} -{" "}
                                {formatDate(travel.endDate)}
                            </span>
                        </div>
                        {travel.spots.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                {travel.spots.length}개 지점
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
