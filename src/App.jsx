import { useState, useEffect } from 'react';
import './App.css';
import Card from './assets/components/Card';
import WinnerModal from './assets/components/WinnerModal';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [picked, setPicked] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=380');
        const data = await response.json();

        const detailedPokemonPromises = data.results.map(async (item) => {
          const response = await fetch(item.url);
          return response.json();
        });

        const detailedPokemon = await Promise.all(detailedPokemonPromises);
        setPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function capitalize(word){
    return(word.charAt(0).toUpperCase() + word.slice(1))
  }

  function handleClick(name){
    if(picked.some(item => item.name === name)){
      gameLost()
    }
    else{
      continueGame(name)
      if(score === 9){ //Set it at 9 because when setting state to 10 would not trigger this if statement at that instance
        gameWin()
      }
    }
    setPokemon(shuffle(pokemon));
  }

  function gameWin(){
    setIsModalOpen(true)
  }
  function gameLost(){
      setPicked([])
      handleBestScore()
      setScore(0)
  }
  function continueGame(name){
    setPicked([...picked, {name: name}])
    const scoreCopy = score
    setScore(scoreCopy + 1)
  }
  function restartGame(){
    gameLost()
    setBestScore(0);
    setIsModalOpen(false)
  }
  
  function handleBestScore(){
    const scoreCopy = score
      if(scoreCopy >= bestScore){ //Only sets best score when you have finished
        setBestScore(scoreCopy)
      }
  }

  function shuffle(array) { //FISHER YATES SHUFFLE
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }


  return (
    <div>
      <h1>Pokémon Memory Game</h1>
      <div className='score-container'>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div className='card-container'>
        {pokemon.map((poke) => (
          <Card
            key={poke.id}
            name={capitalize(poke.name)}
            src={poke.sprites.front_default}
            onClick ={handleClick}
            picked = {picked}
          />
        ))}
      </div>
      {isModalOpen && <WinnerModal restart={restartGame}/>}
    </div>
  );
}

export default App;
