import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    IconMap,
    IconSearch,
    IconUpload,
    IconArrowRight,
} from "@tabler/icons-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950 dark:via-purple-950 dark:to-pink-950">
            {/* Hero Section */}
            <section className="container py-20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <IconMap className="w-16 h-16 text-primary" />
                        <h1 className="text-6xl font-bold bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            Travelog
                        </h1>
                    </div>

                    {/* Tagline */}
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                        사진으로 기록하는
                        <br />
                        나의 여행 이야기
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        여행 사진의 위치 정보를 분석하여 자동으로 지도에
                        표시하고, 아름다운 슬라이드쇼로 추억을 공유하세요.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/travel/upload">
                            <Button
                                size="lg"
                                className="gap-2 text-lg px-8 py-6"
                            >
                                <IconUpload size={24} />
                                여행 기록 만들기
                            </Button>
                        </Link>
                        <Link href="/search">
                            <Button
                                variant="outline"
                                size="lg"
                                className="gap-2 text-lg px-8 py-6"
                            >
                                <IconSearch size={24} />
                                여행 둘러보기
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container py-20">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Travelog의 특별한 기능
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <IconMap className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-xl font-semibold">
                                    자동 지도 생성
                                </h4>
                                <p className="text-muted-foreground">
                                    사진의 위치 정보를 분석하여 자동으로 여행
                                    경로를 지도에 표시합니다
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-3xl">🎬</span>
                                </div>
                                <h4 className="text-xl font-semibold">
                                    슬라이드쇼
                                </h4>
                                <p className="text-muted-foreground">
                                    3D 캐러셀 효과로 여행의 순간들을 아름답게
                                    감상하세요
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-3xl">🌏</span>
                                </div>
                                <h4 className="text-xl font-semibold">
                                    여행 공유
                                </h4>
                                <p className="text-muted-foreground">
                                    친구들과 여행 기록을 공유하고 좋아요를
                                    받아보세요
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container py-20">
                <Card className="max-w-4xl mx-auto bg-linear-to-r from-violet-500 to-purple-600 text-white border-0">
                    <CardContent className="p-12 text-center space-y-6">
                        <h3 className="text-3xl font-bold">
                            지금 바로 시작해보세요
                        </h3>
                        <p className="text-lg text-white/90">
                            여행 사진만 있으면 몇 분 안에 멋진 여행 기록을 만들
                            수 있습니다
                        </p>
                        <Link href="/travel/upload">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="gap-2 text-lg px-8 py-6"
                            >
                                무료로 시작하기
                                <IconArrowRight size={24} />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="container py-8 border-t">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <IconMap className="w-5 h-5" />
                        <span className="font-semibold">Travelog</span>
                    </div>
                    <p>© 2024 Travelog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
