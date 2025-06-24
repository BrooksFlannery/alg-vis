//split alg element into base and display so that we can update them more effectively without managing a million arrays

//this takes the place of the godawful arrays i was using to manage the data
export type BaseAlgElement = {
    id: number;
    value: number;
    depth: number;
    style: 'active' | 'default' | 'complete'
};

//this takes the place of the old algElement
export type DisplayElement = BaseAlgElement & {
    horizontalOffset: number;
    verticalOffset: number;
    height: number;
    width: number;
};

export type AlgState = DisplayElement[];
export type AlgHistory = AlgState[];