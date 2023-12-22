function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}

export default function(input, init) {
  return fetch(input, init).then(responseBlob);
}
