'use client'

import { useMemo } from "react";
import Display from "~/components/ui/display";
import { mergeSort } from "~/algorithms/mergesort";
import { usePlayback } from "~/hooks/usePlayback";
import PlayerControls from "~/components/ui/player-controls";
import HomeButton from "~/components/ui/home-button";

export default function MergeSortPage() {
    const startArray = useMemo(() => [7, 11, 2, 16, 10, 1, 5, 15, 14, 9, 3, 12, 6, 8, 4, 13], []);

    const history = useMemo(() => mergeSort(startArray), [startArray]);

    const {
        index,
        isPlaying,
        setIsPlaying,
        fps,
        setFps,
        nextStep,
        prevStep,
        reset,
    } = usePlayback(history.length);

    return (
        <>
            <HomeButton />
            <h1 className=" my-[2dvh] text-5xl font-extrabold tracking-tight text-[hsl(280,46%,65%)] sm:text-[5rem]">
                Merge <br /> <span className="text-[hsl(280,47%,42%)]">Sort</span>
            </h1>
            {history.length > 0 && <Display fps={fps} algState={history[index]!} />}
            <span>MergeSort</span>
            <PlayerControls
                isPlaying={isPlaying}
                onPlay={() => {
                    if (index >= history.length - 1) reset();
                    setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
                onNext={nextStep}
                onPrev={prevStep}
                canPrev={index > 0}
                canNext={index < history.length - 1}
                fps={fps}
                setFps={setFps}
            />
            <p className="mt-2 text-sm">
                Step {index + 1} / {history.length}
            </p>
        </>
    )
}
