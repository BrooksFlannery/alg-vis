import { useEffect, useState, useCallback } from 'react';

export function usePlayback(historyLength: number, defaultFps = 10) {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fps, setFps] = useState(defaultFps);

    const intervalMs = 1000 / fps;

    useEffect(() => {
        if (!isPlaying) return;

        const id = setInterval(() => {
            setIndex((prev) => {
                if (prev >= historyLength - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, intervalMs);

        return () => clearInterval(id);
    }, [isPlaying, historyLength, intervalMs]);
    //this is like useMemo for functions, it sets a callback function and doesnt update it unless the deps change. 
    //useCallback returns a function, useMemo returns the result of a function
    const nextStep = useCallback(
        () => setIndex((prev) => Math.min(prev + 1, historyLength - 1)),
        [historyLength],
    );

    const prevStep = useCallback(
        () => setIndex((prev) => Math.max(prev - 1, 0)),
        [],
    );

    const reset = useCallback(() => setIndex(0), []);

    return {
        index,
        setIndex,
        isPlaying,
        setIsPlaying,
        fps,
        setFps,
        nextStep,
        prevStep,
        reset,
    } as const;
} 