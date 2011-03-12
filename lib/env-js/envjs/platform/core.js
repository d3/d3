/*
 * Envjs core-env.1.3.pre03
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */
Envjs = exports.Envjs = function(){
    var i,
        override = function(){
            for(i=0;i<arguments.length;i++){
                for ( var name in arguments[i] ) {
					if(arguments[i].hasOwnProperty(name)){
                        var g = arguments[i].__lookupGetter__(name),
                            s = arguments[i].__lookupSetter__(name);
                        if ( g || s ) {
                            if ( g ) { Envjs.__defineGetter__(name, g); }
                            if ( s ) { Envjs.__defineSetter__(name, s); }
                        } else {
                            Envjs[name] = arguments[i][name];
                        }
					}
                }
            }
        };

    if(arguments.length === 1 && typeof(arguments[0]) == 'string'){
        window.location = arguments[0];
    }else if (arguments.length === 1 && typeof(arguments[0]) == "object"){
        override(arguments[0]);
    }else if(arguments.length === 2 && typeof(arguments[0]) == 'string'){
        override(arguments[1]);
        window.location = arguments[0];
    }
    return;
};

var log = {
    debug: function(){return this;},
    info: function(){return this;},
    warn: function(){return this;},
    error: function(){return this;},
    exception: function(){return this;}
};

if (typeof console == "undefined") {
	console = require('./console').console;
}

//eg "Mozilla"
Envjs.appCodeName  = "Envjs";

//eg "Gecko/20070309 Firefox/2.0.0.3"
Envjs.appName      = "Netscape";

Envjs.version = "1.618";//
Envjs.revision = '';

Envjs.exit = function(){};



/*
 * Envjs core-env.1.3.pre03
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){





/**
 * @author john resig
 */
// Helper method for extending one object with another.
function __extend__(a,b) {
    for ( var i in b ) {
        if(b.hasOwnProperty(i)){
            var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
            if ( g || s ) {
                if ( g ) { a.__defineGetter__(i, g); }
                if ( s ) { a.__defineSetter__(i, s); }
            } else {
                a[i] = b[i];
            }
        }
    }
    return a;
}

/**
 * @author ariel flesler
 *    http://flesler.blogspot.com/2008/11/fast-trim-function-for-javascript.html
 * @param {Object} str
 */
function __trim__( str ){
    return (str || "").replace( /^\s+|\s+$/g, "" );
}

/**
 * Borrowed with love from:
 *
 * jQuery AOP - jQuery plugin to add features of aspect-oriented programming (AOP) to jQuery.
 * http://jquery-aop.googlecode.com/
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.1
 */

(function(){

	var _after	= 1;
	var _before	= 2;
	var _around	= 3;
	var _intro  = 4;
	var _regexEnabled = true;

	/**
	 * Private weaving function.
	 */
	var weaveOne = function(source, method, advice) {

		var old = source[method];

		var aspect;
		if (advice.type == _after){
			aspect = function() {
				var returnValue = old.apply(this, arguments);
				return advice.value.apply(this, [returnValue, method]);
			};
		}else if (advice.type == _before){
			aspect = function() {
				advice.value.apply(this, [arguments, method]);
				return old.apply(this, arguments);
			};
		}else if (advice.type == _intro){
			aspect = function() {
				return advice.value.apply(this, arguments);
			};
		}else if (advice.type == _around) {
			aspect = function() {
				var invocation = { object: this, args: arguments };
				return advice.value.apply(invocation.object, [{ 'arguments': invocation.args, method: method, proceed :
					function() {
						return old.apply(invocation.object, invocation.args);
					}
				}] );
			};
		}

		aspect.unweave = function() {
			source[method] = old;
			source = aspect = old = null;
		};

		source[method] = aspect;

		return aspect;

	};


	/**
	 * Private weaver and pointcut parser.
	 */
	var weave = function(pointcut, advice)
	{

		var source = (typeof(pointcut.target.prototype) != 'undefined') ? pointcut.target.prototype : pointcut.target;
		var advices = [];

		// If it's not an introduction and no method was found, try with regex...
		if (advice.type != _intro && typeof(source[pointcut.method]) == 'undefined')
		{

			for (var method in source)
			{
				if (source[method] && source[method] instanceof Function && method.match(pointcut.method))
				{
					advices[advices.length] = weaveOne(source, method, advice);
				}
			}

			if (advices.length === 0){
				throw 'No method: ' + pointcut.method;
			}

		}
		else
		{
			// Return as an array of one element
			advices[0] = weaveOne(source, pointcut.method, advice);
		}

		return _regexEnabled ? advices : advices[0];

	};

	exports.Aspect = Aspect =
	{
		/**
		 * Creates an advice after the defined point-cut. The advice will be executed after the point-cut method
		 * has completed execution successfully, and will receive one parameter with the result of the execution.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.after( {target: window, method: 'MyGlobalMethod'}, function(result) { alert('Returned: ' + result); } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.after( {target: String, method: 'indexOf'}, function(index) { alert('Result found at: ' + index + ' on:' + this); } );
		 * @result Array<Function>
		 *
		 * @name after
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called after the execution of the point-cut. It receives one parameter
		 *                        with the result of the point-cut's execution.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		after : function(pointcut, advice)
		{
			return weave( pointcut, { type: _after, value: advice } );
		},

		/**
		 * Creates an advice before the defined point-cut. The advice will be executed before the point-cut method
		 * but cannot modify the behavior of the method, or prevent its execution.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.before( {target: window, method: 'MyGlobalMethod'}, function() { alert('About to execute MyGlobalMethod'); } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.before( {target: String, method: 'indexOf'}, function(index) { alert('About to execute String.indexOf on: ' + this); } );
		 * @result Array<Function>
		 *
		 * @name before
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called before the execution of the point-cut.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		before : function(pointcut, advice)
		{
			return weave( pointcut, { type: _before, value: advice } );
		},


		/**
		 * Creates an advice 'around' the defined point-cut. This type of advice can control the point-cut method execution by calling
		 * the functions '.proceed()' on the 'invocation' object, and also, can modify the arguments collection before sending them to the function call.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.around( {target: window, method: 'MyGlobalMethod'}, function(invocation) {
		 *                alert('# of Arguments: ' + invocation.arguments.length);
		 *                return invocation.proceed();
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.around( {target: String, method: 'indexOf'}, function(invocation) {
		 *                alert('Searching: ' + invocation.arguments[0] + ' on: ' + this);
		 *                return invocation.proceed();
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.around( {target: window, method: /Get(\d+)/}, function(invocation) {
		 *                alert('Executing ' + invocation.method);
		 *                return invocation.proceed();
		 *          } );
		 * @desc Matches all global methods starting with 'Get' and followed by a number.
		 * @result Array<Function>
		 *
		 *
		 * @name around
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called around the execution of the point-cut. This advice will be called with one
		 *                        argument containing one function '.proceed()', the collection of arguments '.arguments', and the matched method name '.method'.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		around : function(pointcut, advice)
		{
			return weave( pointcut, { type: _around, value: advice } );
		},

		/**
		 * Creates an introduction on the defined point-cut. This type of advice replaces any existing methods with the same
		 * name. To restore them, just unweave it.
		 * This function returns an array with only one weaved aspect (Function).
		 *
		 * @example jQuery.aop.introduction( {target: window, method: 'MyGlobalMethod'}, function(result) { alert('Returned: ' + result); } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.introduction( {target: String, method: 'log'}, function() { alert('Console: ' + this); } );
		 * @result Array<Function>
		 *
		 * @name introduction
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved.
		 * @param Function advice Function containing the code that will be executed on the point-cut.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		introduction : function(pointcut, advice)
		{
			return weave( pointcut, { type: _intro, value: advice } );
		},

		/**
		 * Configures global options.
		 *
		 * @name setup
		 * @param Map settings Configuration options.
		 * @option Boolean regexMatch Enables/disables regex matching of method names.
		 *
		 * @example jQuery.aop.setup( { regexMatch: false } );
		 * @desc Disable regex matching.
		 *
		 * @type Void
		 * @cat Plugins/General
		 */
		setup: function(settings)
		{
			_regexEnabled = settings.regexMatch;
		}
	};

}(/*Aspect*/));




