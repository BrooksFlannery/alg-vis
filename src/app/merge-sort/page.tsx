'use client'

import { useEffect, useState } from "react";
import Display from "~/components/ui/display";
import type { AlgHistory } from "~/lib/type";
import { mergeSort } from "~/algorithms/mergesort";
import { buildAlgState } from "~/lib/utils";


export default function MergeSortPage() {
    const startArray = [7, 2, 1, 5, 3, 6, 8, 4];
    const depthArr = new Array(startArray.length).fill(0)//so fancy
    const algStartHistory = buildAlgState(startArray, depthArr)
    const [history, setHistory] = useState<AlgHistory>([algStartHistory])
    const [historyIndex, setHistoryIndex] = useState<number>(0)
    const handleSort = () => {
        setHistory(mergeSort(startArray))
        console.log('sorted')
    }



    return (
        <>
            <div>
                {JSON.stringify(startArray)}
            </div >
            <button onClick={() => setHistoryIndex(historyIndex - 1)}>Back</button>
            <button onClick={handleSort}>Sort</button>
            <button onClick={() => setHistoryIndex(historyIndex + 1)}>Forward</button>

            {/* we really need to check if history index is valid but fuck it for now */}
            <Display algState={history[historyIndex]!} />
        </>
    )
}
