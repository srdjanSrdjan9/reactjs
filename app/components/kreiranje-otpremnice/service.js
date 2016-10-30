function preparePayload(state) {
  const stavke = [...state.formState.Stavke];
  const normalizedStavke = [];
  stavke.forEach(x => {
    const newStavka = {
      ...x,
      RedniBrojStavke: stavke.indexOf(x) + 1,
      UkupnaCena: x.Kolicina * x.JedCena,
      JedMere: x.JedMere === 1 ? 'kg' : 'kom'
    };
    normalizedStavke.push(newStavka);
  });

  return {
    ...state.formState,
    Stavke: normalizedStavke
  };
}

export function fetchKupci() {
  return fetch('http://localhost:55539/api/Otpremnice/dajKupce')
  .then(response => {
    if (response.status >= 400) {
      const error = new Error('Doslo je do greske na serveru!');
      throw error;
    } else {
      return response;
    }
  }).then(respone => respone.json());
}

export function fetchRoba() {
  return fetch('http://localhost:55539/api/Otpremnice/dajRobu')
  .then(response => {
    if (response.status >= 400) {
      const error = new Error('Doslo je do greske na serveru!');
      throw error;
    } else {
      return response;
    }
  }).then(respone => respone.json());
}

export default function save(state) {
  return fetch('http://localhost:55539/api/Otpremnice/kreiranje', {
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
