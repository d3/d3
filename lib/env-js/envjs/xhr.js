
/*
 * Envjs xhr.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){




/*
 * Envjs xhr.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 * 
 * Parts of the implementation originally written by Yehuda Katz.
 * 
 * This file simply provides the global definitions we need to 
 * be able to correctly implement to core browser (XML)HTTPRequest 
 * interfaces.

This module leaks the following global definitions. 

var Location,
    XMLHttpRequest;

 */

var Envjs = Envjs || require('./platform/core').Envjs,
	Document = Document || require('./dom').Document;

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
 * These functions require network IO provided by XMLHttpRequest
 */
(function(){
	
var log = Envjs.logger();	
Envjs.once('tick', function(){
	log = Envjs.logger('Envjs.DOM.Document').
		info('doc logger available');
});

__extend__(Document.prototype,{
    load: function(url){
        if(this.documentURI == 'about:html'){
            this.location.assign(url);
        }else if(this.documentURI == url){
            this.location.reload(false);
        }else{
            this.location.replace(url);
        }
    },
    get location(){
        return this.ownerWindow.location;
    },
    set location(url){
        //very important or you will go into an infinite
        //loop when creating a xml document
        this.ownerWindow.location = url;
    }
});

}(/*Document/Location Mixin*/));
/**
 * Location
 *
 * Mozilla MDC:
 * https://developer.mozilla.org/En/DOM/Window.location
 * https://developer.mozilla.org/en/DOM/document.location
 *
 * HTML5: 6.10.4 The Location interface
 * http://dev.w3.org/html5/spec/Overview.html#location
 *
 * HTML5: 2.5.3 Interfaces for URL manipulation
 * http://dev.w3.org/html5/spec/Overview.html#url-decomposition-idl-attributes
 * All of section 2.5 is worth reading, but 2.5.3 contains very
 * detailed information on how getters/setter should work
 *
 * NOT IMPLEMENTED:
 *  HTML5: Section 6.10.4.1 Security -- prevents scripts from another domain
 *   from accessing most of the 'Location'
 *  Not sure if anyone implements this in HTML4
 */
(function(){
    
var log = Envjs.logger();
Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Location').
        debug('location logger available');
});
    
