interface SpaceSceneProps {
  distance: number;
  totalDistance: number;
  animating: boolean;
}

export default function SpaceScene({ distance, totalDistance, animating }: SpaceSceneProps) {
  const progressPercent = (distance / totalDistance) * 100;
  
  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden border" 
      style={{ height: '280px' }}
      data-testid="container-space-scene"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>
      
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-500 to-blue-600"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-300 via-green-400 to-blue-500 opacity-80"></div>
          <div className="absolute top-4 left-6 w-12 h-6 bg-white opacity-40 rounded-full blur-sm"></div>
          <div className="absolute bottom-6 right-4 w-10 h-4 bg-white opacity-30 rounded-full blur-sm"></div>
        </div>
        <p className="text-sm text-center mt-1 text-blue-400 font-bold">Earth</p>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 via-orange-600 to-red-700"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-red-600 opacity-80"></div>
          <div className="absolute top-8 left-10 w-6 h-6 bg-red-800 opacity-50 rounded-full"></div>
          <div className="absolute bottom-10 right-8 w-4 h-4 bg-red-900 opacity-40 rounded-full"></div>
          <div className="absolute top-16 left-4 w-8 h-4 bg-orange-800 opacity-30 rounded-full"></div>
        </div>
        <p className="text-sm text-center mt-1 text-red-400 font-bold">Mars</p>
      </div>
      
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ${animating ? 'scale-110' : 'scale-100'}`}
        style={{ left: `calc(7% + ${progressPercent * 0.86}%)` }}
      >
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full">
            <div className="w-8 h-3 bg-gradient-to-l from-cyan-400 to-transparent rounded-r-full opacity-90 animate-pulse"></div>
          </div>
          
          <svg width="80" height="64" viewBox="0 0 80 64">
            {/* Habitat ring - back half (behind ship) */}
            <ellipse cx="40" cy="32" rx="8" ry="28" fill="none" stroke="#4B5563" strokeWidth="3" opacity="0.4" />
            <ellipse cx="40" cy="32" rx="10" ry="30" fill="none" stroke="#6B7280" strokeWidth="2.5" opacity="0.3" />
            
            {/* Ship body */}
            <rect x="16" y="30" width="4" height="4" fill="#374151" />
            <rect x="20" y="28" width="40" height="8" fill="#D1D5DB" />
            <circle cx="60" cy="32" r="4" fill="#9CA3AF" />
            <polygon points="32,28 40,24 44,28" fill="#6B7280" />
            <polygon points="32,36 40,40 44,36" fill="#6B7280" />
            <polygon points="24,28 28,22 32,28" fill="#4B5563" />
            <polygon points="24,36 28,42 32,36" fill="#4B5563" />
            <rect x="36" y="22" width="12" height="2" fill="#1E40AF" opacity="0.8" />
            <rect x="37" y="22.5" width="10" height="1" fill="#3B82F6" opacity="0.6" />
            <rect x="36" y="40" width="12" height="2" fill="#1E40AF" opacity="0.8" />
            <rect x="37" y="40.5" width="10" height="1" fill="#3B82F6" opacity="0.6" />
            <circle cx="48" cy="32" r="2" fill="#60A5FA" opacity="0.7" />
            
            {/* Habitat ring - front half (in front of ship) */}
            <ellipse cx="40" cy="32" rx="8" ry="28" fill="none" stroke="#9CA3AF" strokeWidth="3.5" opacity="0.7" />
            <ellipse cx="40" cy="32" rx="10" ry="30" fill="none" stroke="#D1D5DB" strokeWidth="3" opacity="0.5" />
            
            {/* Ring segments for detail */}
            <line x1="40" y1="2" x2="40" y2="8" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6" />
            <line x1="40" y1="56" x2="40" y2="62" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6" />
            <line x1="32" y1="6" x2="34" y2="10" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
            <line x1="48" y1="6" x2="46" y2="10" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
            <line x1="32" y1="58" x2="34" y2="54" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
            <line x1="48" y1="58" x2="46" y2="54" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-primary transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
          data-testid="progress-bar"
        />
      </div>
    </div>
  );
}
