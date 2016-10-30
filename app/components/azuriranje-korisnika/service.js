function preparePayload(state) {
  const { Korisnik, ViewState } = state;
  return {
    KorisnikID: Korisnik.KorisnikID,
    Ime: ViewState.Ime,
    Prezime: ViewState.Prezime,
    Adresa: ViewState.Adresa,
    Jmbg: ViewState.Jmbg,
    DatumRegistrovanja: ViewState.DatumRegistrovanja
  };
}

export default function save(state) {
  // TODO: izmeni URL
  return fetch('http://localhost:55539/api/Korisnici/azuriranje', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(preparePayload(state))
  }).then(response => {
    if (response.status >= 400) {
      const error = new Error('Doslo je do greske na serveru!');
      throw error;
    } else {
      return response;
    }
  });
}