exports.Location = Location = function(url, doc, history) {
    log = log||Envjs.logger('Envjs.Location');
    log.debug('Location url %s', url);
    var $url = url,
        $document = doc ? doc : null,
        $history = history ? history : null;

    var parts = Envjs.urlsplit($url);

    return {
        get hash() {
            return parts.fragment ? '#' + parts.fragment : parts.fragment;
        },
        set hash(s) {
            if (s[0] === '#') {
                parts.fragment = s.substr(1);
            } else {
                parts.fragment = s;
            }
            $url = Envjs.urlunsplit(parts);
            if ($history) {
                $history.add($url, 'hash');
            }
        },

        get host() {
            return parts.netloc;
        },
        set host(s) {
            if (!s || s === '') {
                return;
            }

            parts.netloc = s;
            $url = Envjs.urlunsplit(parts);

            // this regenerates hostname & port
            parts = Envjs.urlsplit($url);

            if ($history) {
                $history.add( $url, 'host');
            }
            this.assign($url);
        },

        get hostname() {
            return parts.hostname;
        },
        set hostname(s) {
            if (!s || s === '') {
                return;
            }

            parts.netloc = s;
            if (parts.port != '') {
                parts.netloc += ':' + parts.port;
            }
            parts.hostname = s;
            $url = Envjs.urlunsplit(parts);
            if ($history) {
                $history.add( $url, 'hostname');
            }
            this.assign($url);
        },

        get href() {
            return $url;
        },
        set href(url) {
            $url = url;
            if ($history) {
                $history.add($url, 'href');
            }
            this.assign($url);
        },

        get pathname() {
            return parts.path;
        },
        set pathname(s) {
            if (s[0] === '/') {
                parts.path = s;
            } else {
                parts.path = '/' + s;
            }
            $url = Envjs.urlunsplit(parts);

            if ($history) {
                $history.add($url, 'pathname');
            }
            this.assign($url);
        },

        get port() {
            // make sure it's a string
            return '' + parts.port;
        },
        set port(p) {
            // make a string
            var s = '' + p;
            parts.port = s;
            parts.netloc = parts.hostname + ':' + parts.port;
            $url = Envjs.urlunsplit(parts);
            if ($history) {
                $history.add( $url, 'port');
            }
            this.assign($url);
        },

        get protocol() {
            return parts.scheme + ':';
        },
        set protocol(s) {
            var i = s.indexOf(':');
            if (i != -1) {
                s = s.substr(0,i);
            }
            parts.scheme = s;
            $url = Envjs.urlunsplit(parts);
            if ($history) {
                $history.add($url, 'protocol');
            }
            this.assign($url);
        },

        get search() {
            return (parts.query) ? '?' + parts.query : parts.query;
        },
        set search(s) {
            if (s[0] == '?') {
                s = s.substr(1);
            }
            parts.query = s;
            $url = Envjs.urlunsplit(parts);
            if ($history) {
                $history.add($url, 'search');
            }
            this.assign($url);
        },

        toString: function() {
            return $url;
        },

        assign: function(url, /*non-standard*/ method, data) {
            var _this = this,
                xhr,
                event;
            method = method||"GET";
            data = data||null;
            log.debug('assigning %s',url);

            //we can only assign if this Location is associated with a document
            if ($document) {
                log.debug('fetching %s (async? %s)', url, $document.async);
                xhr = new XMLHttpRequest();
                
                xhr.setRequestHeader('Referer', $document.location);
                log.debug("REFERER: %s", $document.location);
                // TODO: make async flag a Envjs paramter
                xhr.open(method, url, false);//$document.async);

                // TODO: is there a better way to test if a node is an HTMLDocument?
                if ($document.toString() === '[object HTMLDocument]') {
                    //tell the xhr to not parse the document as XML
                    log.debug('loading html document');
                    xhr.onreadystatechange = function() {
                        log.debug('readyState %s', xhr.readyState);
                        if (xhr.readyState === 4) {
                            switch(xhr.status){
                            case 301:
                            case 302:
                            case 303:
                            case 305:
                            case 307:
                                log.debug('status is not good for assignment %s', xhr.status);
                                break;
                            default:
                                log.debug('status is good for assignment %s', xhr.status);
                                $url = xhr.url;
                                parts = Envjs.urlsplit($url);
                                log.debug('new document location %s', xhr.url);
                                Envjs.exchangeHTMLDocument($document, xhr.responseText, xhr.url);
                            }
                        }
                    };
                    try{
                        xhr.send(data, false);//dont parse html
                    }catch(e){
                        log.debug('failed to load content %s', e);
                        Envjs.exchangeHTMLDocument(
                            $document, 
                            "<html><head><title>Error Loading</title></head><body>"+e+"</body></html>",
                            xhr.url
                        );
                    }
                } else {
                    //Treat as an XMLDocument
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            log.debug('exchanging xml content %s', e);
                            $document = xhr.responseXML;
                            $document.baseURI = xhr.url;
                            if ($document.createEvent) {
                                event = $document.createEvent('Event');
                                event.initEvent('DOMContentLoaded');
                                $document.dispatchEvent( event, false );
                            }
                        }
                    };
                    xhr.send();
                }
            }//end if($document)
        },
        reload: function(forceget) {
            //for now we have no caching so just proxy to assign
            log.debug('reloading %s',$url);
            this.assign($url);
        },
        replace: function(url, /*non-standard*/ method, data) {
            this.assign(url, method, data);
        }
    };
};

}(/*Location*/));
/**
 *
 * @class XMLHttpRequest
 * @author Originally implemented by Yehuda Katz
 *
 */
    
(function(){
    
// this implementation can be used without requiring a DOMParser
// assuming you dont try to use it to get xml/html documents
var domparser,
    log = Envjs.logger();
    
Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.XMLHttpRequest').
        debug('xhr logger available');
});

exports.XMLHttpRequest = XMLHttpRequest = function(){
    this.headers = {};
    this.responseHeaders = {};
    this.aborted = false;//non-standard
};

// defined by the standard: http://www.w3.org/TR/XMLHttpRequest/#xmlhttprequest
// but not provided by Firefox.  Safari and others do define it.
XMLHttpRequest.UNSENT = 0;
XMLHttpRequest.OPEN = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

