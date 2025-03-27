"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleLogin = (jwtToken: string) => {
    localStorage.setItem("token", jwtToken);
    fetchUser();
    console.log('handle login')
    router.push("/");
  };

  return (
    <div className="container mt-5">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
