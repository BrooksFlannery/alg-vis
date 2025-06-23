'use client'

export default function MergeSort() {
    const startArray = [7, 2, 9, 1, 5, 10, 3, 6, 8, 4];
    const handleSort = () => {
        const sortedArray = mergeSort(startArray);
        console.log(sortedArray)
    }

    function mergeSort(arr: number[]): number[] {
        if (arr.length === 1) return arr;
        let arrA = arr.slice(0, (arr.length / 2));
        let arrB = arr.slice((arr.length / 2) + 1 / arr.length);

        arrA = mergeSort(arrA);
        arrB = mergeSort(arrB);

        return merge(arrA, arrB);
    }

    function merge(arrA: number[], arrB: number[]): number[] {
        let arrC: number[] = [];


        while (arrA.length > 0 && arrB.length > 0) {
            if (arrA[0]! < arrB[0]!) {
                const element = arrA.shift() as number
                arrC.push(element)
            } else {
                const element = arrB.shift() as number

                arrC.push(element)
            }
        }

        if (arrA.length > 0) {
            arrC.push(...arrA)
        } else {
            arrC.push(...arrB)
        }
        return arrC
    }

    return (
        <>
            <div>
                {JSON.stringify(startArray)}
            </div >
            <button onClick={handleSort}>Sort</button>
        </>
    )
}