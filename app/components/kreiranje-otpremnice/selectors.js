export const getState = state => state;

export const isFinished = state => state.status === 'finished' ||
  state.status === 'canceled' || state.status === 'fail';
export const hasError = state => state.error;

export const getMessage = state => {
  switch (state.status) {
    case 'success': return 'Uspesno kreirana!';
    case 'fail': return 'Nije uspesno kreiran! ' + state.error;
    default: return 'Prekinut!';
  }
};

export function robaEnum(state) {
  const enumObjekat = {};
  if (typeof state.Roba != 'undefined') {
    state.Roba.forEach(r => {
      enumObjekat[r.RobaID] = r.Naziv;
    });
  }
  return enumObjekat;
}

export function kupciEnum(state) {
  const enumObjekat = {};
  if (typeof state.Kupci != 'undefined') {
    state.Kupci.forEach(r => {
      enumObjekat[r.KupacID] = r.Naziv;
    });
  }
  return enumObjekat;
}
