import React, { useState } from 'react';
import getJoke from '../api/jokeData';

export default function JokeGenButtons() {
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');
  const [buttonText, setButtonText] = useState('Get a Joke');

  const handleButtonClick = async () => {
    const fetchedJokeData = await getJoke();
    if (buttonText === 'Get a Joke') {
      setJokeSetup(fetchedJokeData.setup);
      setButtonText('Get Punchline');
    } else if (buttonText === 'Get Punchline') {
      setJokeDelivery(fetchedJokeData.delivery);
      setButtonText('Get Another Joke');
    } else {
      setJokeSetup('');
      setJokeDelivery('');
      setButtonText('Get a Joke');
    }
  };

  return (
    <>
      <button type="button" onClick={handleButtonClick}>{buttonText}</button>
      <div>
        <p>
          {jokeSetup && <p>Joke Setup: {jokeSetup}</p>}
          {jokeDelivery && <p>Joke Delivery: {jokeDelivery}</p>}
        </p>
      </div>
    </>
  );
}
