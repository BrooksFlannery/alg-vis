import type { AlgState } from "~/lib/type";

export default function Display({ algState }: { algState: AlgState }) {
    const stableList = [...algState].sort((a, b) => a.id - b.id);

    return (
        <svg
            viewBox={`0 0 500 500`}
            className="mx-auto block h-[30dvh]"
            style={{ width: '70dvw', maxWidth: '100%' }}
        >
            {stableList.map((element) => {
                return (
                    <g
                        key={element.id}
                        style={{
                            transform: `translate(${element.horizontalOffset}px, ${element.verticalOffset}px)`,
                            transition: 'transform 300ms ease-in-out',
                        }}
                    >
                        <rect
                            fill={
                                element.style === "complete"
                                    ? "#8080FF"
                                    : element.style === "active"
                                        ? "#80FF80"
                                        : "whitesmoke"
                            }
                            width={element.width}
                            height={element.height}
                            style={{
                                transition: "height 300ms ease-in-out, width 300ms ease-in-out",
                            }}
                        />
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