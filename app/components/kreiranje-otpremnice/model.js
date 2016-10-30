import t from 'tcomb';

export const tKupac = t.struct({
  KupacID: t.Number,
  Naziv: t.String,
  Adresa: t.String,
  Pib: t.String,
  MaticniBroj: t.String,
  DatumRegistrovanja: t.Date
});

export const tRoba = t.struct({
  RobaID: t.enums({
    1: 'Malina',
    2: 'Kupina',
    3: 'Borovnica'
  }),
  Naziv: t.String
});

export const tStavka = t.struct({
  RedniBrojStavke: t.Number,
  JedCena: t.Number,
  Kolicina: t.Number,
  UkupnaCena: t.Number,
  JedMere: t.enums({
    1: 'kg'
  }),
  RobaID: t.Any
});

export const tOtpremnica = t.struct({
  DatumIzdavanja: t.Date,
  Mesto: t.String,
  RobuPrimio: t.String,
  KupacID: t.enums({
    1: 'Matis d.o.o.',
    2: 'Hladnjaca1'
  }),
  Stavke: t.list(tStavka)
});

export const tView = t.struct({
  DatumIzdavanja: t.Date,
  Mesto: t.String,
  RobuPrimio: t.String,
  KupacID: t.enums({
    1: 'Matis d.o.o.',
    2: 'Hladnjaca1'
  }),
  Stavke: t.list(tStavka)
});

export const tState = t.struct({
  Kupci: t.maybe(t.list(tKupac)),
  Roba: t.maybe(t.list(tRoba)),
  formState: tView,
  status: t.String,
  error: t.Any,
  notification: t.Any
});
