import { Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventChoice {
  text: string;
  effect: () => any;
}

interface GameEvent {
  id: number | string;
  title: string;
  description: string;
  choices: EventChoice[];
}

interface EventPanelProps {
  currentEvent: GameEvent | null;
  onChoice: (choice: EventChoice) => void;
}

export default function EventPanel({ currentEvent, onChoice }: EventPanelProps) {
  return (
    <Card className="p-4">
      {currentEvent ? (
        <div>
          <h3 className="text-2xl font-bold mb-3 text-destructive" data-testid="text-event-title">
            {currentEvent.title}
          </h3>
          <p className="mb-4 text-muted-foreground font-serif leading-relaxed" data-testid="text-event-description">
            {currentEvent.description}
          </p>
          <div className="space-y-2">
            {currentEvent.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => onChoice(choice)}
                variant="secondary"
                className="w-full justify-start text-left h-auto py-3 px-4 hover-elevate"
                data-testid={`button-choice-${idx}`}
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Rocket className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground" data-testid="text-traveling">
            Traveling through space...
          </p>
          <p className="text-sm text-muted-foreground mt-2">Systems nominal</p>
        </div>
      )}
    </Card>
  );
}
