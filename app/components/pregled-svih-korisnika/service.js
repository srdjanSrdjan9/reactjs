export default function getData() {
  return fetch('http://localhost:55539/api/Korisnici/dajSve', {
    method: 'GET'
  }).then(response => {
    if (response.status >= 400) {
      const error = new Error('Doslo je do greske na serveru!');
      throw error;
    } else {
      return response;
    }
  }).then(respone => respone.json());
}
