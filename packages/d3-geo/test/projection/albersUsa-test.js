import assert from "assert";
import {geoAlbersUsa} from "../../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("albersUsa(point) and albersUsa.invert(point) returns the expected result", () => {
  const albersUsa = geoAlbersUsa();
  assertProjectionEqual(albersUsa, [-122.4194, 37.7749], [107.4, 214.1], 0.1); // San Francisco, CA
  assertProjectionEqual(albersUsa, [ -74.0059, 40.7128], [794.6, 176.5], 0.1); // New York, NY
  assertProjectionEqual(albersUsa, [ -95.9928, 36.1540], [488.8, 298.0], 0.1); // Tulsa, OK
  assertProjectionEqual(albersUsa, [-149.9003, 61.2181], [171.2, 446.9], 0.1); // Anchorage, AK
  assertProjectionEqual(albersUsa, [-157.8583, 21.3069], [298.5, 451.0], 0.1); // Honolulu, HI
  assert.strictEqual(albersUsa([2.3522, 48.8566]), null); // Paris, France
});
