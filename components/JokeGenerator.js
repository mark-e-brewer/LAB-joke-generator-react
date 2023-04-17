import React, { useState } from 'react';
import getJoke from '../api/jokeData';

export default function JokeGenButtons() {
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokePunchline, setJokePunchline] = useState('');
  const [buttonText, setButtonText] = useState('Get a Joke');

  const handleButtonClick = async () => {
    const jokeDataObj = await getJoke();
    if (buttonText === 'Get a Joke') {
      setButtonText('Get Punchline');
      setJokeSetup(jokeDataObj.setup);
    } else if (buttonText === 'Get Punchline') {
      setButtonText('Get Another Joke');
      setJokePunchline(jokeDataObj.delivery);
    } else {
      setJokeSetup('');
      setJokePunchline('');
      setButtonText('Get a Joke');
    }
  };

  return (
    <>
      <button type="button" onClick={handleButtonClick}>{buttonText}</button>
      <div>
        {jokeSetup ? (<p>Joke Setup: {jokeSetup}</p>) : ('')}
        {jokePunchline ? (<p>Joke Delivery: {jokePunchline}</p>) : ('')}
      </div>
    </>
  );
}
