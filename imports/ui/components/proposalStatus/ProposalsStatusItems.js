import React from 'react';
import { FormControl } from 'react-bootstrap';

const ProposalsStatusItems = ({ proposalsStatus, defaultValue, disabled }) => (
<FormControl className="ProposalsStatusItems" componentClass="select" name="status"
  defaultValue={ defaultValue } disabled={ disabled }>
  {proposalsStatus.map(({ value, label }) => (
    <option key={ value } value={value} >{label}</option>
  ))}
</FormControl>
);

ProposalsStatusItems.propTypes = {
  proposalsStatus: React.PropTypes.array,
  defaultValue: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default ProposalsStatusItems;
