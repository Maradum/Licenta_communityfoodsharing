'use client';

import { useSpeechSynthesis } from 'react-speech-kit';

interface TextToSpeechProps {
  text: string;
}

export function TextToSpeech({ text }: TextToSpeechProps) {
  const { speak, speaking, supported } = useSpeechSynthesis();

  if (!supported) {
    return null;
  }

  return (
    <button
      onClick={() => speak({ text })}
      disabled={speaking}
      className="inline-flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors"
    >
      <span className="mr-2">
        {speaking ? '🔊' : '🔈'}
      </span>
      {speaking ? 'Speaking...' : 'Listen'}
    </button>
  );
}

export default TextToSpeech; 