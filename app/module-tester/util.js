import * as modules from './modules';

export const extractedModules = { ...modules };
delete extractedModules.__esModule;

export function hasInit(module) {
  return extractedModules[module] && typeof extractedModules[module].init === 'function';
}
