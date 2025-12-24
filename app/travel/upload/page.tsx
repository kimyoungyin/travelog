"use client";

import { useState, useRef } from "react";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    IconUpload,
    IconX,
    IconLoader2,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type UploadStep = 1 | 2 | 3 | 4;

interface UploadedPhoto {
    id: string;
    file: File;
    preview: string;
    hasMetadata: boolean;
}

export default function UploadPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState<UploadStep>(1);
    const [title, setTitle] = useState("");
    const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [creationMessages, setCreationMessages] = useState<string[]>([]);
    const [travelId, setTravelId] = useState<string | null>(null);

    // 1단계: 제목 입력
    const handleStep1Next = () => {
        if (title.trim()) {
            setStep(2);
        }
    };

    // 2단계: 사진 업로드
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newPhotos: UploadedPhoto[] = [];

        files.forEach((file) => {
            if (file.size > 20 * 1024 * 1024) {
                alert(`${file.name}은(는) 20MB를 초과합니다.`);
                return;
            }

            if (photos.length + newPhotos.length >= 20) {
                alert("최대 20장까지 업로드할 수 있습니다.");
                return;
            }

            newPhotos.push({
                id: Math.random().toString(36).substring(7),
                file,
                preview: URL.createObjectURL(file),
                hasMetadata: Math.random() > 0.3, // 70% 확률로 메타데이터 있음
            });
        });

        setPhotos([...photos, ...newPhotos]);
    };

    const handleRemovePhoto = (id: string) => {
        setPhotos(photos.filter((p) => p.id !== id));
    };

    const handleStep2Next = async () => {
        if (photos.length === 0) {
            alert("최소 1장의 사진을 업로드해주세요.");
            return;
        }

        setIsAnalyzing(true);

        // 메타데이터 분석 시뮬레이션 (3초)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setIsAnalyzing(false);
        setStep(3);
    };

    // 3단계: 결과 안내
    const photosWithMetadata = photos.filter((p) => p.hasMetadata);
    const photosWithoutMetadata = photos.filter((p) => !p.hasMetadata);

    const handleStep3Confirm = () => {
        setStep(4);
        startCreation();
    };

    const handleStep3Retry = () => {
        setPhotos([]);
        setStep(2);
    };

    // 4단계: 최종 생성
    const startCreation = async () => {
        setIsCreating(true);

        const messages = [
            "사진을 분석하고 있어요...",
            "위치 정보를 확인하는 중...",
            "여행 경로를 그리고 있어요...",
            "지도에 마커를 표시하는 중...",
            "거의 다 됐어요!",
        ];

        for (let i = 0; i < messages.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCreationMessages((prev) => [...prev, messages[i]]);
        }

        // 생성 완료
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newTravelId = "travel-" + Math.random().toString(36).substring(7);
        setTravelId(newTravelId);
        setIsCreating(false);
    };

    const progressPercentage = (step / 4) * 100;

    return (
        <div className="min-h-screen bg-background">
            <MainNav />

            <main className="container py-8 max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold">
                            새 여행 기록 만들기
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            {step} / 4 단계
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />

                    {/* 단계 표시 */}
                    <div className="flex justify-between mt-4">
                        {[
                            { num: 1, label: "제목" },
                            { num: 2, label: "사진 업로드" },
                            { num: 3, label: "확인" },
                            { num: 4, label: "완료" },
                        ].map((s) => (
                            <div
                                key={s.num}
                                className={cn(
                                    "flex flex-col items-center gap-1",
                                    step >= s.num
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                        step >= s.num
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    )}
                                >
                                    {step > s.num ? (
                                        <IconCheck size={16} />
                                    ) : (
                                        s.num
                                    )}
                                </div>
                                <span className="text-xs">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: 제목 입력 */}
                {step === 1 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="text-4xl mb-4">✈️</div>
                                <h2 className="text-2xl font-bold mb-2">
                                    여행을 한 마디로 요약하자면?
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    여행의 제목을 입력해주세요
                                </p>
                                <Input
                                    type="text"
                                    placeholder="예: 봄의 도쿄, 벚꽃과 함께한 3일"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-lg h-14"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            handleStep1Next();
                                    }}
                                />
                                <Button
                                    size="lg"
                                    onClick={handleStep1Next}
                                    disabled={!title.trim()}
                                    className="w-full"
                                >
                                    다음
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: 사진 업로드 */}
                {step === 2 && (
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-8">
                                <h2 className="text-xl font-bold mb-4">
                                    여행 사진을 업로드해주세요
                                </h2>
                                <p className="text-sm text-muted-foreground mb-6">
                                    최대 20장, 각 파일당 20MB 이하
                                </p>

                                {/* 업로드 영역 */}
                                <div
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                                >
                                    <IconUpload
                                        size={48}
                                        className="mx-auto mb-4 text-muted-foreground"
                                    />
                                    <p className="font-medium mb-1">
                                        클릭하여 사진 선택
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        또는 파일을 여기로 드래그하세요
                                    </p>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </CardContent>
                        </Card>

                        {/* 업로드된 사진 미리보기 */}
                        {photos.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold">
                                            업로드된 사진 ({photos.length}/20)
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {photos.map((photo) => (
                                            <div
                                                key={photo.id}
                                                className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                                            >
                                                <Image
                                                    src={photo.preview}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleRemovePhoto(
                                                            photo.id
                                                        )
                                                    }
                                                    className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <IconX
                                                        size={14}
                                                        className="text-white"
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* 버튼 */}
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setStep(1)}
                                className="flex-1"
                            >
                                이전
                            </Button>
                            <Button
                                onClick={handleStep2Next}
                                disabled={photos.length === 0 || isAnalyzing}
                                className="flex-1 gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <IconLoader2
                                            className="animate-spin"
                                            size={18}
                                        />
                                        메타데이터 분석 중...
                                    </>
                                ) : (
                                    "다음"
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: 결과 안내 */}
                {step === 3 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="max-w-md mx-auto space-y-6">
                                {photosWithoutMetadata.length > 0 ? (
                                    <>
                                        <IconAlertCircle
                                            size={64}
                                            className="mx-auto text-yellow-500"
                                        />
                                        <h2 className="text-2xl font-bold">
                                            일부 사진의 정보가 부족해요
                                        </h2>
                                        <p className="text-muted-foreground">
                                            <span className="font-semibold text-foreground">
                                                {photos.length}개 중{" "}
                                                {photosWithoutMetadata.length}개
                                            </span>
                                            의 사진이 위치 정보 부족으로
                                            제외되었습니다.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {photosWithMetadata.length}개의
                                            사진으로 여행 기록을 만들까요?
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <IconCheck
                                            size={64}
                                            className="mx-auto text-green-500"
                                        />
                                        <h2 className="text-2xl font-bold">
                                            모든 사진이 준비되었어요!
                                        </h2>
                                        <p className="text-muted-foreground">
                                            {photos.length}개의 사진으로 멋진
                                            여행 기록을 만들어드릴게요.
                                        </p>
                                    </>
                                )}

                                <div className="flex flex-col gap-3">
                                    <Button
                                        size="lg"
                                        onClick={handleStep3Confirm}
                                        className="w-full"
                                    >
                                        네, 알겠습니다
                                    </Button>
                                    {photosWithoutMetadata.length > 0 && (
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={handleStep3Retry}
                                            className="w-full"
                                        >
                                            다시 업로드
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 4: 최종 생성 */}
                {step === 4 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="max-w-md mx-auto space-y-6">
                                {isCreating ? (
                                    <>
                                        <div className="relative w-24 h-24 mx-auto">
                                            <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                                ✈️
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {creationMessages.map((msg, i) => (
                                                <p
                                                    key={i}
                                                    className="text-muted-foreground animate-pulse"
                                                >
                                                    {msg}
                                                </p>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <IconCheck
                                            size={64}
                                            className="mx-auto text-green-500"
                                        />
                                        <h2 className="text-2xl font-bold">
                                            Travelog &quot;{title}&quot;이
                                            생성되었습니다!
                                        </h2>
                                        <p className="text-muted-foreground">
                                            여행 기록을 확인해보세요
                                        </p>
                                        <Button
                                            size="lg"
                                            onClick={() =>
                                                router.push(
                                                    `/travel/${travelId}`
                                                )
                                            }
                                            className="w-full"
                                        >
                                            보러가기
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
