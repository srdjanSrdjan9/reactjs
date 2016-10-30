// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';
import service from './service';
// import { tState } from './model';

import {
  // ActionTypes,
  CHANGE_FORM_VALUE,
  CANCEL,
  CONFIRM,
  UGASI_NOT,
  FAIL_SAVE,
  RECEIVE_SAVE
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
    notification: false,
    error: null
  };
}

function* reducer(state, action) {
  switch (action.type) {
    case CHANGE_FORM_VALUE: {
      const value = action.value;
      return {
        ...state,
        ViewState: value
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
      // TODO: prikazivanje gresaka
      return {
        ...state,
        status: 'fail',
        notification: true,
        error: action.error
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
