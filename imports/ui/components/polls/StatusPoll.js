import React from 'react';
import { Label } from 'react-bootstrap';
import PollStatus from '../../../api/commons/pollStatus.js';
import Enums from '../../../api/commons/enums.js';

const StatusPoll = ({ poll }) => {
  let style = 'default';
  const status = Enums.getByValue(PollStatus, poll.status);
  if (status.value === PollStatus.started.value) {
    style = 'success';
  } else if (status.value === PollStatus.canceled.value) {
    style = 'danger';
  } else if (status.value === PollStatus.finished.value) {
    style = 'default';
  }
  return (
    <Label bsStyle={ style } style={ { marginLeft: 10, fontSize: '95%', fontWeight: 400 } }>
      { status.label }
    </Label>
  );
};

StatusPoll.propTypes = {
  poll: React.PropTypes.object,
};

export default StatusPoll;
