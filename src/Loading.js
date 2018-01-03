import React from 'react';
import { Progress } from 'reactstrap';

export default () => (
  <div className="row">
    <div className="col-6 offset-3">
      <Progress animated color="secondary" value="100" />
    </div>
  </div>
);