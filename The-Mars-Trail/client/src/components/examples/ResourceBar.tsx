import ResourceBar from '../ResourceBar';

export default function ResourceBarExample() {
  return (
    <div className="p-8 bg-background space-y-4">
      <ResourceBar label="Hull Integrity" value={85} color="bg-blue-500" />
      <ResourceBar label="Oxygen" value={62} color="bg-green-500" />
      <ResourceBar label="Water" value={45} color="bg-cyan-500" />
      <ResourceBar label="Fuel" value={28} color="bg-yellow-500" />
      <ResourceBar label="Food" value={91} color="bg-orange-500" />
      <ResourceBar value={73} color="bg-red-500" small />
    </div>
  );
}
