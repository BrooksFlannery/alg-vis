import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AlgState } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const VIEW_BOX_HEIGHT = 500;
export const VIEW_BOX_WIDTH = 500;
const GAP = 10;

export function buildAlgState(
  arr: number[],
  depth: number[],
  ids: number[],
  maxDepth: number,
): AlgState {
  const maxValue = Math.max(...arr); // get the true max

  const maxHeight = VIEW_BOX_HEIGHT * .8;
  const width = (VIEW_BOX_WIDTH - GAP * (arr.length - 1)) / arr.length;

  const depthStep = maxDepth > 0 ? (VIEW_BOX_HEIGHT - maxHeight) / maxDepth : 0;

  const algState: AlgState = arr.map((element, index) => {
    const height = (element / maxValue) * maxHeight;

    return {
      id: ids[index]!,
      horizontalOffset: (width + GAP) * index,
      verticalOffset: (maxHeight + depth[index]! * depthStep) - height,
      height,
      width,
      value: element,
      depth: depth[index]!,
    };
  });

  return algState;
}
