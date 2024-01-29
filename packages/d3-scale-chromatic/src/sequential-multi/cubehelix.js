import {cubehelix} from "d3-color";
import {interpolateCubehelixLong} from "d3-interpolate";

export default interpolateCubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));
