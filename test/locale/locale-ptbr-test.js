var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/pt-BR").expression("d3_locale_ptBR"),

    "numberFormat": {
      topic: function(locale) {
        return locale.numberFormat;
      },
      "formats numbers": function(format) {
        var f = format(",.2f");
        assert.equal(f(12345.67), "12.345,67");
      },
      "formats currencies": function(format) {
        var f = format("$,.2f");
        assert.equal(f(12345.67), "R$12.345,67");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "R$12,35k");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "Segunda,  1 de Janeiro de 1990. 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "01/01/1990");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "Seg");
          assert.equal(f(local(1990, 0, 2)), "Ter");
          assert.equal(f(local(1990, 0, 3)), "Qua");
          assert.equal(f(local(1990, 0, 4)), "Qui");
          assert.equal(f(local(1990, 0, 5)), "Sex");
          assert.equal(f(local(1990, 0, 6)), "Sáb");
          assert.equal(f(local(1990, 0, 7)), "Dom");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "Segunda");
          assert.equal(f(local(1990, 0, 2)), "Terça");
          assert.equal(f(local(1990, 0, 3)), "Quarta");
          assert.equal(f(local(1990, 0, 4)), "Quinta");
          assert.equal(f(local(1990, 0, 5)), "Sexta");
          assert.equal(f(local(1990, 0, 6)), "Sábado");
          assert.equal(f(local(1990, 0, 7)), "Domingo");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "Jan");
          assert.equal(f(local(1990, 1, 1)), "Fev");
          assert.equal(f(local(1990, 2, 1)), "Mar");
          assert.equal(f(local(1990, 3, 1)), "Abr");
          assert.equal(f(local(1990, 4, 1)), "Mai");
          assert.equal(f(local(1990, 5, 1)), "Jun");
          assert.equal(f(local(1990, 6, 1)), "Jul");
          assert.equal(f(local(1990, 7, 1)), "Ago");
          assert.equal(f(local(1990, 8, 1)), "Set");
          assert.equal(f(local(1990, 9, 1)), "Out");
          assert.equal(f(local(1990, 10, 1)), "Nov");
          assert.equal(f(local(1990, 11, 1)), "Dez");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "Janeiro");
          assert.equal(f(local(1990, 1, 1)), "Fevereiro");
          assert.equal(f(local(1990, 2, 1)), "Março");
          assert.equal(f(local(1990, 3, 1)), "Abril");
          assert.equal(f(local(1990, 4, 1)), "Maio");
          assert.equal(f(local(1990, 5, 1)), "Junho");
          assert.equal(f(local(1990, 6, 1)), "Julho");
          assert.equal(f(local(1990, 7, 1)), "Agosto");
          assert.equal(f(local(1990, 8, 1)), "Setembro");
          assert.equal(f(local(1990, 9, 1)), "Outubro");
          assert.equal(f(local(1990, 10, 1)), "Novembro");
          assert.equal(f(local(1990, 11, 1)), "Dezembro");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "AM");
          assert.equal(f(local(1990, 0, 1, 13)), "PM");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("Segunda,  1 de Janeiro de 1990. 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("01/01/1990"), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);
