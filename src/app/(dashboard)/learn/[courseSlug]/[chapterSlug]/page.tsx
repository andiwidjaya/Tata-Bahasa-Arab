import { Suspense } from "react";
import { redirect } from "next/navigation";

interface ChapterPageProps {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
  }>;
}

async function ChapterRedirect({ paramsPromise }: { paramsPromise: ChapterPageProps['params'] }) {
  const { courseSlug } = await paramsPromise;
  redirect(`/learn/${courseSlug}`);
  return null;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  return (
    <Suspense fallback={null}>
      <ChapterRedirect paramsPromise={params} />
    </Suspense>
  );
}
