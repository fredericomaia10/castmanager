import React from 'react';
import { FormControl } from 'react-bootstrap';

const TypesOfServiceItems = ({ typesOfService, idSelected }) => (
<FormControl className="TypesOfServiceItems" componentClass="select" name="serviceType"
  defaultValue={ idSelected }>
  <option value="">Qual tipo de serviço você oferece?</option>
  {typesOfService.map(({ _id, name }) => (
    <option key={ _id } value={_id} >{name}</option>
  ))}
</FormControl>
);

TypesOfServiceItems.propTypes = {
  typesOfService: React.PropTypes.array,
  idSelected: React.PropTypes.string,
};

export default TypesOfServiceItems;
