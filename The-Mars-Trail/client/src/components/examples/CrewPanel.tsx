import CrewPanel from '../CrewPanel';

export default function CrewPanelExample() {
  const mockCrew = [
    { name: 'Sarah Chen', role: 'Captain', health: 85, alive: true },
    { name: 'Marcus Rivera', role: 'Engineer', health: 72, alive: true },
    { name: 'Dr. Kim Park', role: 'Medic', health: 91, alive: true },
    { name: 'Alex Thompson', role: 'Scientist', health: 0, alive: false },
  ];
  
  return (
    <div className="p-8 bg-background">
      <CrewPanel crew={mockCrew} />
    </div>
  );
}
