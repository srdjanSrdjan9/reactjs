// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';
// import t from 'tcomb';

import service, { fetchKupci, fetchRoba } from './service';
// import { tState } from './model';
import {
  // ActionTypes,
  CHANGE_FORM_VALUE,
  CANCEL,
  CONFIRM,
  FAIL_SAVE,
  RECEIVE_SAVE,
  UGASI_NOT,
  FAIL_ROBA,
  FAIL_KUPCI,
  RECEIVE_ROBA,
  RECEIVE_KUPCI
} from './actions';

const initialState = {
  formState: null,
  status: 'active',
  notification: false
};

export function* init() {
  yield sideEffect((dispatch) => fetchRoba()
  .then((response) => dispatch({ type: RECEIVE_ROBA, response }))
  .catch((error) => dispatch({ type: FAIL_ROBA, error })));

  yield sideEffect((dispatch) => fetchKupci()
  .then((response) => dispatch({ type: RECEIVE_KUPCI, response }))
  .catch((error) => dispatch({ type: FAIL_KUPCI, error })));

  return {
    ...initialState,
    status: 'fetching'
  };
}

function * reducer(state, action) {
  switch (action.type) {
    case UGASI_NOT:
      return {
        ...state,
        notification: false,
        formState: state.status === 'fail' ? state.formState : null
      };
    case RECEIVE_KUPCI: {
      return {
        ...state,
        Kupci: action.response
      };
    }
    case RECEIVE_ROBA: {
      return {
        ...state,
        Roba: action.response
      };
    }
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
    case FAIL_ROBA: {
      return {
        ...state,
        status: 'fail',
        error: action.error,
        notification: true
      };
    }
    case FAIL_KUPCI: {
      return {
        ...state,
        status: 'fail',
        error: action.error,
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
    default: {
      return state;
    }
  }
}

// export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
export default reducer;
