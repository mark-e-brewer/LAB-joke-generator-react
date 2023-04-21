/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createTerm, updateTerm } from '../api/termAPI';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  title: '',
  definition: '',
  firebaseKey: '',
};

export default function TermForm({ obj }) {
  const [termData, setTermData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setTermData(obj);
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTerm(termData)
        .then(() => router.push(`/terms/${obj.firebaseKey}`));
    } else {
      const payload = { ...termData, uid: user.uid };
      createTerm(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTerm(patchPayload).then(() => {
          router.push('/term');
        });
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTermData({ ...termData, [name]: value });
  };

  return (
    <div>
      <h3 className="mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Term</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Term Name:
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={termData.title}
        />
        <label htmlFor="definition">
          Definition:
        </label>
        <textarea
          type="text"
          name="definition"
          onChange={handleChange}
          value={termData.definition}
        />
        <button type="submit" className="term-form__button">
          {obj.firebaseKey ? 'Update' : 'Submit'} Term
        </button>
      </form>
    </div>
  );
}

TermForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    definition: PropTypes.string,
    firebaseKey: PropTypes.string,
    time: PropTypes.number,
    uid: PropTypes.string,
  }),
};

TermForm.defaultProps = {
  obj: initialState,
};
