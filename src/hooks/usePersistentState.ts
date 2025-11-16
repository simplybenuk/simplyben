import { useEffect, useState } from 'react';

export function usePersistentState<T>(key: string, initialState: () => T) {
  const getInitialValue = () => {
    const baseValue = initialState();

    if (typeof window === 'undefined') {
      return baseValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) {
        return baseValue;
      }

      const parsed = JSON.parse(stored) as Partial<T>;
      return { ...baseValue, ...parsed } as T;
    } catch (error) {
      console.warn('Unable to restore state for', key, error);
      return baseValue;
    }
  };

  const [state, setState] = useState<T>(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Unable to persist state for', key, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
