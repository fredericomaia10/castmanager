import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Companies from '../../../api/companies/companies.js';
import TypesOfService from '../../../api/typesOfService/typesOfService.js';
import Files from '../../../api/files/files.js';
import EditCompany from '../../pages/companies/EditCompany.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('companies.viewByOwner', params.ownerId);

  if (subscription.ready()) {
    const company = Companies.findOne({ ownerId: params.ownerId });
    const typesOfService = TypesOfService.findOrderBy('name').fetch();
    const owner = Meteor.users.findOne(params.ownerId);
    const logoFile = Files.find({}, { sort: { added: -1 } }).fetch()[0];
    onData(null, { company, typesOfService, owner, logoFile });
  }
};

export default composeWithTracker(composer, Loading)(EditCompany);
