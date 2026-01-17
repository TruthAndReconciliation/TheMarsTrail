import ShipStatus from '../ShipStatus';

export default function ShipStatusExample() {
  const mockResources = {
    hull: 75,
    oxygen: 82,
    water: 45,
    fuel: 58,
    food: 67,
    repairParts: 8
  };
  
  return (
    <div className="p-8 bg-background">
      <ShipStatus 
        resources={mockResources}
        afterburnerActive={false}
        afterburnerDaysRemaining={0}
        afterburnerCooldown={0}
        onSynthesizeWater={() => console.log('Synthesize water')}
        onActivateAfterburner={() => console.log('Activate afterburner')}
      />
    </div>
  );
}
