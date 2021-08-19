const { domain } = require('../config');

module.exports = {
  urlTemplates: {
    self: `${domain}/tasks/{id}`,
    relationship: `${domain}/tasks/{ownerId}/relationship/{path}`,
  },
  beforeSave: (resource, meta, extras, superFn) => {
    return resource;
  },
  beforeRender: (resource, meta, extras, superFn) => {
    return resource;
  },
};
