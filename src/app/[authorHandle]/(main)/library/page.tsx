"use server";
import Library from "@/components/ui/author/Library";
import Container from "@mui/material/Container";

export default async function AuthorProfileLibrary({
  params,
}: {
  params: Promise<{
    authorHandle: string;
  }>;
}) {
  const p = await params;

  return (
    <Container maxWidth={"sm"}>
      <Library handle={p.authorHandle} />
    </Container>
  );
}
