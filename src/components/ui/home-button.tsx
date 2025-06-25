'use client';

import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeButton() {
    const router = useRouter();

    return (
        <button
            className="bg-[hsl(280,46%,65%)] text-primary-foreground shadow-xs hover:bg-primary/90 absolute top-0 left-0 p-1 m-1 border rounded-xl"
            onClick={() => router.push('/')}>
            <HomeIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
        </button>
    );
}