import t from 'tcomb';

export const CONFIRM = 'CONFIRM';
export const CANCEL = 'CANCEL';
export const RECEIVE_SAVE = ' RECEIVE_SAVE';
export const FAIL_SAVE = 'FAIL_SAVE';
export const UGASI_NOT = 'UGASI_NOT';

export const ActionTypes = {
  [CANCEL]: t.struct({}, CANCEL),
  [CONFIRM]: t.struct({}, CONFIRM),
  [RECEIVE_SAVE]: t.struct({}, RECEIVE_SAVE),
  [FAIL_SAVE]: t.struct({ error: t.Any }, FAIL_SAVE),
  [UGASI_NOT]: t.struct({}, UGASI_NOT)
};
