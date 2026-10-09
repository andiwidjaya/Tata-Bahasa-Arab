"use client";

import * as React from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Loader2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface AdvancedAudioPlayerProps {
  src?: string;
  title?: string;
  label?: string;
  arabicText?: string;
  autoPlay?: boolean;
  className?: string;
}

const PLAYBACK_SPEEDS = [0.75, 1.0, 1.25, 1.5];

export function AudioPlayer({
  src,
  title,
  label,
  arabicText,
  autoPlay = false,
  className,
}: AdvancedAudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackSpeedIndex, setPlaybackSpeedIndex] = React.useState(1); // Default 1.0x

  const playbackSpeed = PLAYBACK_SPEEDS[playbackSpeedIndex];

  // Initialize & Listeners
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    setIsLoading(true);
    setHasError(false);

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => {
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  // Update speed & volume
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!src || hasError) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const cyclePlaybackSpeed = () => {
    setPlaybackSpeedIndex((prev) => (prev + 1) % PLAYBACK_SPEEDS.length);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3",
        className
      )}
    >
      <audio ref={audioRef} src={src} autoPlay={autoPlay} preload="metadata" />

      {/* Top Header: Arabic Text & Title */}
      {(arabicText || title) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-2">
          {arabicText && (
            <span className="font-arabic text-2xl font-bold text-emerald-800 dark:text-emerald-300">
              {arabicText}
            </span>
          )}
          {title && <span className="text-xs font-semibold text-slate-500">{title}</span>}
        </div>
      )}

      {/* Error state alert */}
      {hasError && (
        <div className="flex items-center space-x-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/50 p-2.5 rounded-xl border border-red-200 dark:border-red-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Gagal memuat berkas audio. Periksa koneksi internet Anda.</span>
        </div>
      )}

      {/* Main Control Controls Bar */}
      <div className="flex items-center space-x-3">
        {/* Play/Pause Button */}
        <Button
          type="button"
          variant="default"
          size="icon"
          disabled={!src || isLoading || hasError}
          onClick={togglePlay}
          className="h-11 w-11 shrink-0 rounded-xl"
          aria-label={isPlaying ? "Jeda Audio" : "Putar Audio"}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>

        {/* Progress Seek Bar */}
        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            disabled={!src || hasError}
            onChange={handleSeek}
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 font-semibold">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Speed Controls Button */}
        <button
          type="button"
          onClick={cyclePlaybackSpeed}
          disabled={!src || hasError}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shrink-0"
          title="Kecepatan Putar"
        >
          {playbackSpeed}x
        </button>

        {/* Volume Mute Toggle */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          disabled={!src || hasError}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
