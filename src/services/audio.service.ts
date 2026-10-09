import { createClient } from '@/lib/supabase/server';

export interface AudioMetadata {
  id: string;
  title: string;
  audioUrl: string;
  durationSeconds?: number;
}

export class AudioService {
  /**
   * Retrieves full public URL for audio assets stored in Supabase Storage.
   */
  static getStoragePublicUrl(filePath: string): string {
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    return `${supabaseUrl}/storage/v1/object/public/audios/${filePath}`;
  }

  /**
   * Fetch audio metadata record from Supabase database by ID
   */
  static async getAudioById(audioId: string): Promise<AudioMetadata | null> {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('audio') as any)
      .select('id, title, audio_url, duration_seconds')
      .eq('id', audioId)
      .single();

    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      audioUrl: this.getStoragePublicUrl(data.audio_url),
      durationSeconds: data.duration_seconds || undefined,
    };
  }
}
