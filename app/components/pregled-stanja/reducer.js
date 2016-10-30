// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';
// import t from 'tcomb';

import service, { fetchRoba } from './service';
// import { tState } from './model';
import {
  // ActionTypes,
  RECEIVE_STATISTIKA,
  SEND_REQUEST,
  CHANGE_FORM_VALUE,
  FAIL_STATISTIKA,
  RECEIVE_ROBA,
  FAIL_ROBA,
  UGASI_NOT
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

  return {
    ...initialState,
    status: 'fetching'
  };
}

function * reducer(state, action) {
  switch (action.type) {
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
    case SEND_REQUEST: {
      yield sideEffect((dispatch) => service(state)
      .then(response => dispatch({ type: RECEIVE_STATISTIKA, response }))
      .catch(error => dispatch({ type: FAIL_STATISTIKA, error })));

      return {
        ...state,
        status: 'saving',
        notification: true
      };
    }
    case RECEIVE_STATISTIKA: {
      return {
        ...state,
        formState: {
          ...state.formState,
          potrazivanje: action.response.potrazivanje,
          naRaspolaganju: action.response.naRaspolaganju
        },
        status: 'success',
        notification: true
      };
    }
    case FAIL_STATISTIKA: {
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
    case UGASI_NOT:
      return {
        ...state,
        notification: false
      };
    default: {
      return state;
    }
  }
}

// export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
export default reducer;