XMLHttpRequest.prototype = {
    open: function(method, url, async, user, password){
        log.debug('opening xhr %s %s %s', method, url, async);
        this.readyState = 1;
        this.async = (async === false)?false:true;
        this.method = method || "GET";
        this.url = Envjs.uri(url);
        this.onreadystatechange();
    },
    setRequestHeader: function(header, value){
        this.headers[header] = value;
    },
    send: function(data, parsedoc/*non-standard*/, redirect_count){
        var _this = this;
        log.debug('sending request for url %s', this.url);
        parsedoc = (parsedoc === undefined)?true:!!parsedoc;
        redirect_count = (redirect_count === undefined) ? 0 : redirect_count;
        function makeRequest(){
            var cookie = Envjs.getCookies(_this.url),
                redirecting = false;
            if(cookie){
                _this.setRequestHeader('COOKIE', cookie);
            }
            if(window&&window.navigator&&window.navigator.userAgent){
                _this.setRequestHeader('User-Agent', window.navigator.userAgent);
            }
            
            log.debug('establishing platform native connection %s', _this.url);
            Envjs.connection(_this, function(){
                log.debug('callback remove xhr from network queue');
                Envjs.connections.removeConnection(_this);
                if (!_this.aborted){
                    var doc = null,
                        domparser,
                        cookie,
                        contentType,
                        location;
                    
                    try{
                        cookie = _this.getResponseHeader('SET-COOKIE');
                        if(cookie){
                            Envjs.setCookie(_this.url, cookie);
                        }
                    }catch(e){
                        log.warn("Failed to set cookie");
                    }
                    //console.log('status : %s', _this.status);
                    switch(_this.status){
                        case 301:
                        case 302:
                        case 303:
                        case 305:
                        case 307:
                        if(_this.getResponseHeader('Location') && redirect_count < 20){
                            //follow redirect and copy headers
                            redirecting = true;
                            location = _this.getResponseHeader('Location');
                            log.debug('following %s redirect %s from %s url %s', 
                                redirect_count, 
                                _this.status, 
                                _this.url, 
                                location);
                            _this.url = Envjs.uri(location);
                            //remove current cookie headers to allow the redirect to determine
                            //the currect cookie based on the new location
                            if('Cookie' in _this.headers ){
                                delete _this.headers.Cookie;
                            }
                            if('Cookie2' in _this.headers ){
                                delete _this.headers.Cookie2;
                            }
                            redirect_count++;
                            if (_this.async){
                                //TODO: see TODO notes below
                                Envjs.runAsync(makeRequest);
                            }else{
                                makeRequest();
                            }
                            return;
                        }break;
                        default:
                        // try to parse the document if we havent explicitly set a
                        // flag saying not to and if we can assure the text at least
                        // starts with valid xml
                        contentType = _this.getResponseHeader('Content-Type');
                        log.debug("response content-type : %s", contentType);
                        if ( parsedoc && 
                             contentType && 
                             contentType.indexOf('xml') > -1 &&
                            _this.responseText.match(/^\s*</) ) {
    
                            domparser = domparser||new DOMParser();
                            try {
                                log.debug("parsing response text into xml document");
                                doc = domparser.parseFromString(_this.responseText+"", 'text/xml');
                            } catch(ee) {
                                //Envjs.error('response XML does not appear to be well formed xml', e);
                                log.error('parseerror \n%s', ee);
                                doc = document.implementation.createDocument('','error',null);
                                doc.appendChild(doc.createTextNode(ee+''));
                            }

                        }else{
                            log.debug('response XML does not appear to be xml');
                        }

                        _this.__defineGetter__("responseXML", function(){
                            return doc;
                        });
                            
                    }
                }
            }, data);

            if (!_this.aborted  && !redirecting){
                log.debug('did not abort and not redirecting so calling onreadystatechange');
                _this.onreadystatechange();
            }

        }//end makeRequest
        
        log.debug('requesting async: %s', this.url);
        Envjs.connections.addConnection(this);
        if (this.async){
            //DONE: what we really need to do here is rejoin the
            //      current thread and call onreadystatechange via
            //      setTimeout so the callback is essentially applied
            //      at the end of the current callstack
            Envjs.runAsync(makeRequest);
        }else{
            log.debug('requesting sync: %s', this.url);
            makeRequest();
        }
    },
    abort: function(){
        this.aborted = true;
    },
    onreadystatechange: function(){
        //Instance specific
    },
    getResponseHeader: function(header){
        log.debug('getting response header %s', header);
        var rHeader, returnedHeaders;
        if (this.readyState < 3){
            throw new Error("INVALID_STATE_ERR");
        } else {
            returnedHeaders = [];
            log.debug('searching response headers for %s ', header);
            for (rHeader in this.responseHeaders) {
                if ((rHeader+'').match(new RegExp(header, "i"))) {
                    log.debug('found response header, %s is %s', rHeader, header);
                    returnedHeaders.push(this.responseHeaders[rHeader]);
                }
            }

            if (returnedHeaders.length){
                returnedHeaders = returnedHeaders.join(", ");
                log.debug('got response header %s', returnedHeaders);
                return returnedHeaders;
            }
        }   
        return null;
    },
    getAllResponseHeaders: function(){
        var header, returnedHeaders = [];
        if (this.readyState < 3){
            throw new Error("INVALID_STATE_ERR");
        } else {
            for (header in this.responseHeaders) {
                if(this.responseHeader.hasOwnProperty(header)){
                    returnedHeaders.push( header + ": " + this.responseHeaders[header] );
                }
            }
        }
        return returnedHeaders.join("\r\n");
    },
    async: true,
    readyState: 0,
    responseText: "",
    status: 0,
    statusText: ""
};

}(/*XMLHttpREquest*/));
/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
