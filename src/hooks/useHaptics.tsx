import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [50, 50, 50],
};

export function useHaptics() {
  const trigger = useCallback((type: HapticType = 'light') => {
    if (!('vibrate' in navigator)) return;
    
    try {
      const pattern = hapticPatterns[type];
      navigator.vibrate(pattern);
    } catch (e) {
      // Silently fail if vibration not supported
    }
  }, []);

  const light = useCallback(() => trigger('light'), [trigger]);
  const medium = useCallback(() => trigger('medium'), [trigger]);
  const heavy = useCallback(() => trigger('heavy'), [trigger]);
  const success = useCallback(() => trigger('success'), [trigger]);
  const warning = useCallback(() => trigger('warning'), [trigger]);
  const error = useCallback(() => trigger('error'), [trigger]);

  return {
    trigger,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
  };
}
