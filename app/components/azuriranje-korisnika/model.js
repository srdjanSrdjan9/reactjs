import t from 'tcomb';

const tJmbg = t.refinement(t.String, (x) => x.length <= 13);
tJmbg.getValidationErrorMessage = (value, path, context) => 'JMBG mora imati 13 brojeva'; // eslint-disable-line no-unused-vars

export const tView = t.struct({
  KorisnikID: t.Number,
  Ime: t.String,
  Prezime: t.String,
  Adresa: t.String,
  Jmbg: tJmbg,
  DatumRegistrovanja: t.maybe(t.Date)
});

export const tKorisnik = t.struct({
  KorisnikID: t.Number,
  Ime: t.String,
  Prezime: t.String,
  Adresa: t.String,
  Jmbg: t.String,
  DatumRegistrovanja: t.maybe(t.Date)
});

export const tState = t.struct({
  Korisnik: tKorisnik,
  ViewState: tView,
  status: t.String,
  notification: t.Any,
  error: t.Any
});
