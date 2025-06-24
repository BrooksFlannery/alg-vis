import type { AlgHistory } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export default function binarysearch(arr: number[], target: number): AlgHistory {

    const working = [...arr];
    const ids = working.map((value, index) => index);
    const depthArr = new Array(arr.length).fill(0);
    const maxDepth = 1;
    const history: AlgHistory = [buildAlgState(working, depthArr, ids, maxDepth)];

    search(0, arr.length - 1); // we need some fallback if the item isnt found

    function search(start: number, end: number) {
        // base-case: empty range => value not present
        if (start > end) {
            depthArr.fill(0);
            history.push(buildAlgState([...working], [...depthArr], [...ids], maxDepth));
            return;
        };

        const middle = Math.floor((start + end) / 2);

        // highlight the current middle element in the depth array
        depthArr.fill(0);
        depthArr[middle] = 1;
        history.push(buildAlgState([...working], [...depthArr], [...ids], maxDepth));

        if (working[middle] === target) {
            // push one more identical frame so the highlight lingers an extra step
            history.push(buildAlgState([...working], [...depthArr], [...ids], maxDepth));
            return;
        }

        if (working[middle]! > target) {
            search(start, middle - 1);
            return;
        }

        search(middle + 1, end);
    }
    return history
}