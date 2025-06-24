'use client'

import { useEffect, useState } from "react";
import Display from "~/components/ui/display";
import { Button } from "~/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { AlgHistory } from "~/lib/type";
import binarysearch from "~/algorithms/binarysearch";

export default function BinarySortPage() {
    const startArray = [1, 2, 3, 5, 6, 8, 9, 10, 13];
    const [targetInput, setTargetInput] = useState("8");
    const [history, setHistory] = useState<AlgHistory>([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const parseTarget = (input: string) => {
        const n = Number(input.trim());
        return Number.isFinite(n) ? n : null;
    };

    const commitTarget = () => {
        const parsed = parseTarget(targetInput);
        if (parsed !== null) {
            const newHistory = binarysearch(startArray, parsed);
            setHistory(newHistory);
            setHistoryIndex(0);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        commitTarget();
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            setHistoryIndex((prev) => {
                if (prev >= history.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 500);
        return () => clearInterval(id);
    }, [isPlaying, history.length]);

    return (
        <>
            {history.length > 0 && <Display algState={history[historyIndex]!} />}
            <span>Binary Search</span>

            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setHistoryIndex(prev => Math.max(prev - 1, 0))}
                    disabled={historyIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                </Button>

                {isPlaying ? (
                    <Button variant="default" size="sm" onClick={() => setIsPlaying(false)}>
                        <Pause className="h-4 w-4" />
                        <span className="sr-only">Pause</span>
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            if (historyIndex >= history.length - 1) {
                                setHistoryIndex(0);
                            }
                            setIsPlaying(true);
                        }}
                        disabled={history.length <= 1}
                    >
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Play</span>
                    </Button>
                )}

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setHistoryIndex(prev => Math.min(prev + 1, history.length - 1))}
                    disabled={historyIndex >= history.length - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                </Button>
            </div>

            <p className="text-sm">
                Step {historyIndex + 1} / {history.length}
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
