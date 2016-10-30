import t from 'tcomb';
import { tView, tRoba, tKupac } from './model';

export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE';
export const CONFIRM = 'CONFIRM';
export const CANCEL = 'CANCEL';
export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const FAIL_SAVE = 'FAIL_SAVE';
export const RECEIVE_ROBA = 'RECEIVE_ROBA';
export const RECEIVE_KUPCI = 'RECEIVE_KUPCI';
export const FAIL_KUPCI = 'FAIL_KUPCI';
export const FAIL_ROBA = 'FAIL_ROBA';
export const UGASI_NOT = 'UGASI_NOT';

export const ActionTypes = {
  [CHANGE_FORM_VALUE]: t.struct({ value: tView }, CHANGE_FORM_VALUE),
  [CONFIRM]: t.struct({}, CONFIRM),
  [CANCEL]: t.struct({}, CANCEL),
  [RECEIVE_SAVE]: t.struct({}, RECEIVE_SAVE),
  [UGASI_NOT]: t.struct({}, UGASI_NOT),
  [FAIL_SAVE]: t.struct({ error: t.Any }, FAIL_SAVE),
  [RECEIVE_KUPCI]: t.struct({ response: tKupac }, RECEIVE_KUPCI),
  [RECEIVE_ROBA]: t.struct({ response: tRoba }, RECEIVE_ROBA),
  [FAIL_KUPCI]: t.struct({ error: t.Any }, FAIL_KUPCI),
  [FAIL_ROBA]: t.struct({ error: t.Any }, FAIL_ROBA)
};
