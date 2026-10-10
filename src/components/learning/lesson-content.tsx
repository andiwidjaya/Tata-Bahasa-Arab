import { ArabicText } from "./arabic-text";
import { Translation } from "./translation";
import { ExampleCard } from "./example-card";
import { LessonAudio } from "./lesson-audio";

interface ContentItem {
  id: string;
  type: 'text' | 'arabic_text' | 'example' | 'explanation' | 'audio' | 'exercise';
  text?: string;
  arabic?: string;
  audioUrl?: string;
}

interface LessonContentProps {
  contents: ContentItem[];
}

export function LessonContent({ contents }: LessonContentProps) {
  return (
    <div className="space-y-6 my-6">
      {contents.map((item) => {
        switch (item.type) {
          case 'text':
          case 'explanation':
            return (
              <div key={item.id} className="space-y-3">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
                {item.audioUrl && (
                  <LessonAudio audioUrl={item.audioUrl} title={item.text?.substring(0, 30)} />
                )}
              </div>
            );

          case 'arabic_text':
            return (
              <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
                <ArabicText size="xl">{item.arabic || ''}</ArabicText>
                {item.text && <Translation>{item.text}</Translation>}
                {item.audioUrl && (
                  <div className="pt-2">
                    <LessonAudio audioUrl={item.audioUrl} arabicText={item.arabic} title="Audio Pelafalan Matan" />
                  </div>
                )}
              </div>
            );

          case 'example':
            return (
              <div key={item.id} className="space-y-2">
                <ExampleCard
                  arabic={item.arabic || ''}
                  translation={item.text || ''}
                />
                {item.audioUrl && (
                  <LessonAudio audioUrl={item.audioUrl} arabicText={item.arabic} title="Audio Contoh Kalimat" />
                )}
              </div>
            );

          case 'audio':
            return (
              <div key={item.id} className="my-4">
                <LessonAudio
                  audioUrl={item.audioUrl || item.text}
                  arabicText={item.arabic}
                  title={item.text || "Audio Pelajaran"}
                />
              </div>
            );

          case 'exercise':
            return (
              <div key={item.id} className="p-4 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase">Latihan Mandiri</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{item.text}</p>
                {item.audioUrl && (
                  <LessonAudio audioUrl={item.audioUrl} title="Audio Petunjuk Latihan" />
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
