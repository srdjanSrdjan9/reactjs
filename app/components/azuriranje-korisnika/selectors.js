export const getState = state => state;

export const isFinished = state => state && (state.status === 'finished' ||
  state.status === 'canceled' || state.status === 'fail');
export const hasError = state => state && state.error;

export const getMessage = state => {
  switch (state && state.status) {
    case 'success': return 'Uspesno azuriran!';
    case 'fail': return 'Nije uspesno azuriran! ' + state.error;
    default: return 'Prekinut!';
  }
};
