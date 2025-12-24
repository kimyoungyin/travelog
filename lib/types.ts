// 사용자 타입
export interface User {
    id: string;
    nickname: string;
    email: string;
    profileImage?: string;
    bio?: string;
}

// 국가 타입
export interface Country {
    code: string; // ISO 3166-1 alpha-2
    name: string;
    flag: string; // 국기 이모지
}

// 여행 지점 타입
export interface TravelSpot {
    id: string;
    travelId: string;
    title: string;
    description: string;
    photos: string[]; // 사진 URL 배열
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    visitedAt: string; // ISO 8601 날짜/시간
    order: number; // 시간 순서
}

// 여행 기록 타입
export interface Travel {
    id: string;
    userId: string;
    title: string;
    description?: string;
    coverImage: string; // 대표 이미지
    countries: Country[]; // 방문한 국가들
    startDate: string;
    endDate: string;
    spots: TravelSpot[]; // 여행 지점들
    isPublic: boolean;
    likes: number;
    createdAt: string;
    updatedAt: string;
}

// 검색 필터 타입
export interface SearchFilters {
    query?: string;
    country?: string;
    sortBy?: "latest" | "popular";
}

// 무한 스크롤 응답 타입
export interface PaginatedResponse<T> {
    data: T[];
    nextCursor?: string;
    hasMore: boolean;
}
