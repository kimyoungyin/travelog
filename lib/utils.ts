import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// 날짜 포맷 함수
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// 날짜/시간 포맷 함수
export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// 간단한 날짜 포맷 (MM.DD)
export function formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
    });
}
