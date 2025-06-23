import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function HomePage() {
  return (
    <>
      <div className="w-full flex flex-col gap-5 items-center">

        <Link className="w-sm" href="/merge-sort">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Merge Sort</CardTitle>
              <CardDescription>The Merge Sort Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link className="w-sm" href="/depth-first-search">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Depth First Search</CardTitle>
              <CardDescription>The Depth First Search Algorithm Visualized</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}
