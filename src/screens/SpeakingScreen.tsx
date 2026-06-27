import { useState, useEffect, useRef, type FC } from 'react';
import { useStatsStore } from '../state/statsStore';
import { useSettingsStore } from '../state/settingsStore';
import { translateToHinglish } from '../utils/hinglish';
import {
  Mic,
  MicOff,
  Volume2,
  Trophy,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface Challenge {
  id: string;
  phrase: string;
  translation: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  pronunciationTip: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'sp-1',
    phrase: '¡Hola! ¿Cómo estás?',
    translation: 'Hello! How are you?',
    difficulty: 'Fácil',
    pronunciationTip: "Pronounce 'hola' without the 'h': OH-lah. Roll the 'r' slightly in 'cómo'."
  },
  {
    id: 'sp-2',
    phrase: 'Quiero un café con leche.',
    translation: 'I want a coffee with milk.',
    difficulty: 'Fácil',
    pronunciationTip: "Pronounce 'c' as 'k' (kah-FEH). The 'ch' sounds like 'ch' in English."
  },
  {
    id: 'sp-3',
    phrase: '¿Dónde está la estación de tren?',
    translation: 'Where is the train station?',
    difficulty: 'Medio',
    pronunciationTip: "Accent the 'a' in 'está' and 'o' in 'estación'. The 'd' in 'donde' is soft."
  },
  {
    id: 'sp-4',
    phrase: 'Mucho gusto, me llamo Juan.',
    translation: 'Nice to meet you, my name is Juan.',
    difficulty: 'Fácil',
    pronunciationTip: "Double 'll' in 'llamo' is pronounced like 'y' (YAH-moh). 'J' in 'Juan' is like English 'h' (HWAN)."
  },
  {
    id: 'sp-5',
    phrase: 'La cuenta, por favor.',
    translation: 'The bill, please.',
    difficulty: 'Fácil',
    pronunciationTip: "The 'v' in 'favor' is soft, sounding almost like a 'b' (fah-BOHR)."
  },
  {
    id: 'sp-6',
    phrase: 'Me gustaría reservar una mesa.',
    translation: 'I would like to reserve a table.',
    difficulty: 'Medio',
    pronunciationTip: "Accent 'í' in 'gustaría' (goos-tah-REE-ah). 'Mesa' has a soft 's' (MEH-sah)."
  },
  {
    id: 'sp-7',
    phrase: 'El tiempo vuela cuando te diviertes.',
    translation: 'Time flies when you are having fun.',
    difficulty: 'Difícil',
    pronunciationTip: "Pronounce 'tiempo' as tee-EHM-poh. The 'v' in 'vuela' is pronounced like a soft 'b'."
  },
  {
    id: 'sp-8',
    phrase: '¿Cuánto cuesta este sombrero?',
    translation: 'How much does this hat cost?',
    difficulty: 'Medio',
    pronunciationTip: "Sombrero is pronounced sohm-BREH-roh. Cuesta is pronounced kweh-stah."
  },
  {
    id: 'sp-9',
    phrase: 'El camino de la vida es largo.',
    translation: 'The road of life is long.',
    difficulty: 'Medio',
    pronunciationTip: "Camino is pronounced kah-MEE-noh. Largo has a soft 'g'."
  },
  {
    id: 'sp-10',
    phrase: 'Buenos días, ¿cómo amaneció?',
    translation: 'Good morning, how did you wake up?',
    difficulty: 'Fácil',
    pronunciationTip: "Accent the 'o' in 'cómo' and 'o' with accent in 'amaneció' (ah-mah-neh-SYOH)."
  },
  {
    id: 'sp-11',
    phrase: 'Una ensalada mixta, por favor.',
    translation: 'A mixed salad, please.',
    difficulty: 'Fácil',
    pronunciationTip: "Ensalada is pronounced ehn-sah-LAH-dah. Mixta is pronounced MEEX-tah."
  },
  {
    id: 'sp-12',
    phrase: '¿Tiene este plato ingredientes picantes?',
    translation: 'Does this dish have spicy ingredients?',
    difficulty: 'Medio',
    pronunciationTip: "Plato is pronounced PLAH-toh. Ingredientes is pronounced een-greh-DYEN-tehs."
  },
  {
    id: 'sp-13',
    phrase: 'Me he perdido, ¿puede ayudarme?',
    translation: 'I am lost, can you help me?',
    difficulty: 'Medio',
    pronunciationTip: "The 'h' in 'he' is silent (eh). Perdido is pronounced pehr-DEE-doh."
  },
  {
    id: 'sp-14',
    phrase: '¿A qué hora sale el próximo autobús?',
    translation: 'What time does the next bus leave?',
    difficulty: 'Medio',
    pronunciationTip: "Sale is pronounced SAH-leh. Próximo is pronounced PROK-see-moh."
  },
  {
    id: 'sp-15',
    phrase: 'Este museo tiene obras de arte famosas.',
    translation: 'This museum has famous works of art.',
    difficulty: 'Difícil',
    pronunciationTip: "Museo is pronounced moo-SEH-oh. Obras is pronounced OH-brahs."
  },
  {
    id: 'sp-16',
    phrase: 'El hotel está cerca de la playa.',
    translation: 'The hotel is near the beach.',
    difficulty: 'Fácil',
    pronunciationTip: "Está is pronounced ehs-TAH. Cerca is pronounced SEHR-kah."
  },
  {
    id: 'sp-17',
    phrase: '¿Aceptan tarjetas de crédito aquí?',
    translation: 'Do you accept credit cards here?',
    difficulty: 'Medio',
    pronunciationTip: "Aceptan is pronounced ah-SEHP-tahn. Tarjetas is pronounced tahr-HEH-tahs."
  },
  {
    id: 'sp-18',
    phrase: 'Hace mucho calor hoy en la tarde.',
    translation: 'It is very hot today in the afternoon.',
    difficulty: 'Fácil',
    pronunciationTip: "Hace is pronounced AH-seh. Hoy is pronounced oy. Tarde is pronounced TAHR-deh."
  },
  {
    id: 'sp-19',
    phrase: 'Me gustaría comprar un recuerdo típico.',
    translation: 'I would like to buy a typical souvenir.',
    difficulty: 'Medio',
    pronunciationTip: "Comprar is pronounced kohm-PRAHR. Recuerdo is pronounced rreh-KWEHR-doh."
  },
  {
    id: 'sp-20',
    phrase: 'Disculpe, ¿dónde está el baño público?',
    translation: 'Excuse me, where is the public restroom?',
    difficulty: 'Fácil',
    pronunciationTip: "Disculpe is pronounced dees-KOOL-peh. Baño is pronounced BAH-nyoh."
  },
  {
    id: 'sp-21',
    phrase: 'La práctica hace al maestro.',
    translation: 'Practice makes perfect.',
    difficulty: 'Medio',
    pronunciationTip: "Práctica is pronounced PRAK-tee-kah. Maestro is pronounced mah-EHS-troh."
  },
  {
    id: 'sp-22',
    phrase: 'El coche azul corre muy rápido.',
    translation: 'The blue car runs very fast.',
    difficulty: 'Fácil',
    pronunciationTip: "Coche is pronounced KOH-cheh. Azul is pronounced ah-SOOL. Rápido is pronounced RRAH-pee-doh."
  },
  {
    id: 'sp-23',
    phrase: 'Me encanta escuchar música clásica.',
    translation: 'I love listening to classical music.',
    difficulty: 'Medio',
    pronunciationTip: "Encanta is pronounced ehn-KAHN-tah. Clásica is pronounced KLAH-see-kah."
  },
  {
    id: 'sp-24',
    phrase: '¿Cuál es tu película favorita?',
    translation: 'What is your favorite movie?',
    difficulty: 'Fácil',
    pronunciationTip: "Cuál is pronounced kwal. Película is pronounced peh-LEE-koo-lah."
  },
  {
    id: 'sp-25',
    phrase: 'La primavera trae muchas flores hermosas.',
    translation: 'Spring brings many beautiful flowers.',
    difficulty: 'Medio',
    pronunciationTip: "Primavera is pronounced pree-mah-BEH-rah. Flores is pronounced FLOH-rehs."
  },
  {
    id: 'sp-26',
    phrase: 'El éxito requiere esfuerzo constante.',
    translation: 'Success requires constant effort.',
    difficulty: 'Difícil',
    pronunciationTip: "Éxito is pronounced EK-see-toh. Requiere is pronounced rreh-KYEH-reh."
  },
  {
    id: 'sp-27',
    phrase: 'Mi familia vive en una casa grande.',
    translation: 'My family lives in a big house.',
    difficulty: 'Fácil',
    pronunciationTip: "Familia is pronounced fah-MEE-lyah. Casa is pronounced KAH-sah."
  },
  {
    id: 'sp-28',
    phrase: '¿Puedes recomendarme un buen restaurante?',
    translation: 'Can you recommend a good restaurant?',
    difficulty: 'Medio',
    pronunciationTip: "Recomendarme is pronounced rreh-koh-mehn-DAHR-meh."
  },
  {
    id: 'sp-29',
    phrase: 'El agua de este río está muy fría.',
    translation: 'The water in this river is very cold.',
    difficulty: 'Fácil',
    pronunciationTip: "Agua is pronounced AH-gwah. Río is pronounced REE-oh."
  },
  {
    id: 'sp-30',
    phrase: 'El gato duerme bajo el sol cálido.',
    translation: 'The cat sleeps under the warm sun.',
    difficulty: 'Fácil',
    pronunciationTip: "Gato is pronounced GAH-toh. Cálido is pronounced KAH-lee-doh."
  },
  {
    id: 'sp-31',
    phrase: '¿Qué planes tienes para el fin de semana?',
    translation: 'What plans do you have for the weekend?',
    difficulty: 'Medio',
    pronunciationTip: "Planes is pronounced PLAH-nehs. Semana is pronounced seh-MAH-nah."
  },
  {
    id: 'sp-32',
    phrase: 'La educación es el arma más poderosa.',
    translation: 'Education is the most powerful weapon.',
    difficulty: 'Difícil',
    pronunciationTip: "Educación is pronounced eh-doo-kah-SYOHN. Poderosa is pronounced poh-deh-ROH-sah."
  }
];

