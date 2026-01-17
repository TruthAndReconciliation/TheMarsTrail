import { useState } from 'react';
import GamePlay from '../GamePlay';

export default function GamePlayExample() {
  const [resources, setResources] = useState({
    hull: 75,
    oxygen: 82,
    water: 45,
    fuel: 58,
    food: 67,
    repairParts: 8
  });
  
  const mockCrew = [
    { name: 'Sarah Chen', role: 'Captain', health: 85, alive: true },
    { name: 'Marcus Rivera', role: 'Engineer', health: 72, alive: true },
    { name: 'Dr. Kim Park', role: 'Medic', health: 91, alive: true },
    { name: 'Alex Thompson', role: 'Scientist', health: 64, alive: true },
  ];
  
  const mockEvent = {
    id: 2,
    title: "Solar Flare Detected",
    description: "A massive solar flare is heading your way! Radiation levels are spiking.",
    choices: [
      { text: "Take shelter in shielded section", effect: () => ({ fuel: -5, crewHealth: -2 }) },
      { text: "Continue course and risk exposure", effect: () => ({ crewHealth: -15 }) },
      { text: "Ride the solar wind (risky boost)", effect: () => ({ fuel: 12, crewHealth: -8, day: -2 }) }
    ]
  };
  
  const mockLog = [
    'Day 42: Life Support Malfunction: Emergency repair with parts',
    'Day 38: Gravity Assist Opportunity: Calculate and execute maneuver',
    'Day 35: Messages from Earth: Share messages with the crew',
  ];
  
  return (
    <GamePlay 
      shipName="Odyssey"
      day={45}
      distance={56250000}
      totalDistance={225000000}
      resources={resources}
      crew={mockCrew}
      currentEvent={mockEvent}
      log={mockLog}
      animating={false}
      afterburnerActive={false}
      afterburnerDaysRemaining={0}
      afterburnerCooldown={0}
      onSynthesizeWater={() => {
        console.log('Synthesize water');
        setResources(prev => ({
          ...prev,
          oxygen: prev.oxygen - 20,
          fuel: prev.fuel - 20,
          water: Math.min(100, prev.water + 30)
        }));
      }}
      onActivateAfterburner={() => console.log('Activate afterburner')}
      onChoice={(choice) => console.log('Choice:', choice.text)}
    />
  );
}
