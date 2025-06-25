//split alg element into base and display so that we can update them more effectively without managing a million arrays

//this takes the place of the godawful arrays i was using to manage the data
export type BaseAlgElement = {
    id: number;
    value: number;
    depth: number;
    style: 'active' | 'default' | 'complete'
};

//this takes the place of the old algElement
export type DisplayAlgElement = BaseAlgElement & {
    horizontalOffset: number;
    verticalOffset: number;
    height: number;
    width: number;
};

export type AlgState = DisplayAlgElement[];
export type AlgHistory = AlgState[];


//eventually we will make this base Element and create a display node element just like we do for the algElemtns
export type NodeElement = {
    name: string;
    coordinates: { x: number; y: number };
    connections: NodeElement[];
    style: 'active' | 'default' | 'complete'

}

export type GraphState = NodeElement[]
export type GraphHistory = GraphState[]