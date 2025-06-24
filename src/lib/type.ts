export type AlgElement = {
    id: number;
    horizontalOffset: number;
    verticalOffset: number;
    height: number;
    width: number;
    value: number;
    depth: number;
}

export type AlgState = AlgElement[];
export type AlgHistory = AlgState[];