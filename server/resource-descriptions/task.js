const { domain } = require('../config');
const models = require('../models');

module.exports = {
  urlTemplates: {
    self: `${domain}/tasks/{id}`,
    relationship: `${domain}/tasks/{ownerId}/relationship/{path}`,
  },
  beforeSave: (resource, meta, extras, superFn) => {
    return resource;
  },
  beforeRender: async (resource, meta, extras, superFn) => {
    // console.log('[Id]', resource.id, resource.type)
    resource.attributes.children = [];
    return resource;
  },
};
