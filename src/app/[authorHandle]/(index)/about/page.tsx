"use server";
import Container from "@mui/material/Container";
import AboutAuthor from "@/components/ui/author/about";

export default async function AuthorAbout({
  params,
}: {
  params: Promise<{
    authorHandle: string;
  }>;
}) {
  const p = await params;

  return (
     <Container maxWidth={"sm"}>
      <AboutAuthor handle={p.authorHandle} />
    </Container>
  )
}
