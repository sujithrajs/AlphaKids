import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'alphakids_progress';

export const useProgress = () => {
  const [completedLetters, setCompletedLetters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // Sync initial state from Supabase if available
  useEffect(() => {
    const fetchProgress = async () => {
      if (!supabase) return;

      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Supabase timeout')), 5000)
        );

        const query = supabase
          .from('user_progress')
          .select('letter')
          .eq('completed', true);

        const { data, error } = await Promise.race([query, timeout]);

        if (!error && data) {
          const remoteObj = {};
          data.forEach(item => {
            remoteObj[item.letter] = true;
          });

          // Merge with local progress
          setCompletedLetters(prev => {
            const merged = { ...prev, ...remoteObj };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (err) {
        // Silently fall back to localStorage if Supabase is unreachable
        console.warn('Could not sync from Supabase:', err.message);
      }
    };

    fetchProgress();
  }, []);

  const markComplete = async (letter) => {
    if (!completedLetters[letter]) {
      const next = { ...completedLetters, [letter]: true };
      setCompletedLetters(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      // Sync to Supabase
      if (supabase) {
        try {
          await supabase
            .from('user_progress')
            .upsert({ letter, completed: true, updated_at: new Date() }, { onConflict: 'letter' });
        } catch (err) {
          console.warn('Could not save progress to Supabase:', err.message);
        }
      }
    }
  };

  const isCompleted = (letter) => !!completedLetters[letter];
  const progressPercent = (Object.keys(completedLetters).length / 26) * 100;

  return { completedLetters, markComplete, isCompleted, progressPercent };
};
