export const getState = state => state;

export const isFinished = state => state && (state.status === 'finished' ||
  state.status === 'canceled' || state.status === 'fail');
export const hasError = state => state && state.error;

export const getMessage = state => {
  switch (state && state.status) {
    case 'success': return 'Uspesno obrisan!';
    case 'fail': return 'Nije uspesno obrisan! ' + state.error;
    default: return 'Prekinut!';
  }
};
