// This file is compiled into the jar and executed automatically on startup.
var __this__ = this;
var require = (function() {
    var cached = {};
    var currentPath = java.lang.System.getProperty('user.dir');
    var paths = [currentPath];
    
    function normalize(id) {
		var file;
        id = id + '.js';
        if (/^\.\.?/.test(id)) {
            // relative path
            file = new java.io.File(currentPath, id);
            if (file.isFile()) {
                return file.toURL();
            }
        } else {
            for (var i = 0, len = paths.length; i < len; ++i) {
                file = new java.io.File(paths[i], id);
                if (file.isFile()) {
                    return file.toURL();
                }
            }
            // try to get it from the jar as a last resort
            /*var url = rhoop.getClass().getResource('/' + id);
            if (url !== null) {
                return url;
            }*/
        }
        return undefined;
    };
    
    function read(connection) {
        var stream = connection.getInputStream();
        var bytes = java.lang.reflect.Array.newInstance(
                java.lang.Byte.TYPE, 4096);
        var bytesStream = new java.io.ByteArrayOutputStream();
        var bytesRead;
        while ((bytesRead = stream.read(bytes)) >= 0) {
            if (bytesRead > 0) {
                bytesStream.write(bytes, 0, bytesRead);
            }
        }
        return String(bytesStream.toString());
    };
    
    function require(id) {
		//print('require :'+ id);
        var url = normalize(id);
        if (!url) {
            throw new Error("couldn't find module \"" + id + "\"");
        }
        id = String(url.toString());
        if (!cached.hasOwnProperty(id)) {
            var source = read(url.openConnection());
            source = source.replace(/^\#\!.*/, '');
            source = (
                "(function (require, exports, module) { " + source + "\n});");
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
                var ctx = org.mozilla.javascript.Context.getCurrentContext();
                var func = ctx.evaluateString({}, source, id, 1, null);
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
}());
var __argv__ = arguments;
require('envjs/platform/rhino');
require('envjs/window');
