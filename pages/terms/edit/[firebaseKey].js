import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTerm } from '../../../api/termAPI';
import TermForm from '../../../components/ReadForm';

export default function EditTerm() {
  const [editTerm, setEditTerm] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTerm(firebaseKey).then(setEditTerm);
  }, [firebaseKey]);

  return (
    <TermForm obj={editTerm} />
  );
}
