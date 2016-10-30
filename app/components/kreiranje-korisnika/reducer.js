import { createUnion } from 'redux-tcomb';
import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';

import service from './service';
import { tState } from './model';

import {
  ActionTypes,
  CHANGE_FORM_VALUE,
  CANCEL,
  CONFIRM,
  FAIL_SAVE,
  RECEIVE_SAVE,
  UGASI_NOT
} from './actions';

const initialState = {
  formState: {
    Ime: '',
    Prezime: '',
    Adresa: '',
    Jmbg: ''
  },
  status: 'active',
  notification: false
};

export function init() {
  return {
    ...initialState
  };
}

function* reducer(state, action) {
  switch (action.type) {
    case CHANGE_FORM_VALUE: {
      const value = action.value;
      return {
        ...state,
        formState: value
      };
    }
    case CONFIRM: {
      yield sideEffect((dispatch) => service(state)
      .then(response => dispatch({ type: RECEIVE_SAVE, response }))
      .catch(error => dispatch({ type: FAIL_SAVE, error })));

      return {
        ...state,
        status: 'saving'
      };
    }
    case RECEIVE_SAVE: {
      return {
        ...state,
        status: 'success',
        notification: true
      };
    }
    case FAIL_SAVE: {
      return {
        ...state,
        status: 'fail',
        notification: true
      };
    }
    case CANCEL: {
      return {
        ...state,
        status: 'finished',
        notification: true
      };
    }
    case UGASI_NOT: {
      return {
        ...state,
        notification: false
      };
    }
    default: {
      return state;
    }
  }
}

export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
