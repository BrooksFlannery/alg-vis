'use client'

import { useEffect, useState } from "react";
import Display from "~/components/ui/display";
import PlayerControls from "~/components/ui/player-controls";
import { usePlayback } from "~/hooks/usePlayback";
import type { AlgHistory } from "~/lib/type";
import binarysearch from "~/algorithms/binarysearch";

export default function BinarySortPage() {
    const startArray = [1, 2, 3, 5, 6, 8, 9, 10, 13];
    const [targetInput, setTargetInput] = useState("8");
    const [history, setHistory] = useState<AlgHistory>([]);

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

    const parseTarget = (input: string) => {
        const n = Number(input.trim());
        return Number.isFinite(n) ? n : null;
    };

    const commitTarget = () => {
        const parsed = parseTarget(targetInput);
        if (parsed !== null) {
            const newHistory = binarysearch(startArray, parsed);
            setHistory(newHistory);
            reset();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        commitTarget();
    }, []);

    return (
        <>
            <h1 className=" my-[2dvh] text-5xl font-extrabold tracking-tight text-[hsl(280,46%,65%)] sm:text-[5rem]">
                Binary <span className="text-[hsl(280,47%,42%)]">Search</span>
            </h1>
            {history.length > 0 && <Display fps={fps} algState={history[index]!} />}
            <span>Binary Search</span>

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

            <div className="mt-4">
                <label className="mr-2" htmlFor="target-input">Target:</label>
                <input
                    id="target-input"
                    type="text"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            commitTarget();
                        }
                    }}
                    onBlur={commitTarget}
                    className="w-20 rounded border px-2 py-1 text-center"
                />
            </div>

            {parseTarget(targetInput) === null && (
                <p className="mt-2 text-sm text-destructive">Please enter a valid number.</p>
            )}
        </>
    );
}
