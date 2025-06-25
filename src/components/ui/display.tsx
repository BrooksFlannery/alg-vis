import type { AlgState } from "~/lib/type";

export default function Display({ algState, fps = 10 }: { algState: AlgState; fps?: number }) {
    const stableList = [...algState].sort((a, b) => a.id - b.id);

    const intervalMs = 1000 / fps;
    const animDuration = intervalMs * 0.8;

    return (
        <svg
            viewBox={`0 0 500 500`}
            className="mx-auto block h-[30dvh]"
            style={{ width: '70dvw', maxWidth: '100%' }}
        >
            {stableList.map((element) => {
                // round to 3 decimal places so backend and frontend dont mismatch
                const x = Math.round(element.horizontalOffset * 1000) / 1000;
                const y = Math.round(element.verticalOffset * 1000) / 1000;
                return (
                    <g
                        key={element.id}
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                            transition: `transform ${Math.round(animDuration)}ms ease-in-out`,
                        }}
                    >
                        <rect
                            fill={
                                element.style === 'complete'
                                    ? '#8080FF'
                                    : element.style === 'active'
                                        ? '#80FF80'
                                        : 'whitesmoke'
                            }
                            width={element.width}
                            height={element.height}
                            style={{
                                width: element.width,
                                height: element.height,
                                transition: `height ${Math.round(animDuration)}ms ease-in-out, width ${Math.round(animDuration)}ms ease-in-out`,
                            }} />
                        <text
                            x={element.width / 2}
                            y={element.height / 2}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {element.value}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}