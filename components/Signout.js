import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

function Signout() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '2vh',
        padding: '0px',
        maxWidth: '200px',
        margin: '0 auto',
        color: 'red',
      }}
    >
      <Button type="button" variant="danger" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Signout;
