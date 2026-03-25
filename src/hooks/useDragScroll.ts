import * as React from "react";

type UseDragScrollOptions = {
  dragThreshold?: number;
  ignoreInteractiveElements?: boolean;
};

export default function useDragScroll<T extends HTMLElement>({
  dragThreshold = 4,
  ignoreInteractiveElements = true,
}: UseDragScrollOptions = {}) {
  const scrollRef = React.useRef<T>(null);
  const dragStateRef = React.useRef({
    isDragging: false,
    didDrag: false,
    startY: 0,
    startScrollTop: 0,
  });
  const [isDragging, setIsDragging] = React.useState(false);

  const handlePointerDown = React.useCallback((event: React.PointerEvent<T>) => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    if (ignoreInteractiveElements) {
      const target = event.target as HTMLElement | null;
      const interactiveAncestor = target?.closest(
        "a, button, input, textarea, select, label, summary, [role='button'], [role='link']"
      );

      if (interactiveAncestor) {
        return;
      }
    }

    dragStateRef.current = {
      isDragging: true,
      didDrag: false,
      startY: event.clientY,
      startScrollTop: scrollElement.scrollTop,
    };

    setIsDragging(false);
    scrollElement.setPointerCapture(event.pointerId);
  }, [ignoreInteractiveElements]);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<T>) => {
      const scrollElement = scrollRef.current;

      if (!scrollElement || !dragStateRef.current.isDragging) {
        return;
      }

      const deltaY = event.clientY - dragStateRef.current.startY;

      if (Math.abs(deltaY) > dragThreshold) {
        dragStateRef.current.didDrag = true;
        setIsDragging(true);
      }

      scrollElement.scrollTop = dragStateRef.current.startScrollTop - deltaY;
    },
    [dragThreshold]
  );

  const handlePointerEnd = React.useCallback((event: React.PointerEvent<T>) => {
    const scrollElement = scrollRef.current;

    dragStateRef.current.isDragging = false;
    setIsDragging(false);

    if (scrollElement?.hasPointerCapture(event.pointerId)) {
      scrollElement.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleClickCapture = React.useCallback((event: React.MouseEvent<T>) => {
    if (!dragStateRef.current.didDrag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.didDrag = false;
  }, []);

  return {
    isDragging,
    scrollRef,
    dragScrollProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onClickCapture: handleClickCapture,
      style: { touchAction: "pan-y" as const },
    },
  };
}
