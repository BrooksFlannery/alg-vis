import type { GraphState } from "~/lib/type";

export default function DisplayGraph({ graphState, fps = 10 }: { graphState: GraphState; fps?: number }) {

    const intervalMs = 1000 / fps;
    const animDuration = intervalMs * 0.8;

    return (
        <svg
            viewBox={`0 0 500 500`}
            className="mx-auto block h-[30dvh]"
            style={{ width: '70dvw', maxWidth: '100%' }}
        >

            {/* Draw Connections */}
            {graphState.map((element) => {
                return (
                    element.connections.map((connection, index) => {
                        return (
                            <line
                                key={index}
                                x1={element.coordinates.x}
                                y1={element.coordinates.y}
                                x2={connection.coordinates.x}
                                y2={connection.coordinates.y}
                                strokeWidth={2}
                                stroke="white"
                            />
                        )
                    })
                )
            })}

            {/* Draw Nodes */}
            {graphState.map((element) => {
                return (
                    <g
                        key={element.name}
                    >
                        <circle
                            cx={element.coordinates.x}
                            cy={element.coordinates.y}
                            r={30}
                            fill={
                                element.style === 'complete'
                                    ? '#8080FF'
                                    : element.style === 'active'
                                        ? '#80FF80'
                                        : 'whitesmoke'
                            }
                            style={{
                            }} />
                        <text
                            fill="black"
                            x={element.coordinates.x}
                            y={element.coordinates.y}
                            textAnchor="middle"
                            dominantBaseline="middle"

                            fontSize={50}

                        >
                            {element.name}
                        </text>
                    </g>
                )
            })}

        </svg>
    )
}