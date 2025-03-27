"use client";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const searchParams = useSearchParams()
  const refresh = searchParams.get('refresh')
  const router = useRouter();
  const { fetchUser } = useUser();

  if(refresh) {
    fetchUser();
    router.push("/login");
  }

  const handleLogin = (jwtToken: string) => {
    fetchUser();
    router.push("/");
  };

  return (
    <div className="container mt-5">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
