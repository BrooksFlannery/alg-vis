import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BaseAlgElement, DisplayAlgElement } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const VIEW_BOX_HEIGHT = 500;
export const VIEW_BOX_WIDTH = 500;
const GAP = 10;

export function buildAlgState(
  state: BaseAlgElement[],
  maxDepth = 0,
): DisplayAlgElement[] {
  if (state.length === 0) return [];

  const values = state.map((s) => s.value);
  const maxValue = Math.max(...values);

  const maxHeight = VIEW_BOX_HEIGHT * 0.8;
  const width = (VIEW_BOX_WIDTH - GAP * (state.length - 1)) / state.length;

  const depthStep = maxDepth > 0 ? (VIEW_BOX_HEIGHT - maxHeight) / maxDepth : 0;

  const displayState: DisplayAlgElement[] = state.map((element, index) => {
    const height = (element.value / maxValue) * maxHeight;

    return {
      ...element,
      horizontalOffset: (width + GAP) * index,
      verticalOffset: maxHeight + element.depth * depthStep - height,
      height,
      width,
    };
  });

  return displayState;
}
