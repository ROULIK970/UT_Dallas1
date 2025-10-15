import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>;
  hasMore: boolean;
  loading: boolean;
  offset?: number; 
  onLoadMore: () => Promise<void> | void;
}

export function useInfiniteScroll<T extends HTMLDivElement>({
  containerRef,
  hasMore,
  loading,
  offset = 200,
  onLoadMore,
}: UseInfiniteScrollProps<T>) {
  const triggeredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const checkScroll = async () => {
      if (loading || !hasMore || triggeredRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Trigger when within offset of bottom
      if (distanceFromBottom <= offset) {
        triggeredRef.current = true;
        try {
          await onLoadMore();
        } finally {
          triggeredRef.current = false;
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, hasMore, loading, offset, onLoadMore]);
}
