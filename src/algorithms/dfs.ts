import type { GraphHistory, GraphState, NodeElement } from "~/lib/type";

export function depthFirstSearch(graph: GraphState, startNode: NodeElement): GraphHistory {
    const working: GraphState = graph.map(n => ({ ...n, style: 'default' }));
    const history: GraphHistory = [cloneGraphState(working)];

    const visited = new Set<string>();
    const stack: NodeElement[] = [startNode];
    visited.add(startNode.name);

    while (stack.length > 0) {
        const current = stack.pop()!;

        const currentNode = working.find(n => n.name === current.name);
        if (currentNode) currentNode.style = 'active';

        history.push(cloneGraphState(working));

        for (const neighbor of [...current.connections]) {
            if (!visited.has(neighbor.name)) {
                visited.add(neighbor.name);
                stack.push(neighbor);

                const neighborNode = working.find(n => n.name === neighbor.name);
                if (neighborNode) neighborNode.style = 'active';
            }
        }

        if (currentNode) currentNode.style = 'complete';
        history.push(cloneGraphState(working));
    }
    return history;
}

function cloneGraphState(state: GraphState): GraphState {
    return state.map(n => ({
        name: n.name,
        coordinates: { ...n.coordinates },
        style: n.style,
        connections: n.connections,
    }));
}
