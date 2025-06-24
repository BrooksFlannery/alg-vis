import type { AlgHistory, BaseAlgElement } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export default function binarysearch(arr: number[], target: number): AlgHistory {

    const working: BaseAlgElement[] = arr.map((value, index) => ({ id: index, value, depth: 0, style: 'default' }));

    const maxDepth = 1;
    const history: AlgHistory = [buildAlgState(working, maxDepth)];

    search(0, arr.length - 1);

    function search(start: number, end: number) {
        if (start > end) {
            working.forEach((e) => {
                e.depth = 0;
                e.style = 'default'
            });
            history.push(buildAlgState(working, maxDepth));
            return;
        }

        const middle = Math.floor((start + end) / 2);

        working.forEach((e) => (e.depth = 0));
        working[middle]!.depth = 1;
        working[middle]!.style = 'active'
        history.push(buildAlgState(working, maxDepth));

        if (working[middle]!.value === target) {
            working[middle]!.style = 'complete'
            history.push(buildAlgState(working, maxDepth));
            return;
        }

        if (working[middle]!.value > target) {
            working[middle]!.style = 'default'
            search(start, middle - 1);
            return;
        }

        working[middle]!.style = 'default'
        search(middle + 1, end);
    }

    return history;
}