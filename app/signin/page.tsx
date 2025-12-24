import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "travelog | 로그인",
};

export default function SignInPage() {
    return (
        <div>
            <h1>로그인</h1>
            <Button>github 로그인</Button>
            <Button>google 로그인</Button>
        </div>
    );
}
