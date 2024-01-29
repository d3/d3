import {interpolateRgbBasis} from "d3-interpolate";

export default scheme => interpolateRgbBasis(scheme[scheme.length - 1]);
