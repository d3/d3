function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

export default function(input, init) {
  return fetch(input, init).then(responseText);
}
