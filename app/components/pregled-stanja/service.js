function prepareRequestPayload(state) {
  const { Roba, formState } = state;
  let asd;
  Roba.forEach(x => {
    if (x.RobaID === Number(formState.RobaID)) {
      asd = x;
    }
  });
  return asd;
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
  return fetch('http://localhost:55539/api/Otpremnice/pretraga', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prepareRequestPayload(state))
  }).then(response => {
    if (response.status >= 400) {
      const error = new Error('Doslo je do greske na serveru!');
      throw error;
    } else {
      return response;
    }
  }).then(response => response.json());
}
