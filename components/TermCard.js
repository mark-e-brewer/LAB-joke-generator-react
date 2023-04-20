import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deleteSingleTerm } from '../api/termAPI';

export default function TermCards({ termObj, onUpdate }) {
  const deleteThisTerm = () => {
    if (window.confirm(`Delete ${termObj.title}?`)) {
      deleteSingleTerm(termObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="card " style={{ width: '18rem', margin: '7px' }}>
        <Card.Body>
          <Card.Title>{termObj.title}</Card.Title>
          <Card.Subtitle>Term</Card.Subtitle>
          <Card.Text className="top-center">{termObj.definition}</Card.Text>
        </Card.Body>
        <div className="text-center bottom-center">
          <Link href={`/terms/${termObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2 btn">View</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisTerm} className="m-2 btn">
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
}

TermCards.propTypes = {
  termObj: PropTypes.shape({
    title: PropTypes.string,
    definition: PropTypes.string,
    time: PropTypes.number,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
