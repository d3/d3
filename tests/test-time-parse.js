require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.time");

var f = d3.time.format("%c");

console.log("parse a m/d/Y:");
console.log("            Sun 01/01/1990:", f(d3.time.format("%a %m/%d/%Y").parse("Sun 01/01/1990")));
console.log("            Wed 01/01/1990:", f(d3.time.format("%a %m/%d/%Y").parse("Wed 01/01/1990")));
console.log("            XXX 01/01/1990:", d3.time.format("%a %m/%d/%Y").parse("XXX 01/01/1990"));
console.log("");

console.log("parse A m/d/Y:");
console.log("         Sunday 01/01/1990:", f(d3.time.format("%A %m/%d/%Y").parse("Sunday 01/01/1990")));
console.log("      Wednesday 01/01/1990:", f(d3.time.format("%A %m/%d/%Y").parse("Wednesday 01/01/1990")));
console.log("       Caturday 01/01/1990:", d3.time.format("%A %m/%d/%Y").parse("Caturday 01/01/1990"));
console.log("");

console.log("parse m/d/y:");
console.log("                    1/1/90:", f(d3.time.format("%m/%d/%y").parse("1/1/90")));
console.log("                    1/1/10:", f(d3.time.format("%m/%d/%y").parse("1/1/10")));
console.log("");

console.log("parse x:");
console.log("                    1/1/90:", f(d3.time.format("%x").parse("1/1/90")));
console.log("                    1/1/10:", f(d3.time.format("%x").parse("1/1/10")));
console.log("");

console.log("parse b d Y:");
console.log("              jan 01, 1990:", f(d3.time.format("%b %d, %Y").parse("jan 01, 1990")));
console.log("              jan  1, 1990:", f(d3.time.format("%b %d, %Y").parse("jan  1, 1990")));
console.log("              1 Feb., 1990:", f(d3.time.format("%d %b., %Y").parse("1 Feb., 1990")));
console.log("             01 Feb., 1990:", f(d3.time.format("%d %b., %Y").parse("01 Feb., 1990")));
console.log("              1 Feb., 1990:", f(d3.time.format("%d %b., %Y").parse(" 1 Feb., 1990")));
console.log("              1 Feb., 1990:", f(d3.time.format(" %d %b., %Y").parse(" 1 Feb., 1990")));
console.log("                Moy 1 1990:", d3.time.format("%b %d %Y").parse("Moy 1 1990"));
console.log("");

console.log("parse B d Y:");
console.log("          January 01, 1990:", f(d3.time.format("%B %d, %Y").parse("January 01, 1990")));
console.log("          january  1, 1990:", f(d3.time.format("%B %d, %Y").parse("january  1, 1990")));
console.log("          1 February, 1990:", f(d3.time.format("%d %B, %Y").parse("1 February, 1990")));
console.log("         01 February, 1990:", f(d3.time.format("%d %B, %Y").parse("01 February, 1990")));
console.log("          1 February, 1990:", f(d3.time.format("%d %B, %Y").parse(" 1 February, 1990")));
console.log("          1 February, 1990:", f(d3.time.format(" %d %B, %Y").parse(" 1 February, 1990")));
console.log("               Juin 1 1990:", d3.time.format("%B %d %Y").parse("Join 1 1990"));
console.log("");

console.log("parse c:");
console.log("  Mon Jan  1 00:00:00 1990:", f(d3.time.format("%c").parse("Mon Jan  1 00:00:00 1990")));
console.log("  Sun Jan  1 00:00:00 1990:", f(d3.time.format("%c").parse("Sun Jan  1 00:00:00 1990")));
console.log("  Mon Jan 01 00:00:00 1990:", f(d3.time.format("%c").parse("Mon Jan 01 00:00:00 1990")));
console.log("   Mon Jan 1 00:00:00 1990:", f(d3.time.format("%c").parse("Mon Jan 1 00:00:00 1990")));
console.log("      Mon Jan 1 0:0:0 1990:", f(d3.time.format("%c").parse("Mon Jan 1 0:0:0 1990")));
console.log("");

console.log("parse H M S:");
console.log("                  00:00:00:", f(d3.time.format("%H:%M:%S").parse("00:00:00")));
console.log("                  11:59:59:", f(d3.time.format("%H:%M:%S").parse("11:59:59")));
console.log("                  12:00:00:", f(d3.time.format("%H:%M:%S").parse("12:00:00")));
console.log("                  12:00:01:", f(d3.time.format("%H:%M:%S").parse("12:00:01")));
console.log("                  23:59:59:", f(d3.time.format("%H:%M:%S").parse("23:59:59")));
console.log("");

console.log("parse X:");
console.log("                  00:00:00:", f(d3.time.format("%X").parse("00:00:00")));
console.log("                  11:59:59:", f(d3.time.format("%X").parse("11:59:59")));
console.log("                  12:00:00:", f(d3.time.format("%X").parse("12:00:00")));
console.log("                  12:00:01:", f(d3.time.format("%X").parse("12:00:01")));
console.log("                  23:59:59:", f(d3.time.format("%X").parse("23:59:59")));
console.log("");

console.log("parse I M S p:");
console.log("               12:00:00 am:", f(d3.time.format("%I:%M:%S %p").parse("12:00:00 am")));
console.log("               11:59:59 AM:", f(d3.time.format("%I:%M:%S %p").parse("11:59:59 AM")));
console.log("               12:00:00 pm:", f(d3.time.format("%I:%M:%S %p").parse("12:00:00 pm")));
console.log("               12:00:01 pm:", f(d3.time.format("%I:%M:%S %p").parse("12:00:01 pm")));
console.log("               11:59:59 PM:", f(d3.time.format("%I:%M:%S %p").parse("11:59:59 PM")));
console.log("");
