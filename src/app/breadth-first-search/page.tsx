'use client';

import { useState } from 'react';
import { breadthFirstSearch } from '~/algorithms/bfs';
import DisplayGraph from '~/components/ui/displayGraph';
import HomeButton from '~/components/ui/home-button';
import PlayerControls from '~/components/ui/player-controls';
import { usePlayback } from '~/hooks/usePlayback';
import type { NodeElement } from '~/lib/type';

export default function BreadthFirstSearchPage() {
    const A = { name: "A", coordinates: { x: 100, y: 100 }, connections: [], style: 'default' } as NodeElement;
    const B = { name: "B", coordinates: { x: 200, y: 100 }, connections: [], style: 'default' } as NodeElement;
    const C = { name: "C", coordinates: { x: 300, y: 100 }, connections: [], style: 'default' } as NodeElement;
    const D = { name: "D", coordinates: { x: 400, y: 100 }, connections: [], style: 'default' } as NodeElement;

    const E = { name: "E", coordinates: { x: 100, y: 200 }, connections: [], style: 'default' } as NodeElement;
    const F = { name: "F", coordinates: { x: 200, y: 200 }, connections: [], style: 'default' } as NodeElement;
    const G = { name: "G", coordinates: { x: 300, y: 200 }, connections: [], style: 'default' } as NodeElement;
    const H = { name: "H", coordinates: { x: 400, y: 200 }, connections: [], style: 'default' } as NodeElement;

    const I = { name: "I", coordinates: { x: 100, y: 300 }, connections: [], style: 'default' } as NodeElement;
    const J = { name: "J", coordinates: { x: 200, y: 300 }, connections: [], style: 'default' } as NodeElement;
    const K = { name: "K", coordinates: { x: 300, y: 300 }, connections: [], style: 'default' } as NodeElement;
    const L = { name: "L", coordinates: { x: 400, y: 300 }, connections: [], style: 'default' } as NodeElement;

    const M = { name: "M", coordinates: { x: 100, y: 400 }, connections: [], style: 'default' } as NodeElement;
    const N = { name: "N", coordinates: { x: 200, y: 400 }, connections: [], style: 'default' } as NodeElement;
    const O = { name: "O", coordinates: { x: 300, y: 400 }, connections: [], style: 'default' } as NodeElement;
    const P = { name: "P", coordinates: { x: 400, y: 400 }, connections: [], style: 'default' } as NodeElement;

    // Connections (grid + some cross-links)
    A.connections = [B, E];
    B.connections = [A, C, F];
    C.connections = [B, G];
    D.connections = [H];

    E.connections = [A,];
    F.connections = [B, G, J];
    G.connections = [C, F, H, K];
    H.connections = [D, G];

    I.connections = [J, M];
    J.connections = [F, I, N];
    K.connections = [G, L];
    L.connections = [K, P];

    M.connections = [I, N];
    N.connections = [J, M, O];
    O.connections = [N, P];
    P.connections = [L, O];

    // The full graph
    const graph = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P];



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
            <HomeButton />

            <h1 className="my-[2dvh] text-5xl font-extrabold tracking-tight text-[hsl(280,46%,65%)] sm:text-[5rem]">
                Breadth<br />  First <br /> <span className="text-[hsl(280,47%,42%)]">Search</span>
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
