import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function HomePage() {
  return (
    <>
      <div className="w-full flex flex-col gap-[2dvh] items-center">

        <Link className="w-[50dvw]" href="/merge-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Merge Sort</CardTitle>
              <CardDescription>The Merge Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw]" href="/selection-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Selection Sort</CardTitle>
              <CardDescription>The Selection Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw]" href="/bubble-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Bubble Sort</CardTitle>
              <CardDescription>The Bubble Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-[50dvw]" href="/binary-search">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Binary Search</CardTitle>
              <CardDescription>The Binary Search Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}
