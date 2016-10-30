import t from 'tcomb';

const tJmbg = t.refinement(t.String, (x) => x.length <= 13);
tJmbg.getValidationErrorMessage = (value, path, context) => 'JMBG mora imati 13 brojeva'; // eslint-disable-line no-unused-vars

export const tView = t.struct({
  Ime: t.String,
  Prezime: t.String,
  Adresa: t.String,
  Jmbg: tJmbg
});

export const tState = t.struct({
  formState: tView,
  status: t.String,
  notifications: t.Any
});
