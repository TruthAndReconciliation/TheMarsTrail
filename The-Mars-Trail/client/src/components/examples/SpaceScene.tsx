import { useState, useEffect } from 'react';
import SpaceScene from '../SpaceScene';

export default function SpaceSceneExample() {
  const [distance, setDistance] = useState(0);
  const [animating, setAnimating] = useState(false);
  const totalDistance = 225000000;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
      setDistance(prev => Math.min(prev + totalDistance / 180, totalDistance));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="p-8 bg-background">
      <SpaceScene 
        distance={distance}
        totalDistance={totalDistance}
        animating={animating}
      />
    </div>
  );
}
