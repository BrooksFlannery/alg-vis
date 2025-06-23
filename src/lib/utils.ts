import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AlgState } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//we will hardcode width and height values here but thats not correct...
const viewHeight = 200;
const viewWidth = 200;//doesnt account for gap
const gap = 20;

export function buildAlgState(arr: number[], depth: number[]): AlgState {
  const maxValue = Math.max(...arr); // get the true max

  const maxHeight = viewHeight / 2;
  const width = viewWidth / arr.length;

  const algState: AlgState = arr.map((element, index) => {
    const height = (element / maxValue) * maxHeight;

    return {
      horizontalOffset: (width + gap) * index,
      verticalOffset: maxHeight - height + (depth[index]! * 20),
      height,
      width,
      value: element,
      depth: depth[index]!,
    };
  });

  return algState;
}


// export type algElement = {
//     horizontalOffset: number;
//     verticalOffset: number;
//     height: number;
//     width: number;
//     value: number;
// }

// export type algState = algElement[];
// export type algHistory = algState[];