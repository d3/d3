import {JSDOM} from "jsdom";

export default function jsdomit(description, run) {
  it(description, async () => {
    try {
      const window = new JSDOM("").window;
      global.document = window.document;
      global.Node = window.Node;
      global.NodeList = window.NodeList;
      global.HTMLCollection = window.HTMLCollection;
      return await run();
    } finally {
      delete global.document;
      delete global.Node;
      delete global.NodeList;
      delete global.HTMLCollection;
    }
  });
}
