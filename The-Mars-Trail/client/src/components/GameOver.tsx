import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameOverProps {
  shipName: string;
  day: number;
  onTryAgain: () => void;
}

export default function GameOver({ shipName, day, onTryAgain }: GameOverProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-destructive/20 to-background flex items-center justify-center p-8 relative overflow-hidden">
      {/* Retro vertical stripes background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light blue stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-cyan-400/20"
          style={{ left: '25%' }}
        />
        {/* Orange stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-orange-400/20"
          style={{ left: '60%' }}
        />
        {/* Yellow stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-yellow-400/20"
          style={{ left: 'calc(60% + 8rem)' }}
        />
      </div>

      <div className="max-w-2xl text-center relative z-10">
        <AlertTriangle className="w-24 h-24 mx-auto mb-6 text-destructive" data-testid="icon-alert" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4" data-testid="text-title">
          Mission Failed
        </h1>
        <p className="text-xl mb-8 text-muted-foreground" data-testid="text-message">
          The {shipName} was lost in space. All crew members perished on Day {day}.
        </p>
        <Button
          onClick={onTryAgain}
          variant="destructive"
          size="lg"
          className="px-8"
          data-testid="button-try-again"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
