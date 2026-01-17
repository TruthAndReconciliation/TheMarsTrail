import GameOver from '../GameOver';

export default function GameOverExample() {
  return (
    <GameOver 
      shipName="Odyssey" 
      day={87} 
      onTryAgain={() => console.log('Try again clicked')} 
    />
  );
}
