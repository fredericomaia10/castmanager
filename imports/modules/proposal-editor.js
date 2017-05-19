/* eslint-disable no-undef */

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertProposal } from '../api/proposals/methods.js';
import { stringToInt } from '../modules/utils.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Proposta atualizada!' : 'Proposta adicionada!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    category: document.querySelector('[name="category"]').value.trim(),
    description: document.querySelector('[name="proposalDescription"]').value.trim(),
    timeInMinutes: stringToInt(document.querySelector('[name="timeInMinutes"]').value),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertProposal.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.proposalEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/proposals');
    }
  });
};

const validate = () => {
  $(component.proposalEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      category: {
        required: true,
      },
      timeInMinutes: {
        required: true,
      },
      description: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Informe o título.',
      },
      category: {
        required: 'Informe a categoria.',
      },
      timeInMinutes: {
        required: 'Informe o tempo em minutos.',
      },
      description: {
        required: 'Informe a descrição.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function proposalEditor(options) {
  component = options.component;
  validate();
}
