import SpaceScene from './SpaceScene';
import ShipStatus from './ShipStatus';
import EventPanel from './EventPanel';
import CrewPanel from './CrewPanel';
import MissionLog from './MissionLog';

interface CrewMember {
  name: string;
  role: string;
  health: number;
  alive: boolean;
}

interface GameEvent {
  id: number | string;
  title: string;
  description: string;
  choices: any[];
  affectedCrewMember?: CrewMember;
  fireHealthLoss?: number;
}

interface GamePlayProps {
  shipName: string;
  day: number;
  distance: number;
  totalDistance: number;
  resources: {
    hull: number;
    oxygen: number;
    water: number;
    fuel: number;
    food: number;
    repairParts: number;
  };
  crew: CrewMember[];
  currentEvent: GameEvent | null;
  log: string[];
  animating: boolean;
  afterburnerActive: boolean;
  afterburnerDaysRemaining: number;
  afterburnerCooldown: number;
  solarChargingActive: boolean;
  solarChargingDaysRemaining: number;
  onSynthesizeWater: () => void;
  onActivateAfterburner: () => void;
  onActivateSolarCharging: () => void;
  onChoice: (choice: any) => void;
}

export default function GamePlay({
  shipName,
  day,
  distance,
  totalDistance,
  resources,
  crew,
  currentEvent,
  log,
  animating,
  afterburnerActive,
  afterburnerDaysRemaining,
  afterburnerCooldown,
  solarChargingActive,
  solarChargingDaysRemaining,
  onSynthesizeWater,
  onActivateAfterburner,
  onActivateSolarCharging,
  onChoice
}: GamePlayProps) {
  const progressPercent = (distance / totalDistance) * 100;
  
  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto mb-4 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-2" data-testid="text-ship-name">
          {shipName}
        </h1>
        <p className="text-center text-muted-foreground" data-testid="text-progress">
          Day {day} - {Math.round(distance / 1000000)}M / 225M km
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <SpaceScene 
          distance={distance}
          totalDistance={totalDistance}
          animating={animating}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ShipStatus 
          resources={resources}
          afterburnerActive={afterburnerActive}
          afterburnerDaysRemaining={afterburnerDaysRemaining}
          afterburnerCooldown={afterburnerCooldown}
          solarChargingActive={solarChargingActive}
          solarChargingDaysRemaining={solarChargingDaysRemaining}
          onSynthesizeWater={onSynthesizeWater}
          onActivateAfterburner={onActivateAfterburner}
          onActivateSolarCharging={onActivateSolarCharging}
        />

        <EventPanel 
          currentEvent={currentEvent}
          onChoice={onChoice}
        />

        <CrewPanel crew={crew} />
      </div>

      <div className="max-w-6xl mx-auto">
        <MissionLog log={log} />
      </div>
    </div>
  );
}
