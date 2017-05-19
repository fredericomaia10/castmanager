import { _ } from 'lodash';

const Enums = {
  getOptions(enumDef) {
    const values = [];
    _.each(enumDef, g => {
      values.push(g);
    });
    return values;
  },
  getValues(enumDef) {
    const values = [];
    _.each(enumDef, g => {
      values.push(g.value);
    });
    return values;
  },
  getByValue(enumDef, value) {
    let gs = null;
    _.each(enumDef, g => {
      if (g.value === value) {
        gs = g;
      }
    });
    return gs;
  },
  getLabelByValue(enumDef, value) {
    if (!value) {
      return null;
    }
    const item = this.getByValue(enumDef, value);
    return item ? item.label : null;
  },
  validByValue(enumDef, value) {
    _.each(enumDef, g => {
      if (g.value === value) {
        return true;
      }
    });
    return false;
  },
};

export default Enums;
