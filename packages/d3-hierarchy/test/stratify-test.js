import assert from "assert";
import {hierarchy, stratify} from "../src/index.js";

it("stratify() has the expected defaults", () => {
  const s = stratify();
  assert.strictEqual(s.id()({id: "foo"}), "foo");
  assert.strictEqual(s.parentId()({parentId: "bar"}), "bar");
});

it("stratify(data) returns the root node", () => {
  const s = stratify();
  const root = s([
    {id: "a"},
    {id: "aa", parentId: "a"},
    {id: "ab", parentId: "a"},
    {id: "aaa", parentId: "aa"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a"},
    children: [
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", parentId: "aa"}
          }
        ]
      },
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", parentId: "a"}
      }
    ]
  });
});

it("stratify(data) does not require the data to be in topological order", () => {
  const s = stratify();
  const root = s([
    {id: "aaa", parentId: "aa"},
    {id: "aa", parentId: "a"},
    {id: "ab", parentId: "a"},
    {id: "a"}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a"},
    children: [
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", parentId: "aa"}
          }
        ]
      },
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", parentId: "a"}
      }
    ]
  });
});

it("stratify(data) preserves the input order of siblings", () => {
  const s = stratify();
  const root = s([
    {id: "aaa", parentId: "aa"},
    {id: "ab", parentId: "a"},
    {id: "aa", parentId: "a"},
    {id: "a"}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a"},
    children: [
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", parentId: "a"}
      },
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", parentId: "aa"}
          }
        ]
      }
    ]
  });
});

it("stratify(data) accepts an iterable", () => {
  const s = stratify();
  const root = s(new Set([
    {id: "aaa", parentId: "aa"},
    {id: "ab", parentId: "a"},
    {id: "aa", parentId: "a"},
    {id: "a"}
  ]));
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a"},
    children: [
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", parentId: "a"}
      },
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", parentId: "aa"}
          }
        ]
      }
    ]
  });
});

it("stratify(data) treats an empty parentId as the root", () => {
  const s = stratify();
  const root = s([
    {id: "a", parentId: ""},
    {id: "aa", parentId: "a"},
    {id: "ab", parentId: "a"},
    {id: "aaa", parentId: "aa"}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a", parentId: ""},
    children: [
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", parentId: "aa"}
          }
        ]
      },
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", parentId: "a"}
      }
    ]
  });
});

it("stratify(data) does not treat a falsy but non-empty parentId as the root", () => {
  const s = stratify();
  const root = s([
    {id: 0, parentId: null},
    {id: 1, parentId: 0},
    {id: 2, parentId: 0}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "0",
    depth: 0,
    height: 1,
    data: {id: 0, parentId: null},
    children: [
      {
        id: "1",
        depth: 1,
        height: 0,
        data: {id: 1, parentId: 0}
      },
      {
        id: "2",
        depth: 1,
        height: 0,
        data: {id: 2, parentId: 0}
      }
    ]
  });
});

it("stratify(data) throws an error if the data does not have a single root", () => {
  const s = stratify();
  assert.throws(() => { s([{id: "a"}, {id: "b"}]); }, /\bmultiple roots\b/);
  assert.throws(() => { s([{id: "a", parentId: "a"}]); }, /\bno root\b/);
  assert.throws(() => { s([{id: "a", parentId: "b"}, {id: "b", parentId: "a"}]); }, /\bno root\b/);
});

it("stratify(data) throws an error if the hierarchy is cyclical", () => {
  const s = stratify();
  assert.throws(() => { s([{id: "root"}, {id: "a", parentId: "a"}]); }, /\bcycle\b/);
  assert.throws(() => { s([{id: "root"}, {id: "a", parentId: "b"}, {id: "b", parentId: "a"}]); }, /\bcycle\b/);
});

it("stratify(data) throws an error if multiple parents have the same id", () => {
  const s = stratify();
  assert.throws(() => { s([{id: "a"}, {id: "b", parentId: "a"}, {id: "b", parentId: "a"}, {id: "c", parentId: "b"}]); }, /\bambiguous\b/);
});

it("stratify(data) throws an error if the specified parent is not found", () => {
  const s = stratify();
  assert.throws(() => { s([{id: "a"}, {id: "b", parentId: "c"}]); }, /\bmissing\b/);
});

it("stratify(data) allows the id to be undefined for leaf nodes", () => {
  const s = stratify();
  const root = s([
    {id: "a"},
    {parentId: "a"},
    {parentId: "a"}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 1,
    data: {id: "a"},
    children: [
      {
        depth: 1,
        height: 0,
        data: {parentId: "a"}
      },
      {
        depth: 1,
        height: 0,
        data: {parentId: "a"}
      }
    ]
  });
});

