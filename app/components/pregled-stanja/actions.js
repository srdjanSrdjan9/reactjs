import t from 'tcomb';
import { tStatistika, tRoba } from './model';

export const RECEIVE_STATISTIKA = 'RECEIVE_STATISTIKA';
export const SEND_REQUEST = 'SEND_REQUEST';
export const FAIL_STATISTIKA = 'FAIL_STATISTIKA';
export const RECEIVE_ROBA = 'RECEIVE_ROBA';
export const FAIL_ROBA = 'FAIL_ROBA';
export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE';
export const UGASI_NOT = 'UGASI_NOT';

export const ActionTypes = {
  [CHANGE_FORM_VALUE]: t.struct({ value: t.Any }, CHANGE_FORM_VALUE),
  [RECEIVE_STATISTIKA]: t.struct({ response: tStatistika }, RECEIVE_STATISTIKA),
  [FAIL_STATISTIKA]: t.struct({ error: t.Any }, FAIL_STATISTIKA),
  [RECEIVE_ROBA]: t.struct({ response: t.list(tRoba) }, RECEIVE_ROBA),
  [FAIL_ROBA]: t.struct({ error: t.Any }, FAIL_ROBA),
  [UGASI_NOT]: t.struct({}, UGASI_NOT),
  [SEND_REQUEST]: t.struct({}, SEND_REQUEST)
};
