import type { GraphHistory, GraphState, NodeElement } from "~/lib/type";

export function breadthFirstSearch(graph: GraphState, startNode: NodeElement): GraphHistory {
    const working: GraphState = graph.map(n => ({ ...n, style: 'default' }));
    const history: GraphHistory = [cloneGraphState(working)];

    const visited = new Set<string>();
    const queue: NodeElement[] = [startNode];
    visited.add(startNode.name);

    while (queue.length > 0) {
        const current = queue.shift()!;

        const currentNode = working.find(n => n.name === current.name);
        if (currentNode) currentNode.style = 'active';

        history.push(cloneGraphState(working));

        for (const neighbor of current.connections) {
            if (!visited.has(neighbor.name)) {
                visited.add(neighbor.name);
                queue.push(neighbor);

                const neighborNode = working.find(n => n.name === neighbor.name);
                if (neighborNode) neighborNode.style = 'active';
            }
        }

        if (currentNode) currentNode.style = 'complete';
        history.push(cloneGraphState(working));
    }

    return history;
}

// Shallow clone each node, including style (no deep connection copy unless you need it)
function cloneGraphState(state: GraphState): GraphState {
    return state.map(n => ({
        name: n.name,
        coordinates: { ...n.coordinates },
        style: n.style,
        connections: n.connections, // keep same refs unless you need deep copy
    }));
}
