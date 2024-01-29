function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}

export default function(input, init) {
  return fetch(input, init).then(responseArrayBuffer);
}
