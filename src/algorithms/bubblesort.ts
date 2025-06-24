// import type { AlgHistory } from "~/lib/type";

import type { AlgHistory } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function bubblesort(arr: number[]) {
    const working = [...arr];
    const ids = working.map((value, index) => index);// we need id arr bc react hates me. this feels like a weird work around
    const depthArr = new Array(arr.length).fill(0);
    const history: AlgHistory = [buildAlgState(working, depthArr, ids)];

    for (let i = 1; i < working.length; i++) {
        for (let j = 0; j < working.length - 1; j++)
            if (working[j]! > working[j + 1]!) {
                const temp = working[j]!;
                const tempId = ids[j]!;
                working[j] = working[j + 1]!;
                ids[j] = ids[j + 1]!;
                working[j + 1] = temp;
                ids[j + 1] = tempId;

                history.push(buildAlgState([...working], [...depthArr], [...ids]));
            }

    }
    return history
}