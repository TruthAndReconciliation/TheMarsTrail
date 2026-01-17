import Victory from '../Victory';

export default function VictoryExample() {
  const mockCrew = [
    { name: 'Sarah Chen', role: 'Captain', health: 85, alive: true },
    { name: 'Marcus Rivera', role: 'Engineer', health: 72, alive: true },
    { name: 'Dr. Kim Park', role: 'Medic', health: 91, alive: true },
    { name: 'Alex Thompson', role: 'Scientist', health: 0, alive: false },
  ];
  
  const mockResources = {
    hull: 67,
    oxygen: 54,
    water: 42,
    fuel: 18,
    food: 38,
    repairParts: 3
  };
  
  return (
    <Victory 
      shipName="Perseverance" 
      day={175} 
      crew={mockCrew}
      resources={mockResources}
      onNewJourney={() => console.log('New journey clicked')} 
    />
  );
}
