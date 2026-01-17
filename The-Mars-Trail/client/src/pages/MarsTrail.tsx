import { useState, useEffect } from 'react';
import MainMenu from '@/components/MainMenu';
import MissionSetup from '@/components/MissionSetup';
import GamePlay from '@/components/GamePlay';
import GameOver from '@/components/GameOver';
import Victory from '@/components/Victory';
import { gameEvents } from '@/lib/gameEvents';

type GameState = 'menu' | 'setup' | 'playing' | 'gameover' | 'victory';

interface CrewMember {
  name: string;
  role: string;
  health: number;
  alive: boolean;
}

const TOTAL_DISTANCE = 225000000;
const DAYS_TO_MARS = 180;

export default function MarsTrail() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [shipName, setShipName] = useState('');
  const [crewRole, setCrewRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [crewCount, setCrewCount] = useState(4);
  const [distance, setDistance] = useState(0);
  const [resources, setResources] = useState({
    hull: 100,
    oxygen: 100,
    water: 100,
    fuel: 100,
    repairParts: 20,
    food: 100
  });
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);
  const [day, setDay] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [lastHarvestMilestone, setLastHarvestMilestone] = useState(0);
  const [afterburnerActive, setAfterburnerActive] = useState(false);
  const [afterburnerDaysRemaining, setAfterburnerDaysRemaining] = useState(0);
  const [afterburnerCooldown, setAfterburnerCooldown] = useState(0);
  const [solarChargingActive, setSolarChargingActive] = useState(false);
  const [solarChargingDaysRemaining, setSolarChargingDaysRemaining] = useState(0);

  const addLog = (message: string) => {
    setLog(prev => [`Day ${day}: ${message}`, ...prev].slice(0, 10));
  };

  const crewRoles = ['Captain', 'Engineer', 'Medic', 'Scientist', 'Pilot', 'Biologist', 'Geologist'];

  const startGame = (config: any) => {
    const difficultySettings = {
      easy: { hull: 100, oxygen: 120, water: 120, fuel: 120, repairParts: 15, food: 120 },
      medium: { hull: 100, oxygen: 100, water: 100, fuel: 100, repairParts: 10, food: 100 },
      hard: { hull: 80, oxygen: 80, water: 80, fuel: 80, repairParts: 6, food: 80 }
    };

    setShipName(config.shipName);
    setCrewRole(config.crewRole);
    setDifficulty(config.difficulty);
    setCrewCount(config.crewCount);
    setResources(difficultySettings[config.difficulty as keyof typeof difficultySettings]);
    
    const initialCrew = [];
    for (let i = 1; i <= config.crewCount; i++) {
      initialCrew.push({
        name: config.crewNames[`crew${i}`],
        role: crewRoles[i - 1],
        health: 100,
        alive: true
      });
    }
    
    setCrew(initialCrew);
    setGameState('playing');
    addLog(`The ${config.shipName} launches from Earth orbit. Destination: Mars!`);
  };

  const handleChoice = (choice: any) => {
    const effect = choice.effect();
    
    setResources(prev => ({
      hull: Math.max(0, Math.min(100, prev.hull + (effect.hull || 0))),
      oxygen: Math.max(0, Math.min(100, prev.oxygen + (effect.oxygen || 0))),
      water: Math.max(0, Math.min(100, prev.water + (effect.water || 0))),
      fuel: Math.max(0, Math.min(100, prev.fuel + (effect.fuel || 0))),
      repairParts: Math.max(0, prev.repairParts + (effect.repairParts || 0)),
      food: Math.max(0, Math.min(100, prev.food + (effect.food || 0)))
    }));

    if (effect.crewHealth) {
      const updatedCrew = crew.map(c => {
        if (c.alive) {
          const newHealth = Math.max(0, c.health + effect.crewHealth);
          return { ...c, health: newHealth, alive: newHealth > 0 };
        }
        return c;
      });
      setCrew(updatedCrew);
      
      updatedCrew.forEach(c => {
        if (!c.alive && crew.find(oc => oc.name === c.name)?.alive) {
          addLog(`${c.name} has died.`);
        }
      });
    }

    if (effect.singleCrewHealth && currentEvent.affectedCrewMember) {
      const updatedCrew = crew.map(c => {
        if (c.name === currentEvent.affectedCrewMember.name && c.alive) {
          const newHealth = Math.max(0, c.health + effect.singleCrewHealth);
          return { ...c, health: newHealth, alive: newHealth > 0 };
        }
        return c;
      });
      setCrew(updatedCrew);
      
      updatedCrew.forEach(c => {
        if (!c.alive && crew.find(oc => oc.name === c.name)?.alive) {
          addLog(`${c.name} has died.`);
        }
      });
    }

    if (effect.day) {
      setDay(prev => prev + effect.day);
    }

    addLog(`${currentEvent.title}: ${choice.text}`);
    setCurrentEvent(null);
  };

  const synthesizeWater = () => {
    if (resources.oxygen >= 20 && resources.fuel >= 20) {
      setResources(prev => ({
        ...prev,
        oxygen: prev.oxygen - 20,
        fuel: prev.fuel - 20,
        water: Math.min(100, prev.water + 30)
      }));
      addLog("Synthesized water from oxygen and fuel reserves.");
    }
  };

  const activateAfterburner = () => {
    if (!afterburnerActive && afterburnerCooldown === 0 && resources.fuel >= 20) {
      setAfterburnerActive(true);
      setAfterburnerDaysRemaining(5);
      addLog("Afterburners engaged! Moving at double speed for 5 days.");
    }
  };

  const activateSolarCharging = () => {
    if (!solarChargingActive) {
      setSolarChargingActive(true);
      setSolarChargingDaysRemaining(5);
      addLog("Solar charging initiated. Aligning panels for optimal energy capture.");
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setShipName('');
    setCrewRole('');
    setDifficulty('');
    setCrewCount(4);
    setDistance(0);
    setResources({
      hull: 100,
      oxygen: 100,
      water: 100,
      fuel: 100,
      repairParts: 20,
      food: 100
    });
    setCrew([]);
    setCurrentEvent(null);
    setLog([]);
    setDay(0);
    setAnimating(false);
    setLastHarvestMilestone(0);
    setAfterburnerActive(false);
    setAfterburnerDaysRemaining(0);
    setAfterburnerCooldown(0);
    setSolarChargingActive(false);
    setSolarChargingDaysRemaining(0);
  };

  useEffect(() => {
    if (gameState === 'playing' && !currentEvent) {
      const interval = setInterval(() => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 500);
        
        setDay(prev => prev + 1);
        
        if (afterburnerCooldown > 0) {
          setAfterburnerCooldown(prev => prev - 1);
        }

        // Handle solar charging countdown
        if (solarChargingActive && solarChargingDaysRemaining > 0) {
          setSolarChargingDaysRemaining(prev => {
            const newDays = prev - 1;
            if (newDays === 0) {
              setSolarChargingActive(false);
              setResources(prevRes => ({
                ...prevRes,
                fuel: Math.min(100, prevRes.fuel + 15)
              }));
              addLog("Solar charging complete. Fuel reserves increased by 15%.");
            }
            return newDays;
          });
        }
        
        if (afterburnerActive && afterburnerDaysRemaining > 0) {
          setDistance(prev => Math.min(prev + (TOTAL_DISTANCE / DAYS_TO_MARS) * 2, TOTAL_DISTANCE));
          
          setResources(prev => ({
            ...prev,
            water: Math.max(0, prev.water - 0.4),
            fuel: Math.max(0, prev.fuel - 2.4),
            food: Math.max(0, prev.food - 0.35)
          }));
          
          setAfterburnerDaysRemaining(prev => {
            const newDays = prev - 1;
            if (newDays === 0) {
              setAfterburnerActive(false);
              setAfterburnerCooldown(30);
              addLog("Afterburners disengaged. 30 day cooldown initiated.");
            }
            return newDays;
          });
        } else {
          setDistance(prev => Math.min(prev + (TOTAL_DISTANCE / DAYS_TO_MARS), TOTAL_DISTANCE));
          
          setResources(prev => ({
            ...prev,
            water: Math.max(0, prev.water - 0.4),
            fuel: Math.max(0, prev.fuel - 0.6),
            food: Math.max(0, prev.food - 0.35)
          }));
        }

        // Gradually adjust crew health towards 80%
        setCrew(prevCrew => prevCrew.map(member => {
          if (!member.alive) return member;
          
          const targetHealth = 80;
          const adjustmentRate = 0.5;
          let newHealth = member.health;
          
          if (member.health > targetHealth) {
            newHealth = Math.max(targetHealth, member.health - adjustmentRate);
          } else if (member.health < targetHealth) {
            newHealth = Math.min(targetHealth, member.health + adjustmentRate);
          }
          
          return {
            ...member,
            health: newHealth,
            alive: newHealth > 0
          };
        }));

        if (Math.random() < 0.15) {
          const progressPercent = (distance / TOTAL_DISTANCE) * 100;
          let randomEvent;
          
          const currentMilestone = Math.floor(progressPercent / 30);
          if (currentMilestone > lastHarvestMilestone && progressPercent >= 30) {
            setLastHarvestMilestone(currentMilestone);
            randomEvent = {
              id: 'food_harvest',
              title: "Hydroponic Garden Harvest!",
              description: "The onboard hydroponic garden has produced a fresh crop! Your hard work is paying off.",
              choices: [
                { text: "Harvest the crops immediately", effect: () => ({ food: 15 }) },
                { text: "Let them grow a bit more for bigger yield", effect: () => ({ food: 20, day: 3 }) },
                { text: "Save for emergency (preserve current harvest)", effect: () => ({ food: 10 }) }
              ]
            };
          } else if (resources.water < 30 && resources.oxygen >= 20 && resources.fuel >= 20) {
            randomEvent = {
              id: 'water_critical',
              title: "Critical Water Shortage!",
              description: "Water reserves have dropped below 30%! Your engineer suggests using the ship's oxygen and fuel to synthesize additional water through electrolysis.",
              choices: [
                { text: "Use 20% oxygen and 20% fuel to create 30% water", effect: () => ({ oxygen: -20, fuel: -20, water: 30 }) },
                { text: "Ration remaining water strictly", effect: () => ({ crewHealth: -8 }) },
                { text: "Continue as is and hope for the best", effect: () => ({ crewHealth: -12 }) }
              ]
            };
          } else {
            randomEvent = gameEvents[Math.floor(Math.random() * gameEvents.length)];
          }
          
          const personalizedEvent = { ...randomEvent };
          if (personalizedEvent.id === 6 || personalizedEvent.id === 22 || personalizedEvent.id === 23) {
            const aliveCrew = crew.filter(c => c.alive);
            if (aliveCrew.length > 0) {
              const randomCrewMember = aliveCrew[Math.floor(Math.random() * aliveCrew.length)];
              personalizedEvent.affectedCrewMember = randomCrewMember;
              personalizedEvent.description = personalizedEvent.description.replace(/One of your crew|A crew member/i, randomCrewMember.name);
            }
          }
          setCurrentEvent(personalizedEvent);
        }

        const aliveCrew = crew.filter(c => c.alive).length;
        if (aliveCrew === 0) {
          setGameState('gameover');
          addLog("All crew members have perished. Mission failed.");
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gameState, currentEvent, crew, distance, resources, afterburnerActive, afterburnerDaysRemaining, afterburnerCooldown, solarChargingActive, solarChargingDaysRemaining]);

  useEffect(() => {
    if (distance >= TOTAL_DISTANCE && gameState === 'playing') {
      setGameState('victory');
      const aliveCrew = crew.filter(c => c.alive).length;
      addLog(`You've reached Mars! ${aliveCrew} crew members survived the journey.`);
    }
  }, [distance, gameState, crew]);

  useEffect(() => {
    if (gameState === 'playing') {
      if (resources.oxygen <= 0) {
        setGameState('gameover');
        addLog("Oxygen depleted. All crew members suffocated.");
      } else if (resources.water <= 0) {
        setGameState('gameover');
        addLog("Water supply exhausted. Crew died of dehydration.");
      } else if (resources.fuel <= 0) {
        setGameState('gameover');
        addLog("Fuel reserves empty. Ship lost in space forever.");
      } else if (resources.food <= 0) {
        setGameState('gameover');
        addLog("Food supplies gone. Crew starved to death.");
      } else if (resources.hull <= 0) {
        setGameState('gameover');
        addLog("Hull integrity compromised. Ship destroyed by decompression.");
      }
    }
  }, [resources, gameState]);

  if (gameState === 'menu') {
    return <MainMenu onBeginJourney={() => setGameState('setup')} />;
  }

  if (gameState === 'setup') {
    return <MissionSetup onLaunch={startGame} />;
  }

  if (gameState === 'gameover') {
    return <GameOver shipName={shipName} day={day} onTryAgain={resetGame} />;
  }

  if (gameState === 'victory') {
    return <Victory shipName={shipName} day={day} crew={crew} resources={resources} onNewJourney={resetGame} />;
  }

  return (
    <GamePlay
      shipName={shipName}
      day={day}
      distance={distance}
      totalDistance={TOTAL_DISTANCE}
      resources={resources}
      crew={crew}
      currentEvent={currentEvent}
      log={log}
      animating={animating}
      afterburnerActive={afterburnerActive}
      afterburnerDaysRemaining={afterburnerDaysRemaining}
      afterburnerCooldown={afterburnerCooldown}
      solarChargingActive={solarChargingActive}
      solarChargingDaysRemaining={solarChargingDaysRemaining}
      onSynthesizeWater={synthesizeWater}
      onActivateAfterburner={activateAfterburner}
      onActivateSolarCharging={activateSolarCharging}
      onChoice={handleChoice}
    />
  );
}
