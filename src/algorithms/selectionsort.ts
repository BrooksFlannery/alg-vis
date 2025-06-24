
import type { AlgHistory, BaseAlgElement } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function selectionsort(arr: number[]): AlgHistory {
    const working: BaseAlgElement[] = arr.map((value, index) => ({ id: index, value, depth: 0, style: 'default' }));

    const history: AlgHistory = [buildAlgState(working)];

    for (let i = 0; i < working.length - 1; i++) {
        let jMin = i;
        working[jMin]!.style = 'active';
        for (let j = i + 1; j < working.length; j++) {
            working[j]!.style = 'active'
            if (j - 1 !== jMin) working[j - 1]!.style = 'default'
            history.push(buildAlgState(working));

            if (working[j]!.value < working[jMin]!.value) {
                working[jMin]!.style = 'default'
                jMin = j;
            }
        }
        working[working.length - 1]!.style = 'default';

        if (jMin !== i) {
            const temp = working[i]!;
            working[i] = working[jMin]!;
            working[jMin] = temp;
            working[i]!.style = 'complete'
            history.push(buildAlgState(working));
        } else {
            working[i]!.style = 'complete'
            history.push(buildAlgState(working))
        }
    }
    working[working.length - 1]!.style = 'complete';
    history.push(buildAlgState(working));
    return history;
}