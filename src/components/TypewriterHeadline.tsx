import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterHeadline: React.FC<TypewriterProps> = ({
  phrases = [
    'ServiceNow Developer & Software Engineer',
    'Worked with Multi-Modal Cryptography Algorithms',
  ],
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 3200,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause before starting to delete
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Typing or deleting next character
      const nextCharCount = isDeleting ? displayText.length - 1 : displayText.length + 1;
      const speed = isDeleting ? deletingSpeed : typingSpeed + (Math.random() * 25 - 12);

      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, nextCharCount));
      }, Math.max(20, speed));
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center text-lg sm:text-xl font-mono font-medium tracking-tight">
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        {displayText}
      </span>
      {/* Blinking Caret */}
      <span
        className="inline-block w-[2px] h-[1.15em] ml-1.5 bg-cyan-400 rounded-sm animate-caret"
        aria-hidden="true"
      />
    </span>
  );
};

export default TypewriterHeadline;
