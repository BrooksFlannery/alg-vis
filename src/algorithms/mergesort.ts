import type { AlgHistory } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function mergeSort(arr: number[]): AlgHistory {
    const working = [...arr];
    const ids = working.map((value, index) => index);// we need id arr bc react hates me. this feels like a weird work around
    const depthArr = new Array(arr.length).fill(0);
    const maxDepthEver = Math.ceil(Math.log2(arr.length));
    const history: AlgHistory = [buildAlgState(working, depthArr, ids, maxDepthEver)];

    split(0, working.length - 1, 0);
    return history;

    function split(start: number, end: number, depth: number) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);

        for (let i = start; i <= end; i++) {// i bet there is some built in method for this
            depthArr[i] = depth;
        }
        history.push(buildAlgState([...working], [...depthArr], [...ids], maxDepthEver));

        split(start, mid, depth + 1);
        split(mid + 1, end, depth + 1);

        merge(start, mid, end, depth);
    }

    function merge(start: number, mid: number, end: number, depth: number) {
        const left = working.slice(start, mid + 1);
        const right = working.slice(mid + 1, end + 1);
        const leftIds = ids.slice(start, mid + 1);
        const rightIds = ids.slice(mid + 1, end + 1);

        //dual pointer pattern
        let i = start;
        let l = 0;
        let r = 0;

        while (l < left.length && r < right.length) {
            if (left[l]! <= right[r]!) {
                ids[i] = leftIds[l]!;
                working[i] = left[l++]!;
            } else {
                ids[i] = rightIds[r]!;
                working[i] = right[r++]!;
            }
            depthArr[i] = depth;
            i++;
        }

        while (l < left.length) {
            ids[i] = leftIds[l]!;
            working[i] = left[l++]!;
            depthArr[i] = depth;
            i++;
        }

        while (r < right.length) {
            ids[i] = rightIds[r]!;
            working[i] = right[r++]!;
            depthArr[i] = depth;
            i++;
        }
        history.push(buildAlgState([...working], [...depthArr], [...ids], maxDepthEver));
    }
}
