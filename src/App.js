import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const SNIPPETS = [
    'First, you have to finish',
    "Race cars are neither ugly nor beautiful",
    'They become beautiful when they win'
  ];

  const INITIAL_GAME_STATE = {
    victory: false,
    endTime: null,
    startTime: null,
  };

  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    if (gameState.victory) {
      document.title = 'Victory!';
    }
  });

  const updateUserText = event => {
    const {
      target: {value}
    } = event;

    setUserText(value);

    if (value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };

  const chooseSnippet = index => () => {
    setSnippet(SNIPPETS[index]);

    setGameState({
      ...gameState,
      startTime: new Date().getTime()
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <div>
          <h2>Type Race</h2>
          <hr/>
          <h3>Snippet</h3>
          {snippet}
          <h4>{gameState.victory ? `Completed in: ${gameState.endTime}ms` : null}</h4>
          <input value={userText} onChange={updateUserText}/>
          <hr/>
          {
            SNIPPETS.map((SNIPPET, index) => (
              <button onClick={chooseSnippet(index)} key={index}>
                {SNIPPET.substring(0, 10)}...
              </button>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
