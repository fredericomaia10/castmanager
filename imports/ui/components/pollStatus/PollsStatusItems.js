import React from 'react';
import { FormControl } from 'react-bootstrap';

const PollsStatusItems = ({ pollsStatus, defaultValue, disabled }) => (
<FormControl className="ProposalsStatusItems" componentClass="select" name="status"
  defaultValue={ defaultValue } disabled={ disabled }>
  {pollsStatus.map(({ value, label }) => (
    <option key={ value } value={value} >{label}</option>
  ))}
</FormControl>
);

PollsStatusItems.propTypes = {
  pollsStatus: React.PropTypes.array,
  defaultValue: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default PollsStatusItems;
