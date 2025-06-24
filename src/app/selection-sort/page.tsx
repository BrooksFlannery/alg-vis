'use client'

import { useEffect, useMemo, useState } from "react";
import Display from "~/components/ui/display";
import { Button } from "~/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { AlgHistory } from "~/lib/type";
import { selectionsort } from "~/algorithms/selectionsort";

export default function SelectionSortPage() {
    const startArray = [7, 11, 2, 10, 1, 5, 9, 3, 12, 6, 8, 4];

    const history = useMemo<AlgHistory>(() => selectionsort(startArray), [startArray]);

    const [historyIndex, setHistoryIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

    const nextStep = () => {
        setHistoryIndex((prev) => Math.min(prev + 1, history.length - 1));
    };

    const prevStep = () => {
        setHistoryIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <>
            {history.length > 0 && <Display algState={history[historyIndex]!} />}
            <span>SelectionSort</span>
            <div className="flex gap-2">
                {/* Previous */}
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={prevStep}
                    disabled={historyIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                </Button>

                {/* Play / Pause */}
                {isPlaying ? (
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => setIsPlaying(false)}
                    >
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
                    onClick={nextStep}
                    disabled={historyIndex >= history.length - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                </Button>
            </div>

            <p className="text-sm">
                Step {historyIndex + 1} / {history.length}
            </p>

        </>
    )
}
