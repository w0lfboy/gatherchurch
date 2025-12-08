import { ReactNode, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useHaptics } from '@/hooks/useHaptics';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  className?: string;
}

export function PullToRefresh({ children, onRefresh, className }: PullToRefreshProps) {
  const haptics = useHaptics();
  const hasTriggeredThreshold = useRef(false);
  const wasRefreshing = useRef(false);
  
  const { containerRef, pullDistance, isRefreshing, isPulling } = usePullToRefresh({
    onRefresh,
    threshold: 80,
    maxPull: 120,
  });

  // Haptic feedback when crossing threshold
  useEffect(() => {
    const progress = pullDistance / 80;
    if (progress >= 1 && !hasTriggeredThreshold.current && isPulling) {
      hasTriggeredThreshold.current = true;
      haptics.medium();
    } else if (progress < 1) {
      hasTriggeredThreshold.current = false;
    }
  }, [pullDistance, isPulling, haptics]);

  // Haptic feedback when refresh completes
  useEffect(() => {
    if (wasRefreshing.current && !isRefreshing) {
      haptics.success();
    }
    wasRefreshing.current = isRefreshing;
  }, [isRefreshing, haptics]);

  const progress = Math.min(pullDistance / 80, 1);
  const rotation = pullDistance * 3;

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-auto h-full", className)}
    >
      {/* Pull indicator */}
      <div 
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-10 transition-opacity duration-200",
          pullDistance > 0 || isRefreshing ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          top: Math.max(pullDistance - 40, 8),
        }}
      >
        <div 
          className={cn(
            "w-10 h-10 rounded-full bg-background shadow-lg border border-border flex items-center justify-center",
            isRefreshing && "animate-pulse"
          )}
        >
          <RefreshCw 
            className={cn(
              "w-5 h-5 text-primary transition-colors",
              isRefreshing && "animate-spin",
              progress >= 1 && !isRefreshing && "text-sage"
            )}
            style={{ 
              transform: isRefreshing ? undefined : `rotate(${rotation}deg)`,
              opacity: Math.max(progress, 0.3),
            }}
          />
        </div>
      </div>

      {/* Content with pull offset */}
      <div 
        className="transition-transform duration-200"
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          transitionDuration: isPulling ? '0ms' : '200ms',
        }}
      >
        {children}
      </div>
    </div>
  );
}
