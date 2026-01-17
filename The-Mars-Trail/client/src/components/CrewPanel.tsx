import { Users, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ResourceBar from './ResourceBar';

interface CrewMember {
  name: string;
  role: string;
  health: number;
  alive: boolean;
}

interface CrewPanelProps {
  crew: CrewMember[];
}

export default function CrewPanel({ crew }: CrewPanelProps) {
  return (
    <Card className="p-4">
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Crew Status
      </h3>
      <div className="space-y-3">
        {crew.map((member, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-md ${member.alive ? 'bg-card' : 'bg-destructive/20'} border`}
            data-testid={`card-crew-${idx}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold" data-testid={`text-crew-name-${idx}`}>
                {member.name}
              </span>
              <Heart 
                className={`w-4 h-4 ${member.alive ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} 
              />
            </div>
            <p className="text-xs text-muted-foreground mb-2" data-testid={`text-crew-role-${idx}`}>
              {member.role}
            </p>
            <ResourceBar 
              value={member.health} 
              color={member.alive ? "bg-destructive" : "bg-muted"} 
              small 
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
