export type SupportedCompanionName = 'Elena' | 'Mateo' | 'Sofía';

export interface CompanionVoiceProfile {
  name: SupportedCompanionName;
  pitch: number;
  rate: number;
  preferredGender: 'female' | 'male';
}

export const COMPANION_VOICE_PROFILES: Record<SupportedCompanionName, CompanionVoiceProfile> = {
  Elena: {
    name: 'Elena',
    pitch: 1.05,
    rate: 0.9,
    preferredGender: 'female',
  },
  Mateo: {
    name: 'Mateo',
    pitch: 0.95,
    rate: 1.0,
    preferredGender: 'male',
  },
  Sofía: {
    name: 'Sofía',
    pitch: 1.15,
    rate: 0.95,
    preferredGender: 'female',
  },
};

// Global recognition reference for push-to-talk
let activeRecognition: any = null;

/**
 * Check if Web Speech Recognition is available in current browser
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

/**
 * Check if Web Speech Synthesis is available in current browser
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

/**
 * Starts a single push-to-talk speech recognition turn (continuous: false).
 * Returns a cancel/cleanup callback.
 */
export function startPushToTalk(
  onResult: (transcript: string) => void,
  onError?: (error: string) => void,
  onEnd?: () => void
): () => void {
  if (!isSpeechRecognitionSupported()) {
    onError?.('Speech recognition is not supported in this browser.');
    return () => {};
  }

  stopListening();

  try {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();

    recognition.lang = 'es-ES';
    // Push-to-talk configuration
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let hasDeliveredResult = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) {
        hasDeliveredResult = true;
        onResult(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('[VoiceService] Speech recognition event error:', event.error);
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        onError?.(event.error || 'Recognition error');
      }
    };

    recognition.onend = () => {
      activeRecognition = null;
      if (!hasDeliveredResult) {
        onEnd?.();
      } else {
        onEnd?.();
      }
    };

    activeRecognition = recognition;
    recognition.start();

    return () => {
      stopListening();
    };
  } catch (err: any) {
    console.error('[VoiceService] Failed to start recognition:', err);
    onError?.(err?.message || 'Could not start microphone');
    return () => {};
  }
}

/**
 * Stop active speech recognition
 */
export function stopListening(): void {
  if (activeRecognition) {
    try {
      activeRecognition.abort();
    } catch {}
    activeRecognition = null;
  }
}

/**
 * Stop ongoing speech synthesis
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/**
 * Speaks a companion response using Web Speech Synthesis configured for Elena, Mateo, or Sofía.
 */
export function speakCompanionResponse(
  text: string,
  companionName: SupportedCompanionName | string = 'Elena',
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (!isSpeechSynthesisSupported() || !text) {
    onEnd?.();
    return;
  }

  stopSpeaking();

  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/¡/g, '')
    .replace(/¿/g, '')
    .trim();

  if (!cleanText) {
    onEnd?.();
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';

    // Match companion profile: Elena, Mateo, Sofía
    const profile =
      COMPANION_VOICE_PROFILES[companionName as SupportedCompanionName] ||
      COMPANION_VOICE_PROFILES.Elena;

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;

    const voices = window.speechSynthesis.getVoices();
    const spanishVoices = voices.filter(
      (v) => v.lang.startsWith('es') || v.lang.includes('ES') || v.lang.includes('MX')
    );

    if (spanishVoices.length > 0) {
      if (profile.preferredGender === 'male') {
        const maleVoice = spanishVoices.find((v) =>
          v.name.toLowerCase().includes('jorge') ||
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('diego') ||
          v.name.toLowerCase().includes('carlos')
        );
        utterance.voice = maleVoice || spanishVoices[0];
      } else {
        const femaleVoice = spanishVoices.find((v) =>
          v.name.toLowerCase().includes('monica') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('paulina') ||
          v.name.toLowerCase().includes('lucia') ||
          v.name.toLowerCase().includes('laura')
        );
        utterance.voice = femaleVoice || spanishVoices[0];
      }
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('[VoiceService] Speech synthesis error:', e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('[VoiceService] Failed to speak utterance:', err);
    onEnd?.();
  }
}