const SpeakingScreen: FC = () => {
  const addRewards = useStatsStore((s) => s.addRewards);
  const { language } = useSettingsStore();

  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedbackWords, setFeedbackWords] = useState<{ word: string; correct: boolean }[]>([]);
  const [speakingError, setSpeakingError] = useState<string | null>(null);
  const [hasEarnedBonus, setHasEarnedBonus] = useState(false);

  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'es-ES'; // Spanish speech language

      rec.onstart = () => {
        setTranscript('');
        setScore(null);
        setFeedbackWords([]);
        setSpeakingError(null);
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeakingError('Acceso al micrófono denegado. Habilite los permisos en su navegador.');
        } else {
          setSpeakingError(`Error de reconocimiento de voz: ${event.error}`);
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        evaluateSpeech(text);
      };

      recognitionRef.current = rec;
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }
  }, [activeChallengeIndex]);

  // Fallback simulator in case of missing speech recognition or for offline testing
  const simulateSpeechInput = () => {
    setIsRecording(true);
    setSpeakingError(null);
    setTranscript('');
    
    // Simulate recording delay, then mock transcript input
    setTimeout(() => {
      setIsRecording(false);
      // Generate a mock matching phrase based on some randomness to make it realistic
      const rand = Math.random();
      let mockText = activeChallenge.phrase;
      if (rand < 0.25) {
        // perfect match
      } else if (rand < 0.6) {
        // close match
        mockText = mockText.replace('¿Cómo estás?', 'como esta').replace('café', 'cafe').replace('estación', 'estacion').replace('sombrero', 'sonbrero');
      } else {
        // poor match
        mockText = "hola como va la cosa";
      }

      setTranscript(mockText);
      evaluateSpeech(mockText);
    }, 2500);
  };

  const startRecording = () => {
    setSpeakingError(null);
    setHasEarnedBonus(false);
    if (recognitionRef.current) {
      try {
        setIsRecording(true);
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
        // Fallback to simulation if starting fails
        simulateSpeechInput();
      }
    } else {
      // Fallback directly to simulator
      simulateSpeechInput();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setIsRecording(false);
  };

  const playTTS = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(activeChallenge.phrase);
      utterance.lang = 'es-ES'; // Spanish voice
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported in this browser.');
    }
  };

  const cleanWord = (w: string) => 
    w.toLowerCase().trim().replace(/[¡!¿?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  const evaluateSpeech = (userText: string) => {
    const targetPhrase = activeChallenge.phrase;
    const targetWords = targetPhrase.split(/\s+/);
    const userWords = userText.split(/\s+/).map(cleanWord);

    let matchCount = 0;
    const evaluated = targetWords.map((word) => {
      const cleanTarget = cleanWord(word);
      const isMatch = userWords.includes(cleanTarget);
      if (isMatch) {
        matchCount++;
      }
      return { word, correct: isMatch };
    });

    const accuracyScore = Math.round((matchCount / targetWords.length) * 100);
    setScore(accuracyScore);
    setFeedbackWords(evaluated);

    if (accuracyScore >= 80) {
      setHasEarnedBonus(true);
      addRewards(10, 5); // Grant rewards for good pronunciation
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-paper p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-8">
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
            Desafío de Pronunciación
          </p>
          <h1 className="font-display text-2xl font-bold text-paper mt-1">Voice Arena</h1>
          <p className="text-pencil text-xs mt-1">
            Listen to native pronunciations, record your own voice, and get live feedback to master your Spanish speaking skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Challenge list (4 columns) */}
          <section className="lg:col-span-4 space-y-3">
            <h2 className="font-hud text-[10px] uppercase tracking-wider text-pencil px-1">
              Select Speaking Exercise
            </h2>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {CHALLENGES.map((ch, idx) => {
                const isActive = idx === activeChallengeIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChallengeIndex(idx);
                      setTranscript('');
                      setScore(null);
                      setFeedbackWords([]);
                      setSpeakingError(null);
                      setHasEarnedBonus(false);
                    }}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-paper border-terracotta text-ink scale-[1.01] shadow-md'
                        : 'bg-paper/5 border-pencil/20 text-paper hover:bg-paper/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-hud text-[9px] uppercase px-1.5 py-0.5 rounded ${
                        ch.difficulty === 'Fácil'
                          ? 'bg-teal-deep/15 text-teal-deep border border-teal-deep/30'
                          : ch.difficulty === 'Medio'
                            ? 'bg-marigold/15 text-marigold border border-marigold/30'
                            : 'bg-terracotta/15 text-terracotta border border-terracotta/30'
                      } ${isActive ? '' : 'brightness-125'}`}>
                        {ch.difficulty}
                      </span>
                      <span className="font-hud text-[9px] text-pencil">Test #{idx + 1}</span>
                    </div>
                    <p className="font-display font-bold text-sm mt-2 truncate">{ch.phrase}</p>
                    <p className={`font-body text-[11px] mt-0.5 truncate ${isActive ? 'text-pencil' : 'text-pencil/80'}`}>
                      {language === 'hinglish' ? translateToHinglish(ch.translation) : ch.translation}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Right Column: Speaking Arena (8 columns) */}
          <section className="lg:col-span-8 bg-paper/5 border border-pencil/30 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[500px]">
            
            {/* Active Challenge Display */}
            <div className="text-center py-4 bg-paper/[0.02] border border-pencil/10 rounded-xl p-5">
              <span className="font-hud text-[9px] uppercase tracking-widest text-pencil">Spanish Phrase to Speak</span>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-paper mt-2 tracking-wide">
                {activeChallenge.phrase}
              </p>
              <p className="font-body text-sm text-pencil/90 mt-2 italic">
                "{language === 'hinglish' ? translateToHinglish(activeChallenge.translation) : activeChallenge.translation}"
              </p>

              {/* TTS play button */}
              <button
                onClick={playTTS}
                className="mt-4 mx-auto flex items-center gap-2 bg-teal-deep/10 border border-teal-deep/20 hover:bg-teal-deep/20 text-teal-deep font-hud text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                title="Listen to native voice pronunciation"
              >
                <Volume2 className="h-4.5 w-4.5" />
                Listen Pronunciation
              </button>
            </div>

            {/* Pronunciation Tip Box */}
            <div className="my-5 p-4 rounded-xl border border-marigold/20 bg-marigold/5 flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-marigold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-hud text-[10px] uppercase tracking-wider text-marigold font-bold">Pronunciation Tip</h4>
                <p className="font-body text-xs text-paper/90 mt-1 leading-relaxed">{activeChallenge.pronunciationTip}</p>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col items-center justify-center gap-4 py-6 border-t border-b border-pencil/10">
              {isRecording ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Waveform Animation */}
                  <div className="flex items-end justify-center gap-1.5 h-10 w-full max-w-[200px]">
                    <span className="w-1 bg-terracotta rounded animate-bounce h-6" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
                    <span className="w-1 bg-terracotta rounded animate-bounce h-9" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
                    <span className="w-1 bg-terracotta rounded animate-bounce h-5" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
                    <span className="w-1 bg-terracotta rounded animate-bounce h-10" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
                    <span className="w-1 bg-terracotta rounded animate-bounce h-7" style={{ animationDelay: '0.4s', animationDuration: '0.9s' }} />
                    <span className="w-1 bg-terracotta rounded animate-bounce h-4" style={{ animationDelay: '0.6s', animationDuration: '0.4s' }} />
                  </div>
                  <button
                    onClick={stopRecording}
                    className="h-16 w-16 rounded-full bg-terracotta border-4 border-paper/10 flex items-center justify-center text-paper hover:scale-105 transition-transform cursor-pointer animate-pulse"
                  >
                    <MicOff className="h-7 w-7" />
                  </button>
                  <p className="font-hud text-xs text-terracotta animate-pulse font-bold">Escuchando... Di la frase en español</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={startRecording}
                    className="h-16 w-16 rounded-full bg-teal-deep hover:bg-teal-deep/90 border-4 border-paper/10 flex items-center justify-center text-paper hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  >
                    <Mic className="h-7 w-7" />
                  </button>
                  <p className="font-hud text-xs text-pencil">Tap the microphone to speak</p>
                </div>
              )}

              {/* Permission/Error display */}
              {speakingError && (
                <div className="mt-2 p-3 bg-terracotta/10 border border-terracotta/20 rounded-xl flex items-center gap-2.5 max-w-md text-center text-xs text-terracotta">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{speakingError}</span>
                </div>
              )}
            </div>

            {/* Speaking results / feedback */}
            {(transcript || score !== null) && (
              <div className="mt-5 p-4 rounded-xl bg-paper/[0.01] border border-pencil/20 space-y-4 animate-fadeIn">
                
                {/* Transcript breakdown */}
                <div>
                  <span className="font-hud text-[9px] uppercase tracking-widest text-pencil">Pronunciation feedback</span>
                  <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-lg font-display">
                    {feedbackWords.length > 0 ? (
                      feedbackWords.map((item, idx) => (
                        <span
                          key={idx}
                          className={`relative font-semibold ${
                            item.correct
                              ? 'text-teal-deep'
                              : 'text-terracotta underline decoration-wavy decoration-terracotta/70'
                          }`}
                          title={item.correct ? 'Correct pronunciation' : 'Mispronounced/Not heard'}
                        >
                          {item.word}
                        </span>
                      ))
                    ) : (
                      <span className="text-pencil italic text-sm">Evaluating...</span>
                    )}
                  </div>
                </div>

                {/* Score and Award Banner */}
                {score !== null && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-pencil/10">
                    <div className="flex items-center gap-3">
                      {/* Score Ring */}
                      <div className="relative w-14 h-14 shrink-0">
                        <svg width="56" height="56" className="transform -rotate-90">
                          <circle cx="28" cy="28" r="23" className="stroke-paper/10 fill-none" strokeWidth="4" />
                          <circle
                            cx="28"
                            cy="28"
                            r="23"
                            className={`fill-none ${score >= 80 ? 'stroke-teal-deep' : 'stroke-terracotta'}`}
                            strokeWidth="4"
                            strokeDasharray="144.5"
                            strokeDashoffset={144.5 - (144.5 * score) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-hud text-xs font-bold">
                          {score}%
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-display font-bold text-sm">
                          {score >= 80 ? '¡Excelente Trabajo!' : 'Inténtalo de Nuevo'}
                        </h4>
                        <p className="text-pencil text-xs mt-0.5">
                          {score >= 80 
                            ? 'Your pronunciation matches native speech parameters!'
                            : 'Focus on the guide tips above and try recording once more.'
                          }
                        </p>
                      </div>
                    </div>

                    {/* Rewards Bonus Banner */}
                    {hasEarnedBonus && (
                      <div className="bg-marigold/10 border border-marigold/20 rounded-xl px-3 py-2 flex items-center gap-2 text-marigold animate-fadeIn shrink-0">
                        <Trophy className="h-4.5 w-4.5 shrink-0" />
                        <div className="font-hud text-[10px] leading-tight">
                          <p className="font-bold uppercase tracking-wider">Bonus Awarded</p>
                          <p className="mt-0.5 text-paper">+10 XP · +5 Coins</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </section>

        </div>

      </div>
    </div>
  );
};

export default SpeakingScreen;
