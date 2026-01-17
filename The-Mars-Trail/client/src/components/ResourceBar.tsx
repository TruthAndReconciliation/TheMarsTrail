interface ResourceBarProps {
  label?: string;
  value: number;
  color: string;
  small?: boolean;
}

export default function ResourceBar({ label, value, color, small = false }: ResourceBarProps) {
  return (
    <div>
      {label && (
        <p className={`${small ? 'text-xs' : 'text-sm'} mb-1`}>
          {label}: {Math.round(value)}%
        </p>
      )}
      <div className={`w-full bg-card rounded-md ${small ? 'h-1' : 'h-2'}`}>
        <div
          className={`${color} ${small ? 'h-1' : 'h-2'} rounded-md transition-all duration-300`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
