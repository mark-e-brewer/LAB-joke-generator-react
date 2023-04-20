/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createTerm, updateTerm } from '../api/termAPI';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  title: '',
  definition: '',
  time: 0,
};

export default function TermForm({ obj }) {
  const [termData, setTermData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefualt();
    if (obj.firebaseKey) {
      updateTerm(termData)
        .then(() => router.push(`/term/${obj.firebaseKey}`));
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
          Submit
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
  }).isRequired,
};

TermForm.defualtProps = {
  obj: initialState,
};
