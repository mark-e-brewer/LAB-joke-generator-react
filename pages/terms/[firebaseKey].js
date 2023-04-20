import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTerm } from '../../api/termAPI';
import DateOfCard from '../../components/DateAdded';

export default function ViewTerm() {
  const [termView, setTermView] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTerm(firebaseKey).then(setTermView);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap flex-column">
      <h3>{termView.title}</h3>
      <div>
        <h5>Term</h5>
      </div>
      <p>{termView.definition}</p>
      <DateOfCard cardKey={firebaseKey} />
    </div>
  );
}