it("stratify(data) allows the id to be non-unique for leaf nodes", () => {
  const s = stratify();
  const root = s([
    {id: "a", parentId: null},
    {id: "b", parentId: "a"},
    {id: "b", parentId: "a"}
  ]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 1,
    data: {id: "a", parentId: null},
    children: [
      {
        id: "b",
        depth: 1,
        height: 0,
        data: {id: "b", parentId: "a"}
      },
      {
        id: "b",
        depth: 1,
        height: 0,
        data: {id: "b", parentId: "a"}
      }
    ]
  });
});

it("stratify(data) coerces the id to a string, if not null and not empty", () => {
  const s = stratify();
  assert.strictEqual(s([{id: {toString() { return "a"}}}]).id, "a");
  assert.strictEqual(s([{id: ""}]).id, undefined);
  assert.strictEqual(s([{id: null}]).id, undefined);
  assert.strictEqual(s([{id: undefined}]).id, undefined);
  assert.strictEqual(s([{}]).id, undefined);
});

it("stratify(data) allows the id to be undefined for leaf nodes", () => {
  const s = stratify();
  const o = {parentId: {toString() { return "a"; }}};
  const root = s([{id: "a"}, o]);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 1,
    data: {id: "a"},
    children: [
      {
        depth: 1,
        height: 0,
        data: o
      }
    ]
  });
});

it("stratify.id(id) observes the specified id function", () => {
  const foo = (d) => d.foo;
  const s = stratify().id(foo);
  const root = s([
    {foo: "a"},
    {foo: "aa", parentId: "a"},
    {foo: "ab", parentId: "a"},
    {foo: "aaa", parentId: "aa"}
  ]);
  assert.strictEqual(s.id(), foo);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {foo: "a"},
    children: [
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {foo: "aa", parentId: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {foo: "aaa", parentId:"aa" }
          }
        ]
      },
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {foo: "ab", parentId:"a" }
      }
    ]
  });
});

it("stratify.id(id) tests that id is a function", () => {
  const s = stratify();
  assert.throws(() => void s.id(42));
  assert.throws(() => void s.id("nope"));
});

it("stratify.parentId(id) observes the specified parent id function", () => {
  const foo = (d) => d.foo;
  const s = stratify().parentId(foo);
  const root = s([
    {id: "a"},
    {id: "aa", foo: "a"},
    {id: "ab", foo: "a"},
    {id: "aaa", foo: "aa"}
  ]);
  assert.strictEqual(s.parentId(), foo);
  assert.deepStrictEqual(noparent(root), {
    id: "a",
    depth: 0,
    height: 2,
    data: {id: "a"},
    children: [
      {
        id: "aa",
        depth: 1,
        height: 1,
        data: {id: "aa", foo: "a"},
        children: [
          {
            id: "aaa",
            depth: 2,
            height: 0,
            data: {id: "aaa", foo: "aa"}
          }
        ]
      },
      {
        id: "ab",
        depth: 1,
        height: 0,
        data: {id: "ab", foo: "a"}
      }
    ]
  });
});

it("stratify.parentId(id) tests that id is a function", () => {
  const s = stratify();
  assert.throws(() => void s.parentId(42));
  assert.throws(() => void s.parentId("nope"));
});

it("stratify.path(path) returns the root node", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "/aa"},
    {path: "/ab"},
    {path: "/aa/aaa"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: "/"},
    children: [
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      },
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      }
    ]
  });
});

