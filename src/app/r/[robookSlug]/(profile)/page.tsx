"use server";

import ChaptersFeed from "@/components/ui/robook/chapter/ChaptersFeed";

export default async function ChaptersPage({ params }: { params: Promise<{ robookSlug: string }> }) {
  const p = await params;
  const slug = p.robookSlug;

  return <ChaptersFeed slug={slug} />;
}
