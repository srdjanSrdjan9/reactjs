function preparePayload(state) {
  return state.Korisnik;
}

export default function save(state) {
  // TODO: izmeni URL
  return fetch('http://localhost:55539/api/Korisnici/brisanje', {
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