(function(){

Envjs.Configuration = {
    /** Please see each module for specific configuration options */
    //this is a short list of well knowns, but can always be extended
    logging:[
        {category:'Envjs.Core',                 level:'WARN'},
        {category:'Envjs.Core.REPL',            level:'WARN'},
        {category:'Envjs.DOM',                  level:'WARN'},
        {category:'Envjs.DOM.Node',             level:'WARN'},
        {category:'Envjs.DOM.NodeList',         level:'WARN'},
        {category:'Envjs.DOM.NamedNodeMap',     level:'WARN'},
        {category:'Envjs.DOM.Element',          level:'WARN'},
        {category:'Envjs.DOM.Document',         level:'WARN'},
        {category:'Envjs.DOM.EventTarget',      level:'WARN'},
        {category:'Envjs.Timer',                level:'WARN'},
        {category:'Envjs.Location',             level:'WARN'},
        {category:'Envjs.XMLHttpRequest',       level:'WARN'},
        {category:'Envjs.Parser',               level:'WARN'},
        {category:'Envjs.Parser.HTMLParser',    level:'WARN'},
        {category:'Envjs.Parser.XMLParser',     level:'WARN'},
        {category:'Envjs.HTML.FrameElement',    level:'WARN'},
        {category:'Envjs.Window',               level:'WARN'},
        {category:'Envjs.Platform',             level:'WARN'},
        {category:'root',                       level:'WARN'}
    ],
    env : {
        dev:{},
        prod:{},
        test:{}
    }
};

Envjs.config = function(){
    var config, subconfig;
    if(arguments.length === 0){
        return Envjs.Configuration;
    }else if(arguments.length === 1 && typeof(arguments[0]) == "string"){
        return Envjs.Configuration[arguments[0]];
    }else{
        Envjs.Configuration[arguments[0]] =  arguments[1];
    }
    return this;//chain
};


var $guid = 0;
Envjs.guid = function(){
    return ++$guid;
};

}(/*Envjs.Configuration*/));


/**
 * Writes message to system out
 * @param {String} message
 */
Envjs.log = function(message){};

/**
 * Prints stack trace of current execution point
 */
Envjs.trace = function(){};

/**
 * Writes error info out to console
 * @param {Error} e
 */
Envjs.lineSource = function(e){};

/**
 * Provides prompt to system stdout
 * @param {Error} e
 */
Envjs.prompt = function(e){};

/**
 * Reads line from system stdin
 * @param {Error} e
 */
Envjs.readConsole = function(e){};

/**
 * Starts a read-eval-print-loop
 */
Envjs.repl = function(){
    var line,
        waiting,
		$_ = null;
    var log = Envjs.logger('Envjs.Core.REPL');
    Envjs.on('tick', function(){
        log.debug('tick for REPL');
        if(!waiting){
            log.debug('not waiting in REPL');
            waiting = true;
            Envjs.prompt();
            log.debug('waiting for line in');
            Envjs.spawn(function(){
                log.info('async waiting for line in');
                line = Envjs.readConsole();
                if(line === "quit" || line === "exit") {
                    log.info('%sting', line);
                    Envjs.emit('exit', 'repl');
                }else{
                    setTimeout(function(){
                        try{
                            if(line){
                                log.info('evaluating console line in: %s', line);
                                $_ = Envjs['eval'](__this__, line);
                                if($_!==undefined){
                                    log.info('result of evaluation: %s', $_);
                                    Envjs.log( $_ );
                                }
                             }else{
                                log.info('not evaluating console line in: %s', line);
                             }
                        }catch(e) {
                            Envjs.log('[Envjs.REPL Error] ' + e);
                        }finally{
                            waiting = false;
                        }
                    },1);
                }
            });
        }else{
            log.debug('waiting in REPL');
        }
    });
};

Envjs.CURSOR = "envjs>";



Envjs.Logging = {};


/**
 * Descibe this class
 * @author
 * @version $Rev$
 * @requires OtherClassName
 */
