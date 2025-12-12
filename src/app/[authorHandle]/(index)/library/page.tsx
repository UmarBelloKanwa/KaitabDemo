"use server";
import Library from "@/components/ui/author/Library";

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
