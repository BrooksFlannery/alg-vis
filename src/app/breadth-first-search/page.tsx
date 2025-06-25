'use client';

import { useState } from 'react';
import { breadthFirstSearch } from '~/algorithms/bfs';
import DisplayGraph from '~/components/ui/displayGraph';
import PlayerControls from '~/components/ui/player-controls';
import { usePlayback } from '~/hooks/usePlayback';
import type { NodeElement } from '~/lib/type';

export default function BreadthFirstSearchPage() {
    const A = { name: "A", coordinates: { x: 100, y: 100 }, connections: [], style: 'default' } as NodeElement;
    const B = { name: "B", coordinates: { x: 250, y: 250 }, connections: [], style: 'default' } as NodeElement;
    const C = { name: "C", coordinates: { x: 400, y: 100 }, connections: [], style: 'default' } as NodeElement;
    const D = { name: "D", coordinates: { x: 100, y: 400 }, connections: [], style: 'default' } as NodeElement;
    const E = { name: "E", coordinates: { x: 400, y: 400 }, connections: [], style: 'default' } as NodeElement;

    A.connections = [B];
    B.connections = [A, C, D];
    C.connections = [B, E];
    D.connections = [B, E];
    E.connections = [C, D];

    const graph = [A, B, C, D, E];

    const [startInput, setStartInput] = useState("A");

    //bs checker
    const getStartNode = (name: string) =>
        graph.find((node) => node.name.toLowerCase() === name.trim().toLowerCase()) ?? null;

    const [startNode, setStartNode] = useState<NodeElement>(A);
    const [history, setHistory] = useState(() => breadthFirstSearch(graph, A));

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

    const commitStart = () => {
        const node = getStartNode(startInput);
        if (node) {
            setStartNode(node);
            const newHistory = breadthFirstSearch(graph, node);
            setHistory(newHistory);
            reset();
            setIsPlaying(false);
        }
    };

    return (
        <>
            <h1 className="my-[2dvh] text-5xl font-extrabold tracking-tight text-[hsl(280,46%,65%)] sm:text-[5rem]">
                Breadth First <span className="text-[hsl(280,47%,42%)]">Search</span>
            </h1>

            {history.length > 0 && <DisplayGraph graphState={history[index]!} />}

            <span>Breadth First Search</span>

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

            <p className="mt-2 text-sm">Step {index + 1} / {history.length}</p>

            <div className="mt-4">
                <label htmlFor="start-input" className="mr-2">Start Node:</label>
                <input
                    id="start-input"
                    type="text"
                    value={startInput}
                    onChange={(e) => setStartInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            commitStart();
                        }
                    }}
                    onBlur={commitStart}
                    className="w-20 rounded border px-2 py-1 text-center"
                />
            </div>

            {getStartNode(startInput) === null && (
                <p className="mt-2 text-sm text-destructive">Please enter a valid node name.</p>
            )}
        </>
    );
}
