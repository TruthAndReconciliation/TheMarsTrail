import MissionSetup from '../MissionSetup';

export default function MissionSetupExample() {
  return (
    <MissionSetup 
      onLaunch={(config) => console.log('Mission launched:', config)} 
    />
  );
}
