import t from 'tcomb';
import { tKorisnik } from './model';

export const START_KREIRANJE_KORISNIKA = 'START_KREIRANJE_KORISNIKA';
export const START_AZURIRANJE_KORISNIKA = 'START_AZURIRANJE_KORISNIKA';
export const START_BRISANJE_KORISNIKA = 'START_BRISANJE_KORISNIKA';
export const REFRESH_DATASET = 'REFRESH_DATASET';
export const DATA_RECEIVED = 'DATA_RECEIVED';
export const DATA_FAILED = 'DATA_FAILED';
export const KORISNICI_CHILDACTION = 'KORISNICI_CHILDACTION';
export const CANCEL = 'CANCEL';
export const CHANGE_SELECTION = 'CHANGE_SELECTION';
export const SORT_CHANGE = 'SORT_CHANGE';

export const ActionTypes = {
  [START_BRISANJE_KORISNIKA]: t.struct({ korisnik: tKorisnik }, START_BRISANJE_KORISNIKA),
  [START_AZURIRANJE_KORISNIKA]: t.struct({ korisnik: tKorisnik }, START_AZURIRANJE_KORISNIKA),
  [START_KREIRANJE_KORISNIKA]: t.struct({}, START_KREIRANJE_KORISNIKA),
  [REFRESH_DATASET]: t.struct({}, REFRESH_DATASET),
  [DATA_FAILED]: t.struct({ error: t.Any }, DATA_FAILED),
  [DATA_RECEIVED]: t.struct({ data: t.Any }, DATA_RECEIVED),
  [KORISNICI_CHILDACTION]: t.struct({ action: t.Any }, KORISNICI_CHILDACTION),
  [CANCEL]: t.struct({}, CANCEL),
  [CHANGE_SELECTION]: t.struct({ id: t.Number }, CHANGE_SELECTION),
  [SORT_CHANGE]: t.struct({ sortInfo: t.Any }, SORT_CHANGE)
};
