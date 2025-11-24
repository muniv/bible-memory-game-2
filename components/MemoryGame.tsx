import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Star, Trophy, Sparkles } from 'lucide-react';
import { WordDisplay } from './WordDisplay';
import { ProgressBar } from './ProgressBar';

const VERSE_TEXT = "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라";
const VERSE_REF = "요한복음 3장 16절";

export const MemoryGame: React.FC = () => {
  // Split verse into words logic
  const [words, setWords] = useState<string[]>([]);
  // Store indices of words that are hidden
  const [hiddenIndices, setHiddenIndices] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize verse
  useEffect(() => {
    setWords(VERSE_TEXT.split(' '));
  }, []);

  // Check completion
  useEffect(() => {
    if (words.length > 0 && hiddenIndices.size === words.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [hiddenIndices, words]);

  const handleLevelUp = useCallback(() => {
    // Find all indices that are NOT yet hidden
    const availableIndices = words
      .map((_, index) => index)
      .filter((index) => !hiddenIndices.has(index));

    if (availableIndices.length === 0) return;

    // Determine how many words to hide (make it slightly harder as we go, or just 1 for kids)
    // For kids, 1 word at a time is good, but maybe 2 if there are many words.
    // Let's stick to 1 random word as requested "하나씩".
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const wordIndexToHide = availableIndices[randomIndex];

    setHiddenIndices((prev) => {
      const newSet = new Set(prev);
      newSet.add(wordIndexToHide);
      return newSet;
    });
  }, [words, hiddenIndices]);

  const handleReset = () => {
    setHiddenIndices(new Set());
    setIsCompleted(false);
  };

  const progress = words.length > 0 ? (hiddenIndices.size / words.length) * 100 : 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-4 border-white ring-4 ring-sky-100 transition-all duration-300">
      
      {/* Verse Reference Title */}
      <div className="flex justify-center mb-6">
        <span className="bg-sky-100 text-sky-700 font-display text-xl md:text-2xl px-6 py-2 rounded-full shadow-inner">
          {VERSE_REF}
        </span>
      </div>

      {/* The Verse Display Area */}
      <div className="min-h-[200px] flex flex-wrap content-center justify-center gap-x-3 gap-y-4 mb-8 text-center">
        {words.map((word, index) => (
          <WordDisplay
            key={index}
            word={word}
            isHidden={hiddenIndices.has(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar progress={progress} />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        {!isCompleted ? (
          <button
            onClick={handleLevelUp}
            className="group relative w-full max-w-sm bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-display text-2xl py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="flex items-center justify-center space-x-2">
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300 group-hover:animate-spin" />
              <span>암송 단계 올리기!</span>
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300 group-hover:animate-spin" />
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center animate-bounce">
            <div className="flex items-center space-x-2 text-yellow-500 mb-2">
              <Trophy className="w-10 h-10 fill-yellow-400" />
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-2xl font-display text-sky-600 mb-4">참 잘했어요!</p>
          </div>
        )}

        <button
          onClick={handleReset}
          className="flex items-center space-x-2 text-slate-400 hover:text-slate-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
        >
          <RefreshCw className={`w-4 h-4 ${hiddenIndices.size > 0 ? '' : 'opacity-50'}`} />
          <span>처음부터 다시하기</span>
        </button>
      </div>
    </div>
  );
};