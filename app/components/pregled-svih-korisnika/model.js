import t from 'tcomb';

export const CHILD_KREIRANJE_KORISNIKA = 'KREIRANJE_KORISNIKA';
export const CHILD_BRISANJE_KORISNIKA = 'BRISANJE_KORISNIKA';
export const CHILD_AZURIRANJE_KORISNIKA = 'AZURIRANJE_KORISNIKA';

export const tKorisnik = t.struct({
  KorisnikID: t.Number,
  Ime: t.String,
  Prezime: t.String,
  JMBG: t.String,
  Adresa: t.String
});

export const tState = t.struct({
  data: t.Any,
  dataGridState: t.Any,
  selectedKorisnik: t.maybe(tKorisnik),
  activeChild: t.maybe(t.String),
  childState: t.maybe(t.Any),
  status: t.String,
  error: t.maybe(t.Any),
  sortInfo: t.maybe(t.Any)
});
