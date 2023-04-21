import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TermCards from '../components/TermCard';
import { getTerms } from '../api/termAPI';
import { useAuth } from '../utils/context/authContext';

export default function TermsPage() {
  const [terms, setTerms] = useState([]);
  const { user } = useAuth();
  const getAllTheTerms = () => {
    getTerms(user.uid).then(setTerms);
  };

  useEffect(() => {
    getAllTheTerms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text-center">
        <Link href="/terms/new" passHref>
          <Button>Add Term</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {terms.map((term) => (
            <TermCards key={term.firebaseKey} termObj={term} onUpdate={getAllTheTerms} />
          ))}
        </div>
      </div>
    </>
  );
}
