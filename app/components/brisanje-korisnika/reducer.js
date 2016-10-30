// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';
import service from './service';
// import { tState } from './model';

import {
  // ActionTypes,
  CANCEL,
  CONFIRM,
  RECEIVE_SAVE,
  UGASI_NOT,
  FAIL_SAVE
} from './actions';

export function init(korisnik) {
  return {
    Korisnik: {
      KorisnikID: korisnik.KorisnikID,
      Ime: korisnik.Ime,
      Prezime: korisnik.Prezime,
      Jmbg: korisnik.Jmbg,
      Adresa: korisnik.Adresa,
      DatumRegistrovanja: new Date(korisnik.DatumRegistrovanja)
    },
    ViewState: {
      KorisnikID: korisnik.KorisnikID,
      Ime: korisnik.Ime,
      Prezime: korisnik.Prezime,
      Jmbg: korisnik.Jmbg,
      Adresa: korisnik.Adresa,
      DatumRegistrovanja: new Date(korisnik.DatumRegistrovanja)
    },
    status: 'active',
    error: null,
    notification: false
  };
}

function* reducer(state, action) {
  switch (action.type) {
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

// export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
export default reducer;
