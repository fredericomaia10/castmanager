import moment from 'moment';

export const stringToInt = (strValue) => {
  if (!strValue) return null;
  return parseInt(strValue.trim(), 10);
};

export const formatDate = (date) => {
  if (!date) return null;
  return moment(date).format('DD/MM/YYYY');
};

export const formatDateTime = (date) => {
  if (!date) return null;
  return moment(date).format('DD/MM/YYYY - HH:mm');
};

export const formatMomentDate = (momentDate) => {
  if (!momentDate) return null;
  return momentDate.format('DD/MM/YYYY');
};

export const stringToDate = (strValue) => {
  if (!strValue) return null;
  return moment(strValue.trim(), 'DD/MM/YYYY').toDate();
};
