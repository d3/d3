import text from "./text.js";

function parser(type) {
  return (input, init) => text(input, init)
    .then(text => (new DOMParser).parseFromString(text, type));
}

export default parser("application/xml");

export var html = parser("text/html");

export var svg = parser("image/svg+xml");
