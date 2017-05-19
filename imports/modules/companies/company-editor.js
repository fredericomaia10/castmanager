/* eslint-disable no-undef */

import { Bert } from 'meteor/themeteorchef:bert';
import { updateProposal } from '../../api/companies/methods.js';
import '../validation.js';

let component;

const handleUpsert = () => {
  const { company } = component.props;
  const confirmation = company && company._id ? 'Empresa atualizada!' : 'Empresa adicionada!';
  const update = {
    _id: company._id,
    name: document.querySelector('[name="name"]').value.trim(),
    phone: document.querySelector('[name="phone"]').value.trim(),
    typeOfServiceId: document.querySelector('[name="serviceType"]').value,
  };

  updateProposal.call(update, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(confirmation, 'success');
    }
  });
};

const validate = () => {
  $(component.proposalEditorForm).validate({
    rules: {
      name: { required: true },
      phone: { required: true },
      serviceType: { required: true },
    },
    messages: {
      name: { required: 'Informe o nome.' },
      phone: { required: 'Informe o telefone.' },
      serviceType: { required: 'Informe o tipo de serviço' },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function companyEditor(options) {
  component = options.component;
  validate();
}
