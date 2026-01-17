import MissionLog from '../MissionLog';

export default function MissionLogExample() {
  const mockLog = [
    'Day 42: Life Support Malfunction: Emergency repair with parts',
    'Day 38: Gravity Assist Opportunity: Calculate and execute maneuver',
    'Day 35: Messages from Earth: Share messages with the crew',
    'Day 28: Fuel Recovery System Activated: Transfer all reserves carefully',
    'Day 15: Solar Flare Detected: Take shelter in shielded section',
    'Day 8: The Odyssey launches from Earth orbit. Destination: Mars!',
  ];
  
  return (
    <div className="p-8 bg-background">
      <MissionLog log={mockLog} />
    </div>
  );
}
