// import type { AlgHistory } from "~/lib/type";

import type { AlgHistory } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function selectionsort(arr: number[]) {
    const working = [...arr];
    const ids = working.map((value, index) => index);// we need id arr bc react hates me. this feels like a weird work around
    const depthArr = new Array(arr.length).fill(0);
    const history: AlgHistory = [buildAlgState(working, depthArr, ids)];

    for (let i = 0; i < working.length - 1; i++) {
        let jMin = i;
        for (let j = i + 1; j < working.length; j++) {
            if (working[j]! < working[jMin]!) {
                jMin = j;
            }
        }
        if (jMin !== i) {
            //working[i]
            //working[jMin]

            const temp = working[i]!;
            const tempId = ids[i]!;
            working[i] = working[jMin]!;
            ids[i] = ids[jMin]!;
            working[jMin] = temp
            ids[jMin] = tempId;

            history.push(buildAlgState([...working], [...depthArr], [...ids]));
        }


    }

    return history
}