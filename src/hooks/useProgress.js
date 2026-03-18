import { useState, useEffect } from 'react';

const STORAGE_KEY = 'alphakids_progress';

export function useProgress() {
  const [completedLetters, setCompletedLetters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const markComplete = (letter) => {
    setCompletedLetters(prev => {
      const next = { ...prev, [letter]: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isCompleted = (letter) => !!completedLetters[letter];

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCompletedLetters({});
  };

  return { completedLetters, markComplete, isCompleted, resetProgress };
}
