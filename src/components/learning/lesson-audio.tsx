"use client";

import { AudioPlayer } from "@/components/ui/audio-player";

interface LessonAudioProps {
  audioUrl?: string;
  arabicText?: string;
  label?: string;
  title?: string;
  className?: string;
}

export function LessonAudio({ audioUrl, arabicText, label, title, className }: LessonAudioProps) {
  if (!audioUrl) return null;

  return (
    <div className={className}>
      <AudioPlayer
        src={audioUrl}
        arabicText={arabicText}
        label={label}
        title={title || label}
      />
    </div>
  );
}

