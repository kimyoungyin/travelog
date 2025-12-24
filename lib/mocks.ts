import { User, Country, TravelSpot, Travel } from "./types";

// Mock 사용자 데이터
export const mockUser: User = {
    id: "user-1",
    nickname: "여행러버",
    email: "traveler@example.com",
    profileImage:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    bio: "세계를 여행하며 순간을 기록합니다 ✈️",
};

// Mock 국가 데이터
export const mockCountries: Record<string, Country> = {
    JP: { code: "JP", name: "일본", flag: "🇯🇵" },
    FR: { code: "FR", name: "프랑스", flag: "🇫🇷" },
    IT: { code: "IT", name: "이탈리아", flag: "🇮🇹" },
    TH: { code: "TH", name: "태국", flag: "🇹🇭" },
    ES: { code: "ES", name: "스페인", flag: "🇪🇸" },
    US: { code: "US", name: "미국", flag: "🇺🇸" },
    GB: { code: "GB", name: "영국", flag: "🇬🇧" },
    KR: { code: "KR", name: "한국", flag: "🇰🇷" },
};

// Mock 여행 지점 데이터 - 도쿄 여행
const tokyoSpots: TravelSpot[] = [
    {
        id: "spot-1",
        travelId: "travel-1",
        title: "나리타 공항 도착",
        description:
            "설레는 마음으로 일본에 도착했습니다. 공항에서부터 느껴지는 일본의 분위기!",
        photos: [
            "https://images.unsplash.com/photo-1583550483040-f0b9e1062bfa?w=800",
        ],
        location: {
            lat: 35.7647,
            lng: 140.3864,
            address: "나리타 국제공항, 치바현",
        },
        visitedAt: "2024-03-01T14:30:00Z",
        order: 1,
    },
    {
        id: "spot-2",
        travelId: "travel-1",
        title: "아사쿠사 센소지",
        description:
            "도쿄에서 가장 오래된 절. 전통적인 일본의 아름다움을 느낄 수 있었습니다.",
        photos: [
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
            "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800",
        ],
        location: {
            lat: 35.7148,
            lng: 139.7967,
            address: "센소지, 아사쿠사, 도쿄",
        },
        visitedAt: "2024-03-01T17:00:00Z",
        order: 2,
    },
    {
        id: "spot-3",
        travelId: "travel-1",
        title: "시부야 스크램블 교차로",
        description:
            "세계에서 가장 붐비는 교차로! 수많은 사람들과 함께 건너는 경험이 신기했어요.",
        photos: [
            "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
        ],
        location: {
            lat: 35.6595,
            lng: 139.7004,
            address: "시부야 스크램블 교차로, 도쿄",
        },
        visitedAt: "2024-03-02T11:00:00Z",
        order: 3,
    },
    {
        id: "spot-4",
        travelId: "travel-1",
        title: "하라주쿠 다케시타 거리",
        description:
            "젊음의 거리 하라주쿠! 독특한 패션과 맛있는 크레페를 즐겼습니다.",
        photos: [
            "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800",
        ],
        location: {
            lat: 35.6702,
            lng: 139.7027,
            address: "다케시타 거리, 하라주쿠, 도쿄",
        },
        visitedAt: "2024-03-02T14:30:00Z",
        order: 4,
    },
    {
        id: "spot-5",
        travelId: "travel-1",
        title: "도쿄 타워",
        description:
            "야경이 아름다운 도쿄 타워. 전망대에서 본 도쿄의 야경은 잊을 수 없어요.",
        photos: [
            "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        ],
        location: {
            lat: 35.6586,
            lng: 139.7454,
            address: "도쿄 타워, 미나토구, 도쿄",
        },
        visitedAt: "2024-03-02T19:00:00Z",
        order: 5,
    },
];

// Mock 여행 지점 데이터 - 파리 여행
const parisSpots: TravelSpot[] = [
    {
        id: "spot-6",
        travelId: "travel-2",
        title: "에펠탑",
        description: "파리의 상징 에펠탑! 첫눈에 반해버렸어요.",
        photos: [
            "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
        ],
        location: {
            lat: 48.8584,
            lng: 2.2945,
            address: "Champ de Mars, 파리, 프랑스",
        },
        visitedAt: "2024-04-15T10:00:00Z",
        order: 1,
    },
    {
        id: "spot-7",
        travelId: "travel-2",
        title: "루브르 박물관",
        description:
            "모나리자를 실제로 보다니! 예술의 도시 파리를 만끽했습니다.",
        photos: [
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
        ],
        location: {
            lat: 48.8606,
            lng: 2.3376,
            address: "루브르 박물관, 파리, 프랑스",
        },
        visitedAt: "2024-04-15T14:00:00Z",
        order: 2,
    },
    {
        id: "spot-8",
        travelId: "travel-2",
        title: "몽마르트르 언덕",
        description:
            "예술가들의 거리, 몽마르트르. 사크레쾨르 대성당에서 본 파리 전경이 환상적이었어요.",
        photos: [
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        ],
        location: {
            lat: 48.8867,
            lng: 2.3431,
            address: "몽마르트르, 파리, 프랑스",
        },
        visitedAt: "2024-04-16T11:00:00Z",
        order: 3,
    },
];

// Mock 여행 지점 데이터 - 방콕 여행
const bangkokSpots: TravelSpot[] = [
    {
        id: "spot-9",
        travelId: "travel-3",
        title: "왓 아룬 (새벽 사원)",
        description:
            "차오프라야 강변의 아름다운 사원. 해질녘 풍경이 정말 아름다웠어요.",
        photos: [
            "https://images.unsplash.com/photo-1563492065213-fc5be4109485?w=800",
        ],
        location: {
            lat: 13.7437,
            lng: 100.4889,
            address: "왓 아룬, 방콕, 태국",
        },
        visitedAt: "2024-02-10T17:00:00Z",
        order: 1,
    },
    {
        id: "spot-10",
        travelId: "travel-3",
        title: "카오산 로드",
        description:
            "배낭여행자들의 성지! 다양한 사람들과 만나고 태국 음식을 즐겼습니다.",
        photos: [
            "https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800",
        ],
        location: {
            lat: 13.759,
            lng: 100.4977,
            address: "카오산 로드, 방콕, 태국",
        },
        visitedAt: "2024-02-11T20:00:00Z",
        order: 2,
    },
];

// Mock 여행 데이터
export const mockTravels: Travel[] = [
    {
        id: "travel-1",
        userId: "user-1",
        title: "봄의 도쿄, 벚꽃과 함께한 3일",
        description: "벚꽃이 만개한 도쿄에서의 행복한 시간",
        coverImage:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
        countries: [mockCountries.JP],
        startDate: "2024-03-01",
        endDate: "2024-03-03",
        spots: tokyoSpots,
        isPublic: true,
        likes: 342,
        createdAt: "2024-03-04T10:00:00Z",
        updatedAt: "2024-03-04T10:00:00Z",
    },
    {
        id: "travel-2",
        userId: "user-1",
        title: "낭만의 도시 파리 여행",
        description: "에펠탑, 루브르, 그리고 달콤한 크루아상",
        coverImage:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
        countries: [mockCountries.FR],
        startDate: "2024-04-15",
        endDate: "2024-04-18",
        spots: parisSpots,
        isPublic: true,
        likes: 521,
        createdAt: "2024-04-19T10:00:00Z",
        updatedAt: "2024-04-19T10:00:00Z",
    },
    {
        id: "travel-3",
        userId: "user-1",
        title: "방콕 야시장 투어",
        description: "맛있는 음식과 활기찬 밤거리",
        coverImage:
            "https://images.unsplash.com/photo-1563492065213-fc5be4109485?w=1200",
        countries: [mockCountries.TH],
        startDate: "2024-02-10",
        endDate: "2024-02-13",
        spots: bangkokSpots,
        isPublic: true,
        likes: 189,
        createdAt: "2024-02-14T10:00:00Z",
        updatedAt: "2024-02-14T10:00:00Z",
    },
    {
        id: "travel-4",
        userId: "user-2",
        title: "뉴욕 한 달 살기",
        description: "브로드웨이, 센트럴파크, 그리고 자유의 여신상",
        coverImage:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200",
        countries: [mockCountries.US],
        startDate: "2024-05-01",
        endDate: "2024-05-31",
        spots: [],
        isPublic: true,
        likes: 892,
        createdAt: "2024-06-01T10:00:00Z",
        updatedAt: "2024-06-01T10:00:00Z",
    },
    {
        id: "travel-5",
        userId: "user-3",
        title: "런던 & 에든버러 기차여행",
        description: "영국의 고풍스러운 매력을 따라서",
        coverImage:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
        countries: [mockCountries.GB],
        startDate: "2024-06-10",
        endDate: "2024-06-17",
        spots: [],
        isPublic: true,
        likes: 445,
        createdAt: "2024-06-18T10:00:00Z",
        updatedAt: "2024-06-18T10:00:00Z",
    },
];

// Mock API 함수들
export const mockApi = {
    // 사용자 정보 가져오기
    getUser: async (userId: string): Promise<User> => {
        await delay(500);
        if (userId === "user-1") return mockUser;
        throw new Error("User not found");
    },

    // 내 여행 목록 가져오기
    getMyTravels: async (): Promise<Travel[]> => {
        await delay(800);
        return mockTravels.filter((t) => t.userId === "user-1");
    },

    // 특정 여행 가져오기
    getTravel: async (travelId: string): Promise<Travel | null> => {
        await delay(600);
        return mockTravels.find((t) => t.id === travelId) || null;
    },

    // 여행 검색 (무한 스크롤용)
    searchTravels: async (
        query: string = "",
        cursor: number = 0,
        limit: number = 10
    ) => {
        await delay(700);

        let filtered = [...mockTravels];

        if (query) {
            filtered = filtered.filter(
                (t) =>
                    t.title.toLowerCase().includes(query.toLowerCase()) ||
                    t.description?.toLowerCase().includes(query.toLowerCase())
            );
        }

        // 최신순 정렬
        filtered.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

        const start = cursor;
        const end = cursor + limit;
        const data = filtered.slice(start, end);
        const hasMore = end < filtered.length;

        return {
            data,
            nextCursor: hasMore ? end : undefined,
            hasMore,
        };
    },

    // 좋아요 토글
    toggleLike: async (travelId: string): Promise<number> => {
        await delay(300);
        const travel = mockTravels.find((t) => t.id === travelId);
        if (!travel) throw new Error("Travel not found");

        // 임시로 좋아요 수를 1 증가 (실제로는 상태 관리 필요)
        travel.likes += 1;
        return travel.likes;
    },
};

// 지연 시뮬레이션 헬퍼
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
