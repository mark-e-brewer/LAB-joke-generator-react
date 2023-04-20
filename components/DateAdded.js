import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSingleTerm } from '../api/termAPI';

export default function DateOfCard({ cardKey }) {
  const [term, setTerm] = useState([]);

  useEffect(() => {
    getSingleTerm(cardKey).then(setTerm);
  }, [cardKey]);
  const dateInMils = term.time;
  const formattedDate = dateInMils
    ? new Date(dateInMils).toLocaleDateString('en-GB')
    : '';

  return (
    <>
      <p>Date Term was added: {formattedDate}</p>
    </>
  );
}

DateOfCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
};
