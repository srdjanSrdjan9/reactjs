export const getState = state => state;

export const isChildFinished = state => {
  return state.status === 'success' || state.status === 'fail' || state.status === 'finished';
};
