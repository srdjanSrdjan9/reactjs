import { mapEffects } from '../common/redux-extensions';

import {
  START_MODULE_TEST,
  CHANGE_MODULE_FORM,
  TEST_MODULE_CHILD_ACTION,
  DISPATCH_MODULE_ACTION,
  CHANGE_ACTION_FORM
  } from './actions';

import { extractedModules, hasInit } from './util';

const initialState = {
  moduleForm: null,
  activeModule: null,
  moduleState: null,
  actionForm: null
};

export function init() {
  return initialState;
}

function insertContextInInitArgs(initArgs, context) {
  if (initArgs.length === 0) initArgs.push({ context });

  else if (initArgs.length === 1 && typeof initArgs[0] === 'object') initArgs[0].context = context;

  else initArgs.push(context);
}

export default function *(state = initialState, action = {}, context) {
  switch (action.type) {
    case CHANGE_MODULE_FORM:
      return {
        ...state,
        moduleForm: action.value
      };
    case CHANGE_ACTION_FORM:
      return {
        ...state,
        actionForm: action.value
      };
    case START_MODULE_TEST: {
      const selectedModule = action.moduleConfiguration.module;
      const module = extractedModules[selectedModule];
      const initArgs = action.moduleConfiguration.initArgs.map(arg => eval(arg)); // eslint-disable-line no-eval
      insertContextInInitArgs(initArgs, context);
      let moduleState = null;
      if (hasInit(selectedModule)) {
        moduleState = yield* mapEffects(module.init(...initArgs), TEST_MODULE_CHILD_ACTION);
      } else {
        moduleState = yield* mapEffects(module.reducer(undefined, action, context), TEST_MODULE_CHILD_ACTION);
      }
      return {
        ...state,
        activeModule: selectedModule,
        moduleState
      };
    }
    case TEST_MODULE_CHILD_ACTION: {
      const module = extractedModules[state.activeModule];
      return {
        ...state,
        moduleState: yield* mapEffects(module.reducer(state.moduleState, action.action, context), TEST_MODULE_CHILD_ACTION)
      };
    }
    case DISPATCH_MODULE_ACTION: {
      const module = extractedModules[state.activeModule];
      const moduleAction = action.action.params.reduce((acc, val) => {
        acc[val.name] = eval(val.value); // eslint-disable-line no-eval
        return acc;
      }, { type: action.action.type });
      return {
        ...state,
        moduleState: yield* mapEffects(module.reducer(state.moduleState, moduleAction, context), TEST_MODULE_CHILD_ACTION)
      };
    }
    default:
      return state;
  }
}