(function($$Log){

    var loggerFactory = null;

    Envjs.logging = function(config){
        return Envjs.config('logging', config);
    };

    Envjs.logger = function(category){
        if(!category){
            return new $$Log.NullLogger();
        }
        if(!$$Log.loggerFactory){
            $$Log.loggerFactory = new $$Log.Factory();
        }
        if($$Log.updated){
            $$Log.loggerFactory.updateConfig();
            $$Log.updated = false;
        }
        return $$Log.loggerFactory.create(category);
    };

    $$Log.Level = {
        DEBUG:0,
        INFO:1,
        WARN:2,
        ERROR:3,
        NONE:4
    };

    $$Log.NullLogger = function(){
        //for speed why bother implement the interface, just null the functions
        var nullFunction = function(){
            return this;
        };
        __extend__(this,  {
            debug:nullFunction,
            info:nullFunction,
            warn:nullFunction,
            error:nullFunction,
            exception:nullFunction
        });
    };
    //leaked globally intentionally
    log = new $$Log.NullLogger();


    $$Log.Logger = function(options){
        this.category   = "root";
        this.level      = null;
        __extend__(this, options);
        try{
            this.level = $$Log.Level[
                this.level?this.level:"NONE"
            ];
            this.appender = new $$Log.ConsoleAppender(options);
            return this;
        }catch(e){
            return new $$Log.NullLogger();
        }
    };



    //All logging calls are chainable
    __extend__($$Log.Logger.prototype, {
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        debug: function(){
            if(this.level<=$$Log.Level.DEBUG){
              this.appender.append("DEBUG",this.category,arguments);
              return this;
            }else{
                this.debug = function(){
                    return this;
                };
            }
            return this;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        info: function(){
            if(this.level<=$$Log.Level.INFO){
              this.appender.append("INFO",this.category,arguments);
              return this;
            }else{
                this.info = function(){
                    return this;
                };
            }
            return this;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        warn: function(){
            if(this.level<=$$Log.Level.WARN){
              this.appender.append("WARN",this.category,arguments);
              return this;
            }else{ this.warn = function(){return this;}; }
            return this;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        error: function(){
            if(this.level<=$$Log.Level.ERROR){
              this.appender.append("ERROR",this.category,arguments);
              return this;
            }else{ this.error = function(){return this;}; }
            return this;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        exception: function(e){
            if(this.level < $$Log.Level.NONE){
                if(e){
                    this.appender.append("EXCEPTION", this.category,e);
                    return this;
                }
            }else{
                this.exception = function(){
                    return this;
                };
            }
            return this;
        }
    });

    /**
     * @constructor
     */
    $$Log.ConsoleAppender = function(options){
        __extend__(this,options);
        try{
            this.formatter = new $$Log.FireBugFormatter(options);
            return this;
        }catch(e){
            //Since the console and print arent available use a null implementation.
            throw e;
        }
        return this;
    };

    __extend__( $$Log.ConsoleAppender.prototype, {
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        append: function(level, category, message){
            switch(level){
                case ("DEBUG"):
                    console.log.apply(console, this.formatter.format(level, category, message));
                    break;
                case ("INFO"):
                    console.info.apply(console, this.formatter.format(level, category, message));
                    break;
                case ("WARN"):
                    console.warn.apply(console, this.formatter.format(level, category, message));
                    break;
                case ("ERROR"):
                    console.error.apply(console,this.formatter.format(level, category, message));
                    break;
                case ("EXCEPTION"):
                    //message is e
                    console.error.apply(console, this.formatter.format(level, category,
                        message.message?[message.message]:[]));
                    console.trace();
                    break;
            }
        }
    });

    $$Log.FireBugFormatter = function(options){
        __extend__(this, options);
    };

    __extend__($$Log.FireBugFormatter.prototype, {
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        getDateString: function(){
            return " ["+ new Date().toUTCString() +"] ";
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        format: function(level, category, objects){
            var msgPrefix = category + " "+level+": "+ this.getDateString();
            objects = (objects&&objects.length&&(objects.length>0))?objects:[];
            var msgFormat = (objects.length > 0)?objects[0]:null;
            if (typeof(msgFormat) != "string"){
                objects.unshift(msgPrefix);
            }else{
                objects[0] = msgPrefix + msgFormat;
            }
            return objects;
        }
    });

    $$Log.Factory = function(options){
        __extend__(this,options);
        this.configurationId = 'logging';
        //The LogFactory is unique in that it will create its own logger
        //so that it's events can be logged to console or screen in a
        //standard way.
        this.logger = new $$Log.Logger({
            category:"Envjs.Logging.Factory",
            level:"INFO",
            appender:"Envjs.Logging.ConsoleAppender"
        });
        this.attemptedConfigure = false;
        this.clear();
        this.updateConfig();
    };

    __extend__($$Log.Factory.prototype,  {
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        clear: function(){
            this.logger.debug("Clearing Cache.");
            this.cache = null;
            this.cache = {};
            this.size = 0;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        add: function(id, object){
            this.logger.debug("Adding To Cache: %s", id);
            if ( !this.cache[id] ){
                this.cache[id] = object;
                this.size++;
                return id;
            }
            return null;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        remove: function(id){
            this.logger.debug("Removing From Cache id: %s", id);
            if(this.find(id)){
                return (delete this.cache[id])?--this.size:-1;
            }return null;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        find: function(id){
            this.logger.debug("Searching Cache for id: %s", id);
            return this.cache[id] || null;
        },

        /**
         * returns the portion configuration specified by 'configurationId'
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        getConfig: function(){
            if( !this.configuration ){
                //First look for an object name Envjs.Configuration
                this.logger.debug( "Configuration for <%s> has not been set explicitly or has been updated implicitly.",  this.configurationId );
                try{
                    if(Envjs.Configuration[this.configurationId]){
                        this.logger.debug("Found Envjs.Configuration");
                        this.configuration = Envjs.Configuration[this.configurationId];
                    }
                }catch(e){
                    this.logger.exception(e);
                    throw new Error('Logging Configuration Error');
                }
            }
            return this.configuration;
        },
        /**
         * Describe what this method does
         * @private
         * @param {String} paramName Describe this parameter
         * @returns Describe what it returns
         * @type String
         */
        setConfig: function(id, configuration){
            this.logger.debug("Setting configuration");
            this.configuration = configuration;
            Envjs.Configuration[id] = configuration;
        },
       /**
        * Describe what this method does
        * @private
        * @param {String} paramName Describe this parameter
        * @returns Describe what it returns
        * @type String
        */
       create: function(category){
           var categoryParts,
               subcategory,
               loggerConf,
               rootLoggerConf,
               i;
           if(!this.configuration){
               //Only warn about lack of configuration once
               if(!this.attemptedConfigure){
                   this.logger.warn("Claypool Logging was not initalized correctly. Logging will not occur unless initialized.");
               }
               this.attemptedConfigure = true;
               return new $$Log.NullLogger();
           }else{
               //Find the closest configured category
               categoryParts = category.split(".");
               for(i=0;i<categoryParts.length;i++){
                   subcategory = categoryParts.slice(0,categoryParts.length-i).join(".");
                   loggerConf = this.find(subcategory);
                   if(loggerConf !== null){
                       //The level is set by the closest subcategory, but we still want the
                       //full category to display when we log the messages
                       loggerConf.category = category;
                       //TODO: we need to use the formatter/appender specified in the config
                       return new $$Log.Logger( loggerConf );
                   }
               }
               //try the special 'root' category
               rootLoggerConf = this.find('root');
               this.logger.debug('root logging category is set to %s', rootLoggerConf);
               if(rootLoggerConf !== null){
                   //The level is set by the closest subcategory, but we still want the
                   //full category to display when we log the messages
                   rootLoggerConf.category = category;
                   return new $$Log.Logger(rootLoggerConf);
               }
           }
           //No matching category found
           this.logger.warn("No Matching category: %s Please configure a root logger.", category);
           return new $$Log.NullLogger();
       },
       /**
        * Describe what this method does
        * @private
        * @param {String} paramName Describe this parameter
        * @returns Describe what it returns
        * @type String
        */
       updateConfig: function(){
           var loggingConfiguration;
           var logconf;
           var i;
           try{
               this.logger.debug("Configuring Logging");
               this.clear();
               loggingConfiguration = this.getConfig()||[];
               for(i=0;i<loggingConfiguration.length;i++){
                   try{
                       logconf = loggingConfiguration[i];
                       this.add( logconf.category, logconf );
                   }catch(ee){
                       this.logger.exception(ee);
                       return false;
                   }
               }
           }catch(e){
               this.logger.exception(e);
               throw new Error('Logging configuration error');
           }
           return true;
        }
    });


    Envjs.logging = function(){
        if(arguments.length === 0){
            return Envjs.config('logging');
        }else{
            Envjs.Logging.updated = true;
            return Envjs.config('logging', arguments[0]);
        }
    };

}( Envjs.Logging ));


(function(){
/**
 *  The main event loop is unrelated to html/dom events
 */
var log;

var eventListeners = {
        newListener:[],
        tick:[],
        exit:[]
    },
    eventQueue = [];

Envjs.eventLoop = Envjs.eventLoop || function(){
    log = log||Envjs.logger('Envjs.Core');
    while(true) {
        Envjs.tick();
    }
};

Envjs.on = function(event, callback){
    if(!(event in eventListeners)){
        eventListeners[event] = [];
    }
    eventListeners[event].push(callback);
};

Envjs.once = function(event, callback){
    var once = function(){
        Envjs.removeListener(event, once);
        callback.apply(callback, arguments);
    };
    Envjs.on(event, once);
};

Envjs.removeListener = function(event, callback){
    if(!(event in eventListeners)){
        return;
    }
    var index = eventListeners[event].indexOf(callback);
    if(index > -1){
        eventListeners[event].splice(index, 1);
    }
};

Envjs.removeAllListeners = function(event){
    eventListeners[event] = [];
};

Envjs.listeners = function(event){
    return (event in eventListeners) ?
        eventListeners[event] : [];
};

Envjs.emit = function(event /*, arg1, arg2, etc*/ ){
    eventQueue.push({event:event, args:arguments});
};

var $warming = 10;

Envjs.tick = function(){
    var y, next, fn, arg, file;
    log = log||Envjs.logger('Envjs.Core');

    log.debug('go through %s events', eventQueue.length);
    next = eventQueue.shift();
    while( next ){

        log.debug('next event %s', next.event);
        if(next.event in eventListeners){

            if('exit' === next.event){
                log.info('exiting');
                Envjs.exit();
            }
            for(y = 0; y < eventListeners[next.event].length; y++){
                log.debug('event %s %s', y, next.event);
                fn = eventListeners[next.event][y];
                fn.apply(fn, next.args);
            }
        }
        next = eventQueue.shift();
    }
    if(!$warming && Envjs.argv && Envjs.argv.length){

        log.debug('parsing args %s',  Envjs.argv);
        arg = Envjs.argv.shift();
        if(arg && typeof(arg) == 'string'){
            file = arg;
            log.debug('will load file %s next', file);
            setTimeout(function(){
                log.debug('loading script %s', file);
                Envjs['eval'](__this__, Envjs.readFromFile(file), file, !$warming);
            },1);
        }

    }else if($warming === 0 && Envjs.argv.length === 0){
        $warming = false;
        //prevents repl from being opened twice
        //Envjs.repl();
    }else if($warming){
        log.debug('warming');
        $warming--;
    }

    if($warming === false && !eventQueue.length && !Envjs.connections.length && !Envjs.timers.length ){
        log.debug('ready to exit warming %s eventQueue %s connections %s timers %s',
            $warming,
            eventQueue.length,
            Envjs.connections.length,
            Envjs.timers.length
        );
        log.info('event loop is passive, exiting');
        Envjs.emit('exit');
    }

    Envjs.emit('tick', Date.now());
    Envjs.sleep(4);
};


/**
 * Used in ./event/eventtarget.js  These are DOM related events
 * @param {Object} event
 */
Envjs.defaultEventBehaviors = {
    'submit': function(event) {
        var target = event.target,
            serialized,
            method,
            action;
        while (target && target.nodeName !== 'FORM') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'FORM') {
            serialized = Envjs.serializeForm(target);
            //console.log('serialized %s', serialized);
            method = target.method?target.method.toUpperCase():"GET";

            action = Envjs.uri(
                target.action !== ""?target.action:target.ownerDocument.baseURI,
                target.ownerDocument.baseURI
            );
            if(method=='GET' && !action.match(/^file:/)){
                action = action + "?" + serialized;
            }
            //console.log('replacing document with form submission %s', action);
            target.ownerDocument.location.replace(
                action, method, serialized
            );
        }
    },

    'click': function(event) {
        //console.log("handling default behavior for click %s", event.target);
        var target = event.target,
            url,
            form,
            inputs;
        while (target && target.nodeName !== 'A' && target.nodeName !== 'INPUT') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'A') {
            //console.log('target is a link');
            if(target.href && !target.href.match(/^#/)){
                url = Envjs.uri(target.href, target.ownerDocument.baseURI);
                target.ownerDocument.location.replace(url);
            }
        }else if (target && target.nodeName === 'INPUT') {
            //console.log('input %s', target.xml);
            if(target.type.toLowerCase() === 'submit'){
                if(!target.value){
                    target.value = 'submit';
                }
                //console.log('submit click %s %s', target.name, target.value);
                form = target.parentNode;
                while (form && form.nodeName !== 'FORM' ) {
                    form = form.parentNode;
                }
                if(form && form.nodeName === 'FORM'){
                    //disable other submit buttons before serializing
                    inputs = form.getElementsByTagName('input');
                    for(var i=0;i<inputs.length;i++){
                        //console.log('checking for non-relevant submit buttons %s', inputs[i].name);
                        if(inputs[i].type == 'submit' && inputs[i]!=target){
                            //console.log('disabling the non-relevant submit button %s', inputs[i].value);
                            inputs[i].disabled = true;
                            inputs[i].value = null;
                        }
                    }
                    form.submit();
                }
            }
        }
    }
};

}(/*Envjs.Platform.Core*/));

(function(){

var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Platform.HTML').
        debug('Platform Core HTML API available');
});

/**
 * describes which script src values will trigger Envjs to load
 * the script like a browser would
 */
Envjs.scriptTypes = {
    "": true, //anonymous/inline
    "text/javascript"   :true,
    "text/envjs"        :true
};

/**
 * will be called when loading a script throws an error
 * @param {Object} script
 * @param {Object} e
 */
Envjs.onScriptLoadError = function(script, e){
    log.error('error loading script %s %s', script, e);
};

/**
 * load and execute script tag text content
 * @param {Object} script
 */
Envjs.loadInlineScript = function(script){
    if(script.ownerDocument.ownerWindow){
        log.debug('evaulating inline in window %s', script.ownerDocument.ownerWindow);
        Envjs['eval'](
            script.ownerDocument.ownerWindow,
            script.text,
            'eval('+script.text.substring(0,16)+'...):'+new Date().getTime()
        );
    }else{
        log.debug('evaulating inline in global %s',  __this__);
        Envjs['eval'](
            __this__,
            script.text,
            'eval('+script.text.substring(0,16)+'...):'+new Date().getTime()
        );
    }
    //console.log('evaluated at scope %s \n%s',
    //    script.ownerDocument.ownerWindow.guid, script.text);
};

/**
 * Should evaluate script in some context
 * @param {Object} context
 * @param {Object} source
 * @param {Object} name
 */
Envjs['eval'] = function(context, source, name){};


/**
 * Executes a script tag
 * @param {Object} script
 * @param {Object} parser
 */
Envjs.loadLocalScript = function(script){
    var types,
        src,
        i,
        base,
        filename,
        xhr,
        brief = script.src||script.text.substring(0,64);

    log.debug("loading script type %s : %s", script.type, brief);

    if(script.type){
        types = script.type.split(";");
        for(i=0;i<types.length;i++){
            if(Envjs.scriptTypes[types[i].toLowerCase()]){
                //ok this script type is allowed
                break;
            }
            if(i+1 == types.length){
                log.debug('wont load script type %s', script.type);
                return false;
            }
        }
    }else if(!Envjs.scriptTypes['']){
        log.debug('wont load anonymous script type ""');
        return false;
    }

    try{
        if(!script.src.length ){
            if(Envjs.scriptTypes[""]){
                log.debug('handling inline scripts %s %s', script.src, Envjs.scriptTypes[""] );
                Envjs.loadInlineScript(script);
                return true;
            }else{
                return false;
            }
        }
    }catch(e){
        log.error("Error loading script. %s", e);
        Envjs.onScriptLoadError(script, e);
        return false;
    }


    log.debug("loading allowed external script %s", script.src);

    //lets you register a function to execute
    //before the script is loaded
    if(Envjs.beforeScriptLoad){
        for(src in Envjs.beforeScriptLoad){
            if(script.src.match(src)){
                Envjs.beforeScriptLoad[src](script);
            }
        }
    }
    base = "" + script.ownerDocument.location;
    //filename = Envjs.uri(script.src.match(/([^\?#]*)/)[1], base );
    log.debug('loading script from base %s', base);
    filename = Envjs.uri(script.src, base);
    try {
        xhr = new XMLHttpRequest();
        xhr.open("GET", filename, false/*syncronous*/);
        log.debug("loading external script %s", filename);
        xhr.onreadystatechange = function(){
            log.debug("readyState %s", xhr.readyState);
            if(xhr.readyState === 4){
                Envjs['eval'](
                    script.ownerDocument.ownerWindow,
                    xhr.responseText,
                    filename
                );
            }
            log.debug('finished evaluating %s', filename);
        };
        xhr.send(null, false);
    } catch(ee) {
        log.error("could not load script %s \n %s", filename, ee );
        Envjs.onScriptLoadError(script, ee);
        return false;
    }
    //lets you register a function to execute
    //after the script is loaded
    if(Envjs.afterScriptLoad){
        for(src in Envjs.afterScriptLoad){
            if(script.src.match(src)){
                Envjs.afterScriptLoad[src](script);
            }
        }
    }
    return true;
};


/**
 * An 'image' was requested by the document.
 *
 * - During inital parse of a <link>
 * - Via an innerHTML parse of a <link>
 * - A modificiation of the 'src' attribute of an Image/HTMLImageElement
 *
 * NOTE: this is optional API.  If this doesn't exist then the default
 * 'loaded' event occurs.
 *
 * @param node {Object} the <img> node
 * @param node the src value
 * @return 'true' to indicate the 'load' succeed, false otherwise
 */
Envjs.loadImage = function(node, src) {
    return true;
};

Envjs.loadImage = function(node, value) {
    var event;
    var owner = node.ownerDocument;
    if (value) {
        // value has to be something (easy)
        // if the user-land API doesn't exist
        // Or if the API exists and it returns true, then ok:
        event = owner.createEvent('Events');
        event.initEvent('load');
    } else {
        // oops
        event = owner.createEvent('Events');
        event.initEvent('error');
    }
    node.dispatchEvent(event, false);
};

/**
 * A 'link'  was requested by the document.  Typically this occurs when:
 * - During inital parse of a <link>
 * - Via an innerHTML parse of a <link>
 * - A modificiation of the 'href' attribute on a <link> node in the tree
 *
 * @param node {Object} is the link node in question
 * @param href {String} is the href.
 *
 * Return 'true' to indicate that the 'load' was successful, or false
 * otherwise.  The appropriate event is then triggered.
 *
 * NOTE: this is optional API.  If this doesn't exist then the default
 *   'loaded' event occurs
 */
Envjs.loadLink = function(node, value) {
    var event;
    var owner = node.ownerDocument;

    if (owner.fragment) {
        /**
         * if we are in an innerHTML fragment parsing step
         * then ignore.  It will be handled once the fragment is
         * added to the real doco
         */
        return;
    }

    if (node.parentNode === null) {
        /*
         * if a <link> is parentless (normally by create a new link
         * via document.createElement('link'), then do *not* fire an
         * event, even if it has a valid 'href' attribute.
         */
        return;
    }
    if (value != '') {
        // value has to be something (easy)
        // if the user-land API doesn't exist
        // Or if the API exists and it returns true, then ok:
        event = owner.createEvent('Events');
        event.initEvent('load');
    } else {
        // oops
        event = owner.createEvent('Events');
        event.initEvent('error');
    }
    node.dispatchEvent(event, false);
};

var HTMLParser;
Envjs.exchangeHTMLDocument = function(doc, text, url) {
    var html, head, title, body,
        event,
        frame = doc.__ownerFrame__,
        i;
    try {
        HTMLParser = HTMLParser || require('./../parser').HTMLParser;
        //do some cleanup so we can reuse the document
        doc.baseURI = url;
        log.debug('reseting document indexes');
        doc._indexes_ = {
            'ancestors' : new NodeList(doc, doc),
            '*': new NodeList(doc, doc)
        };
        //TODO: we should remove the events for the document but
        // its so nice to setup a load handler before calling
        // document.location
        //doc.removeEventListener('*');

        log.debug('parsing document for window exchange %s', url);
        HTMLParser.parseDocument(text, doc);

        log.debug('finsihed parsing document for window exchange %s', url);
        //if this document is inside a frame make sure to trigger
        //a new load event on the frame
        if(frame){
            event = doc.createEvent('HTMLEvents');
            event.initEvent('load', false, false);
            frame.dispatchEvent( event, false );
        }
    } catch (e) {
        log.warn('parsererror %s', e);
        try {
            log.debug('document before error\n %s', doc.documentElement.outerHTML);
        } catch (ee) {
            // swallow
        }
        doc = new HTMLDocument(new DOMImplementation(), doc.ownerWindow);
        html =    doc.createElement('html');
        head =    doc.createElement('head');
        title =   doc.createElement('title');
        body =    doc.createElement('body');
        title.appendChild(doc.createTextNode('Error'));
        body.appendChild(doc.createTextNode('' + e));
        head.appendChild(title);
        html.appendChild(head);
        html.appendChild(body);
        doc.appendChild(html);
        log.debug('default error document \n %s', doc.documentElement.outerHTML);

        //DOMContentLoaded event
        if (doc.createEvent) {
            event = doc.createEvent('Event');
            event.initEvent('DOMContentLoaded', false, false);
            doc.dispatchEvent( event, false );

            event = doc.createEvent('HTMLEvents');
            event.initEvent('load', false, false);
            doc.dispatchEvent( event, false );
        }

        //finally fire the window.onload event
        //TODO: this belongs in window.js which is a event
        //      event handler for DOMContentLoaded on document

        try {
            if (doc === window.document) {
                console.log('triggering window.load');
                event = doc.createEvent('HTMLEvents');
                event.initEvent('load', false, false);
                window.dispatchEvent( event, false );
            }
        } catch (eee) {
            log.debug('window load event failed %s', eee);
            //swallow
        }
    }
};

(function(){


/*
 *  cookie handling
 *  Private internal helper class used to save/retreive cookies
 */

/**
 * Specifies the location of the cookie file
 */
Envjs.cookieFile = function(){
    return 'file://'+Envjs.homedir+'/.cookies';
};

/**
 * saves cookies to a local file
 * @param {Object} htmldoc
 */
Envjs.saveCookies = function(){
    var cookiejson = JSON.stringify(Envjs.cookies.persistent,null,'\t');
    log.debug('persisting cookies %s', cookiejson);
    Envjs.writeToFile(cookiejson, Envjs.cookieFile());
};

/**
 * loads cookies from a local file
 * @param {Object} htmldoc
 */
Envjs.loadCookies = function(){
    var cookiejson,
        js,
        file;
    try{
        file = Envjs.cookieFile();
        log.debug('load cookies %s', file);
        cookiejson = Envjs.readFromFile(file);

        log.debug('cookies json %s', cookiejson);
        js = JSON.parse(cookiejson, null, '\t');
    }catch(e){
        log.debug('failed to load cookies %s', e);
        js = {};
    }
    return js;
};

Envjs.cookies = {
    persistent:{
        //domain - key on domain name {
            //path - key on path {
                //name - key on name {
                     //value : cookie value
                     //other cookie properties
                //}
            //}
        //}
        //expire - provides a timestamp for expiring the cookie
        //cookie - the cookie!
    },
    temporary:{//transient is a reserved word :(
        //like above
    }
};

var __cookies__;

function __domainValid__(url, value){
    var i,
        domainParts = url.hostname.split('.').reverse(),
        newDomainParts = value.split('.').reverse();
    if(newDomainParts.length > 1){
        for(i=0;i<newDomainParts.length;i++){
            if(newDomainParts[i] !== domainParts[i]){
                return false;
            }
        }
        return true;
    }
    return false;
}


function __mergeCookie__(target, cookie, properties){
    var name, now;
    if(!target[cookie.domain]){
        target[cookie.domain] = {};
    }
    if(!target[cookie.domain][cookie.path]){
        target[cookie.domain][cookie.path] = {};
    }
    for(name in properties){
        if(properties.hasOwnProperty(name)){
            now = new Date().getTime();
            target[cookie.domain][cookie.path][name] = {
                "value":properties[name],
                "secure":cookie.secure,
                "max-age":cookie['max-age'],
                "date-created":now,
                "expiration":(cookie['max-age']===0) ?
                    0 :
                    now + cookie['max-age']
            };
        }
        //console.log('cookie is %o',target[cookie.domain][cookie.path][name]);
    }
}

//HTMLDocument cookie
Envjs.setCookie = function(url, cookie){
    var i,
        index,
        name,
        value,
        properties = {},
        attr,
        attrs;
    url = Envjs.urlsplit(url);
    if(cookie){
        attrs = cookie.split(";");
    }else{
        return;
    }

    //for now the strategy is to simply create a json object
    //and post it to a file in the .cookies.js file.  I hate parsing
    //dates so I decided not to implement support for 'expires'
    //(which is deprecated) and instead focus on the easier 'max-age'
    //(which succeeds 'expires')
    cookie = {};//keyword properties of the cookie
    cookie.domain = url.hostname;
    cookie.path = url.path||'/';
    for(i=0;i<attrs.length;i++){
        index = attrs[i].indexOf("=");
        if(index > -1){
            name = __trim__(attrs[i].slice(0,index));
            value = __trim__(attrs[i].slice(index+1));
            if(name.toLowerCase() == 'max-age'){
                //we'll have to when to check these
                //and garbage collect expired cookies
                cookie[name] = parseInt(value, 10);
            } else if( name.toLowerCase() == 'domain' ){
                if(__domainValid__(url, value)){
                    cookie.domain = value;
                }
            } else if( name.toLowerCase() == 'path' ){
                //not sure of any special logic for path
                cookie.path = value;
            } else {
                //its not a cookie keyword so store it in our array of properties
                //and we'll serialize individually in a moment
                properties[name] = value;
            }
        }else{
            if( attrs[i].toLowerCase() == 'secure' ){
                cookie[attrs[i]] = true;
            }
        }
    }
    if(!('max-age' in cookie)){
        //it's a transient cookie so it only lasts as long as
        //the window.location remains the same (ie in-memory cookie)
        __mergeCookie__(Envjs.cookies.temporary, cookie, properties);
    }else{
        //the cookie is persistent
        __mergeCookie__(Envjs.cookies.persistent, cookie, properties);
        Envjs.saveCookies();
    }
};


function __cookieString__(cookies, url) {
    var cookieString = "",
        domain,
        path,
        name,
        i=0;
    for (domain in cookies) {
        if (cookies.hasOwnProperty(domain) && (domain == "" || domain == url.hostname)) {
            // check if the cookie is in the current domain (if domain is set)
            log.debug('cookie domain %s', domain);
            for (path in cookies[domain]) {
                if (cookies[domain].hasOwnProperty(path) &&
                    (path == "/" || url.path.indexOf(path) > -1)) {
                    log.debug('cookie domain path %s', path);
                    // make sure path is at or below the window location path
                    for (name in cookies[domain][path]) {
                        if(cookies[domain][path].hasOwnProperty(name)){
                            log.debug('cookie domain path name %s', name);
                            cookieString +=
                                ((i++ > 0)?'; ':'') +
                                name + "=" +
                                cookies[domain][path][name].value;
                        }
                    }
                }
            }
        }
    }
    return cookieString;
}


Envjs.getCookies = function(url){
    //The cookies that are returned must belong to the same domain
    //and be at or below the current window.location.path.  Also
    //we must check to see if the cookie was set to 'secure' in which
    //case we must check our current location.protocol to make sure it's
    //https:
    var persisted;
    url = Envjs.urlsplit(url);
    if(!__cookies__){
        try{
            __cookies__ = true;
            try{
                persisted = Envjs.loadCookies();
            }catch(ee){
                //fail gracefully
                log.debug('failed to load persistant cookies %s', ee);
            }
            if(persisted){
                __extend__(Envjs.cookies.persistent, persisted);
            }
            log.debug('set cookies for doc %s', url);
        }catch(e){
            log.debug('cookies not loaded %s', e);
        }
    }
    var temporary = __cookieString__(Envjs.cookies.temporary, url),
        persistent =  __cookieString__(Envjs.cookies.persistent, url);
    log.debug('temporary cookies: %s', temporary);
    log.debug('persistent cookies: %s', persistent);
    return  temporary + persistent;
};


}());//end cookies


/**
 * Returns the value of the field element.
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If the given element is not
 * successful and the successful arg is not false then the returned value will be null.
 *
 * Note: If the successful flag is true (default) but the element is not successful, the return will be null
 * Note: The value returned for a successful select-multiple element will always be an array.
 * Note: If the element has no value the return value will be undefined.
 *
 * @name fieldValue
 * @param Element el The DOM element for which the value will be returned
 * @param Boolean successful true if value returned must be for a successful controls (default is true)
 * @type String or Array<String> or null or undefined
 */
 function __fieldValue__(element, successful) {
    var name = element.name,
        type = element.type,
        tag = element.tagName.toLowerCase(),
        index,
        array,
        options,
        option,
        one,
        i, imax,
        value;

    if (typeof successful == 'undefined')  {
        successful = true;
    }
    //console.log('element %s disabled ? %s (successful:%s)', name, element.disabled, successful);

    if (successful && (!name || element.disabled || type == 'reset' || type == 'button' ||
             (type == 'checkbox' || type == 'radio') &&  !element.checked ||
            //thatcher - todo: determine why not type == 'submit'
             (/*type == 'submit||*/ type == 'image') &&
             element.form && element.form.clk != element || tag === 'select' &&
             element.selectedIndex === -1)) {
            //console.log('skipping element in form serialization %s', element);
            return null;
    }

    if (tag === 'select') {
        index = element.selectedIndex;
        if (index < 0) {
            return null;
        }
        array = [];
        options = element.options;
        one = (type == 'select-one');
        imax = (one ? index+1 : options.length);
        i = (one ? index : 0);
        for( i; i < imax; i++) {
            option = options[i];
            if (option.selected) {
                value = option.value;
                if (one) {
                    return value;
                }
                array.push(value);
            }
        }
        return array;
    }
    return element.value;
}


// Serialize an array of key/values into a query string
function __param__( array ) {
    var i, serialized = [];

    // Serialize the key/values
    for(i=0; i<array.length; i++){
        serialized[ serialized.length ] =
            encodeURIComponent(array[i].name) + '=' +
            encodeURIComponent(array[i].value);
    }

    // Return the resulting serialization
    return serialized.join("&").replace(/%20/g, "+");
}

/**
 * Serializes all field elements inputs Array into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 *
 * The successful argument controls whether or not serialization is limited to
 * 'successful' controls (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.
 *
 *
 * @name fieldSerialize
 * @param successful true if only successful controls should be serialized (default is true)
 * @type String
 */
function __fieldSerialize__(inputs, successful) {
    var array = [],
        input,
        name,
        value,
        i,j, imax, jmax;

    imax = inputs.length;
    for(i=0; i<imax; i++){
        input = inputs[i];
        name = input.name;
        if (!name) {
            return '';
        }
        value = __fieldValue__(input, successful);
        if (value && value.constructor == Array) {
            jmax = value.length;
            for (j=0; j < jmax; j++){
                array.push({
                    name: name,
                    value: value[j]
                });
            }
        }else if (value !== null && typeof value != 'undefined'){
            array.push({
                name: input.name,
                value: value
            });
        }
    }

    //hand off  for proper encoding
    return __param__(array);
}

/**
 * Form Submissions
 *
 * This code is borrow largely from jquery.params and jquery.form.js
 *
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 *
 * The semantic argument can be used to force form serialization in semantic order.
 * This is normally true anyway, unless the form contains input elements of type='image'.
 * If your form must be submitted with name/value pairs in semantic order and your form
 * contains an input of type='image" then pass true for this arg, otherwise pass false
 * (or nothing) to avoid the overhead for this logic.
 *
 *
 * @name formToArray
 * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
 * @type Array<Object>
 */
function __formToArray__(form, semantic) {
    var array = [],
        elements = semantic ? form.getElementsByTagName('*') : form.elements,
        element,
        i,j,imax, jmax,
        name,
        value;

    if (!elements) {
        return array;
    }

    imax = elements.length;
    for(i=0; i < imax; i++) {
        element = elements[i];
        name = element.name;
        if (!name) {
            continue;
        }
        log.debug('serializing input %s', name);
        if (semantic && form.clk && element.type === "image") {
            // handle image inputs on the fly when semantic == true
            if(!element.disabled && form.clk == element) {
                array.push({
                    name: name+'.x',
                    value: form.clk_x
                },{
                    name: name+'.y',
                    value: form.clk_y
                });
            }
            continue;
        }

        value = __fieldValue__(element, true);
        log.debug('input value is %s', value);
        if (value && value.constructor == Array) {
            jmax = value.length;
            for(j=0; j < jmax; j++){
                array.push({name: name, value: value[j]});
            }
        } else if (value !== null && typeof value != 'undefined'){
            log.debug('serializing form %s %s', name, value);
            array.push({name: name, value: value});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        elements = form.getElementsByTagName("input");
        imax = imax=elements.length;
        for(i=0; i < imax; i++) {
            element = elements[i];
            name = element.name;
            if(name && !element.disabled && element.type == "image") {
                array.push(
                    {name: name+'.x', value: form.clk_x},
                    {name: name+'.y', value: form.clk_y});
            }
        }
    }
    return array;
}


/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 *
 * The semantic argument can be used to force form serialization in semantic order.
 * If your form must be submitted with name/value pairs in semantic order then pass
 * true for this arg, otherwise pass false (or nothing) to avoid the overhead for
 * this logic (which can be significant for very large forms).
 *
 *
 * @name formSerialize
 * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
 * @type String
 */
function __formSerialize__(form, semantic) {
    //hand off to param for proper encoding
    return __param__(__formToArray__(form, semantic));
}

Envjs.serializeForm = __formSerialize__;


/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 *
 *
 * @name fieldValue
 * @param Boolean successful true if only the values for successful controls
 *        should be returned (default is true)
 * @type Array<String>
 */
 function __fieldValues__(inputs, successful) {
    var i,
        imax = inputs.length,
        element,
        values = [],
        value;
    for (i=0; i < imax; i++) {
        element = inputs[i];
        value = __fieldValue__(element, successful);
        if (value === null || typeof value == 'undefined' ||
            (value.constructor == Array && !value.length)) {
            continue;
        }
        if (value.constructor == Array) {
            Array.prototype.push(values, value);
        } else {
            values.push(value);
        }
    }
    return values;
}

/**
 * Clears the selected form element.  Takes the following actions on the element:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 *
 * @name clearFields
 */
 function __clearField__(element) {
    var type = element.type,
        tag = element.tagName.toLowerCase();
    if (type == 'text' || type == 'password' || tag === 'textarea') {
        element.value = '';
    } else if (type == 'checkbox' || type == 'radio') {
        element.checked = false;
    } else if (tag === 'select') {
        element.selectedIndex = -1;
    }
}


/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 *
 *
 * @name clearForm
 */
 function __clearForm__(form) {
    var i,
        j, jmax,
        elements,
        resetable = ['input','select','textarea'];
    for(i=0; i<resetable.length; i++){
        elements = form.getElementsByTagName(resetable[i]);
        jmax = elements.length;
        for(j=0;j<jmax;j++){
            __clearField__(elements[j]);
        }
    }
}




}(/*Envjs.Platform.HTML*/));
/*
    http://www.JSON.org/json2.js
    2008-07-15

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/
try{ JSON = JSON; }catch(e){
JSON = (function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function (key) {

        return this.getUTCFullYear()   + '-' +
             f(this.getUTCMonth() + 1) + '-' +
             f(this.getUTCDate())      + 'T' +
             f(this.getUTCHours())     + ':' +
             f(this.getUTCMinutes())   + ':' +
             f(this.getUTCSeconds())   + 'Z';
    };

    String.prototype.toJSON = function (key) {
        return String(this);
    };
    Number.prototype.toJSON =
    Boolean.prototype.toJSON = function (key) {
        return this.valueOf();
    };

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        escapeable.lastIndex = 0;
        return escapeable.test(string) ?
            '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                return '\\u' + ('0000' +
                        (+(a.charCodeAt(0))).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

            return String(value);

        case 'object':

            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];

            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length'))) {

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    return {
        stringify: function (value, replacer, space) {

            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        },


        parse: function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' +
                            (+(a.charCodeAt(0))).toString(16)).slice(-4);
                });
            }


            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

            throw new SyntaxError('JSON.parse');
        }
    };
}());

}

(function(){

var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Platform.Timer').
        debug('Platform Core Timer API available');
});

/**
 * synchronizes thread modifications
 * @param {Function} fn
 */
Envjs.sync = function(fn){return fn;};

/**
 * sleep thread for specified duration
 * @param {Object} milliseconds
 */
Envjs.sleep = function(milliseconds){};

/**
 * run function in another thread
 * @param {Function} fn
 */
Envjs.spawn = function(fn){};

/**
 *
 * @param {Object} fn
 * @param {Object} onInterupt
 */
Envjs.runAsync = function(fn, onInterupt){
    log.debug("running function async");
    var running = true,
        run;

    try{
        log.debug('spawning synced function');
        return Envjs.spawn(fn);
    }catch(e){
        log.error("error while running async operation", e);
        try{
            if(onInterupt){
                onInterupt(e);
            }
        }catch(ee){}
    }
};


Envjs.timers = [];

// html5 says this should be at least 4
Envjs.MIN_TIMER_TIME = 4;

//static
Envjs.normalizeTime = function(time) {
    time = time*1;
    if ( isNaN(time) || time < 0 ) {
        time = 0;
    }

    if ( time < Envjs.MIN_TIMER_TIME ) {
        time = Envjs.MIN_TIMER_TIME;
    }
    return time;
};


Envjs.timers.addTimerOrInterval = Envjs.sync(function(fn, time, timerOrInterval){
    // this is Envjs.timers so this function is safe to call from threads
    // and more specifically setTimeout/setInterval should be safe to use
    // from threads
    var id = Envjs.guid();
    //console.log('setting %s %s %s', timerOrInterval, time, fn);
    time = Envjs.normalizeTime(time);
    Envjs.timers.push({
        type: timerOrInterval,
        time: time,
        at: Date.now() + time,
        fn: (typeof fn == 'string') ? new Function(fn) : fn,
        id: id
    });
    return id;
});

Envjs.timers.removeTimerOrInterval = Envjs.sync(function(id, timerOrInterval){
    // this is Envjs.timers so this function is safe to call from threads
    // and more specifically clearTimeout/clearInterval should be safe to
    // use from threads
    var i;
    //console.log("clearing %s %s", timerOrInterval, id);
    for(i = 0; i < Envjs.timers.length; i++){
        if(Envjs.timers[i].id === id){
            Envjs.timers.splice(i,1);
            break;
        }
    }
    return;
});


Envjs.on('tick', function(type, now){
    //this is a nice simple implementation
    var callbacks = [],
        timers = Envjs.timers,
        timer,
        i;
    //console.log('handling %s timer(s) in tick', timers.length);
    for(i = 0; i < timers.length;){
        timer = timers[i];
        //console.log('scheduled for %s , currently %s', timer.at, now);
        if(timer.at <= now){
            //console.log('timer past due: at(%s), now(%s), type(%s)',timer.at, now, timer.type);
            switch(timer.type){
            case 'timeout':
                //we need to remove it from the timers list and add it to the callback list
                callbacks.push.apply(callbacks, timers.splice(i,1));
                //dont increment the counter since the timers array was spliced
                break;
            case 'interval':
                //we need to add it to the callback list but leave it in the timers list
                callbacks.push(timer);
                //fall through to increament the counter since the timers array is unchanged
                i++;
                break;
            default:
                i++;
            }
        }else{
            //timer isnt read for execution so just leave it be
            i++;
        }
    }
    //console.log('timer tick has %s callbacks', callbacks.length);
    //finally we need to execute the callbacks in the order added to this stack
    for(i = 0; i < callbacks.length; i++){
        timer = callbacks[i];
        timer.fn.apply(timer.fn,[]);
    }
});

//DEPRECATED
Envjs.wait = Envjs.wait||function(wait) {};

}());

/*
 * Copyright (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * url processing in the spirit of python's urlparse module
 * see `pydoc urlparse` or
 * http://docs.python.org/library/urlparse.html
 *
 *  urlsplit: break apart a URL into components
 *  urlunsplit:  reconsistute a URL from componets
 *  urljoin: join an absolute and another URL
 *  urldefrag: remove the fragment from a URL
 *
 * Take a look at the tests in urlparse-test.html
 *
 * On URL Normalization:
 *
 * urlsplit only does minor normalization the components Only scheme
 * and hostname are lowercased urljoin does a bit more, normalizing
 * paths with "."  and "..".

 * urlnormalize adds additional normalization
 *
 *   * removes default port numbers
 *     http://abc.com:80/ -> http://abc.com/, etc
 *   * normalizes path
 *     http://abc.com -> http://abc.com/
 *     and other "." and ".." cleanups
 *   * if file, remove query and fragment
 *
 * It does not do:
 *   * normalizes escaped hex values
 *     http://abc.com/%7efoo -> http://abc.com/%7Efoo
 *   * normalize '+' <--> '%20'
 *
 * Differences with Python
 *
 * The javascript urlsplit returns a normal object with the following
 * properties: scheme, netloc, hostname, port, path, query, fragment.
 * All properties are read-write.
 *
 * In python, the resulting object is not a dict, but a specialized,
 * read-only, and has alternative tuple interface (e.g. obj[0] ==
 * obj.scheme).  It's not clear why such a simple function requires
 * a unique datastructure.
 *
 * urlunsplit in javascript takes an duck-typed object,
 *  { scheme: 'http', netloc: 'abc.com', ...}
 *  while in  * python it takes a list-like object.
 *  ['http', 'abc.com'... ]
 *
 * For all functions, the javascript version use
 * hostname+port if netloc is missing.  In python
 * hostname+port were always ignored.
 *
 * Similar functionality in different languages:
 *
 *   http://php.net/manual/en/function.parse-url.php
 *   returns assocative array but cannot handle relative URL
 *
 * TODO: test allowfragments more
 * TODO: test netloc missing, but hostname present
 */

var urlparse = {};

// Unlike to be useful standalone
//
// NORMALIZE PATH with "../" and "./"
//   http://en.wikipedia.org/wiki/URL_normalization
//   http://tools.ietf.org/html/rfc3986#section-5.2.3
//
urlparse.normalizepath = function(path)
{
    if (!path || path === '/') {
        return '/';
    }

    var parts = path.split('/');

    var newparts = [];
    // make sure path always starts with '/'
    if (parts[0]) {
        newparts.push('');
    }

    for (var i = 0; i < parts.length; ++i) {
        if (parts[i] === '..') {
            if (newparts.length > 1) {
                newparts.pop();
            } else {
                newparts.push(parts[i]);
            }
        } else if (parts[i] != '.') {
            newparts.push(parts[i]);
        }
    }

    path = newparts.join('/');
    if (!path) {
        path = '/';
    }
    return path;
};

//
// Does many of the normalizations that the stock
//  python urlsplit/urlunsplit/urljoin neglects
//
// Doesn't do hex-escape normalization on path or query
//   %7e -> %7E
// Nor, '+' <--> %20 translation
//
urlparse.urlnormalize = function(url)
{
    var parts = urlparse.urlsplit(url);
    switch (parts.scheme) {
    case 'file':
        // files can't have query strings
        //  and we don't bother with fragments
        parts.query = '';
        parts.fragment = '';
        break;
    case 'http':
    case 'https':
        // remove default port
        if ((parts.scheme === 'http' && parts.port == 80) ||
            (parts.scheme === 'https' && parts.port == 443)) {
            parts.port = null;
            // hostname is already lower case
            parts.netloc = parts.hostname;
        }
        break;
    default:
        // if we don't have specific normalizations for this
        // scheme, return the original url unmolested
        return url;
    }

    // for [file|http|https].  Not sure about other schemes
    parts.path = urlparse.normalizepath(parts.path);

    return urlparse.urlunsplit(parts);
};

urlparse.urldefrag = function(url)
{
    var idx = url.indexOf('#');
    if (idx == -1) {
        return [ url, '' ];
    } else {
        return [ url.substr(0,idx), url.substr(idx+1) ];
    }
};

urlparse.urlsplit = function(url, default_scheme, allow_fragments)
{
    var leftover;

    if (typeof allow_fragments === 'undefined') {
        allow_fragments = true;
    }

    // scheme (optional), host, port
    var fullurl = /^([A-Za-z]+)?(:?\/\/)([0-9.\-A-Za-z]*)(?::(\d+))?(.*)$/;
    // path, query, fragment
    var parse_leftovers = /([^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/;

    var o = {};

    var parts = url.match(fullurl);
    if (parts) {
        o.scheme = parts[1] || default_scheme || '';
        o.hostname = parts[3].toLowerCase() || '';
        o.port = parseInt(parts[4],10) || '';
        // Probably should grab the netloc from regexp
        //  and then parse again for hostname/port

        o.netloc = parts[3];
        if (parts[4]) {
            o.netloc += ':' + parts[4];
        }

        leftover = parts[5];
    } else {
        o.scheme = default_scheme || '';
        o.netloc = '';
        o.hostname = '';
        leftover = url;
    }
    o.scheme = o.scheme.toLowerCase();

    parts = leftover.match(parse_leftovers);

    o.path =  parts[1] || '';
    o.query = parts[2] || '';

    if (allow_fragments) {
        o.fragment = parts[3] || '';
    } else {
        o.fragment = '';
    }

    return o;
};

urlparse.urlunsplit = function(o) {
    var s = '';
    if (o.scheme) {
        s += o.scheme + '://';
    }

    if (o.netloc) {
        if (s == '') {
            s += '//';
        }
        s +=  o.netloc;
    } else if (o.hostname) {
        // extension.  Python only uses netloc
        if (s == '') {
            s += '//';
        }
        s += o.hostname;
        if (o.port) {
            s += ':' + o.port;
        }
    }

    if (o.path) {
        s += o.path;
    }

    if (o.query) {
        s += '?' + o.query;
    }
    if (o.fragment) {
        s += '#' + o.fragment;
    }
    return s;
};

urlparse.urljoin = function(base, url, allow_fragments)
{
    if (typeof allow_fragments === 'undefined') {
        allow_fragments = true;
    }

    var url_parts = urlparse.urlsplit(url);

    // if url parts has a scheme (i.e. absolute)
    // then nothing to do
    if (url_parts.scheme) {
        if (! allow_fragments) {
            return url;
        } else {
            return urlparse.urldefrag(url)[0];
        }
    }
    var base_parts = urlparse.urlsplit(base);

    // copy base, only if not present
    if (!base_parts.scheme) {
        base_parts.scheme = url_parts.scheme;
    }

    // copy netloc, only if not present
    if (!base_parts.netloc || !base_parts.hostname) {
        base_parts.netloc = url_parts.netloc;
        base_parts.hostname = url_parts.hostname;
        base_parts.port = url_parts.port;
    }

    // paths
    if (url_parts.path.length > 0) {
        if (url_parts.path.charAt(0) == '/') {
            base_parts.path = url_parts.path;
        } else {
            // relative path.. get rid of "current filename" and
            //   replace.  Same as var parts =
            //   base_parts.path.split('/'); parts[parts.length-1] =
            //   url_parts.path; base_parts.path = parts.join('/');
            var idx = base_parts.path.lastIndexOf('/');
            if (idx == -1) {
                base_parts.path = url_parts.path;
            } else {
                base_parts.path = base_parts.path.substr(0,idx) + '/' +
                    url_parts.path;
            }
        }
    }

    // clean up path
    base_parts.path = urlparse.normalizepath(base_parts.path);

    // copy query string
    base_parts.query = url_parts.query;

    // copy fragments
    if (allow_fragments) {
        base_parts.fragment = url_parts.fragment;
    } else {
        base_parts.fragment = '';
    }

    return urlparse.urlunsplit(base_parts);
};

(function(){

var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.XMLHttpRequest.Core').
        debug('XMLHttpRequest.Core available');
});

/**
 * getcwd - named after posix call of same name (see 'man 2 getcwd')
 *
 */
Envjs.getcwd = function() {
    return Envjs.uri('.');
};

/**
 * resolves location relative to doc location
 *
 * @param {Object} path  Relative or absolute URL
 * @param {Object} base  (semi-optional)  The base url used in resolving "path" above
 */
Envjs.uri = function(path, base) {
    //console.log('constructing uri from path %s and base %s', path, base);
    path = path+'';
    // Semi-common trick is to make an iframe with src='javascript:false'
    //  (or some equivalent).  By returning '', the load is skipped'
    var js = 'javascript';
    if (path.indexOf(js+':') === 0) {
        return '';
    }

    // if path is absolute, then just normalize and return
    if (path.match('^[a-zA-Z]+://')) {
        return urlparse.urlnormalize(path);
    }

    // interesting special case, a few very large websites use
    // '//foo/bar/' to mean 'http://foo/bar'
    if (path.match('^//')) {
        path = 'http:' + path;
    }

    // if base not passed in, try to get it from document
    // Ideally I would like the caller to pass in document.baseURI to
    //  make this more self-sufficient and testable
    if (!base && document) {
        base = document.baseURI;
    }

    // about:blank doesn't count
    if (base === 'about:blank'){
        base = '';
    }

    // if base is still empty, then we are in QA mode loading local
    // files.  Get current working directory
    if (!base) {
        base = 'file://' +  Envjs.getcwd() + '/';
    }
    // handles all cases if path is abosulte or relative to base
    // 3rd arg is "false" --> remove fragments
    var newurl = urlparse.urlnormalize(urlparse.urljoin(base, path, false));
    //console.log('uri %s %s = %s', base, path, newurl);
    return newurl;
};


/**
 * Used to write to a local file
 * @param {Object} text
 * @param {Object} url
 */
Envjs.writeToFile = function(text, url){};


/**
 * Used to write to a local file
 * @param {Object} text
 * @param {Object} suffix
 */
Envjs.writeToTempFile = function(text, suffix){};

/**
 * Used to read the contents of a local file
 * @param {Object} url
 */
Envjs.readFromFile = function(url){};

/**
 * Used to delete a local file
 * @param {Object} url
 */
Envjs.deleteFile = function(url){};


Envjs.connections = [];
Envjs.connections.addConnection = Envjs.sync(function(xhr){
    log.debug('registering connection.');
    Envjs.connections.push(xhr);
});
Envjs.connections.removeConnection = Envjs.sync(function(xhr){
    log.debug('unregistering connection.');
    var i;
    for(i = 0; i < Envjs.connections.length; i++){
        if(Envjs.connections[i] === xhr){
            Envjs.connections.splice(i,1);
            break;
        }
    }
    return;
});
/**
 * establishes connection and calls responsehandler
 * @param {Object} xhr
 * @param {Object} responseHandler
 * @param {Object} data
 */
Envjs.connection = function(xhr, responseHandler, data){};

Envjs.localXHR = function(url, xhr, connection, data){
    try{
        if ( "PUT" == xhr.method || "POST" == xhr.method ) {
            log.debug('writing to file %s', url);
            data =  data || "" ;
            Envjs.writeToFile(data, url);
            xhr.readyState = 4;
            //could be improved, I just cant recall the correct http codes
            xhr.status = 200;
            xhr.statusText = "";
        } else if ( xhr.method == "DELETE" ) {
            log.debug('deleting file %s', url);
            Envjs.deleteFile(url);
            xhr.readyState = 4;
            //could be improved, I just cant recall the correct http codes
            xhr.status = 200;
            xhr.statusText = "";
        } else {
            //try to add some canned headers that make sense
            log.debug('reading from file %s', url);
            xhr.readyState = 4;
            xhr.statusText = "ok";
            xhr.responseText = Envjs.readFromFile(url);
            try{
                if(url.match(/html$/)){
                    xhr.responseHeaders["Content-Type"] = 'text/html';
                }else if(url.match(/.xml$/)){
                    xhr.responseHeaders["Content-Type"] = 'text/xml';
                }else if(url.match(/.js$/)){
                    xhr.responseHeaders["Content-Type"] = 'text/javascript';
                }else if(url.match(/.json$/)){
                    xhr.responseHeaders["Content-Type"] = 'application/json';
                }else{
                    xhr.responseHeaders["Content-Type"] = 'text/plain';
                }
                //xhr.responseHeaders['Last-Modified'] = connection.getLastModified();
                //xhr.responseHeaders['Content-Length'] = headerValue+'';
                //xhr.responseHeaders['Date'] = new Date()+'';
            }catch(ee){
                log.error('failed to load response headers', ee);
            }
        }
    }catch(e){
        log.error('failed to open file %s %s', url, e);
        connection = null;
        xhr.readyState = 4;
        xhr.statusText = "Local File Protocol Error";
        xhr.responseText = "<html><head/><body><p>"+ e+ "</p></body></html>";
    }
};

__extend__(Envjs, urlparse);

}(/*Envjs.XMLHttpRequest.Core*/));
(function(){

var log = Envjs.logger('Envjs.Window');
Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Window');
});

/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent, aliasList){
    return (function(){return this;}());
};

Envjs.javaEnabled = false;

Envjs.homedir        = '';
Envjs.tmpdir         = '';
Envjs.os_name        = '';
Envjs.os_arch        = '';
Envjs.os_version     = '';
Envjs.lang           = '';
Envjs.platform       = '';

//some common user agents as constants so you can emulate them
Envjs.userAgents = {
    firefox3: 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
};

var __windows__ = {};

Envjs.windows = function(uuid, scope){
    var w;
    if(arguments.length === 0){
        return __windows__;
    }else if(arguments.length === 1){
        return __windows__.hasOwnProperty(uuid) ?
            __windows__[uuid] :
            null;
    }else if(arguments.length === 2){
        __windows__[uuid] = scope;
        if(scope === null){
            delete __windows__[uuid];
        }
    }
};
/**
 *
 * @param {Object} frameElement
 * @param {Object} url
 */
Envjs.loadFrame = function(frame, url){
    var w;
    try {
        //console.log('loading frame %s', url);
        if(frame.contentWindow && frame.contentWindow.close){
            //mark for garbage collection
            frame.contentWindow.close();
        }

        //create a new scope for the window proxy
        //platforms will need to override this function
        //to make sure the scope is global-like
        frame.contentWindow = Envjs.proxy({});
        //console.log("frame.ownerDocument %s subframe %s",
        //  frame.ownerDocument.location,
        //  frame.ownerDocument.__ownerFrame__);
        if(frame.ownerDocument&&frame.ownerDocument.__ownerFrame__){
            //console.log('frame is parent %s', frame.ownerDocument.__ownerFrame__.contentWindow.guid);
            w = new Window(frame.contentWindow, frame.ownerDocument.__ownerFrame__.contentWindow);
        }else{
            //log.debug("window is parent %s", window.guid);
            w = new Window(frame.contentWindow, window);
        }

        //I dont think frames load asynchronously in firefox
        //and I think the tests have verified this but for
        //some reason I'm less than confident... Are there cases?
        frame.contentDocument = frame.contentWindow.document;
        frame.contentDocument.async = false;
        frame.contentDocument.__ownerFrame__ = frame;
        if(url){
            log.debug('envjs.loadFrame async %s', frame.contentDocument.async);
            frame.contentDocument.location.assign(Envjs.uri(url, frame.ownerDocument.location.toString()));
        }
    } catch(e) {
        log.error("failed to load frame content: from %s %s", url, e);
    }
};


/**
 * unloadFrame
 * @param {Object} frame
 */
Envjs.unloadFrame = function(frame){
    var all, length, i;
    try{
        //TODO: probably self-referencing structures within a document tree
        //preventing it from being entirely garbage collected once orphaned.
        //Should have code to walk tree and break all links between contained
        //objects.
        frame.contentDocument = null;
        if(frame.contentWindow){
            //console.log('closing window %s', frame.contentWindow);
            frame.contentWindow.close();
        }
        Envjs.gc();
    }catch(e){
        console.log(e);
    }
};

/**
 * Platform clean up hook if it ever makes sense - see Envjs.unloadFrame for example
 */
Envjs.gc = function(){};

}());
/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
