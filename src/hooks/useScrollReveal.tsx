import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isRevealed };
}

// Hook for staggered reveal of multiple items
export function useStaggeredReveal(itemCount: number, baseDelay: number = 100) {
  const { ref, isRevealed } = useScrollReveal();
  
  const getDelay = (index: number) => ({
    transitionDelay: isRevealed ? `${index * baseDelay}ms` : '0ms',
  });

  return { ref, isRevealed, getDelay };
}
