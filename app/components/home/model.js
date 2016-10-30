import t from 'tcomb';

export const KORISNICI = 1;
export const DOKUMENTI = 2;
export const PROIZVODI = 3;

export const tState = t.struct({
  selectedTab: t.Number,
  korisniciState: t.Any,
  proizvodiState: t.Any,
  dokumentiState: t.Any,
  selectedTabState: t.Any
});
