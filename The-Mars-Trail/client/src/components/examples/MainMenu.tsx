import MainMenu from '../MainMenu';

export default function MainMenuExample() {
  return (
    <MainMenu onBeginJourney={() => console.log('Begin journey clicked')} />
  );
}
