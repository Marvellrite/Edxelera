import * as React from "react";

type UseDragScrollOptions = {
  axis?: "x" | "y";
  dragThreshold?: number;
  ignoreInteractiveElements?: boolean;
};

export default function useDragScroll<T extends HTMLElement>({
  axis = "y",
  dragThreshold = 4,
  ignoreInteractiveElements = true,
}: UseDragScrollOptions = {}) {
  const scrollRef = React.useRef<T>(null);
  const dragStateRef = React.useRef({
    isDragging: false,
    didDrag: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
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
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: scrollElement.scrollLeft,
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

      const deltaX = event.clientX - dragStateRef.current.startX;
      const deltaY = event.clientY - dragStateRef.current.startY;
      const delta = axis === "x" ? deltaX : deltaY;

      if (Math.abs(delta) > dragThreshold) {
        dragStateRef.current.didDrag = true;
        setIsDragging(true);
      }

      if (axis === "x") {
        scrollElement.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
        return;
      }

      scrollElement.scrollTop = dragStateRef.current.startScrollTop - deltaY;
    },
    [axis, dragThreshold]
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
      style: { touchAction: axis === "x" ? ("pan-x" as const) : ("pan-y" as const) },
    },
  };
}
