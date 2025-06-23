import type { AlgHistory } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

//we need to modify the main array in place instead of creating tons of subarrays bc i have no idea how to get a state out of that mess of recursion.
//then we can just push the modified working array
//need to switch to depth in array or something
//at max depth in an 8 item list depth array should look like [3,3,2,2,1,1,1,1]
/*
depth array through time
[0, 0, 0, 0, 0, 0, 0, 0]
[1, 1, 1, 1, 1, 1, 1, 1]
[2, 2, 2, 2, 1, 1, 1, 1]
[3, 3, 2, 2, 1, 1, 1, 1]
[2, 2, 2, 2, 1, 1, 1, 1]
[2, 2, 3, 3, 1, 1, 1, 1]
[2, 2, 2, 2, 1, 1, 1, 1]
[1, 1, 1, 1, 1, 1, 1, 1]
[1, 1, 1, 1, 2, 2, 2, 2]
[1, 1, 1, 1, 3, 3, 2, 2]




*/
export function mergeSort(arr: number[]): AlgHistory {
    const working = [...arr];
    const depthArr = new Array(arr.length).fill(0)//so fancy
    console.log(depthArr);
    const history: AlgHistory = [buildAlgState(working, depthArr)];

    split(0, working.length - 1, 0);
    return history;

    function split(start: number, end: number, depth: number) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);


        for (let i = start; i <= end; i++) {// i bet there is some built in method for this
            depthArr[i] = depth;
        }
        history.push(buildAlgState([...working], [...depthArr]));

        split(start, mid, depth + 1);
        split(mid + 1, end, depth + 1);

        merge(start, mid, end, depth);
    }

    function merge(start: number, mid: number, end: number, depth: number) {
        const left = working.slice(start, mid + 1);
        const right = working.slice(mid + 1, end + 1);

        //dual pointer pattern
        let i = start;
        let l = 0;
        let r = 0;



        while (l < left.length && r < right.length) {
            if (left[l]! <= right[r]!) {
                working[i] = left[l++]!;
            } else {
                working[i] = right[r++]!;
            }
            depthArr[i] = depth;
            // history.push(buildAlgState([...working], [...depthArr]));
            i++;
        }

        while (l < left.length) {
            working[i] = left[l++]!;
            depthArr[i] = depth;
            // history.push(buildAlgState([...working], [...depthArr]));
            i++;
        }

        while (r < right.length) {
            working[i] = right[r++]!;
            depthArr[i] = depth;
            // history.push(buildAlgState([...working], [...depthArr]));
            i++;
        }
        history.push(buildAlgState([...working], [...depthArr]));

    }
}
