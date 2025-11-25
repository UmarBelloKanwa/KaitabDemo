"use server";
import ProfileCard from "@ui/author/ProfileCard";
import Container from "@mui/material/Container";
import Library from "@/components/ui/author/Library";
import { getAuthorProfile } from "@/actions/author";

export default async function AuthorProfile({ 
  params
}:{
  params: Promise<{
    authorHandle: string;
  }>
  }) {
  const p = await params;
  
  return (
    <>
      <Library handle={p.authorHandle} />
    </>
  );
}
