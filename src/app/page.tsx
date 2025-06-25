import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function HomePage() {
  return (
    <>
      <h1 className=" my-[2dvh] text-5xl font-extrabold tracking-tight text-[hsl(280,46%,65%)] sm:text-[5rem]">
        Algorithm <br /> <span className="text-[hsl(280,47%,42%)]">Visualizer</span>
      </h1>
      <div className="w-full flex flex-col gap-[2dvh] items-center">

        <Link className="w-[50dvw] max-w-100" href="/merge-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Merge Sort</CardTitle>
              <CardDescription>The Merge Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw] max-w-100" href="/selection-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Selection Sort</CardTitle>
              <CardDescription>The Selection Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw] max-w-100" href="/bubble-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Bubble Sort</CardTitle>
              <CardDescription>The Bubble Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw] max-w-100" href="/binary-search">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Binary Search</CardTitle>
              <CardDescription>The Binary Search Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw] max-w-100" href="/breadth-first-search">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Breadth First Search(BFS)</CardTitle>
              <CardDescription>The Breadth First Search Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw] max-w-100" href="/depth-first-search">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Depth First Search(BFS)</CardTitle>
              <CardDescription>The Depth First Search Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}
