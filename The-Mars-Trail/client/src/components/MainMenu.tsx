import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainMenuProps {
  onBeginJourney: () => void;
}

export default function MainMenu({ onBeginJourney }: MainMenuProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-card to-background">
      {/* Starfield background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.4 + 0.2,
              boxShadow: `0 0 ${Math.random() * 2 + 1}px rgba(255, 255, 255, 0.5)`
            }}
          />
        ))}
      </div>

      {/* Retro vertical stripes background - matching game screens */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light blue stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-cyan-400/20"
          style={{ left: '25%' }}
        />
        {/* Orange stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-orange-400/20"
          style={{ left: '60%' }}
        />
        {/* Yellow stripe */}
        <div 
          className="absolute top-0 bottom-0 w-32 bg-yellow-400/20"
          style={{ left: 'calc(60% + 8rem)' }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.3) 25%, rgba(0, 255, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.3) 75%, rgba(0, 255, 255, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.3) 25%, rgba(0, 255, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.3) 75%, rgba(0, 255, 255, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px'
        }}
      />
      
      <div className="relative z-10 max-w-2xl text-center px-8">
        <div className="mb-8 relative">
          <div 
            className="text-foreground text-6xl md:text-7xl font-black tracking-widest mb-1"
            style={{ 
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              letterSpacing: '0.3em',
              fontWeight: 900
            }}
          >
            THE
          </div>
          <div 
            className="text-foreground text-7xl md:text-8xl font-black tracking-widest mb-1"
            style={{ 
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              letterSpacing: '0.3em',
              fontWeight: 900
            }}
          >
            MARTIAN
          </div>
          <div 
            className="text-foreground text-6xl md:text-7xl font-black tracking-widest"
            style={{ 
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              letterSpacing: '0.3em',
              fontWeight: 900
            }}
          >
            TRAIL
          </div>
        </div>
        
        <div className="mb-8 border-t-2 border-b-2 border-foreground/30 py-4">
          <p className="text-lg md:text-xl text-foreground font-mono leading-relaxed tracking-wide">
            A 225 MILLION KILOMETER JOURNEY
          </p>
          <p className="text-lg md:text-xl text-foreground font-mono leading-relaxed tracking-wide">
            TO COLONIZE THE RED PLANET
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onBeginJourney}
            size="lg"
            className="text-xl px-12 py-6 font-mono"
            data-testid="button-begin-journey"
          >
            &gt; BEGIN JOURNEY &lt;
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-foreground/70 font-mono tracking-wider">
          [ CREATED BY BLAKE STAMPLEY ]
        </p>
        <p className="text-xs text-foreground/50 font-mono mt-2">
          (C) 2025 - SPACE EXPLORATION DIVISION
        </p>
      </div>
    </div>
  );
}
