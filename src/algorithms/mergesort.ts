import type { AlgHistory, BaseAlgElement } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function mergeSort(arr: number[]): AlgHistory {
    const working: BaseAlgElement[] = arr.map((value, index) => ({ id: index, value, depth: 0, style: "default" }));

    const maxDepthEver = Math.ceil(Math.log2(arr.length));
    const history: AlgHistory = [buildAlgState(working, maxDepthEver)];

    split(0, working.length - 1, 0);
    working.forEach(element => {
        element.style = 'complete'
    });
    history.push(buildAlgState(working, maxDepthEver));
    return history;

    function split(start: number, end: number, depth: number) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);

        for (let i = 0; i < arr.length; i++) {
            if (depth > 0 && i >= start && i <= end) {
                working[i]!.depth = depth;
                working[i]!.style = 'active';
            } else {
                working[i]!.style = 'default';
            }
        }
        history.push(buildAlgState(working, maxDepthEver));


        split(start, mid, depth + 1);
        split(mid + 1, end, depth + 1);

        merge(start, mid, end, depth);
    }

    function merge(start: number, mid: number, end: number, depth: number) {
        const left = working.slice(start, mid + 1);
        const right = working.slice(mid + 1, end + 1);

        let i = start;
        let l = 0;
        let r = 0;

        while (l < left.length && r < right.length) {
            if (left[l]!.value <= right[r]!.value) {
                working[i] = left[l++]!;
            } else {
                working[i] = right[r++]!;
            }
            working[i]!.depth = depth;
            i++;
        }

        while (l < left.length) {
            working[i] = left[l++]!;
            working[i]!.depth = depth;
            i++;
        }

        while (r < right.length) {
            working[i] = right[r++]!;
            working[i]!.depth = depth;
            i++;
        }

        for (let idx = start; idx <= end; idx++) {
            working[idx]!.style = 'active';
        }

        history.push(buildAlgState(working, maxDepthEver));
    }

}
