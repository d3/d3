function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}

export default function(input, init) {
  return fetch(input, init).then(responseJson);
}
