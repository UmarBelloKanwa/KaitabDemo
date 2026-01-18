"use client";

import React from "react";
import { notFound } from "next/navigation";
import ChatSidebar from "@/components/ui/author/chat/Drawer";
import Container from "@mui/material/Container";
import StoreItem from "@/components/ui/StoreItem";
import ProfileCard from "@/components/ui/author/ProfileBox";
import { useQueryClient } from "@tanstack/react-query";
import type { Author } from "@/types/author";

export default function AuthorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string }>;
}) {
  const queryClient = useQueryClient();
  const authorData: Author = queryClient.getQueryData(["author"])!;
  
  if (!authorData) {
    notFound();
  }

  return (
    <>
      <StoreItem data={authorData} />
      <Container maxWidth={false}>
        <ProfileCard author={authorData} />
        <ChatSidebar author={authorData} />
        {children}
      </Container>
    </>
  );
}
