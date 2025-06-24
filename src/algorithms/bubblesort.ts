import type { AlgHistory, BaseAlgElement } from "~/lib/type";
import { buildAlgState } from "~/lib/utils";

export function bubblesort(arr: number[]): AlgHistory {
    const working: BaseAlgElement[] = arr.map((value, index) => ({
        id: index,
        value,
        depth: 0,
        style: 'default'
    }));

    const history: AlgHistory = [buildAlgState(working)];

    for (let i = 0; i < working.length; i++) {
        for (let j = 0; j < working.length - 1 - i; j++) {
            working[j]!.style = 'active';
            working[j + 1]!.style = 'active';

            if (working[j]!.value > working[j + 1]!.value) {
                const temp = working[j]!;
                working[j] = working[j + 1]!;
                working[j + 1] = temp;
            }

            history.push(buildAlgState(working));

            working[j]!.style = 'default';
            working[j + 1]!.style = 'default';
        }

        working[working.length - 1 - i]!.style = 'complete';
        history.push(buildAlgState(working));
    }

    return history;
}
