"use client";

import AuthCard from "@/components/ui/auth/AuthCard";
import Container from "@mui/material/Container";

export default function LoginPage() {
  
  return (
    <Container maxWidth="sm">
      <AuthCard displayAuthCard={true} setDisplayAuthCard={() => {}} />
    </Container>
  );
}
