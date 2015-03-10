var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.chord");

suite.addBatch({
  "chord": {
    topic: load("layout/chord").expression("d3.layout.chord"),
    "of a simple matrix": {
      topic: function(chord) {
        return chord()
            .padding(.05)
            .sortSubgroups(function(a, b) { return b - a; })
            .matrix([
              [11975,  5871, 8916, 2868],
              [ 1951, 10048, 2060, 6171],
              [ 8010, 16145, 8090, 8045],
              [ 1013,   990,  940, 6907]
            ]);
      },
      "computes chord groups": function(chord) {
        var groups = chord.groups();
        assert.equal(groups.length, 4);

        assert.equal(groups[0].index, 0);
        assert.inDelta(groups[0].startAngle, 0.0000000000000000, 1e-6);
        assert.inDelta(groups[0].endAngle, 1.8024478065173115, 1e-6);
        assert.inDelta(groups[0].value, 29630, 1e-6);

        assert.equal(groups[1].index, 1);
        assert.inDelta(groups[1].startAngle, 1.8524478065173116, 1e-6);
        assert.inDelta(groups[1].endAngle, 3.0830761941597418, 1e-6);
        assert.inDelta(groups[1].value, 20230, 1e-6);

        assert.equal(groups[2].index, 2);
        assert.inDelta(groups[2].startAngle, 3.1330761941597416, 1e-6);
        assert.inDelta(groups[2].endAngle, 5.583991554422396, 1e-6);
        assert.inDelta(groups[2].value, 40290, 1e-6);

        assert.equal(groups[3].index, 3);
        assert.inDelta(groups[3].startAngle, 5.6339915544223960, 1e-6);
        assert.inDelta(groups[3].endAngle, 6.233185307179585, 1e-6);
        assert.inDelta(groups[3].value, 9850, 1e-6);
      },
      "computes chords": function(chord) {
        var chords = chord.chords();
        assert.equal(chords.length, 10);

        assert.equal(chords[0].source.index, 0);
        assert.equal(chords[0].source.subindex, 0);
        assert.inDelta(chords[0].source.startAngle, 0, 1e-6);
        assert.inDelta(chords[0].source.endAngle, 0.7284614405347555, 1e-6);
        assert.equal(chords[0].source.value, 11975);
        assert.equal(chords[0].target.index, 0);
        assert.equal(chords[0].target.subindex, 0);
        assert.inDelta(chords[0].target.startAngle, 0, 1e-6);
        assert.inDelta(chords[0].target.endAngle, 0.7284614405347555, 1e-6);
        assert.equal(chords[0].target.value, 11975);

        assert.equal(chords[1].source.index, 0);
        assert.equal(chords[1].source.subindex, 1);
        assert.inDelta(chords[1].source.startAngle, 1.2708382425228875, 1e-6);
        assert.inDelta(chords[1].source.endAngle, 1.6279820519074009, 1e-6);
        assert.equal(chords[1].source.value, 5871);
        assert.equal(chords[1].target.index, 1);
        assert.equal(chords[1].target.subindex, 0);
        assert.inDelta(chords[1].target.startAngle, 2.964393248816668, 1e-6);
        assert.inDelta(chords[1].target.endAngle, 3.0830761941597418, 1e-6);
        assert.equal(chords[1].target.value, 1951);

        assert.equal(chords[2].source.index, 0);
        assert.equal(chords[2].source.subindex, 2);
        assert.inDelta(chords[2].source.startAngle, 0.7284614405347555, 1e-6);
        assert.inDelta(chords[2].source.endAngle, 1.2708382425228875, 1e-6);
        assert.equal(chords[2].source.value, 8916);
        assert.equal(chords[2].target.index, 2);
        assert.equal(chords[2].target.subindex, 0);
        assert.inDelta(chords[2].target.startAngle, 5.0967284113173115, 1e-6);
        assert.inDelta(chords[2].target.endAngle, 5.583991554422396, 1e-6);
        assert.equal(chords[2].target.value, 8010);

        assert.equal(chords[3].source.index, 0);
        assert.equal(chords[3].source.subindex, 3);
        assert.inDelta(chords[3].source.startAngle, 1.6279820519074009, 1e-6);
        assert.inDelta(chords[3].source.endAngle, 1.8024478065173115, 1e-6);
        assert.equal(chords[3].source.value, 2868);
        assert.equal(chords[3].target.index, 3);
        assert.equal(chords[3].target.subindex, 0);
        assert.inDelta(chords[3].target.startAngle, 6.05415716358929, 1e-6);
        assert.inDelta(chords[3].target.endAngle, 6.115779830751019, 1e-6);
        assert.equal(chords[3].target.value, 1013);

        assert.equal(chords[4].source.index, 1);
        assert.equal(chords[4].source.subindex, 1);
        assert.inDelta(chords[4].source.startAngle, 1.8524478065173116, 1e-6);
        assert.inDelta(chords[4].source.endAngle, 2.4636862661827164, 1e-6);
        assert.equal(chords[4].source.value, 10048);
        assert.equal(chords[4].target.index, 1);
        assert.equal(chords[4].target.subindex, 1);
        assert.inDelta(chords[4].target.startAngle, 1.8524478065173116, 1e-6);
        assert.inDelta(chords[4].target.endAngle, 2.4636862661827164, 1e-6);
        assert.equal(chords[4].target.value, 10048);

        assert.equal(chords[5].source.index, 2);
        assert.equal(chords[5].source.subindex, 1);
        assert.inDelta(chords[5].source.startAngle, 3.1330761941597416, 1e-6);
        assert.inDelta(chords[5].source.endAngle, 4.1152064620038855, 1e-6);
        assert.equal(chords[5].source.value, 16145);
        assert.equal(chords[5].target.index, 1);
        assert.equal(chords[5].target.subindex, 2);
        assert.inDelta(chords[5].target.startAngle, 2.8390796314887687, 1e-6);
        assert.inDelta(chords[5].target.endAngle, 2.964393248816668, 1e-6);
        assert.equal(chords[5].target.value, 2060);

        assert.equal(chords[6].source.index, 1);
        assert.equal(chords[6].source.subindex, 3);
        assert.inDelta(chords[6].source.startAngle, 2.4636862661827164, 1e-6);
        assert.inDelta(chords[6].source.endAngle, 2.8390796314887687, 1e-6);
        assert.equal(chords[6].source.value, 6171);
        assert.equal(chords[6].target.index, 3);
        assert.equal(chords[6].target.subindex, 1);
        assert.inDelta(chords[6].target.startAngle, 6.115779830751019, 1e-6);
        assert.inDelta(chords[6].target.endAngle, 6.176003365292097, 1e-6);
        assert.equal(chords[6].target.value, 990);

        assert.equal(chords[7].source.index, 2);
        assert.equal(chords[7].source.subindex, 2);
        assert.inDelta(chords[7].source.startAngle, 4.1152064620038855, 1e-6);
        assert.inDelta(chords[7].source.endAngle, 4.607336153354714, 1e-6);
        assert.equal(chords[7].source.value, 8090);
        assert.equal(chords[7].target.index, 2);
        assert.equal(chords[7].target.subindex, 2);
        assert.inDelta(chords[7].target.startAngle, 4.1152064620038855, 1e-6);
        assert.inDelta(chords[7].target.endAngle, 4.607336153354714, 1e-6);
        assert.equal(chords[7].target.value, 8090);

        assert.equal(chords[8].source.index, 2);
        assert.equal(chords[8].source.subindex, 3);
        assert.inDelta(chords[8].source.startAngle, 4.607336153354714, 1e-6);
        assert.inDelta(chords[8].source.endAngle, 5.0967284113173115, 1e-6);
        assert.equal(chords[8].source.value, 8045);
        assert.equal(chords[8].target.index, 3);
        assert.equal(chords[8].target.subindex, 2);
        assert.inDelta(chords[8].target.startAngle, 6.176003365292097, 1e-6);
        assert.inDelta(chords[8].target.endAngle, 6.233185307179585, 1e-6);
        assert.equal(chords[8].target.value, 940);

        assert.equal(chords[9].source.index, 3);
        assert.equal(chords[9].source.subindex, 3);
        assert.inDelta(chords[9].source.startAngle, 5.633991554422396, 1e-6);
        assert.inDelta(chords[9].source.endAngle, 6.05415716358929, 1e-6);
        assert.equal(chords[9].source.value, 6907);
        assert.equal(chords[9].target.index, 3);
        assert.equal(chords[9].target.subindex, 3);
        assert.inDelta(chords[9].target.startAngle, 5.633991554422396, 1e-6);
        assert.inDelta(chords[9].target.endAngle, 6.05415716358929, 1e-6);
        assert.equal(chords[9].target.value, 6907);
      }
    }
  }
});

suite.export(module);
