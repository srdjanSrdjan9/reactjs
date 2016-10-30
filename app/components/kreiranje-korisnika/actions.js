import t from 'tcomb';
import { tView } from './model';

export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE';
export const CONFIRM = 'CONFIRM';
export const CANCEL = 'CANCEL';
export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const FAIL_SAVE = 'FAIL_SAVE';
export const UGASI_NOT = 'UGASI_NOT';

export const ActionTypes = {
  [CHANGE_FORM_VALUE]: t.struct({ value: tView }, CHANGE_FORM_VALUE),
  [CONFIRM]: t.struct({}, CONFIRM),
  [CANCEL]: t.struct({}, CANCEL),
  [RECEIVE_SAVE]: t.struct({}, RECEIVE_SAVE),
  [FAIL_SAVE]: t.struct({ error: t.Any }, FAIL_SAVE),
  [UGASI_NOT]: t.struct({}, UGASI_NOT)
};
