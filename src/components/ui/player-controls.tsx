import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface Props {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    canPrev: boolean;
    canNext: boolean;
    fps: number;
    setFps: (fps: number) => void;
}

export default function PlayerControls({
    isPlaying,
    onPlay,
    onPause,
    onNext,
    onPrev,
    canPrev,
    canNext,
    fps,
    setFps,
}: Props) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                {/* Previous */}
                <Button variant="secondary" size="sm" onClick={onPrev} disabled={!canPrev}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                </Button>

                {/* Play / Pause */}
                {isPlaying ? (
                    <Button variant="default" size="sm" onClick={onPause}>
                        <Pause className="h-4 w-4" />
                        <span className="sr-only">Pause</span>
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onPlay}
                        disabled={!canNext && !canPrev}
                    >
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Play</span>
                    </Button>
                )}

                {/* Next */}
                <Button variant="secondary" size="sm" onClick={onNext} disabled={!canNext}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                </Button>
            </div>

            {/* Speed slider */}
            <div className="flex flex-col items-center gap-2">
                <label htmlFor="speedRange" className="text-sm">
                    Speed: {fps.toFixed(1)} fps
                </label>
                <input
                    id="speedRange"
                    type="range"
                    min={0.5}
                    max={30}
                    step={0.5}
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-64 accent-[hsl(280,46%,65%)]"
                />
            </div>
        </div>
    );
} 