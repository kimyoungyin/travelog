"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    IconMap,
    IconSearch,
    IconUpload,
    IconUser,
    IconLogin,
} from "@tabler/icons-react";

export function MainNav() {
    const pathname = usePathname();

    // 간단한 인증 상태 (실제로는 Supabase Auth 사용)
    const isAuthenticated = true; // Mock 상태

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* 로고 */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl"
                >
                    <IconMap className="w-6 h-6 text-primary" />
                    <span>Travelog</span>
                </Link>

                {/* 네비게이션 */}
                <nav className="flex items-center gap-2">
                    <Link href="/search">
                        <Button
                            variant={
                                pathname === "/search" ? "default" : "ghost"
                            }
                            size="sm"
                            className="gap-2"
                        >
                            <IconSearch size={18} />
                            <span className="hidden sm:inline">검색</span>
                        </Button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link href="/travel/upload">
                                <Button
                                    variant={
                                        pathname === "/travel/upload"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="gap-2"
                                >
                                    <IconUpload size={18} />
                                    <span className="hidden sm:inline">
                                        업로드
                                    </span>
                                </Button>
                            </Link>

                            <Link href="/dashboard">
                                <Button
                                    variant={
                                        pathname === "/dashboard"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="gap-2"
                                >
                                    <IconUser size={18} />
                                    <span className="hidden sm:inline">
                                        내 여행
                                    </span>
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/signin">
                            <Button
                                variant="default"
                                size="sm"
                                className="gap-2"
                            >
                                <IconLogin size={18} />
                                <span>로그인</span>
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
