import { Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResourceBar from './ResourceBar';

interface ShipStatusProps {
  resources: {
    hull: number;
    oxygen: number;
    water: number;
    fuel: number;
    food: number;
    repairParts: number;
  };
  afterburnerActive: boolean;
  afterburnerDaysRemaining: number;
  afterburnerCooldown: number;
  solarChargingActive: boolean;
  solarChargingDaysRemaining: number;
  onSynthesizeWater: () => void;
  onActivateAfterburner: () => void;
  onActivateSolarCharging: () => void;
}

export default function ShipStatus({ 
  resources, 
  afterburnerActive,
  afterburnerDaysRemaining,
  afterburnerCooldown,
  solarChargingActive,
  solarChargingDaysRemaining,
  onSynthesizeWater, 
  onActivateAfterburner,
  onActivateSolarCharging
}: ShipStatusProps) {
  return (
    <Card className="p-4">
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <Wrench className="w-5 h-5" />
        Ship Status
      </h3>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <ResourceBar label="Hull" value={resources.hull} color="bg-blue-500" />
          <ResourceBar label="Oxygen" value={resources.oxygen} color="bg-green-500" />
          <ResourceBar label="Water" value={resources.water} color="bg-cyan-500" />
          <ResourceBar label="Fuel" value={resources.fuel} color="bg-yellow-500" />
          <ResourceBar label="Food" value={resources.food} color="bg-primary" />
          <div className="pt-2 border-t">
            <p className="text-sm" data-testid="text-repair-parts">
              Repair Parts: {resources.repairParts}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 justify-center">
          <Button
            onClick={onSynthesizeWater}
            disabled={resources.oxygen < 20 || resources.fuel < 20}
            variant="secondary"
            size="sm"
            className="whitespace-nowrap text-xs px-3 py-2"
            data-testid="button-synthesize-water"
          >
            <div className="text-center">
              <div>Synthesize H₂O</div>
              <div className="text-xs opacity-75">-20% O₂/Fuel</div>
              <div className="text-xs opacity-75">+30% Water</div>
            </div>
          </Button>
          
          <Button
            onClick={onActivateAfterburner}
            disabled={afterburnerActive || afterburnerCooldown > 0 || resources.fuel < 20}
            variant="destructive"
            size="sm"
            className="whitespace-nowrap text-xs px-3 py-2"
            data-testid="button-afterburner"
          >
            <div className="text-center">
              <div>
                {afterburnerActive 
                  ? `Burning (${afterburnerDaysRemaining}d)` 
                  : afterburnerCooldown > 0 
                    ? `Cooldown (${afterburnerCooldown}d)` 
                    : 'Afterburner'}
              </div>
              <div className="text-xs opacity-75">
                {afterburnerActive ? '2x speed, 4x fuel' : '5d @ 2x speed'}
              </div>
            </div>
          </Button>

          <Button
            onClick={onActivateSolarCharging}
            disabled={solarChargingActive}
            variant="default"
            size="sm"
            className="whitespace-nowrap text-xs px-3 py-2"
            data-testid="button-solar-charging"
          >
            <div className="text-center">
              <div>
                {solarChargingActive 
                  ? `Charging (${solarChargingDaysRemaining}d)` 
                  : 'Solar Charge'}
              </div>
              <div className="text-xs opacity-75">
                {solarChargingActive ? '+15% fuel total' : '5d, +15% fuel'}
              </div>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
