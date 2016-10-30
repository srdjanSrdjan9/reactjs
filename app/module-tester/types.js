import t from 'tcomb';

import { extractedModules } from './util';

const moduleNames = Object.keys(extractedModules).sort();

export const ModuleFormState = t.struct({
  module: t.enums.of(moduleNames, 'Module'),
  initArgs: t.list(t.String)
}, 'ModuleFormState');

export const ActionFormState = t.struct({
  type: t.String,
  params: t.list(t.struct({
    name: t.String,
    value: t.String
  }))
});
