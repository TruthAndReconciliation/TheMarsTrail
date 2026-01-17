import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CrewMember {
  name: string;
  role: string;
  health: number;
  alive: boolean;
}

interface VictoryProps {
  shipName: string;
  day: number;
  crew: CrewMember[];
  resources: {
    hull: number;
    oxygen: number;
    water: number;
    fuel: number;
    food: number;
    repairParts: number;
  };
  onNewJourney: () => void;
}

export default function Victory({ shipName, day, crew, resources, onNewJourney }: VictoryProps) {
  const aliveCrew = crew.filter(c => c.alive);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/20 to-background flex items-center justify-center p-8 relative overflow-hidden">
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

      <div className="max-w-2xl w-full text-center space-y-6 relative z-10">
        <Rocket className="w-24 h-24 mx-auto mb-6 text-primary" data-testid="icon-rocket" />
        <h1 className="text-5xl md:text-6xl font-bold" data-testid="text-title">
          Mission Success!
        </h1>
        <p className="text-xl text-muted-foreground" data-testid="text-journey-complete">
          The {shipName} has reached Mars after {day} days!
        </p>
        <p className="text-2xl font-bold text-primary" data-testid="text-survivors">
          {aliveCrew.length} crew member{aliveCrew.length !== 1 ? 's' : ''} survived the journey
        </p>
        
        <Card className="p-6 text-left">
          <h3 className="text-xl font-bold mb-4 text-center">Survivors</h3>
          <div className="space-y-2">
            {aliveCrew.map((member, idx) => (
              <div key={idx} className="text-primary font-semibold" data-testid={`text-survivor-${idx}`}>
                {member.name} - {member.role}
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 text-left">
          <h3 className="text-xl font-bold mb-4 text-center">Final Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div data-testid="text-hull">Hull: {Math.round(resources.hull)}%</div>
            <div data-testid="text-oxygen">Oxygen: {Math.round(resources.oxygen)}%</div>
            <div data-testid="text-water">Water: {Math.round(resources.water)}%</div>
            <div data-testid="text-fuel">Fuel: {Math.round(resources.fuel)}%</div>
            <div data-testid="text-food">Food: {Math.round(resources.food)}%</div>
            <div data-testid="text-parts">Parts: {resources.repairParts}</div>
          </div>
        </Card>
        
        <Button
          onClick={onNewJourney}
          size="lg"
          className="px-8"
          data-testid="button-new-journey"
        >
          New Journey
        </Button>
      </div>
    </div>
  );
}
