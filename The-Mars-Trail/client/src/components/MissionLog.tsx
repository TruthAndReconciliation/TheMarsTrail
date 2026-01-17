import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MissionLogProps {
  log: string[];
}

export default function MissionLog({ log }: MissionLogProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold mb-2">Mission Log</h3>
      <ScrollArea className="h-32">
        <div className="space-y-1 text-sm text-muted-foreground font-mono">
          {log.length === 0 ? (
            <p className="text-center py-4">No log entries yet</p>
          ) : (
            log.map((entry, idx) => (
              <p key={idx} data-testid={`text-log-${idx}`}>
                &gt; {entry}
              </p>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
