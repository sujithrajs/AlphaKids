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
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('letter')
        .eq('completed', true);
        
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
        await supabase
          .from('user_progress')
          .upsert({ letter, completed: true, updated_at: new Date() }, { onConflict: 'letter' });
      }
    }
  };

  const isCompleted = (letter) => !!completedLetters[letter];
  const progressPercent = (Object.keys(completedLetters).length / 26) * 100;

  return { completedLetters, markComplete, isCompleted, progressPercent };
};
