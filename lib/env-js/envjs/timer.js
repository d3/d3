
/*
 * Envjs timer.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){





/*
 * Envjs timer.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 * 
 * Parts of the implementation were originally written by:\
 * Steven Parkes
 * 
 * requires Envjs.wait, Envjs.sleep, Envjs.WAIT_INTERVAL

This module leaks the following global definitions. 

var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

 */ 

var Envjs = require('envjs/platform/core').Envjs;
/*
*   - timer.js
*/
(function(){
	
var log = Envjs.logger();
Envjs.once('tick', function(){
	log = Envjs.logger('Envjs.Timer').
		debug('timer logger available');
});

/**
 * @function setTimeout
 * @param {Object} fn
 * @param {Object} time
 */
exports.setTimeout = setTimeout = function(fn, time){
	log.debug('setTimeout %s', time);
	return Envjs.timers.addTimerOrInterval(fn, time, 'timeout');
};

/**
 * clearTimeout
 * @param {Object} id
 */
exports.clearTimeout = clearTimeout = function(id){	
	log.debug('clearTimeout %s', id);
	return Envjs.timers.removeTimerOrInterval(id, 'timeout');
};

/**
 * @function setInterval
 * @param {Object} fn
 * @param {Object} time
 */
exports.setInterval = setInterval = function(fn, time){
	log.debug('setInterval %s', time);
	return Envjs.timers.addTimerOrInterval(fn, time, 'interval');
};

/**
 * clearInterval
 * @param {Object} id
 */
exports.clearInterval = clearInterval = function(id){
	log.debug('clearInterval %s', id);	
	return Envjs.timers.removeTimerOrInterval(id, 'interval');
};

}(/*Timer*/));
/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
