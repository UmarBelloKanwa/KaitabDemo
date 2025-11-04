"use server";
import ProfileCard from "@ui/author/ProfileCard";
import Container from "@mui/material/Container";
import Author from "@ui/author/Author";
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
      <Author handle={p.authorHandle} />
    </>
  );
}
