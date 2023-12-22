
import {geoAlbers, geoAlbersUsa, geoAzimuthalEqualArea, geoAzimuthalEquidistant, geoConicConformal, geoConicEqualArea, geoConicEquidistant, geoEqualEarth, geoEquirectangular, geoGnomonic, geoMercator, geoOrthographic, geoStereographic, geoTransverseMercator} from "../../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

[
  geoAlbers,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoConicConformal,
  function conicConformal() { return geoConicConformal().parallels([20, 30]); },
  function conicConformal() { return geoConicConformal().parallels([30, 30]); },
  function conicConformal() { return geoConicConformal().parallels([-35, -50]); },
  function conicConformal() { return geoConicConformal().parallels([40, 60]).rotate([-120,0]); },
  geoConicEqualArea,
  function conicEqualArea() { return geoConicEqualArea().parallels([20, 30]); },
  function conicEqualArea() { return geoConicEqualArea().parallels([-30, 30]); },
  function conicEqualArea() { return geoConicEqualArea().parallels([-35, -50]); },
  function conicEqualArea() { return geoConicEqualArea().parallels([40, 60]).rotate([-120,0]); },
  geoConicEquidistant,
  function conicEquidistant() { return geoConicEquidistant().parallels([20, 30]); },
  function conicEquidistant() { return geoConicEquidistant().parallels([30, 30]); },
  function conicEquidistant() { return geoConicEquidistant().parallels([-35, -50]); },
  function conicEquidistant() { return geoConicEquidistant().parallels([40, 60]).rotate([-120,0]); },
  geoEquirectangular,
  geoEqualEarth,
  geoGnomonic,
  geoMercator,
  geoOrthographic,
  geoStereographic,
  geoTransverseMercator
].forEach((factory) => {
  const name = factory.name, projection = factory();
  it(name + "(point) and " + name + ".invert(point) are symmetric", () => {
    [[0, 0], [30.3, 24.1], [-10, 42], [-2, -5]].forEach((point) => {
      assertProjectionEqual(projection, point, projection(point));
    });
  });
});

it("albersUsa(point) and albersUsa.invert(point) are symmetric", () => {
  const projection = geoAlbersUsa();
  [[-122.4194, 37.7749], [-74.0059, 40.7128], [-149.9003, 61.2181], [-157.8583, 21.3069]].forEach((point) => {
    assertProjectionEqual(projection, point, projection(point));
  });
});
