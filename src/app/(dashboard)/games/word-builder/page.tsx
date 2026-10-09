import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { WordBuilderGame } from "@/components/games/word-builder-game";

export default function WordBuilderPage() {
  return (
    <PageContainer
      title="Word Builder - Puzzle Kalimat Arab"
      description="Rangkai potongan kata dan harakat menjadi susunan kalimat yang tepat sesuai kaidah Nahwu."
    >
      <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat game Word Builder...</div>}>
        <WordBuilderGame />
      </Suspense>
    </PageContainer>
  );
}
