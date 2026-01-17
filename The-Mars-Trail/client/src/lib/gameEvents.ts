export const gameEvents = [
  {
    id: 1,
    title: "Life Support Malfunction",
    description: "The oxygen recycling system is failing! Pressure is dropping rapidly.",
    choices: [
      { text: "Emergency repair with parts", effect: () => ({ repairParts: -3, oxygen: 10 }) },
      { text: "Ration oxygen and hope it holds", effect: () => ({ oxygen: -15, crewHealth: -5 }) },
      { text: "Reroute power from non-essential systems", effect: () => ({ fuel: -10, oxygen: 5 }) }
    ]
  },
  {
    id: 2,
    title: "Solar Flare Detected",
    description: "A massive solar flare is heading your way! Radiation levels are spiking.",
    choices: [
      { text: "Take shelter in shielded section", effect: () => ({ fuel: -5, crewHealth: -2 }) },
      { text: "Continue course and risk exposure", effect: () => ({ crewHealth: -15 }) },
      { text: "Ride the solar wind (risky boost)", effect: () => ({ fuel: 12, crewHealth: -8, day: -2 }) }
    ]
  },
  {
    id: 3,
    title: "Meteor Strike!",
    description: "A small meteor has punctured the hull! Pressure is venting into space.",
    choices: [
      { text: "Emergency patch with repair kit", effect: () => ({ repairParts: -5, hull: -10 }) },
      { text: "Seal off the damaged section", effect: () => ({ hull: -20, water: -10 }) },
      { text: "Attempt a risky EVA repair", effect: () => ({ repairParts: -2, hull: -5, crewHealth: -8 }) }
    ]
  },
  {
    id: 4,
    title: "Water Recycler Contamination",
    description: "The water recycling system is contaminated. The crew is at risk.",
    choices: [
      { text: "Purge and clean the system", effect: () => ({ water: -20, repairParts: -2 }) },
      { text: "Use emergency water reserves", effect: () => ({ water: -30 }) },
      { text: "Filter manually (takes time)", effect: () => ({ day: 2, crewHealth: -3 }) }
    ]
  },
  {
    id: 5,
    title: "Gravity Assist Opportunity",
    description: "You're passing near a large asteroid. A gravity assist could save fuel!",
    choices: [
      { text: "Calculate and execute maneuver", effect: () => ({ fuel: 15, day: -1 }) },
      { text: "Too risky - maintain current course", effect: () => ({ fuel: -3 }) },
      { text: "Aggressive slingshot (dangerous)", effect: () => ({ fuel: 25, crewHealth: -10, repairParts: -2 }) }
    ]
  },
  {
    id: 6,
    title: "Crew Member Illness",
    description: "One of your crew is showing signs of space sickness. It could spread.",
    choices: [
      { text: "Quarantine and treat aggressively", effect: () => ({ singleCrewHealth: -8, food: -10 }) },
      { text: "Monitor and hope it passes", effect: () => ({ singleCrewHealth: -15 }) },
      { text: "Use medical supplies", effect: () => ({ repairParts: -1, singleCrewHealth: -5 }) }
    ]
  },
  {
    id: 7,
    title: "Fuel Recovery System Activated",
    description: "Your engineer discovered unused fuel reserves in the backup tanks!",
    choices: [
      { text: "Transfer all reserves carefully", effect: () => ({ fuel: 20, day: 1 }) },
      { text: "Quick transfer (might lose some)", effect: () => ({ fuel: 12 }) },
      { text: "Save for emergency - partial transfer", effect: () => ({ fuel: 8, repairParts: 2 }) }
    ]
  },
  {
    id: 8,
    title: "Derelict Satellite Detected",
    description: "You've found an abandoned satellite with salvageable fuel cells!",
    choices: [
      { text: "EVA mission to salvage fuel", effect: () => ({ fuel: 18, crewHealth: -5, day: 2 }) },
      { text: "Remote extraction (less efficient)", effect: () => ({ fuel: 10, repairParts: -1 }) },
      { text: "Too dangerous - pass it by", effect: () => ({ fuel: -2 }) }
    ]
  },
  {
    id: 9,
    title: "Engine Efficiency Breakthrough",
    description: "Your scientist has optimized the engine combustion algorithm!",
    choices: [
      { text: "Implement new efficiency settings", effect: () => ({ fuel: 15 }) },
      { text: "Test cautiously first", effect: () => ({ fuel: 8, day: 1 }) },
      { text: "Stick with proven systems", effect: () => ({ fuel: -3 }) }
    ]
  },
  {
    id: 10,
    title: "Fuel Line Leak",
    description: "You're losing fuel! The leak needs to be contained immediately.",
    choices: [
      { text: "Emergency patch and recover some fuel", effect: () => ({ fuel: -8, repairParts: -4 }) },
      { text: "Reroute through backup lines", effect: () => ({ fuel: -25 }) },
      { text: "Complex repair to minimize loss", effect: () => ({ fuel: -5, repairParts: -6, day: 2 }) }
    ]
  },
  {
    id: 13,
    title: "Messages from Earth",
    description: "The communication array has received personal messages from loved ones back on Earth!",
    choices: [
      { text: "Share messages with the crew", effect: () => ({ crewHealth: 15 }) },
      { text: "Private viewing for each member", effect: () => ({ crewHealth: 12, day: 1 }) },
      { text: "Save bandwidth for emergencies", effect: () => ({ crewHealth: -5 }) }
    ]
  },
  {
    id: 14,
    title: "Crew Member Depression",
    description: "The isolation and monotony of space is taking a psychological toll on the crew.",
    choices: [
      { text: "Organize group activities and counseling", effect: () => ({ crewHealth: -3, food: -5, day: 1 }) },
      { text: "Prescribe rest and meditation", effect: () => ({ crewHealth: -8, day: 2 }) },
      { text: "Push through - stay focused on mission", effect: () => ({ crewHealth: -15 }) }
    ]
  },
  {
    id: 16,
    title: "Crew Conflict",
    description: "Tensions are rising between crew members. A heated argument has broken out.",
    choices: [
      { text: "Mediate and resolve the conflict", effect: () => ({ crewHealth: -5, day: 1 }) },
      { text: "Separate them for cooling off period", effect: () => ({ crewHealth: -10, day: 2 }) },
      { text: "Let them work it out themselves", effect: () => ({ crewHealth: -18 }) }
    ]
  },
  {
    id: 22,
    title: "Claustrophobia Attack",
    description: "A crew member is having a severe claustrophobic panic attack in the confined space.",
    choices: [
      { text: "Emergency calming protocol with sedatives", effect: () => ({ singleCrewHealth: -8, repairParts: -2 }) },
      { text: "Talk them through breathing exercises", effect: () => ({ singleCrewHealth: -12, day: 1 }) },
      { text: "Let them work through it alone", effect: () => ({ singleCrewHealth: -25 }) }
    ]
  },
  {
    id: 23,
    title: "Electrical Fire!",
    description: "A fire has broken out in the electrical bay! A crew member was caught in the flames!",
    choices: [
      { text: "Use fire suppression system immediately", effect: () => ({ singleCrewHealth: -60, oxygen: -10 }) },
      { text: "Manual firefighting with extinguishers", effect: () => ({ singleCrewHealth: -60, repairParts: -3, day: 1 }) },
      { text: "Vent compartment to space (risky)", effect: () => ({ singleCrewHealth: -70, hull: -15 }) }
    ]
  }
];
