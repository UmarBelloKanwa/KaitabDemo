"use client";

import AuthCard from "@/components/ui/auth/AuthCard";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <AuthCard displayAuthCard={true} setDisplayAuthCard={() => router.back()} />
    </Container>
  );
}
