import t from 'tcomb';

export const CHANGE_TAB_SELECTION = 'CHANGE_TAB_SELECTION';
export const CHILDACTION = 'CHILDACTION';

export const ActionTypes = {
  [CHANGE_TAB_SELECTION]: t.struct({ id: t.Number }, CHANGE_TAB_SELECTION),
  [CHILDACTION]: t.struct({ action: t.Any }, CHILDACTION)
};