it("stratify.path(path) correctly handles single-character folders", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "/d"},
    {path: "/d/123"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: "/"},
    children: [
      {
        id: "/d",
        depth: 1,
        height: 1,
        data: {path: "/d"},
        children: [
          {
            id: "/d/123",
            depth: 2,
            height: 0,
            data: {path: "/d/123"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) correctly handles empty folders", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "//"},
    {path: "///"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: "/"},
    children: [
      {
        id: "//",
        depth: 1,
        height: 1,
        data: {path: "//"},
        children: [
          {
            id: "///",
            depth: 2,
            height: 0,
            data: {path: "///"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) correctly handles single-character folders with trailing slashes", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "/d/"},
    {path: "/d/123/"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: "/"},
    children: [
      {
        id: "/d",
        depth: 1,
        height: 1,
        data: {path: "/d/"},
        children: [
          {
            id: "/d/123",
            depth: 2,
            height: 0,
            data: {path: "/d/123/"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) correctly handles imputed single-character folders", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "/d/123"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: "/"},
    children: [
      {
        id: "/d",
        depth: 1,
        height: 1,
        data: null,
        children: [
          {
            id: "/d/123",
            depth: 2,
            height: 0,
            data: {path: "/d/123"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) allows slashes to be escaped", () => {
  const root = stratify().path(d => d.path)([
    {path: "/"},
    {path: "/aa"},
    {path: "\\/ab"},
    {path: "/aa\\/aaa"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 1,
    data: {path: "/"},
    children: [
      {
        id: "/aa",
        depth: 1,
        height: 0,
        data: {path: "/aa"}
      },
      {
        id: "/\\/ab",
        depth: 1,
        height: 0,
        data: {path: "\\/ab"}
      },
      {
        id: "/aa\\/aaa",
        depth: 1,
        height: 0,
        data: {path: "/aa\\/aaa"}
      }
    ]
  });
});

it("stratify.path(path) imputes internal nodes", () => {
  const root = stratify().path(d => d.path)([
    {path: "/aa/aaa"},
    {path: "/ab"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      },
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: null,
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) allows duplicate leaf paths", () => {
  const root = stratify().path(d => d.path)([
    {path: "/aa/aaa", number: 1},
    {path: "/aa/aaa", number: 2},
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/aa",
    depth: 0,
    height: 1,
    data: null,
    children: [
      {
        id: "/aa/aaa",
        depth: 1,
        height: 0,
        data: {path: "/aa/aaa", number: 1}
      },
      {
        id: "/aa/aaa",
        depth: 1,
        height: 0,
        data: {path: "/aa/aaa", number: 2}
      }
    ]
  });
});

it("stratify.path(path) does not allow duplicate internal paths", () => {
  assert.throws(() => {
    stratify().path(d => d.path)([
      {path: "/aa"},
      {path: "/aa"},
      {path: "/aa/aaa"},
      {path: "/aa/aaa"},
    ]);
  }, /ambiguous/);
});

it("stratify.path(path) implicitly adds leading slashes", () => {
  const root = stratify().path(d => d.path)([
    {path: ""},
    {path: "aa"},
    {path: "ab"},
    {path: "aa/aaa"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: {path: ""},
    children: [
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "aa/aaa"}
          }
        ]
      },
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "ab"}
      }
    ]
  });
});

it("stratify.path(path) implicitly trims trailing slashes", () => {
  const root = stratify().path(d => d.path)([
    {path: "/aa/"},
    {path: "/ab/"},
    {path: "/aa/aaa/"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa/"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa/"}
          }
        ]
      },
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab/"}
      }
    ]
  });
});

it("stratify.path(path) does not trim trailing slashes preceded by a slash", () => {
  const root = stratify().path(d => d.path)([
    {path: "/aa//"},
    {path: "/b"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 3,
    data: null,
    children: [
      {
        id: "/b",
        depth: 1,
        height: 0,
        data: {path: "/b"}
      },
      {
        id: "/aa",
        depth: 1,
        height: 2,
        data: null,
        children: [
          {
            id: "/aa/",
            depth: 2,
            height: 1,
            data: null,
            children: [
              {
                id: "/aa//",
                depth: 3,
                height: 0,
                data: {path: "/aa//"},
              }
            ]
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) does not require the data to be in topological order", () => {
  const root = stratify().path(d => d.path)([
    {path: "/aa/aaa"},
    {path: "/aa"},
    {path: "/ab"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      },
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      }
    ]
  });
});

it("stratify.path(path) preserves the input order of siblings", () => {
  const root = stratify().path(d => d.path)([
    {path: "/ab"},
    {path: "/aa"},
    {path: "/aa/aaa"}
  ]);
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      },
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) accepts an iterable", () => {
  const root = stratify().path(d => d.path)(new Set([
    {path: "/ab"},
    {path: "/aa"},
    {path: "/aa/aaa"}
  ]));
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      },
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      }
    ]
  });
});

it("stratify.path(path) coerces paths to strings", () => {
  class Path {
    constructor(path) {
      this.path = path;
    }
    toString() {
      return this.path;
    }
  }
  const root = stratify().path(d => d.path)([
    {path: "/ab"},
    {path: "/aa"},
    {path: "/aa/aaa"}
  ], d => new Path(d.path));
  assert(root instanceof hierarchy);
  assert.deepStrictEqual(noparent(root), {
    id: "/",
    depth: 0,
    height: 2,
    data: null,
    children: [
      {
        id: "/ab",
        depth: 1,
        height: 0,
        data: {path: "/ab"}
      },
      {
        id: "/aa",
        depth: 1,
        height: 1,
        data: {path: "/aa"},
        children: [
          {
            id: "/aa/aaa",
            depth: 2,
            height: 0,
            data: {path: "/aa/aaa"}
          }
        ]
      }
    ]
  });
});

function noparent(node) {
  const copy = {};
  for (const k in node) {
    if (node.hasOwnProperty(k)) { // eslint-disable-line no-prototype-builtins
      switch (k) {
        case "children": copy.children = node.children.map(noparent); break;
        case "parent": break;
        default: copy[k] = node[k]; break;
      }
    }
  }
  return copy;
}
