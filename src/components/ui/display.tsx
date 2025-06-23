import type { AlgState } from "~/lib/type";

export default function Display({ algState }: { algState: AlgState }) {
    return (
        <svg viewBox={`0 0 500 500`}>

            {algState.map((element, i) => {
                return (

                    <g key={i} transform={`translate(${element.horizontalOffset} ${element.verticalOffset})`}>

                        <rect
                            height={element.height}
                            width={element.width}
                            fill="lightpink"
                            className="transition-all duration-200"

                        />
                        <text
                            x={element.width / 2}
                            y={element.height / 2}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {element.value},,, {element.depth}
                        </text>


                    </g>
                )
            })}
        </svg>
    )
}