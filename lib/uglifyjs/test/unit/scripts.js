var fs = require('fs'),
	uglify = require('uglify-js'),
	jsp = uglify.parser,
	nodeunit = require('nodeunit'),
	path = require('path'),
	pro = uglify.uglify;

var Script = process.binding('evals').Script;

var scriptsPath = __dirname;

function compress(code) {
	var ast = jsp.parse(code);
	ast = pro.ast_mangle(ast);
	ast = pro.ast_squeeze(ast, {no_warnings: true, extra: true});
        ast = pro.ast_squeeze_more(ast);
	return pro.gen_code(ast);
};

module.exports = nodeunit.testCase({
	compress: function(test) {
		var testDir = path.join(scriptsPath, "compress", "test");
		var expectedDir = path.join(scriptsPath, "compress", "expected");

		var scripts = fs.readdirSync(testDir);
		for (var i in scripts) {
			var script = scripts[i];
			testPath = path.join(testDir, script);
			expectedPath = path.join(expectedDir, script);
			var content = fs.readFileSync(testPath, 'utf-8');
			var outputCompress = compress(content);

			// Check if the noncompressdata is larger or same size as the compressed data
			test.ok(content.length >= outputCompress.length);

			// Check that a recompress gives the same result
			var outputReCompress = compress(content);
			test.equal(outputCompress, outputReCompress);

			// Check if the compressed output is what is expected
			var expected = fs.readFileSync(expectedPath, 'utf-8');
			test.equal(outputCompress, expected.replace(/(\r?\n)+$/, ""));
		}
		test.done();
	}
});
