import "../../src/dsv/dsv";
import "../../src/dsv/csv";

d3_dsvEval = false;
d3.csv.noEval = d3.dsv(",", "text/csv");
d3_dsvEval = true;
