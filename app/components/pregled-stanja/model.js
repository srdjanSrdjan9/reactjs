import t from 'tcomb';

export const tStatistika = t.struct({
  naRaspolaganju: t.Number,
  potrazivanje: t.Number
});

export const tRoba = t.struct({
  robaID: t.Number,
  naziv: t.String
});

export const tState = t.struct({
  roba: t.list(tRoba),
  status: t.String,
  formState: t.Any,
  error: t.Any,
  notification: t.Any
});
