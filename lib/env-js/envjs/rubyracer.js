// This file must be executed automatically on startup for ruby/v8 rubyracer support.
var __this__ = this;
var require = (function() {
    var cached = {};
    var currentPath = Ruby.ENV.PWD;
    var paths = [currentPath];
    
	/*Ruby.puts("$PROGRAM_NAME " + Ruby.$PROGRAM_NAME)
	Ruby.puts("Ruby.Config.ruby_version " + Ruby.Config.ruby_version)
	Ruby.puts("Ruby.File " + Ruby.File)
	Ruby.puts("Ruby.File.open " + Ruby.File.open)
	Ruby.puts("Ruby.File equality " + (File === Ruby.File))
	Ruby.puts("Ruby.File.open() " + Ruby.File.open('/tmp/t.tmp','r').read())*/
	
    function normalize(id) {
		var file;
        id = id + '.js';
        if (/^\.\.?/.test(id)) {
            // relative path
			try{ return fopen(id, 'r') }catch(e){}
        } else {
            for (var i = 0, len = paths.length; i < len; ++i) {
			    try{ return fopen(paths[i]+'/'+id, 'r') }catch(e){}
            }
        }
        return undefined;
    };
    
    
    function require(id) {
		//print('require :'+ id);
        var file = normalize(id);
        if (!file) {
            throw new Error("couldn't find module \"" + id + "\"");
        }
        if (!cached.hasOwnProperty(id)) {
			//print('loading '+id);
            var source = file.read();
            source = source.replace(/^\#\!.*/, '');
            source = "(function (require, exports, module) { "+source+"\n});";
            cached[id] = {
                exports: {},
                module: {
                    id: id,
                    uri: id
                }
            };
            var previousPath = currentPath;
            try {
                currentPath = id.substr(0, id.lastIndexOf('/')) || '.';
                var func = __this__.eval(source);
                func(require, cached[id].exports, cached[id].module);
            } finally {
                currentPath = previousPath;
            }
        }
		/*
		print('returning exports for id: '+id+' '+cached[id].exports);
		for(var prop in cached[id].exports){
			print('export: '+prop);
		}
		*/
        return cached[id].exports;
    };
    
    require.paths = paths;
    
    return require;
})();
var __argv__ = Ruby.ARGV;
require('envjs/platform/rubyracer');
require('envjs/window');
