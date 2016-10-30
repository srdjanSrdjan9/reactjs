// import { createUnion } from 'redux-tcomb';
// import getCheckedGeneratorReducer from '../../common/redux-tcomb';
// import { sideEffect } from 'redux-side-effects';
// import t from 'tcomb';
import { mapEffects } from '../../common/redux-extensions';

import {
  // ActionTypes,
  CHANGE_TAB_SELECTION,
  CHILDACTION
  } from './actions';

// import KreiranjeKorisnika from '../kreiranje-korisnika/';
import PregledKorisnika from '../pregled-svih-korisnika/';
import KreiranjeOtpremnice from '../kreiranje-otpremnice/';
import Pretraga from '../pregled-stanja/';

// import {
//   tState,
//   KORISNICI,
//   DOKUMENTI,
//   PROIZVODI
// } from './model';

const initialState = {
  selectedTab: 0,
  korisniciState: null,
  proizvodiState: null,
  dokumentiState: null,
  selectedTabState: null
};

export function * init() {
  return {
    ...initialState,
    selectedTabState: yield* mapEffects(PregledKorisnika.init(), CHILDACTION)
  };
}

function* reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_TAB_SELECTION:
      switch (action.id) {
        case 0: {
          const childState = yield* mapEffects(PregledKorisnika.init(), CHILDACTION);
          return {
            ...state,
            selectedTab: action.id,
            selectedTabState: childState
          };
        }
        case 1: {
          const childState = yield* mapEffects(KreiranjeOtpremnice.init(), CHILDACTION);
          return {
            ...state,
            selectedTab: action.id,
            selectedTabState: childState
          };
        }
        case 2: {
          const childState = yield* mapEffects(Pretraga.init(), CHILDACTION);
          return {
            ...state,
            selectedTab: action.id,
            selectedTabState: childState
          };
        }
        default:
          return {
            ...state
          };
      }
    case CHILDACTION:
      switch (state.selectedTab) {
        case 0: {
          const selectedTabState = yield* mapEffects(PregledKorisnika.reducer(state.selectedTabState, action.action), CHILDACTION);
          return {
            ...state,
            selectedTabState
          };
        }
        case 1: {
          const selectedTabState = yield* mapEffects(KreiranjeOtpremnice.reducer(state.selectedTabState, action.action), CHILDACTION);
          return {
            ...state,
            selectedTabState
          };
        }
        case 2: {
          const selectedTabState = yield* mapEffects(Pretraga.reducer(state.selectedTabState, action.action), CHILDACTION);
          return {
            ...state,
            selectedTabState
          };
        }
        default:
          return {
            ...state
          };
      }
    default:
      return {
        ...state
      };
  }
}

// export default getCheckedGeneratorReducer(reducer, tState, createUnion(ActionTypes));
export default reducer;
