// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
import { sideEffect } from 'redux-side-effects';
import { mapEffects } from '../../common/redux-extensions';
import sorty from 'sorty';
import service from './service';
import { isChildFinished } from './selectors';
import {
  // tState,
  CHILD_AZURIRANJE_KORISNIKA,
  CHILD_BRISANJE_KORISNIKA,
  CHILD_KREIRANJE_KORISNIKA
} from './model';

import {
  // ActionTypes,
  START_KREIRANJE_KORISNIKA,
  CHANGE_SELECTION,
  REFRESH_DATASET,
  START_AZURIRANJE_KORISNIKA,
  START_BRISANJE_KORISNIKA,
  DATA_FAILED,
  DATA_RECEIVED,
  SORT_CHANGE,
  CHILDACTION,
  CANCEL
} from './actions';

import KreiranjeKorisnika from '../kreiranje-korisnika/';
import AzuriranjeKorisnika from '../azuriranje-korisnika/';
import BrisanjeKorisnika from '../brisanje-korisnika/';

function sort(sortInfo, arr) {
  return sorty(sortInfo, arr);
}

export function* init() {
  // ovo fetchuje, nece da dispatchuje dalje yield sideEffect
  yield sideEffect((dispatch) => service()
      .then((response) => dispatch({ type: DATA_RECEIVED, data: response }))
      .catch((error) => dispatch({ type: DATA_FAILED, error })));

  return {
    activeChild: null,
    childState: null,
    error: null,
    status: 'fetching',
    selectedKorisnik: null,
    data: [],
    sortInfo: null
  };
}

function * reducer(state, action) {
  switch (action.type) {
    case DATA_RECEIVED:
      return {
        ...state,
        data: action.data,
        selectedKorisnik: action.data[0],
        status: 'received'
      };
    case DATA_FAILED:
      return {
        ...state,
        status: 'failed',
        error: action.error
      };
    case REFRESH_DATASET: {
      yield sideEffect((dispatch) => service()
      .then((response) => dispatch({ type: DATA_RECEIVED, data: response }))
      .catch((error) => dispatch({ type: DATA_FAILED, error })));

      return {
        ...state,
        status: 'fetching'
      };
    }
    case SORT_CHANGE: {
      return {
        ...state,
        sortInfo: action.sortInfo,
        data: sort(action.sortInfo, state.data)
      };
    }
    case CHANGE_SELECTION: {
      const selected = state.data.find(x => x.KorisnikID === action.id);
      return {
        ...state,
        selectedKorisnik: selected
      };
    }
    case START_KREIRANJE_KORISNIKA:
      return {
        ...state,
        activeChild: CHILD_KREIRANJE_KORISNIKA,
        childState: KreiranjeKorisnika.init()
      };
    case START_AZURIRANJE_KORISNIKA:
      return {
        ...state,
        activeChild: CHILD_AZURIRANJE_KORISNIKA,
        childState: AzuriranjeKorisnika.init(state.selectedKorisnik)
      };
    case START_BRISANJE_KORISNIKA:
      return {
        ...state,
        activeChild: CHILD_BRISANJE_KORISNIKA,
        childState: BrisanjeKorisnika.init(state.selectedKorisnik)
      };
    case CHILDACTION: {
      switch (state.activeChild) {
        case CHILD_KREIRANJE_KORISNIKA: {
          if (isChildFinished(state.childState)) {
            return {
              ...state,
              childState: null
            };
          }
          return {
            ...state,
            childState: yield* mapEffects(KreiranjeKorisnika.reducer(state.childState, action.action))
          };
        }
        case CHILD_AZURIRANJE_KORISNIKA: {
          if (isChildFinished(state.childState)) {
            return {
              ...state,
              childState: null
            };
          }
          return {
            ...state,
            childState: yield* mapEffects(AzuriranjeKorisnika.reducer(state.childState, action.action))
          };
        }
        case CHILD_BRISANJE_KORISNIKA: {
          if (isChildFinished(state.childState)) {
            return {
              ...state,
              childState: null
            };
          }
          return {
            ...state,
            childState: yield* mapEffects(BrisanjeKorisnika.reducer(state.childState, action.action))
          };
        }
        default:
          return {
            ...state,
            childState: null
          };
      }
    }
    case CANCEL:
      return {
        ...state,
        activeChild: null,
        childState: null
      };
    default:
      return {
        ...state
      };
  }
}

// export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
export default reducer;
