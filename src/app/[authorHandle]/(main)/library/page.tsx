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
    <Container
      sx={{
        p: 0,
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "sm",
          md: "sm",
        },
      }}
    >
      <Library handle={p.authorHandle} />
    </Container>
  );
}
