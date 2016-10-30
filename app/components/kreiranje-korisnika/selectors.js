export const getState = state => state;

export const isFinished = state => {
  return state && (state.status === 'success' || state.status === 'fail' || state.status === 'finished');
};

export const getMessage = state => {
  switch (state && state.status) {
    case 'success': return 'Uspesno kreiran!';
    case 'fail': return 'Nije uspesno kreiran!';
    default: return 'Prekinut!';
  }
};
