/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertPoll } from '../api/polls/methods.js';
import { stringToDate } from '../modules/utils.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { poll } = component.props;
  const confirmation = poll && poll._id ? 'Votação atualizada!' : 'Votação adicionada!';
  const proposalOptions = document.querySelector('[name="proposals"]').options;
  const pollUpsert = {
    startDate: stringToDate(document.querySelector('[name="startDate"]').value.trim()),
    finishDate: stringToDate(document.querySelector('[name="finishDate"]').value.trim()),
    proposals: Array.prototype.filter.apply(proposalOptions, [p => p.selected])
      .map(p => p.value),
  };

  if (poll && poll._id) pollUpsert._id = poll._id;

  upsertPoll.call(pollUpsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.proposalEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/polls');
    }
  });
};

const validate = () => {
  $(component.proposalEditorForm).validate({
    rules: {
      startDate: {
        required: true,
      },
      finishDate: {
        required: true,
      },
      proposals: {
        required: true,
      },
    },
    messages: {
      startDate: {
        required: 'Informe a data de início.',
      },
      finishDate: {
        required: 'Informe a data de fim.',
      },
      proposals: {
        required: 'Informe os temas.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function pollEditor(options) {
  component = options.component;
  validate();
}
