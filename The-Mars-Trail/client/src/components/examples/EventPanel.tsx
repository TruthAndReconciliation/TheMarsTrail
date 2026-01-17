import EventPanel from '../EventPanel';

export default function EventPanelExample() {
  const mockEvent = {
    id: 1,
    title: "Solar Flare Detected",
    description: "A massive solar flare is heading your way! Radiation levels are spiking. Your crew must take immediate action.",
    choices: [
      { text: "Take shelter in shielded section", effect: () => ({ fuel: -5, crewHealth: -2 }) },
      { text: "Continue course and risk exposure", effect: () => ({ crewHealth: -15 }) },
      { text: "Ride the solar wind (risky boost)", effect: () => ({ fuel: 12, crewHealth: -8, day: -2 }) }
    ]
  };
  
  return (
    <div className="p-8 bg-background space-y-4">
      <EventPanel 
        currentEvent={mockEvent}
        onChoice={(choice) => console.log('Choice selected:', choice.text)}
      />
      <EventPanel 
        currentEvent={null}
        onChoice={() => {}}
      />
    </div>
  );
}
