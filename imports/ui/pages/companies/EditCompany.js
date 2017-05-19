import React from 'react';
import CompanyEditor from '../../components/companies/CompanyEditor.js';

const EditCompany = ({ company, typesOfService, owner, logoFile }) => (
  <div className="EditCompany">
    <CompanyEditor company={ company } typesOfService={ typesOfService } owner={ owner }
                   logoFile={ logoFile } />
  </div>
);

EditCompany.propTypes = {
  company: React.PropTypes.object,
  typesOfService: React.PropTypes.array,
  owner: React.PropTypes.object,
  logoFile: React.PropTypes.object,
};

export default EditCompany;
