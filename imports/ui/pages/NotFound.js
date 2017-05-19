import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p> A página { window.location.pathname } não existe.</p>
      <p>
        <Link to="/">
          <Button
            bsStyle="success">
            Ir para home</Button>
        </Link>
      </p>
    </Alert>
  </div>
);

export default NotFound;
