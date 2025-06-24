import type { AlgState } from "~/lib/type";

export default function Display({ algState }: { algState: AlgState }) {
    //ok this took fking forever to figure out. apparently just givig the objects an id isnt good enough bc react hates when you move items around in the array i guess. i think it fucks with the virtual dom somehow, so i stabilize the list before we try rendering it and that seems to make react happy. need to really look into the virtual dom at some point along with like 700 other things i dont understand.
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
                            fill="lightpink"
                            style={{
                                width: element.width,
                                height: element.height,
                                transition: 'height 300ms ease-in-out, width 300ms ease-in-out',
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