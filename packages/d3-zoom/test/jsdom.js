import {JSDOM} from "jsdom";

export default function jsdomit(description, run) {
  it(description, async () => {
    try {
      const window = new JSDOM("").window;
      global.document = window.document;
      global.navigator = window.navigator;
      global.Node = window.Node;
      global.NodeList = window.NodeList;
      global.HTMLCollection = window.HTMLCollection;
      global.SVGElement = window.SVGElement;
      return await run();
    } finally {
      delete global.document;
      delete global.navigator;
      delete global.Node;
      delete global.NodeList;
      delete global.HTMLCollection;
      delete global.SVGElement;
    }
  });
}
