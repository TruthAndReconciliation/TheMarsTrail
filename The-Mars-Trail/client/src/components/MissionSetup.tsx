import { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const crewRoles = ['Captain', 'Engineer', 'Medic', 'Scientist', 'Pilot', 'Biologist', 'Geologist'];

interface MissionSetupProps {
  onLaunch: (config: {
    shipName: string;
    crewRole: string;
    difficulty: string;
    crewCount: number;
    crewNames: Record<string, string>;
  }) => void;
}

export default function MissionSetup({ onLaunch }: MissionSetupProps) {
  const [shipName, setShipName] = useState('');
  const [crewRole, setCrewRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [crewCount, setCrewCount] = useState(4);
  const [crewNames, setCrewNames] = useState<Record<string, string>>({});

  const handleCrewNameChange = (key: string, value: string) => {
    setCrewNames(prev => ({ ...prev, [key]: value }));
  };

  const isFormValid = () => {
    if (!shipName || !crewRole || !difficulty) return false;
    for (let i = 1; i <= crewCount; i++) {
      if (!crewNames[`crew${i}`]) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onLaunch({ shipName, crewRole, difficulty, crewCount, crewNames });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background p-8 relative overflow-hidden">
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

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center" data-testid="text-title">
          Mission Setup
        </h2>
        
        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="shipName">Ship Name:</Label>
            <Input
              id="shipName"
              type="text"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
              placeholder="Enter your ship's name"
              data-testid="input-ship-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crewRole">Your Role:</Label>
            <Select value={crewRole} onValueChange={setCrewRole}>
              <SelectTrigger id="crewRole" data-testid="select-crew-role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Captain">Captain - Leadership bonus</SelectItem>
                <SelectItem value="Engineer">Engineer - Repair bonus</SelectItem>
                <SelectItem value="Medic">Medic - Health bonus</SelectItem>
                <SelectItem value="Scientist">Scientist - Resource efficiency</SelectItem>
                <SelectItem value="Pilot">Pilot - Navigation bonus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty:</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger id="difficulty" data-testid="select-difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - More resources</SelectItem>
                <SelectItem value="medium">Medium - Standard resources</SelectItem>
                <SelectItem value="hard">Hard - Limited resources</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crewCount">Number of Crew Members:</Label>
            <Select value={String(crewCount)} onValueChange={(v) => setCrewCount(Number(v))}>
              <SelectTrigger id="crewCount" data-testid="select-crew-count">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Crew Members</SelectItem>
                <SelectItem value="4">4 Crew Members</SelectItem>
                <SelectItem value="5">5 Crew Members</SelectItem>
                <SelectItem value="6">6 Crew Members</SelectItem>
                <SelectItem value="7">7 Crew Members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Name Your Crew
            </h3>
            
            <div className="space-y-4">
              {Array.from({ length: crewCount }, (_, i) => i + 1).map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`crew${num}`} className="text-sm text-muted-foreground">
                    {crewRoles[num - 1]}:
                  </Label>
                  <Input
                    id={`crew${num}`}
                    type="text"
                    value={crewNames[`crew${num}`] || ''}
                    onChange={(e) => handleCrewNameChange(`crew${num}`, e.target.value)}
                    placeholder={`Enter ${crewRoles[num - 1]}'s name`}
                    data-testid={`input-crew-${num}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full"
            size="lg"
            data-testid="button-launch-mission"
          >
            Launch Mission
          </Button>
        </Card>
      </div>
    </div>
  );
}
