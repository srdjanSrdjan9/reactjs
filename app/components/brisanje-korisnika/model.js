import t from 'tcomb';

export const tView = t.struct({
  KorisnikID: t.Number,
  Ime: t.String,
  Prezime: t.String,
  Adresa: t.String,
  Jmbg: t.String,
  DatumRegistrovanja: t.Date
});

export const tKorisnik = t.struct({
  KorisnikID: t.Number,
  Ime: t.String,
  Prezime: t.String,
  Adresa: t.String,
  Jmbg: t.String,
  DatumRegistrovanja: t.Date
});

export const tState = t.struct({
  Korisnik: tKorisnik,
  ViewState: tKorisnik,
  status: t.String,
  error: t.Any,
  notification: t.Boolean
});
