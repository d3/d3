/*
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 *
 * This file simply provides the global definitions we need to
 * be able to correctly implement to core browser DOM HTML interfaces.

 // These are exported/leaked globally

    HTMLDocument,
    HTMLElement,
    HTMLCollection,
    HTMLAnchorElement,
    HTMLAreaElement,
    HTMLBaseElement,
    HTMLQuoteElement,
    HTMLBodyElement,
    HTMLBRElement,
    HTMLButtonElement,
    CanvasRenderingContext2D,
    HTMLCanvasElement,
    HTMLTableColElement,
    HTMLModElement,
    HTMLDivElement,
    HTMLDListElement,
    HTMLFieldSetElement,
    HTMLFormElement,
    HTMLFrameElement,
    HTMLFrameSetElement,
    HTMLHeadElement,
    HTMLHeadingElement,
    HTMLHRElement,
    HTMLHtmlElement,
    HTMLIFrameElement,
    HTMLImageElement,
    HTMLInputElement,
    HTMLLabelElement,
    HTMLLegendElement,
    HTMLLIElement,
    HTMLLinkElement,
    HTMLMapElement,
    HTMLMetaElement,
    HTMLObjectElement,
    HTMLOListElement,
    HTMLOptGroupElement,
    HTMLOptionElement,
    HTMLParagraphElement,
    HTMLParamElement,
    HTMLPreElement,
    HTMLScriptElement,
    HTMLSelectElement,
    HTMLSpanElement,
    HTMLStyleElement,
    HTMLTableElement,
    HTMLTableSectionElement,
    HTMLTableCellElement,
    HTMLTableDataCellElement,
    HTMLTableHeaderCellElement,
    HTMLTableRowElement,
    HTMLTextAreaElement,
    HTMLTitleElement,
    HTMLUListElement,
    HTMLUnknownElement,
    Image,
    Option,
    __loadImage__,
    __loadLink__;
*/

var Envjs = Envjs || require('./platform/core').Envjs,
	After = After || require('./platform/core').After,
	Document = Document || require('./dom').Document,
	Element = Element || require('./dom').Element,
	NodeList = NodeList || require('./dom').NodeList,
	Node = Node || require('./dom').Node,
	Event = Event || require('./event').Event;
	
/*
 * Envjs html.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){





/**
 * @author ariel flesler
 *    http://flesler.blogspot.com/2008/11/fast-trim-function-for-javascript.html
 * @param {Object} str
 */
function __trim__( str ){
    return (str || "").replace( /^\s+|\s+$/g, "" );
}


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
 * @author john resig
 */
//from jQuery
function __setArray__( target, array ) {
    // Resetting the length to 0, then using the native Array push
    // is a super-fast way to populate an object with array-like properties
    target.length = 0;
    Array.prototype.push.apply( target, array );
}
var __addNamedMap__,
    __removeNamedMap__,
    __isNamedElement__,
    __selectparent__ ,//see option.js
    __updateoptions__, //see option.js
    __loadLink__; //see link.js 
/**
 * @class  HTMLDocument
 *      The Document interface represents the entire HTML or XML document.
 *      Conceptually, it is the root of the document tree, and provides
 *      the primary access to the document's data.
 *
 * @extends Document
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLDocument').
        debug('HTMLDocument available');    
});

exports.HTMLDocument = HTMLDocument = function(implementation, ownerWindow, referrer) {
    Document.apply(this, arguments);
    this.referrer = referrer || '';
    this.baseURI = "about:blank";
    this.ownerWindow = ownerWindow;
};

HTMLDocument.prototype = new Document();

__extend__(HTMLDocument.prototype, {
    createElement: function(tagName){
        var node;
        tagName = tagName.toUpperCase();
        // create Element specifying 'this' as ownerDocument
        // This is an html document so we need to use explicit interfaces per the
        //TODO: would be much faster as a big switch
        switch(tagName){
        case "A":
            node = new HTMLAnchorElement(this);break;
        case "AREA":
            node = new HTMLAreaElement(this);break;
        case "BASE":
            node = new HTMLBaseElement(this);break;
        case "BLOCKQUOTE":
            node = new HTMLQuoteElement(this);break;
        case "CANVAS":
            node = new HTMLCanvasElement(this);break;
        case "Q":
            node = new HTMLQuoteElement(this);break;
        case "BODY":
            node = new HTMLBodyElement(this);break;
        case "BR":
            node = new HTMLBRElement(this);break;
        case "BUTTON":
            node = new HTMLButtonElement(this);break;
        case "CAPTION":
            node = new HTMLElement(this);break;
        case "COL":
            node = new HTMLTableColElement(this);break;
        case "COLGROUP":
            node = new HTMLTableColElement(this);break;
        case "DEL":
            node = new HTMLModElement(this);break;
        case "INS":
            node = new HTMLModElement(this);break;
        case "DIV":
            node = new HTMLDivElement(this);break;
        case "DL":
            node = new HTMLDListElement(this);break;
        case "DT":
            node = new HTMLElement(this); break;
        case "FIELDSET":
            node = new HTMLFieldSetElement(this);break;
        case "FORM":
            node = new HTMLFormElement(this);break;
        case "FRAME":
            node = new HTMLFrameElement(this);break;
        case "FRAMESET":
            node = new HTMLFrameSetElement(this);break;
        case "H1":
            node = new HTMLHeadingElement(this);break;
        case "H2":
            node = new HTMLHeadingElement(this);break;
        case "H3":
            node = new HTMLHeadingElement(this);break;
        case "H4":
            node = new HTMLHeadingElement(this);break;
        case "H5":
            node = new HTMLHeadingElement(this);break;
        case "H6":
            node = new HTMLHeadingElement(this);break;
        case "HEAD":
            node = new HTMLHeadElement(this);break;
        case "HR":
            node = new HTMLHRElement(this);break;
        case "HTML":
            node = new HTMLHtmlElement(this);break;
        case "IFRAME":
            node = new HTMLIFrameElement(this);break;
        case "IMG":
            node = new HTMLImageElement(this);break;
        case "INPUT":
            node = new HTMLInputElement(this);break;
        case "LABEL":
            node = new HTMLLabelElement(this);break;
        case "LEGEND":
            node = new HTMLLegendElement(this);break;
        case "LI":
            node = new HTMLLIElement(this);break;
        case "LINK":
            node = new HTMLLinkElement(this);break;
        case "MAP":
            node = new HTMLMapElement(this);break;
        case "META":
            node = new HTMLMetaElement(this);break;
        case "NOSCRIPT":
            node = new HTMLElement(this);break;
        case "OBJECT":
            node = new HTMLObjectElement(this);break;
        case "OPTGROUP":
            node = new HTMLOptGroupElement(this);break;
        case "OL":
            node = new HTMLOListElement(this); break;
        case "OPTION":
            node = new HTMLOptionElement(this);break;
        case "P":
            node = new HTMLParagraphElement(this);break;
        case "PARAM":
            node = new HTMLParamElement(this);break;
        case "PRE":
            node = new HTMLPreElement(this);break;
        case "SCRIPT":
            node = new HTMLScriptElement(this);break;
        case "SELECT":
            node = new HTMLSelectElement(this);break;
        case "SMALL":
            node = new HTMLElement(this);break;
        case "SPAN":
            node = new HTMLSpanElement(this);break;
        case "STRONG":
            node = new HTMLElement(this);break;
        case "STYLE":
            node = new HTMLStyleElement(this);break;
        case "TABLE":
            node = new HTMLTableElement(this);break;
        case "TBODY":
            node = new HTMLTableSectionElement(this);break;
        case "TFOOT":
            node = new HTMLTableSectionElement(this);break;
        case "THEAD":
            node = new HTMLTableSectionElement(this);break;
        case "TD":
            node = new HTMLTableDataCellElement(this);break;
        case "TH":
            node = new HTMLTableHeaderCellElement(this);break;
        case "TEXTAREA":
            node = new HTMLTextAreaElement(this);break;
        case "TITLE":
            node = new HTMLTitleElement(this);break;
        case "TR":
            node = new HTMLTableRowElement(this);break;
        case "UL":
            node = new HTMLUListElement(this);break;
        default:
            node = new HTMLUnknownElement(this);
        }
        // assign values to properties (and aliases)
        node.nodeName  = tagName;
        return node;
    },
    createElementNS : function (uri, local) {
        //print('createElementNS :'+uri+" "+local);
        if(!uri){
            return this.createElement(local);
        }else if ("http://www.w3.org/1999/xhtml" == uri) {
            return this.createElement(local);
        } else if ("http://www.w3.org/1998/Math/MathML" == uri) {
            return this.createElement(local);
        } else if ("http://www.w3.org/2000/svg" == uri) {
            return this.createElement(local);
        } else {
            return Document.prototype.createElementNS.apply(this,[uri, local]);
        }
    },
    get anchors(){
        return new HTMLCollection(this.getElementsByTagName('a'));
    },
    get applets(){
        return new HTMLCollection(this.getElementsByTagName('applet'));
    },
    get documentElement(){
        var html = Document.prototype.__lookupGetter__('documentElement').apply(this,[]);
        if( html === null){
            html = this.createElement('html');
            this.appendChild(html);
            html.appendChild(this.createElement('head'));
            html.appendChild(this.createElement('body'));
        }
        return html;
    },
    //document.head is non-standard
    get head(){
        //console.log('get head');
        if (!this.documentElement) {
            this.appendChild(this.createElement('html'));
        }
        var element = this.documentElement,
            length = element.childNodes.length,
            i;
        //check for the presence of the head element in this html doc
        for(i=0;i<length;i++){
            if(element.childNodes[i].nodeType === Node.ELEMENT_NODE){
                if(element.childNodes[i].tagName.toLowerCase() === 'head'){
                    return element.childNodes[i];
                }
            }
        }
        //no head?  ugh bad news html.. I guess we'll force the issue?
        var head = element.appendChild(this.createElement('head'));
        return head;
    },
    get title(){
        //console.log('get title');
        if (!this.documentElement) {
            this.appendChild(this.createElement('html'));
        }
        var title,
            head = this.head,
            length = head.childNodes.length,
            i;
        //check for the presence of the title element in this head element
        for(i=0;i<length;i++){
            if(head.childNodes[i].nodeType === Node.ELEMENT_NODE){
                if(head.childNodes[i].tagName.toLowerCase() === 'title'){
                    return head.childNodes[i].textContent;
                }
            }
        }
        //no title?  ugh bad news html.. I guess we'll force the issue?
        title = head.appendChild(this.createElement('title'));
        return title.appendChild(this.createTextNode('Untitled Document')).nodeValue;
    },
    set title(titleStr){
        //console.log('set title %s', titleStr);
        if (!this.documentElement) {
            this.appendChild(this.createElement('html'));
        }
        var title = this.title;
        title.textContent = titleStr;
    },

    get body() {
        var element = this.documentElement,
            length = element.childNodes.length,
            i;
        for (i=0; i<length; i++) {
            if (element.childNodes[i].nodeType === Node.ELEMENT_NODE &&
                (element.childNodes[i].tagName === 'BODY' || 
                 element.childNodes[i].tagName === 'FRAMESET')) {
                return element.childNodes[i];
            }
        }
        return null;
    },
    set body() {
        /* in firefox this is a benevolent do nothing*/
        console.log('set body');
    },

    get cookie(){
        return Envjs.getCookies(this.location+'');
    },
    set cookie(cookie){
        return Envjs.setCookie(this.location+'', cookie);
    },

    /**
     * document.location
     *
     * should be identical to window.location
     *
     * HTML5:
     * http://dev.w3.org/html5/spec/Overview.html#the-location-interface
     *
     * Mozilla MDC:
     * https://developer.mozilla.org/en/DOM/document.location
     *
     */
    get location() {
        if (this.ownerWindow) {
            return this.ownerWindow.location;
        } else {
            return this.baseURI;
        }
    },
    set location(url) {
        this.baseURI = url;
        if (this.ownerWindow) {
            this.ownerWindow.location = url;
        }
    },

    /**
     * document.URL (read-only)
     *
     * HTML DOM Level 2:
     * http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-46183437
     *
     * HTML5:
     * http://dev.w3.org/html5/spec/Overview.html#dom-document-url
     *
     * Mozilla MDC:
     * https://developer.mozilla.org/en/DOM/document.URL
     */
    get URL() {
        return this.location.href;
    },

    /**
     * document.domain
     *
     * HTML5 Spec:
     * http://dev.w3.org/html5/spec/Overview.html#dom-document-domain
     *
     * Mozilla MDC:
     * https://developer.mozilla.org/en/DOM/document.domain
     *
     */
    get domain(){
        var HOSTNAME = new RegExp('//([^:/]+)'),
            matches = HOSTNAME.exec(this.baseURI);
        return matches&&matches.length>1?matches[1]:"";
    },
    set domain(value){
        var i,
            domainParts = this.domain.split('.').reverse(),
            newDomainParts = value.split('.').reverse();
        if(newDomainParts.length > 1){
            for(i=0;i<newDomainParts.length;i++){
                if(newDomainParts[i] !== domainParts[i]){
                    return;
                }
            }
            this.baseURI = this.baseURI.replace(domainParts.join('.'), value);
        }
    },

    get forms(){
        return new HTMLCollection(this.getElementsByTagName('form'));
    },
    get images(){
        return new HTMLCollection(this.getElementsByTagName('img'));
    },
    get lastModified(){
        /* TODO */
        return this._lastModified;
    },
    get links(){
        return new HTMLCollection(this.getElementsByTagName('a'));
    },
    getElementsByName : function(name){
        //console.log('getting elements for name %s', name);
        if(!(this._indexes_['@'+name])){
            this._indexes_["@"+name] = new NodeList(this, this.documentElement);
        }
        return this._indexes_["@"+name];
    },
    toString: function(){
        return "[object HTMLDocument]";
    },
    get innerHTML(){
        return this.documentElement.outerHTML;
    }
});

}(/*HTMLDocument*/));

Aspect.around({
    target: Node,
    method:"appendChild"
}, function(invocation) {
    var event,
        okay,
        node = invocation.proceed(),
        doc = node.ownerDocument,
        target;

    //console.log('element appended: %s %s %s', node+'', node.nodeName, node.namespaceURI);
    if((node.nodeType !== Node.ELEMENT_NODE)){
        //for now we are only handling element insertions.  probably
        //we will need to handle text node changes to script tags and
        //changes to src attributes
        return node;
    }
    
    if(node.tagName&&node.tagName.toLowerCase()=="input"){
        target = node.parentNode;
        //console.log('adding named map for input');
        while(target&&target.tagName&&target.tagName.toLowerCase()!="form"){
            //console.log('possible target for named map for input is %s', target);
            target = target.parentNode;
        }
        if(target){
            //console.log('target for named map for input is %s', target);
            __addNamedMap__(target, node);
        }
    }
    //console.log('appended html element %s %s %s', node.namespaceURI, node.nodeName, node);
    switch(doc.parsing){
        case true:

            /**
             * Very special case.  While in parsing mode, in head, a
             * script can add another script tag to the head, and it will
             * be evaluated.  This is tested in 'ant fulldoc-spec' tests.
             *
             * Not quite sure if the require that the new script tag must
             * be in the head is correct or not.  NamespaceURI == null
             * might also need to corrected too.
             */
            if (node.tagName.toLowerCase() === 'script' && 
                (node.namespaceURI === "" || 
                 node.namespaceURI === "http://www.w3.org/1999/xhtml" || 
                 node.namespaceURI === null) ) {
                //console.log('appending script while parsing');
                if((this.nodeName.toLowerCase() === 'head')){
                    try{
                        okay = Envjs.loadLocalScript(node, null);
                        //console.log('loaded script? %s %s', node.uuid, okay);
                        // only fire event if we actually had something to load
                        if (node.src && node.src.length > 0){
                            event = doc.createEvent('HTMLEvents');
                            event.initEvent( okay ? "load" : "error", false, false );
                            node.dispatchEvent( event, false );
                        }
                    }catch(e){
                        console.log('error loading html element %s %e', node, e.toString());
                    }
                }
            }
            break;
        case false:
            switch(node.namespaceURI){
                case null:
                    //fall through
                case "":
                    //fall through
                case "http://www.w3.org/1999/xhtml":
                    switch(node.tagName.toLowerCase()){
                        case 'style':
                            document.styleSheets.push(new CSSStyleSheet(node));
                            break;
                        case 'script':
                            //console.log('appending script %s', node.src);
                            if((this.nodeName.toLowerCase() === 'head')){
                                try{
                                    okay = Envjs.loadLocalScript(node, null);
                                    //console.log('loaded script? %s %s', node.uuid, okay);
                                    // only fire event if we actually had something to load
                                    if (node.src && node.src.length > 0){
                                        event = doc.createEvent('HTMLEvents');
                                        event.initEvent( okay ? "load" : "error", false, false );
                                        node.dispatchEvent( event, false );
                                    }
                                }catch(ee){
                                    console.log('error loading html element %s %e', node, ee.toString());
                                }
                            }
                            break;
                        case 'frame':
                        case 'iframe':
                            node.contentWindow = { };
                            node.contentDocument = new HTMLDocument(new DOMImplementation(), node.contentWindow);
                            node.contentWindow.document = node.contentDocument;
                            try{
                                if(Window){
                                    //console.log("iframe appended to document %s", node);
                                }
                            }catch(eee){
                                node.contentDocument.addEventListener('DOMContentLoaded', function(){
                                    event = node.contentDocument.createEvent('HTMLEvents');
                                    event.initEvent("load", false, false);
                                    node.dispatchEvent( event, false );
                                });
                                console.log('error loading html element %s %e', node, eee.toString());
                            }
                            try{
                                if (node.src && node.src.length > 0){
                                    //console.log("trigger load on frame from appendChild %s", node.src);
                                    Envjs.loadFrame(node, Envjs.uri(node.src, doc.location+''));
                                }else{
                                    Envjs.loadFrame(node);
                                }
                            }catch(_e){
                                console.log('error loading html element %s %e', node, _e.toString());
                            }
                            break;

                        case 'link':
                            if (node.href && node.href.length > 0) {
                                Envjs.loadLink(node, node.href);
                            }
                            break;
                            /*
                              case 'img':
                              if (node.src && node.src.length > 0){
                              // don't actually load anything, so we're "done" immediately:
                              event = doc.createEvent('HTMLEvents');
                              event.initEvent("load", false, false);
                              node.dispatchEvent( event, false );
                              }
                              break;
                            */
                        case 'option':
                            __updateoptions__(node);
                            break;
                        default:
                            if(node.getAttribute('onload')){
                                //console.log('calling attribute onload %s | %s', node.onload, node.tagName);
                                node.onload();
                            }
                    }//switch on name
                    break;
                default:
                    break;
            }//switch on ns
            break;
        default:
            break;
            // console.log('element appended: %s %s', node+'', node.namespaceURI);
    }//switch on doc.parsing
    return node;

});

Aspect.around({
    target: Node,
    method:"removeChild"
}, function(invocation) {
    var event,
        okay,
        target,
        node = invocation.proceed(),
        doc = node.ownerDocument;
    if((node.nodeType !== Node.ELEMENT_NODE)){
        //for now we are only handling element insertions.  probably we will need
        //to handle text node changes to script tags and changes to src
        //attributes
        if(node.nodeType !== Node.DOCUMENT_NODE && node.uuid){
            //console.log('removing event listeners, %s', node, node.uuid);
            node.removeEventListener('*', null, null);
        }
        return node;
    }
    //console.log('appended html element %s %s %s', node.namespaceURI, node.nodeName, node);
    if(node.tagName&&node.tagName.toLowerCase()=="input"){
        target = node.parentNode;
        //console.log('adding named map for input');
        while(target&&target.tagName&&target.tagName.toLowerCase()!="form"){
            //console.log('possible target for named map for input is %s', target);
            target = target.parentNode;
        }
        if(target){
            //console.log('target for named map for input is %s', target);
            __removeNamedMap__(target, node);
        }
    }
    switch(doc.parsing){
        case true:
            //handled by parser if included
            break;
        case false:
            switch(node.namespaceURI){
                case null:
                    //fall through
                case "":
                    //fall through
                case "http://www.w3.org/1999/xhtml":
                    //this is interesting dillema since our event engine is
                    //storing the registered events in an array accessed
                    //by the uuid property of the node.  unforunately this
                    //means listeners hang out way after(forever ;)) the node
                    //has been removed and gone out of scope.
                    //console.log('removing event listeners, %s', node, node.uuid);
                    node.removeEventListener('*', null, null);
                    switch(node.tagName.toLowerCase()){
                        case 'frame':
                        case 'iframe':
                            try{
                                //console.log('removing iframe document');
                                try{
                                    Envjs.unloadFrame(node);
                                }catch(ee){
                                    console.log('error freeing resources from frame %s', ee);
                                }
                                node.contentWindow = null;
                                node.contentDocument = null;
                            }catch(e){
                                console.log('error unloading html element %s %e', node, e.toString());
                            }
                            break;
                        default:
                    }//switch on name
                    break;
                default:
            }//switch on ns
            break;
        default:
            console.log('element appended: %s %s', node+'', node.namespaceURI);
    }//switch on doc.parsing
    return node;

});



/**
 * Named Element Support
 *
 *
 */

/*
 *
 * @returns 'name' if the node has a appropriate name
 *          null if node does not have a name
 */

__isNamedElement__ = function(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }
    var tagName = node.tagName.toLowerCase();
    var nodename = null;

    switch (tagName) {
        case 'embed':
        case 'form':
        case 'iframe':
        case 'input':
            nodename = node.getAttribute('name');
            break;
        case 'applet':
            nodename = node.id;
            break;
        case 'object':
            // TODO: object needs to be 'fallback free'
            nodename = node.id;
            break;
        case 'img':
            nodename = node.id;
            if (!nodename || ! node.getAttribute('name')) {
                nodename = null;
            }
            break;
    }
    return (nodename) ? nodename : null;
};


__addNamedMap__ = function(target, node) {
    var nodename = __isNamedElement__(node);
    if (nodename) {
        target.__defineGetter__(nodename, function() {
            return node;
        }); 
        target.__defineSetter__(nodename, function(value) {
            return value;
        });
    }
};

__removeNamedMap__ = function(target, node) {
    if (!node) {
        return;
    }
    var nodename = __isNamedElement__(node);
    if (nodename) {
        delete target[nodename];
    }
};



/**
 * @name HTMLEvents
 * @w3c:domlevel 2
 * @uri http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 */

var __eval__ = function(script, node){
    if (script !== "" && Envjs.scriptTypes['']){
        // don't assemble environment if no script...
        try{
            Envjs['eval'](node.ownerDocument.ownerWindow, script, script+" ("+node+")");
        }catch(e){
            console.log('error evaluating %s', e);
        }
    }
};

var HTMLEvents = function(){};
HTMLEvents.prototype = {
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    },
    onunload: function(event){
        __eval__(this.getAttribute('onunload')||'', this);
    },
    onabort: function(event){
        __eval__(this.getAttribute('onabort')||'', this);
    },
    onerror: function(event){
        __eval__(this.getAttribute('onerror')||'', this);
    },
    onselect: function(event){
        __eval__(this.getAttribute('onselect')||'', this);
    },
    onchange: function(event){
        __eval__(this.getAttribute('onchange')||'', this);
    },
    onsubmit: function(event){
        if (__eval__(this.getAttribute('onsubmit')||'', this)) {
            this.submit();
        }
    },
    onreset: function(event){
        __eval__(this.getAttribute('onreset')||'', this);
    },
    onfocus: function(event){
        __eval__(this.getAttribute('onfocus')||'', this);
    },
    onblur: function(event){
        __eval__(this.getAttribute('onblur')||'', this);
    },
    onresize: function(event){
        __eval__(this.getAttribute('onresize')||'', this);
    },
    onscroll: function(event){
        __eval__(this.getAttribute('onscroll')||'', this);
    }
};

//HTMLDocument, HTMLFramesetElement, HTMLObjectElement
var  __load__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("load", false, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLFramesetElement, HTMLBodyElement
var  __unload__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("unload", false, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLObjectElement
var  __abort__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("abort", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLFramesetElement, HTMLObjectElement, HTMLBodyElement
var  __error__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("error", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLInputElement, HTMLTextAreaElement
var  __select__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("select", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
var  __change__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("change", true, false);
    element.dispatchEvent(event);
    return event;
};

//HtmlFormElement
var __submit__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("submit", true, true);
    element.dispatchEvent(event);
    return event;
};

//HtmlFormElement
var  __reset__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("reset", false, false);
    element.dispatchEvent(event);
    return event;
};

//LABEL, INPUT, SELECT, TEXTAREA, and BUTTON
var __focus__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("focus", false, false);
    element.dispatchEvent(event);
    return event;
};

//LABEL, INPUT, SELECT, TEXTAREA, and BUTTON
var __blur__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("blur", false, false);
    element.dispatchEvent(event);
    return event;
};

//Window
var __resize__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("resize", true, false);
    element.dispatchEvent(event);
    return event;
};

//Window
var __scroll__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("scroll", true, false);
    element.dispatchEvent(event);
    return event;
};

/**
 * @name KeyboardEvents
 * @w3c:domlevel 2 
 * @uri http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 */
var KeyboardEvents= function(){};
KeyboardEvents.prototype = {
    onkeydown: function(event){
        __eval__(this.getAttribute('onkeydown')||'', this);
    },
    onkeypress: function(event){
        __eval__(this.getAttribute('onkeypress')||'', this);
    },
    onkeyup: function(event){
        __eval__(this.getAttribute('onkeyup')||'', this);
    }
};


var __registerKeyboardEventAttrs__ = function(elm){
    if(elm.hasAttribute('onkeydown')){ 
        elm.addEventListener('keydown', elm.onkeydown, false); 
    }
    if(elm.hasAttribute('onkeypress')){ 
        elm.addEventListener('keypress', elm.onkeypress, false); 
    }
    if(elm.hasAttribute('onkeyup')){ 
        elm.addEventListener('keyup', elm.onkeyup, false); 
    }
    return elm;
};

//HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
var  __keydown__ = function(element){
    var event = new Event('KeyboardEvents');
    event.initEvent("keydown", false, false);
    element.dispatchEvent(event);
};

//HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
var  __keypress__ = function(element){
    var event = new Event('KeyboardEvents');
    event.initEvent("keypress", false, false);
    element.dispatchEvent(event);
};

//HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
var  __keyup__ = function(element){
    var event = new Event('KeyboardEvents');
    event.initEvent("keyup", false, false);
    element.dispatchEvent(event);
};

/**
 * @name MaouseEvents
 * @w3c:domlevel 2 
 * @uri http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 */
var MouseEvents= function(){};
MouseEvents.prototype = {
    onclick: function(event){
        __eval__(this.getAttribute('onclick')||'', this);
    },
    ondblclick: function(event){
        __eval__(this.getAttribute('ondblclick')||'', this);
    },
    onmousedown: function(event){
        __eval__(this.getAttribute('onmousedown')||'', this);
    },
    onmousemove: function(event){
        __eval__(this.getAttribute('onmousemove')||'', this);
    },
    onmouseout: function(event){
        __eval__(this.getAttribute('onmouseout')||'', this);
    },
    onmouseover: function(event){
        __eval__(this.getAttribute('onmouseover')||'', this);
    },
    onmouseup: function(event){
        __eval__(this.getAttribute('onmouseup')||'', this);
    }  
};

var __registerMouseEventAttrs__ = function(elm){
    if(elm.hasAttribute('onclick')){ 
        elm.addEventListener('click', elm.onclick, false); 
    }
    if(elm.hasAttribute('ondblclick')){ 
        elm.addEventListener('dblclick', elm.ondblclick, false); 
    }
    if(elm.hasAttribute('onmousedown')){ 
        elm.addEventListener('mousedown', elm.onmousedown, false); 
    }
    if(elm.hasAttribute('onmousemove')){ 
        elm.addEventListener('mousemove', elm.onmousemove, false); 
    }
    if(elm.hasAttribute('onmouseout')){ 
        elm.addEventListener('mouseout', elm.onmouseout, false); 
    }
    if(elm.hasAttribute('onmouseover')){ 
        elm.addEventListener('mouseover', elm.onmouseover, false); 
    }
    if(elm.hasAttribute('onmouseup')){ 
        elm.addEventListener('mouseup', elm.onmouseup, false); 
    }
    return elm;
};


var  __click__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("click", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};
var  __mousedown__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("mousedown", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};
var  __mouseup__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("mouseup", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};
var  __mouseover__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("mouseover", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};
var  __mousemove__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("mousemove", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};
var  __mouseout__ = function(element){
    var event = new Event('MouseEvents');
    event.initEvent("mouseout", true, true, null, 0,
                0, 0, 0, 0, false, false, false, 
                false, null, null);
    element.dispatchEvent(event);
};

/**
 * HTMLElement - DOM Level 2
 */


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLElement').
		debug('HTMLElement available');    
});

/* Hack for http://www.prototypejs.org/
 *
 * Prototype 1.6 (the library) creates a new global Element, which causes
 * envjs to use the wrong Element.
 *
 * http://envjs.lighthouseapp.com/projects/21590/tickets/108-prototypejs-wont-load-due-it-clobbering-element
 *
 * Options:
 *  (1) Rename the dom/element to something else
 *       rejected: been done before. people want Element.
 *  (2) merge dom+html and not export Element to global namespace
 *      (meaning we would use a local var Element in a closure, so prototype
 *      can do what ever it wants)
 *       rejected: want dom and html separate
 *  (3) use global namespace (put everything under Envjs = {})
 *       rejected: massive change
 *  (4) use commonjs modules (similar to (3) in spirit)
 *       rejected: massive change
 *
 *  or
 *
 *  (5) take a reference to Element during initial loading ("compile
 *      time"), and use the reference instead of "Element".  That's
 *      what the next line does.  We use __DOMElement__ if we need to
 *      reference the parent class.  Only this file explcity uses
 *      Element so this should work, and is the most minimal change I
 *      could think of with no external API changes.
 *
 */
var  __DOMElement__ = Element;

exports.HTMLElement = HTMLElement = function(ownerDocument) {
    __DOMElement__.apply(this, arguments);
};

HTMLElement.prototype = new Element();
__extend__(HTMLElement.prototype, HTMLEvents.prototype);
__extend__(HTMLElement.prototype, {
    get className() {
        return this.getAttribute("class")||'';
    },
    set className(value) {
        return this.setAttribute("class",__trim__(value));
    },
    get dir() {
        return this.getAttribute("dir")||"ltr";
    },
    set dir(val) {
        return this.setAttribute("dir",val);
    },
    get id(){
        return this.getAttribute('id') || '';
    },
    set id(id){
        this.setAttribute('id', id);
    },
    get innerHTML(){
        var ret = "",
        i;

        // create string containing the concatenation of the string
        // values of each child
        for (i=0; i < this.childNodes.length; i++) {
            if(this.childNodes[i]){
                if(this.childNodes[i].nodeType === Node.ELEMENT_NODE){
                    ret += this.childNodes[i].xhtml;
                } else if (this.childNodes[i].nodeType === Node.TEXT_NODE && i>0 &&
                           this.childNodes[i-1].nodeType === Node.TEXT_NODE){
                    //add a single space between adjacent text nodes
                    ret += " "+this.childNodes[i].xml;
                }else{
                    ret += this.childNodes[i].xml;
                }
            }
        }
        return ret;
    },
    get lang() {
        return this.getAttribute("lang");
    },
    set lang(val) {
        return this.setAttribute("lang",val);
    },
    get offsetHeight(){
        return Number((this.style.height || '').replace("px",""));
    },
    get offsetWidth(){
        return Number((this.style.width || '').replace("px",""));
    },
    offsetLeft: 0,
    offsetRight: 0,
    get offsetParent(){
        /* TODO */
        return;
    },
    set offsetParent(element){
        /* TODO */
        return;
    },
    scrollHeight: 0,
    scrollWidth: 0,
    scrollLeft: 0,
    scrollRight: 0,
    get style(){
        return this.getAttribute('style')||'';
    },
    get title() {
        return this.getAttribute("title");
    },
    set title(value) {
        return this.setAttribute("title", value);
    },
    get tabIndex(){
        var tabindex = this.getAttribute('tabindex');
        if(tabindex!==null){
            return Number(tabindex);
        } else {
            return 0;
        }
    },
    set tabIndex(value){
        if (value === undefined || value === null) {
            value = 0;
        }
        this.setAttribute('tabindex',Number(value));
    },
    get outerHTML(){
        //Not in the specs but I'll leave it here for now.
        return this.xhtml;
    },
    scrollIntoView: function(){
        /*TODO*/
        return;
    },
    toString: function(){
        return '[object HTMLElement]';
    },
    get xhtml() {
        // HTMLDocument.xhtml is non-standard
        // This is exactly like Document.xml except the tagName has to be
        // lower cased.  I dont like to duplicate this but its really not
        // a simple work around between xml and html serialization via
        // XMLSerializer (which uppercases html tags) and innerHTML (which
        // lowercases tags)

        var ret = "",
            ns = "",
            name = (this.tagName+"").toLowerCase(),
            attrs,
            attrstring = "",
			style = false,
            i;

        // serialize namespace declarations
        if (this.namespaceURI){
            if((this === this.ownerDocument.documentElement) ||
               (!this.parentNode) ||
               (this.parentNode &&
                (this.parentNode.namespaceURI !== this.namespaceURI))) {
                ns = ' xmlns' + (this.prefix ? (':' + this.prefix) : '') +
                    '="' + this.namespaceURI + '"';
            }
        }

        // serialize Attribute declarations
        attrs = this.attributes;
        for(i=0;i< attrs.length;i++){
            attrstring += " "+attrs[i].name+'="'+attrs[i].xml+'"';
			if(attrs[i].name == 'style'){
				style = true;
			}
        }
		if(!style ){
			style = this.getAttribute('style');
			if(style){
				attrstring += ' style="'+style+'"';
			}
		}

        if(this.hasChildNodes()){
            // serialize this Element
	        //console.log('serializing childNodes for %s', name);
            ret += "<" + name + ns + attrstring +">";
            for(i=0;i< this.childNodes.length;i++){
                //console.debug('xhtml for '+ this);
                ret += 'xhtml' in this.childNodes[i] ?
                    this.childNodes[i].xhtml :
                    this.childNodes[i].xml;
            }
            ret += "</" + name + ">";
        }else{	
            //console.log('no childNodes to serialize for %s', name);
            switch(name){
            case 'script':
            case 'noscript':
                ret += "<" + name + ns + attrstring +"></"+name+">";
                break;
            default:
                ret += "<" + name + ns + attrstring +"/>";
            }
        }

        return ret;
    },

    /**
     * setAttribute use a dispatch table that other tags can set to
     *  "listen" to various values being set.  The dispatch table
     * and registration functions are at the end of the file.
     *
     */

    setAttribute: function(name, value) {
        var result = __DOMElement__.prototype.setAttribute.apply(this, arguments);
        __addNamedMap__(this.ownerDocument, this);
        var tagname = this.tagName;
        var callback = HTMLElement.getAttributeCallback('set', tagname, name);
        if (callback) {
            callback(this, value);
        }
    },
    setAttributeNS: function(namespaceURI, name, value) {
        var result = __DOMElement__.prototype.setAttributeNS.apply(this, arguments);
        __addNamedMap__(this.ownerDocument, this);
        var tagname = this.tagName;
        var callback = HTMLElement.getAttributeCallback('set', tagname, name);
        if (callback) {
            callback(this, value);
        }

        return result;
    },
    setAttributeNode: function(newnode) {
        var result = __DOMElement__.prototype.setAttributeNode.apply(this, arguments);
        __addNamedMap__(this.ownerDocument, this);
        var tagname = this.tagName;
        var callback = HTMLElement.getAttributeCallback('set', tagname, newnode.name);
        if (callback) {
            callback(this, newnode.value);
        }
        return result;
    },
    setAttributeNodeNS: function(newnode) {
        var result = __DOMElement__.prototype.setAttributeNodeNS.apply(this, arguments);
        __addNamedMap__(this.ownerDocument, this);
        var tagname = this.tagName;
        var callback = HTMLElement.getAttributeCallback('set', tagname, newnode.name);
        if (callback) {
            callback(this, newnode.value);
        }
        return result;
    },
    removeAttribute: function(name) {
        __removeNamedMap__(this.ownerDocument, this);
        return __DOMElement__.prototype.removeAttribute.apply(this, arguments);
    },
    removeAttributeNS: function(namespace, localname) {
        __removeNamedMap__(this.ownerDocument, this);
        return __DOMElement__.prototype.removeAttributeNS.apply(this, arguments);
    },
    removeAttributeNode: function(name) {
        __removeNamedMap__(this.ownerDocument, this);
        return __DOMElement__.prototype.removeAttributeNode.apply(this, arguments);
    },
    removeChild: function(oldChild) {
        __removeNamedMap__(this.ownerDocument, oldChild);
        return __DOMElement__.prototype.removeChild.apply(this, arguments);
    },
    importNode: function(othernode, deep) {
        var newnode = __DOMElement__.prototype.importNode.apply(this, arguments);
        __addNamedMap__(this.ownerDocument, newnode);
        return newnode;
    },

    // not actually sure if this is needed or not
    replaceNode: function(newchild, oldchild) {
        var newnode = __DOMElement__.prototype.replaceNode.apply(this, arguments);
        __removeNamedMap__(this.ownerDocument, oldchild);
        __addNamedMap__(this.ownerDocument, newnode);
                return newnode;
    }
});


HTMLElement.attributeCallbacks = {};
HTMLElement.registerSetAttribute = function(tag, attrib, callbackfn) {
    HTMLElement.attributeCallbacks[tag + ':set:' + attrib] = callbackfn;
};
HTMLElement.registerRemoveAttribute = function(tag, attrib, callbackfn) {
    HTMLElement.attributeCallbacks[tag + ':remove:' + attrib] = callbackfn;
};

/**
 * This is really only useful internally
 *
 */
HTMLElement.getAttributeCallback = function(type, tag, attrib) {
    return HTMLElement.attributeCallbacks[tag + ':' + type + ':' + attrib] || null;
};

}(/*HTMLElement*/));
/*
 * HTMLCollection
 *
 * HTML5 -- 2.7.2.1 HTMLCollection
 * http://dev.w3.org/html5/spec/Overview.html#htmlcollection
 * http://dev.w3.org/html5/spec/Overview.html#collections
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLCollection').
		debug('HTMLCollection available');    
});

exports.HTMLCollection = HTMLCollection = function(nodelist, type) {
	__extend__(nodelist,{
		namedItem: function (name) {
	        return this[name] || null;
	    },

	    toString: function() {
	        return '[object HTMLCollection]';
	    }
	});
    var n;
    for (var i=0; i<nodelist.length; i++) {
        n = nodelist[i].id;
        if (n && !nodelist[n]) {
            nodelist[n] = nodelist[i];
        }
        n = nodelist[i].name;
        if (n && !nodelist[n]) {
            nodelist[n] = nodelist[i];
        }
    }
	return nodelist;
};

HTMLCollection.prototype = new NodeList();
__extend__(HTMLCollection.prototype, {

    namedItem: function (name) {
        return this[name] || null;
    },

    toString: function() {
        return '[object HTMLCollection]';
    }
});

}(/*Envjs.HTML.HTMLCollection*/));

/*
 *  a set of convenience classes to centralize implementation of
 * properties and methods across multiple in-form elements
 *
 *  the hierarchy of related HTML elements and their members is as follows:
 *
 * Condensed Version
 *
 *  HTMLInputCommon
 *     * legent (no value attr)
 *     * fieldset (no value attr)
 *     * label (no value attr)
 *     * option (custom value)
 *  HTMLTypeValueInputs (extends InputCommon)
 *     * select  (custom value)
 *     * button (just sets value)
 *  HTMLInputAreaCommon (extends TypeValueIput)
 *     * input  (custom)
 *     * textarea (just sets value)
 *
 * -----------------------
 *    HTMLInputCommon:  common to all elements
 *       .form
 *
 *    <legend>
 *          [common plus:]
 *       .align
 *
 *    <fieldset>
 *          [identical to "legend" plus:]
 *       .margin
 *
 *
 *  ****
 *
 *    <label>
 *          [common plus:]
 *       .dataFormatAs
 *       .htmlFor
 *       [plus data properties]
 *
 *    <option>
 *          [common plus:]
 *       .defaultSelected
 *       .index
 *       .label
 *       .selected
 *       .text
 *       .value   // unique implementation, not duplicated
 *       .form    // unique implementation, not duplicated
 *  ****
 *
 *    HTMLTypeValueInputs:  common to remaining elements
 *          [common plus:]
 *       .name
 *       .type
 *       .value
 *       [plus data properties]
 *
 *
 *    <select>
 *       .length
 *       .multiple
 *       .options[]
 *       .selectedIndex
 *       .add()
 *       .remove()
 *       .item()                                       // unimplemented
 *       .namedItem()                                  // unimplemented
 *       [plus ".onchange"]
 *       [plus focus events]
 *       [plus data properties]
 *       [plus ".size"]
 *
 *    <button>
 *       .dataFormatAs   // duplicated from above, oh well....
 *       [plus ".status", ".createTextRange()"]
 *
 *  ****
 *
 *    HTMLInputAreaCommon:  common to remaining elements
 *       .defaultValue
 *       .readOnly
 *       .handleEvent()                                // unimplemented
 *       .select()
 *       .onselect
 *       [plus ".size"]
 *       [plus ".status", ".createTextRange()"]
 *       [plus focus events]
 *       [plus ".onchange"]
 *
 *    <textarea>
 *       .cols
 *       .rows
 *       .wrap                                         // unimplemented
 *       .onscroll                                     // unimplemented
 *
 *    <input>
 *       .alt
 *       .accept                                       // unimplemented
 *       .checked
 *       .complete                                     // unimplemented
 *       .defaultChecked
 *       .dynsrc                                       // unimplemented
 *       .height
 *       .hspace                                       // unimplemented
 *       .indeterminate                                // unimplemented
 *       .loop                                         // unimplemented
 *       .lowsrc                                       // unimplemented
 *       .maxLength
 *       .src
 *       .start                                        // unimplemented
 *       .useMap
 *       .vspace                                       // unimplemented
 *       .width
 *       .onclick
 *       [plus ".size"]
 *       [plus ".status", ".createTextRange()"]

 *    [data properties]                                // unimplemented
 *       .dataFld
 *       .dataSrc

 *    [status stuff]                                   // unimplemented
 *       .status
 *       .createTextRange()

 *    [focus events]
 *       .onblur
 *       .onfocus

 */



var inputElements_dataProperties = {};
var inputElements_status = {};

var inputElements_onchange = {
    onchange: function(event){
        __eval__(this.getAttribute('onchange')||'', this);
    }
};

var inputElements_size = {
    get size(){
        return Number(this.getAttribute('size'));
    },
    set size(value){
        this.setAttribute('size',value);
    }
};

var inputElements_focusEvents = {
    blur: function(){
        __blur__(this);

        if (this._oldValue != this.value){
            var event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, true);
            this.dispatchEvent( event );
        }
    },
    focus: function(){
        __focus__(this);
        this._oldValue = this.value;
    }
};


/*
* HTMLInputCommon - convenience class, not DOM
*/
var HTMLInputCommon = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLInputCommon.prototype = new HTMLElement();
__extend__(HTMLInputCommon.prototype, {
    get form() {
        // parent can be null if element is outside of a form
        // or not yet added to the document
        var parent = this.parentNode;
        while (parent && parent.nodeName.toLowerCase() !== 'form') {
            parent = parent.parentNode;
        }
        return parent;
    },
    get accessKey(){
        return this.getAttribute('accesskey');
    },
    set accessKey(value){
        this.setAttribute('accesskey',value);
    },
    get access(){
        return this.getAttribute('access');
    },
    set access(value){
        this.setAttribute('access', value);
    },
    get disabled(){
        return (this.getAttribute('disabled') === 'disabled');
    },
    set disabled(value){
        this.setAttribute('disabled', (value ? 'disabled' :''));
    }
});




/*
* HTMLTypeValueInputs - convenience class, not DOM
*/
var HTMLTypeValueInputs = function(ownerDocument) {

    HTMLInputCommon.apply(this, arguments);

    this._oldValue = "";
};
HTMLTypeValueInputs.prototype = new HTMLInputCommon();
__extend__(HTMLTypeValueInputs.prototype, inputElements_size);
__extend__(HTMLTypeValueInputs.prototype, inputElements_status);
__extend__(HTMLTypeValueInputs.prototype, inputElements_dataProperties);
__extend__(HTMLTypeValueInputs.prototype, {
    get name(){
        return this.getAttribute('name')||'';
    },
    set name(value){
        this.setAttribute('name',value);
    }
});


/*
* HTMLInputAreaCommon - convenience class, not DOM
*/
var HTMLInputAreaCommon = function(ownerDocument) {
    HTMLTypeValueInputs.apply(this, arguments);
};
HTMLInputAreaCommon.prototype = new HTMLTypeValueInputs();
__extend__(HTMLInputAreaCommon.prototype, inputElements_focusEvents);
__extend__(HTMLInputAreaCommon.prototype, inputElements_onchange);
__extend__(HTMLInputAreaCommon.prototype, {
    get readOnly(){
        return (this.getAttribute('readonly')=='readonly');
    },
    set readOnly(value){
        this.setAttribute('readonly', (value ? 'readonly' :''));
    },
    select:function(){
        __select__(this);

    }
});


var __updateFormForNamedElement__ = function(node, value) {
    if (node.form) {
        // to check for ID or NAME attribute too
        // not, then nothing to do

		//THATCHER - I believe this is deprecated by the new
		//internally managed indexes on elements
        //node.form._updateElements();
    }
};

/**
 * HTMLAnchorElement - DOM Level 2
 *
 * HTML5: 4.6.1 The a element
 * http://dev.w3.org/html5/spec/Overview.html#the-a-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLAnchorElement').
		debug('HTMLAnchorElement available');    
});

exports.HTMLAnchorElement = HTMLAnchorElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLAnchorElement.prototype = new HTMLElement();
__extend__(HTMLAnchorElement.prototype, {
    get accessKey() {
        return this.getAttribute("accesskey")||'';
    },
    set accessKey(val) {
        return this.setAttribute("accesskey",val);
    },
    get charset() {
        return this.getAttribute("charset")||'';
    },
    set charset(val) {
        return this.setAttribute("charset",val);
    },
    get coords() {
        return this.getAttribute("coords")||'';
    },
    set coords(val) {
        return this.setAttribute("coords",val);
    },
    get href() {
        var link = this.getAttribute('href');
        if (!link) {
            return '';
        }
        return Envjs.uri(link, this.ownerDocument.location.toString());
    },
    set href(val) {
        return this.setAttribute("href", val);
    },
    get hreflang() {
        return this.getAttribute("hreflang")||'';
    },
    set hreflang(val) {
        this.setAttribute("hreflang",val);
    },
    get name() {
        return this.getAttribute("name")||'';
    },
    set name(val) {
        this.setAttribute("name",val);
    },
    get rel() {
        return this.getAttribute("rel")||'';
    },
    set rel(val) {
        return this.setAttribute("rel", val);
    },
    get rev() {
        return this.getAttribute("rev")||'';
    },
    set rev(val) {
        return this.setAttribute("rev",val);
    },
    get shape() {
        return this.getAttribute("shape")||'';
    },
    set shape(val) {
        return this.setAttribute("shape",val);
    },
    get target() {
        return this.getAttribute("target")||'';
    },
    set target(val) {
        return this.setAttribute("target",val);
    },
    get type() {
        return this.getAttribute("type")||'';
    },
    set type(val) {
        return this.setAttribute("type",val);
    },
    blur: function() {
        __blur__(this);
    },
    focus: function() {
        __focus__(this);
    },
	click: function(){
		__click__(this);
	},
    /**
     * Unlike other elements, toString returns the href
     */
    toString: function() {
        return this.href;
    }
});

}(/*Envjs.HTML.HTMLAnchorElement*/));

/*
 * HTMLAreaElement - DOM Level 2
 *
 * HTML5: 4.8.13 The area element
 * http://dev.w3.org/html5/spec/Overview.html#the-area-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLAreaElement').
		debug('HTMLAreaElement available');    
});

exports.HTMLAreaElement = HTMLAreaElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLAreaElement.prototype = new HTMLElement();
__extend__(HTMLAreaElement.prototype, {
    get accessKey(){
        return this.getAttribute('accesskey');
    },
    set accessKey(value){
        this.setAttribute('accesskey',value);
    },
    get alt(){
        return this.getAttribute('alt') || '';
    },
    set alt(value){
        this.setAttribute('alt',value);
    },
    get coords(){
        return this.getAttribute('coords');
    },
    set coords(value){
        this.setAttribute('coords',value);
    },
    get href(){
        return this.getAttribute('href') || '';
    },
    set href(value){
        this.setAttribute('href',value);
    },
    get noHref(){
        return this.hasAttribute('href');
    },
    get shape(){
        //TODO
        return 0;
    },
    /*get tabIndex(){
      return this.getAttribute('tabindex');
      },
      set tabIndex(value){
      this.setAttribute('tabindex',value);
      },*/
    get target(){
        return this.getAttribute('target');
    },
    set target(value){
        this.setAttribute('target',value);
    },

    /**
     * toString like <a>, returns the href
     */
    toString: function() {
        return this.href;
    }
});

}(/*Envjs.HTML.HTMLElement*/));

/*
 * HTMLBaseElement - DOM Level 2
 *
 * HTML5: 4.2.3 The base element
 * http://dev.w3.org/html5/spec/Overview.html#the-base-element
 */

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLBaseElement').
		debug('HTMLBaseElement available');    
});

exports.HTMLBaseElement = HTMLBaseElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLBaseElement.prototype = new HTMLElement();
__extend__(HTMLBaseElement.prototype, {
    get href(){
        return this.getAttribute('href');
    },
    set href(value){
        this.setAttribute('href',value);
    },
    get target(){
        return this.getAttribute('target');
    },
    set target(value){
        this.setAttribute('target',value);
    },
    toString: function() {
        return '[object HTMLBaseElement]';
    }
});

}(/*Envjs.HTML.HTMLBaseElement*/));

/*
 * HTMLQuoteElement - DOM Level 2
 * HTML5: 4.5.5 The blockquote element
 * http://dev.w3.org/html5/spec/Overview.html#htmlquoteelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLQuoteElement').
		debug('HTMLQuoteElement available');    
});

exports.HTMLQuoteElement = HTMLQuoteElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLQuoteElement.prototype = new HTMLElement();
__extend__(HTMLQuoteElement.prototype, {
    /**
     * Quoth the spec:
     * """
     * If the cite attribute is present, it must be a valid URL. To
     * obtain the corresponding citation link, the value of the
     * attribute must be resolved relative to the element. User agents
     * should allow users to follow such citation links.
     * """
     *
     * TODO: normalize
     *
     */
    get cite() {
        return this.getAttribute('cite') || '';
    },

    set cite(value) {
        this.setAttribute('cite', value);
    },
    toString: function() {
        return '[object HTMLQuoteElement]';
    }
});

}(/*Envjs.HTML.HTMLQuoteElement*/));

/*
 * HTMLBodyElement - DOM Level 2
 * HTML5: http://dev.w3.org/html5/spec/Overview.html#the-body-element-0
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLBodyElement').
		debug('HTMLBodyElement available');    
});

exports.HTMLBodyElement = HTMLBodyElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLBodyElement.prototype = new HTMLElement();
__extend__(HTMLBodyElement.prototype, {
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    },
    onunload: function(event){
        __eval__(this.getAttribute('onunload')||'', this);
    },
    toString: function() {
        return '[object HTMLBodyElement]';
    }
});

}(/*Envjs.HTML.HTMLBodyElement*/));

/*
 * HTMLBRElement
 * HTML5: 4.5.3 The hr Element
 * http://dev.w3.org/html5/spec/Overview.html#the-br-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLBRElement').
		debug('HTMLBRElement available');    
});

exports.HTMLBRElement = HTMLBRElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLBRElement.prototype = new HTMLElement();
__extend__(HTMLBRElement.prototype, {

    // no additional properties or elements
    toString: function() {
        return '[object HTMLBRElement]';
    }
});

}(/*Envjs.HTML.HTMLBRElement*/));

/*
 * HTMLButtonElement - DOM Level 2
 *
 * HTML5: 4.10.6 The button element
 * http://dev.w3.org/html5/spec/Overview.html#the-button-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLButtonElement').
		debug('HTMLButtonElement available');    
});

exports.HTMLButtonElement = HTMLButtonElement = function(ownerDocument) {
    HTMLTypeValueInputs.apply(this, arguments);
};
HTMLButtonElement.prototype = new HTMLTypeValueInputs();
__extend__(HTMLButtonElement.prototype, inputElements_status);
__extend__(HTMLButtonElement.prototype, {
    get dataFormatAs(){
        return this.getAttribute('dataFormatAs');
    },
    set dataFormatAs(value){
        this.setAttribute('dataFormatAs',value);
    },
    get type() {
        return this.getAttribute('type') || 'submit';
    },
    set type(value) {
        this.setAttribute('type', value);
    },
    get value() {
        return this.getAttribute('value') || '';
    },
    set value(value) {
        this.setAttribute('value', value);
    },
    toString: function() {
        return '[object HTMLButtonElement]';
    }
});

// Named Element Support
HTMLElement.registerSetAttribute('BUTTON', 'name', __updateFormForNamedElement__);

}(/*Envjs.HTML.HTMLButtonElement*/));

/*
 * HTMLCanvasElement - DOM Level 2
 * HTML5: 4.8.11 The canvas element
 * http://dev.w3.org/html5/spec/Overview.html#the-canvas-element
 */


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.CanvasRenderingContext2D').
		debug('CanvasRenderingContext2D available');    
});
/*
 * This is a "non-Abstract Base Class". For an implmentation that actually
 * did something, all these methods would need to over-written
 */
exports.CanvasRenderingContext2D = CanvasRenderingContext2D = function() {
    // NOP
};

var nullfunction = function() {};

CanvasRenderingContext2D.prototype = {
    addColorStop: nullfunction,
    arc: nullfunction,
    beginPath: nullfunction,
    bezierCurveTo: nullfunction,
    clearRect: nullfunction,
    clip: nullfunction,
    closePath: nullfunction,
    createLinearGradient: nullfunction,
    createPattern: nullfunction,
    createRadialGradient: nullfunction,
    drawImage: nullfunction,
    fill: nullfunction,
    fillRect:  nullfunction,
    lineTo: nullfunction,
    moveTo: nullfunction,
    quadraticCurveTo: nullfunction,
    rect: nullfunction,
    restore: nullfunction,
    rotate: nullfunction,
    save: nullfunction,
    scale: nullfunction,
    setTranform: nullfunction,
    stroke: nullfunction,
    strokeRect: nullfunction,
    transform: nullfunction,
    translate: nullfunction,

    toString: function() {
        return '[object CanvasRenderingContext2D]';
    }
};

}(/*Envjs.HTML.CanvasRenderingContext2D*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLCanvasElement').
		debug('HTMLCanvasElement available');    
});

exports.HTMLCanvasElement = HTMLCanvasElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLCanvasElement.prototype = new HTMLElement();
__extend__(HTMLCanvasElement.prototype, {

    getContext: function(ctxtype) {
        if (ctxtype === '2d') {
            return new CanvasRenderingContext2D();
        }
        throw new Error("Unknown context type of '" + ctxtype + '"');
    },

    get height(){
        return Number(this.getAttribute('height')|| 150);
    },
    set height(value){
        this.setAttribute('height', value);
    },

    get width(){
        return Number(this.getAttribute('width')|| 300);
    },
    set width(value){
        this.setAttribute('width', value);
    },

    toString: function() {
        return '[object HTMLCanvasElement]';
    }

});

}(/*Envjs.HTML.HTMLCanvasElement*/));


/*
* HTMLTableColElement - DOM Level 2
*
* HTML5: 4.9.3 The colgroup element
* http://dev.w3.org/html5/spec/Overview.html#the-colgroup-element
*/

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableColElement').
		debug('HTMLTableColElement available');    
});

exports.HTMLTableColElement = HTMLTableColElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableColElement.prototype = new HTMLElement();
__extend__(HTMLTableColElement.prototype, {
    get align(){
        return this.getAttribute('align');
    },
    set align(value){
        this.setAttribute('align', value);
    },
    get ch(){
        return this.getAttribute('ch');
    },
    set ch(value){
        this.setAttribute('ch', value);
    },
    get chOff(){
        return this.getAttribute('ch');
    },
    set chOff(value){
        this.setAttribute('ch', value);
    },
    get span(){
        return this.getAttribute('span');
    },
    set span(value){
        this.setAttribute('span', value);
    },
    get vAlign(){
        return this.getAttribute('valign');
    },
    set vAlign(value){
        this.setAttribute('valign', value);
    },
    get width(){
        return this.getAttribute('width');
    },
    set width(value){
        this.setAttribute('width', value);
    },
    toString: function() {
        return '[object HTMLTableColElement]';
    }
});

}(/*Envjs.HTML.HTMLTableColElement*/));


/*
 * HTMLModElement - DOM Level 2
 * http://dev.w3.org/html5/spec/Overview.html#htmlmodelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLModElement').
		debug('HTMLModElement available');    
});

exports.HTMLModElement = HTMLModElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLModElement.prototype = new HTMLElement();
__extend__(HTMLModElement.prototype, {
    get cite(){
        return this.getAttribute('cite');
    },
    set cite(value){
        this.setAttribute('cite', value);
    },
    get dateTime(){
        return this.getAttribute('datetime');
    },
    set dateTime(value){
        this.setAttribute('datetime', value);
    },
    toString: function() {
        return '[object HTMLModElement]';
    }
});

}(/*Envjs.HTML.HTMLModElement*/));

/*
 * HTMLDivElement - DOM Level 2
 * HTML5: 4.5.12 The Div Element
 * http://dev.w3.org/html5/spec/Overview.html#the-div-element
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLDivElement').
		debug('HTMLDivElement available');    
});

exports.HTMLDivElement = HTMLDivElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLDivElement.prototype = new HTMLElement();
__extend__(HTMLDivElement.prototype, {
    get align(){
        return this.getAttribute('align') || 'left';
    },
    set align(value){
        this.setAttribute('align', value);
    },
    toString: function() {
        return '[object HTMLDivElement]';
    }
});

}(/*HTMLDivElement*/));

/*
 * HTMLDListElement
 * HTML5: 4.5.7 The dl Element
 * http://dev.w3.org/html5/spec/Overview.html#the-dl-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLDListElement').
		debug('HTMLDListElement available');    
});

exports.HTMLDListElement = HTMLDListElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLDListElement.prototype = new HTMLElement();
__extend__(HTMLDListElement.prototype, {

    // no additional properties or elements

    toString: function() {
        return '[object HTMLDListElement]';
    }
});

}(/*HTMLDListElement*/));

/**
 * HTMLLegendElement - DOM Level 2
 *
 * HTML5: 4.10.3 The legend element
 * http://dev.w3.org/html5/spec/Overview.html#the-legend-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLLegendElement').
		debug('HTMLLegendElement available');    
});

exports.HTMLLegendElement = HTMLLegendElement = function(ownerDocument) {
    HTMLInputCommon.apply(this, arguments);
};
HTMLLegendElement.prototype = new HTMLInputCommon();
__extend__(HTMLLegendElement.prototype, {
    get align(){
        return this.getAttribute('align');
    },
    set align(value){
        this.setAttribute('align',value);
    }
});

}(/*HTMLLegendElement*/));

/*
 * HTMLFieldSetElement - DOM Level 2
 *
 * HTML5: 4.10.2 The fieldset element
 * http://dev.w3.org/html5/spec/Overview.html#the-fieldset-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLFieldSetElement').
		debug('HTMLFieldSetElement available');    
});

exports.HTMLFieldSetElement = HTMLFieldSetElement = function(ownerDocument) {
    HTMLLegendElement.apply(this, arguments);
};
HTMLFieldSetElement.prototype = new HTMLLegendElement();
__extend__(HTMLFieldSetElement.prototype, {
    get margin(){
        return this.getAttribute('margin');
    },
    set margin(value){
        this.setAttribute('margin',value);
    },
    toString: function() {
        return '[object HTMLFieldSetElement]';
    }
});

// Named Element Support
HTMLElement.registerSetAttribute('FIELDSET', 'name', __updateFormForNamedElement__);

}(/*HTMLFieldSetElement*/));

/*
 * HTMLFormElement - DOM Level 2
 *
 * HTML5: http://dev.w3.org/html5/spec/Overview.html#the-form-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLFormElement').
		debug('HTMLFormElement available');    
});

exports.HTMLFormElement = HTMLFormElement = function(ownerDocument){
    HTMLElement.apply(this, arguments);

    //TODO: on __elementPopped__ from the parser
    //      we need to determine all the forms default
    //      values
};
HTMLFormElement.prototype = new HTMLElement();
__extend__(HTMLFormElement.prototype,{
    get acceptCharset(){
        return this.getAttribute('accept-charset');
    },
    set acceptCharset(acceptCharset) {
        this.setAttribute('accept-charset', acceptCharset);
    },
    get action() {
        return this.getAttribute('action');
    },
    set action(action){
        this.setAttribute('action', action);
    },

    get enctype() {
        return this.getAttribute('enctype');
    },
    set enctype(enctype) {
        this.setAttribute('enctype', enctype);
    },
    get method() {
        return this.getAttribute('method');
    },
    set method(method) {
        this.setAttribute('method', method);
    },
    get name() {
        return this.getAttribute("name");
    },
    set name(val) {
        return this.setAttribute("name",val);
    },
    get target() {
        return this.getAttribute("target");
    },
    set target(val) {
        return this.setAttribute("target",val);
    },

    /**
     * "Named Elements"
     *
     */
    /**
     * returns HTMLFormControlsCollection
     * http://dev.w3.org/html5/spec/Overview.html#dom-form-elements
     *
     * button fieldset input keygen object output select textarea
     */
    get elements() {
        var nodes = this.getElementsByTagName('*');
        var alist = new NodeList(this.ownerDocument, this);
        var i, tmp;
        for (i = 0; i < nodes.length; ++i) {
            // would like to replace switch with something else
            //  since it's redundant with the SetAttribute callbacks
            switch (nodes[i].nodeName) {
            case 'BUTTON':
            case 'FIELDSET':
            case 'INPUT':
            case 'KEYGEN':
            case 'OBJECT':
            case 'OUTPUT':
            case 'SELECT':
            case 'TEXTAREA':
                alist.push(nodes[i]);
                this[i] = nodes[i];
                tmp = nodes[i].name;
                if (tmp) {
                    this[tmp] = nodes[i];
                }
                tmp = nodes[i].id;
                if (tmp) {
                    this[tmp] = nodes[i];
                }
            }
        }
        return new HTMLCollection(alist);
    },
    _updateElements: function() {
        var elm = this.elements;
    },
    
    /*get elements() {
        //console.log('getting form input type elements.');
        if(!(this._indexes_['$elements'])){
			this._indexes_['$elements'] = new NodeList(this.ownerDocument, null);
		}
        return new HTMLCollection(this._indexes_['$elements']);
    },*/
    get length() {
        return this.elements.length;
    },
    item: function(idx) {
        return this.elements[idx];
    },
    namedItem: function(aname) {
        return this.elements.namedItem(aname);
    },
    toString: function() {
        return '[object HTMLFormElement]';
    },
    submit: function() {
        var event = __submit__(this);
    },
    reset: function() {
        //TODO: this needs to reset all values specified in the form
        //      to those which where set as defaults
        __reset__(this);
    },
    onsubmit: HTMLEvents.prototype.onsubmit,
    onreset: HTMLEvents.prototype.onreset
});

}(/*HTMLFormElement*/));

/**
 * HTMLFrameElement - DOM Level 2
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLFrameElement').debug('HTMLFrameElement available');    
});

exports.HTMLFrameElement = HTMLFrameElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
    // this is normally a getter but we need to be
    // able to set it to correctly emulate behavior
    this.contentDocument = null;
    this.contentWindow = null;
};
HTMLFrameElement.prototype = new HTMLElement();
__extend__(HTMLFrameElement.prototype, {

    get frameBorder(){
        return this.getAttribute('border')||"";
    },
    set frameBorder(value){
        this.setAttribute('border', value);
    },
    get longDesc(){
        return this.getAttribute('longdesc')||"";
    },
    set longDesc(value){
        this.setAttribute('longdesc', value);
    },
    get marginHeight(){
        return this.getAttribute('marginheight')||"";
    },
    set marginHeight(value){
        this.setAttribute('marginheight', value);
    },
    get marginWidth(){
        return this.getAttribute('marginwidth')||"";
    },
    set marginWidth(value){
        this.setAttribute('marginwidth', value);
    },
    get name(){
        return this.getAttribute('name')||"";
    },
    set name(value){
        this.setAttribute('name', value);
    },
    get noResize(){
        return this.getAttribute('noresize')||false;
    },
    set noResize(value){
        this.setAttribute('noresize', value);
    },
    get scrolling(){
        return this.getAttribute('scrolling')||"";
    },
    set scrolling(value){
        this.setAttribute('scrolling', value);
    },
    get src(){
        return this.getAttribute('src')||"";
    },
    set src(value){
        this.setAttribute('src', value);
    },
    toString: function(){
        return '[object HTMLFrameElement]';
    },
    onload: HTMLEvents.prototype.onload
});

}(/*HTMLFrameElement*/));
/**
 * HTMLFrameSetElement - DOM Level 2
 *
 * HTML5: 12.3.3 Frames
 * http://dev.w3.org/html5/spec/Overview.html#frameset
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLFrameSetElement').debug('HTMLFrameSetElement available');    
});

exports.HTMLFrameSetElement = HTMLFrameSetElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLFrameSetElement.prototype = new HTMLElement();
__extend__(HTMLFrameSetElement.prototype, {
    get cols(){
        return this.getAttribute('cols');
    },
    set cols(value){
        this.setAttribute('cols', value);
    },
    get rows(){
        return this.getAttribute('rows');
    },
    set rows(value){
        this.setAttribute('rows', value);
    },
    toString: function() {
        return '[object HTMLFrameSetElement]';
    }
});

}(/*HTMLFrameSetElement*/));

/*
 * HTMLHeadingElement
 * HTML5: 4.4.6 The h1, h2, h3, h4, h5, and h6 elements
 * http://dev.w3.org/html5/spec/Overview.html#the-h1-h2-h3-h4-h5-and-h6-elements
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHeadingElement').
		debug('HTMLHeadingElement available');    
});

exports.HTMLHeadingElement = HTMLHeadingElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHeadingElement.prototype = new HTMLElement();
__extend__(HTMLHeadingElement.prototype, {
    toString: function() {
        return '[object HTMLHeadingElement]';
    }
});

}(/*HTMLHeadingElement*/));

/**
 * HTMLHeadElement - DOM Level 2
 *
 * HTML5: 4.2.1 The head element
 * http://dev.w3.org/html5/spec/Overview.html#the-head-element-0
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHeadElement').
		debug('HTMLHeadElement available');    
});

exports.HTMLHeadElement = HTMLHeadElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLHeadElement.prototype = new HTMLElement();
__extend__(HTMLHeadElement.prototype, {
    get profile(){
        return this.getAttribute('profile');
    },
    set profile(value){
        this.setAttribute('profile', value);
    },
    toString: function(){
        return '[object HTMLHeadElement]';
    }
});

}(/*HTMLHeadElement*/));

/*
 * HTMLHRElement
 * HTML5: 4.5.2 The hr Element
 * http://dev.w3.org/html5/spec/Overview.html#the-hr-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHRElement').
		debug('HTMLHRElement available');    
});

exports.HTMLHRElement = HTMLHRElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHRElement.prototype = new HTMLElement();
__extend__(HTMLHRElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLHRElement]';
    }
});

}(/*HTMLHRElement*/));

/*
 * HTMLHtmlElement
 * HTML5: 4.1.1 The Html Element
 * http://dev.w3.org/html5/spec/Overview.html#htmlhtmlelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHtmlElement').
		debug('HTMLHtmlElement available');    
});

exports.HTMLHtmlElement = HTMLHtmlElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHtmlElement.prototype = new HTMLElement();
__extend__(HTMLHtmlElement.prototype, {

    // no additional properties or elements
    toString: function() {
        return '[object HTMLHtmlElement]';
    }
});

}(/*HTMLHtmlElement*/));

/*
 * HTMLIFrameElement - DOM Level 2
 *
 * HTML5: 4.8.3 The iframe element
 * http://dev.w3.org/html5/spec/Overview.html#the-iframe-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLIFrameElement').
		debug('HTMLIFrameElement available');    
});

exports.HTMLIFrameElement = HTMLIFrameElement = function(ownerDocument) {
    HTMLFrameElement.apply(this, arguments);
};
HTMLIFrameElement.prototype = new HTMLFrameElement();
__extend__(HTMLIFrameElement.prototype, {
    get height() {
        return this.getAttribute("height") || "";
    },
    set height(val) {
        return this.setAttribute("height",val);
    },
    get width() {
        return this.getAttribute("width") || "";
    },
    set width(val) {
        return this.setAttribute("width",val);
    },
    toString: function(){
        return '[object HTMLIFrameElement]';
    }
});

}(/*HTMLIFrameElement*/));

/**
 * HTMLImageElement and Image
 */

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLImageElement').debug('HTMLImageElement available');    
});

exports.HTMLImageElement = HTMLImageElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLImageElement.prototype = new HTMLElement();
__extend__(HTMLImageElement.prototype, {
    get alt(){
        return this.getAttribute('alt');
    },
    set alt(value){
        this.setAttribute('alt', value);
    },
    get height(){
        return parseInt(this.getAttribute('height'), 10) || 0;
    },
    set height(value){
        this.setAttribute('height', value);
    },
    get isMap(){
        return this.hasAttribute('map');
    },
    set useMap(value){
        this.setAttribute('map', value);
    },
    get longDesc(){
        return this.getAttribute('longdesc');
    },
    set longDesc(value){
        this.setAttribute('longdesc', value);
    },
    get name(){
        return this.getAttribute('name');
    },
    set name(value){
        this.setAttribute('name', value);
    },
    get src(){
        return this.getAttribute('src') || '';
    },
    set src(value){
        this.setAttribute('src', value);
    },
    get width(){
        return parseInt(this.getAttribute('width'), 10) || 0;
    },
    set width(value){
        this.setAttribute('width', value);
    },
    toString: function(){
        return '[object HTMLImageElement]';
    }
});

/*
 * html5 4.8.1
 * http://dev.w3.org/html5/spec/Overview.html#the-img-element
 */
exports.Image = Image = function(width, height) {
    // Not sure if "[global].document" satifies this requirement:
    // "The element's document must be the active document of the
    // browsing context of the Window object on which the interface
    // object of the invoked constructor is found."

    HTMLElement.apply(this, [document]);
    // Note: firefox will throw an error if the width/height
    //   is not an integer.  Safari just converts to 0 on error.
    this.width = parseInt(width, 10) || 0;
    this.height = parseInt(height, 10) || 0;
    this.nodeName = 'IMG';
};
Image.prototype = new HTMLImageElement();


/*
 * Image.src attribute events.
 *
 * Not sure where this should live... in events/img.js? in parser/img.js?
 * Split out to make it easy to move.
 */

/**
 * HTMLImageElement && Image are a bit odd in that the 'src' attribute
 * is 'active' -- changing it triggers loading of the image from the
 * network.
 *
 * This can occur by
 *   - Directly setting the Image.src =
 *   - Using one of the Element.setAttributeXXX methods
 *   - Node.importNode an image
 *   - The initial creation and parsing of an <img> tag
 *
 * __onImageRequest__ is a function that handles eventing
 *  and dispatches to a user-callback.
 *
 */

__extend__(HTMLImageElement.prototype, {
    onload: function(event){
        __eval__(this.getAttribute('onload') || '', this);
    }
});


/*
 * Image Loading
 *
 * The difference between "owner.parsing" and "owner.fragment"
 *
 * If owner.parsing === true, then during the html5 parsing then,
 *  __elementPopped__ is called when a compete tag (with attrs and
 *  children) is full parsed and added the DOM.
 *
 *   For images, __elementPopped__ is called with everything the
 *    tag has.  which in turn looks for a "src" attr and calls
 *    Envjs.loadImage
 *
 * If owner.parser === false (or non-existant), then we are not in
 * a parsing step.  For images, perhaps someone directly modified
 * a 'src' attribute of an existing image.
 *
 * 'innerHTML' is tricky since we first create a "fake document",
 *  parse it, then import the right parts.  This may call
 *  img.setAttributeNS twice.  once during the parse and once
 *  during the clone of the node.  We want event to trigger on the
 *  later and not during th fake doco.  "owner.fragment" is set by
 *  the fake doco parser to indicate that events should not be
 *  triggered on this.
 *
 * We coud make 'owner.parser' == [ 'none', 'full', 'fragment']
 * and just use one variable That was not done since the patch is
 * quite large as is.
 *
 * This same problem occurs with scripts.  innerHTML oddly does
 * not eval any <script> tags inside.
 */
HTMLElement.registerSetAttribute('IMG', 'src', function(node, value) {
    var owner = node.ownerDocument;
    if (!owner.parsing && !owner.fragment) {
        Envjs.loadImage(node, value);
    }
});

}(/*HTMLImageElement*/));
/**
 * HTMLInputElement
 *
 * HTML5: 4.10.5 The input element
 * http://dev.w3.org/html5/spec/Overview.html#the-input-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLInputElement').
		debug('HTMLInputElement available');    
});

exports.HTMLInputElement = HTMLInputElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
    this._dirty = false;
    this._checked = null;
    this._value = null;
};
HTMLInputElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLInputElement.prototype, {
    get alt(){
        return this.getAttribute('alt') || '';
    },
    set alt(value){
        this.setAttribute('alt', value);
    },

    /**
     * 'checked' returns state, NOT the value of the attribute
     */
    get checked(){
        if (this._checked === null) {
            this._checked = this.defaultChecked;
        }
        return this._checked;
    },
    set checked(value){
        // force to boolean value
        this._checked = (value) ? true : false;
    },

    /**
     * 'defaultChecked' actually reflects if the 'checked' attribute
     * is present or not
     */
    get defaultChecked(){
        return this.hasAttribute('checked');
    },
    set defaultChecked(val){
        if (val) {
            this.setAttribute('checked', '');
        } else {
            if (this.defaultChecked) {
                this.removeAttribute('checked');
            }
        }
    },
    get defaultValue() {
        return this.getAttribute('value') || '';
    },
    set defaultValue(value) {
        this._dirty = true;
        this.setAttribute('value', value);
    },
    get value() {
        return (this._value === null) ? this.defaultValue : this._value;
    },
    set value(newvalue) {
        this._value = newvalue;
    },
    /**
     * Height is a string
     */
    get height(){
        // spec says it is a string
        return this.getAttribute('height') || '';
    },
    set height(value){
        this.setAttribute('height',value);
    },

    /**
     * MaxLength is a number
     */
    get maxLength(){
        return Number(this.getAttribute('maxlength')||'-1');
    },
    set maxLength(value){
        this.setAttribute('maxlength', value);
    },

    /**
     * Src is a URL string
     */
    get src(){
        return this.getAttribute('src') || '';
    },
    set src(value){
        // TODO: make absolute any relative URLS
        this.setAttribute('src', value);
    },

    get type() {
        return this.getAttribute('type') || 'text';
    },
    set type(value) {
        this.setAttribute('type', value);
    },

    get useMap(){
        return this.getAttribute('map') || '';
    },

    /**
     * Width: spec says it is a string
     */
    get width(){
        return this.getAttribute('width') || '';
    },
    set width(value){
        this.setAttribute('width',value);
    },
    click:function(){
        __click__(this);
    },
    toString: function() {
        return '[object HTMLInputElement]';
    }
});

//http://dev.w3.org/html5/spec/Overview.html#dom-input-value
// if someone directly modifies the value attribute, then the input's value
// also directly changes.
HTMLElement.registerSetAttribute('INPUT', 'value', function(node, value) {
    if (!node._dirty) {
        node._value = value;
        node._dirty = true;
    }
});

/*
 *The checked content attribute is a boolean attribute that gives the
 *default checkedness of the input element. When the checked content
 *attribute is added, if the control does not have dirty checkedness,
 *the user agent must set the checkedness of the element to true; when
 *the checked content attribute is removed, if the control does not
 *have dirty checkedness, the user agent must set the checkedness of
 *the element to false.
 */
// Named Element Support
HTMLElement.registerSetAttribute('INPUT', 'name', __updateFormForNamedElement__);

}(/*HTMLInputElement*/));

/**
 * HTMLLabelElement - DOM Level 2
 * HTML5 4.10.4 The label element
 * http://dev.w3.org/html5/spec/Overview.html#the-label-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLLabelElement').
		debug('HTMLLabelElement available');    
});

exports.HTMLLabelElement = HTMLLabelElement = function(ownerDocument) {
    HTMLInputCommon.apply(this, arguments);
};
HTMLLabelElement.prototype = new HTMLInputCommon();
__extend__(HTMLLabelElement.prototype, inputElements_dataProperties);
__extend__(HTMLLabelElement.prototype, {
    get htmlFor() {
        return this.getAttribute('for');
    },
    set htmlFor(value) {
        this.setAttribute('for',value);
    },
    get dataFormatAs() {
        return this.getAttribute('dataFormatAs');
    },
    set dataFormatAs(value) {
        this.setAttribute('dataFormatAs',value);
    },
    toString: function() {
        return '[object HTMLLabelElement]';
    }
});

}(/*HTMLLabelElement*/));

/*
 * HTMLLIElement
 * HTML5: 4.5.8 The li Element
 * http://dev.w3.org/html5/spec/Overview.html#the-li-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLLIElement').
		debug('HTMLLIElement available');    
});

exports.HTMLLIElement = HTMLLIElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLLIElement.prototype = new HTMLElement();
__extend__(HTMLLIElement.prototype, {
    // TODO: attribute long value;
    toString: function() {
        return '[object HTMLLIElement]';
    }
});

}(/*HTMLLIElement*/));

/*
 * HTMLLinkElement - DOM Level 2
 *
 * HTML5: 4.8.12 The link element
 * http://dev.w3.org/html5/spec/Overview.html#the-link-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLLinkElement').
		debug('HTMLLinkElement available');    
});

exports.HTMLLinkElement = HTMLLinkElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLLinkElement.prototype = new HTMLElement();
__extend__(HTMLLinkElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get charset(){
        return this.getAttribute('charset');
    },
    set charset(value){
        this.setAttribute('charset',value);
    },
    get href(){
        return this.getAttribute('href');
    },
    set href(value){
        this.setAttribute('href',value);
    },
    get hreflang(){
        return this.getAttribute('hreflang');
    },
    set hreflang(value){
        this.setAttribute('hreflang',value);
    },
    get media(){
        return this.getAttribute('media');
    },
    set media(value){
        this.setAttribute('media',value);
    },
    get rel(){
        return this.getAttribute('rel');
    },
    set rel(value){
        this.setAttribute('rel',value);
    },
    get rev(){
        return this.getAttribute('rev');
    },
    set rev(value){
        this.setAttribute('rev',value);
    },
    get target(){
        return this.getAttribute('target');
    },
    set target(value){
        this.setAttribute('target',value);
    },
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
    toString: function() {
        return '[object HTMLLinkElement]';
    }
});

}(/*HTMLLinkElement*/));




HTMLElement.registerSetAttribute('LINK', 'href', function(node, value) {
    Envjs.loadLink(node, value);
});

/**
 * Event stuff, not sure where it goes
 */
__extend__(HTMLLinkElement.prototype, {
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    }
});

/**
 * HTMLMapElement
 *
 * 4.8.12 The map element
 * http://dev.w3.org/html5/spec/Overview.html#the-map-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLMapElement').
		debug('HTMLMapElement available');    
});

exports.HTMLMapElement = HTMLMapElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLMapElement.prototype = new HTMLElement();
__extend__(HTMLMapElement.prototype, {
    get areas(){
        return this.getElementsByTagName('area');
    },
    get name(){
        return this.getAttribute('name') || '';
    },
    set name(value){
        this.setAttribute('name',value);
    },
    toString: function() {
        return '[object HTMLMapElement]';
    }
});

}(/*HTMLMapElement*/));

/**
 * HTMLMetaElement - DOM Level 2
 * HTML5: 4.2.5 The meta element
 * http://dev.w3.org/html5/spec/Overview.html#meta
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLMetaElement').
		debug('HTMLMetaElement available');    
});

exports.HTMLMetaElement = HTMLMetaElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLMetaElement.prototype = new HTMLElement();
__extend__(HTMLMetaElement.prototype, {
    get content() {
        return this.getAttribute('content') || '';
    },
    set content(value){
        this.setAttribute('content',value);
    },
    get httpEquiv(){
        return this.getAttribute('http-equiv') || '';
    },
    set httpEquiv(value){
        this.setAttribute('http-equiv',value);
    },
    get name(){
        return this.getAttribute('name') || '';
    },
    set name(value){
        this.setAttribute('name',value);
    },
    get scheme(){
        return this.getAttribute('scheme');
    },
    set scheme(value){
        this.setAttribute('scheme',value);
    },
    toString: function() {
        return '[object HTMLMetaElement]';
    }
});

}(/*HTMLMetaElement*/));

/**
 * HTMLObjectElement - DOM Level 2
 * HTML5: 4.8.5 The object element
 * http://dev.w3.org/html5/spec/Overview.html#the-object-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLObjectElement').
		debug('HTMLObjectElement available');    
});

exports.HTMLObjectElement = HTMLObjectElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLObjectElement.prototype = new HTMLElement();
__extend__(HTMLObjectElement.prototype, {
    get code(){
        return this.getAttribute('code');
    },
    set code(value){
        this.setAttribute('code',value);
    },
    get archive(){
        return this.getAttribute('archive');
    },
    set archive(value){
        this.setAttribute('archive',value);
    },
    get codeBase(){
        return this.getAttribute('codebase');
    },
    set codeBase(value){
        this.setAttribute('codebase',value);
    },
    get codeType(){
        return this.getAttribute('codetype');
    },
    set codeType(value){
        this.setAttribute('codetype',value);
    },
    get data(){
        return this.getAttribute('data');
    },
    set data(value){
        this.setAttribute('data',value);
    },
    get declare(){
        return this.getAttribute('declare');
    },
    set declare(value){
        this.setAttribute('declare',value);
    },
    get height(){
        return this.getAttribute('height');
    },
    set height(value){
        this.setAttribute('height',value);
    },
    get standby(){
        return this.getAttribute('standby');
    },
    set standby(value){
        this.setAttribute('standby',value);
    },
    /*get tabIndex(){
      return this.getAttribute('tabindex');
      },
      set tabIndex(value){
      this.setAttribute('tabindex',value);
      },*/
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
    get useMap(){
        return this.getAttribute('usemap');
    },
    set useMap(value){
        this.setAttribute('usemap',value);
    },
    get width(){
        return this.getAttribute('width');
    },
    set width(value){
        this.setAttribute('width',value);
    },
    get contentDocument(){
        return this.ownerDocument;
    },
    toString: function() {
        return '[object HTMLObjectElement]';
    }
});

// Named Element Support
HTMLElement.registerSetAttribute('OBJECT', 'name', __updateFormForNamedElement__);

}(/*HTMLObjectElement*/));

/*
 * HTMLOListElement
 * HTML5: 4.5.6 The ol Element
 * http://dev.w3.org/html5/spec/Overview.html#the-ol-element
 */
 
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLOListElement').
		debug('HTMLOListElement available');    
});

exports.HTMLOListElement = HTMLOListElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLOListElement.prototype = new HTMLElement();
__extend__(HTMLOListElement.prototype, {
    // TODO: attribute boolean reversed;
    // TODO:  attribute long start;
    toString: function() {
        return '[object HTMLOListElement]';
    }
});

}(/*HTMLOListElement*/));

/**
 * HTMLOptGroupElement - DOM Level 2
 * HTML 5: 4.10.9 The optgroup element
 * http://dev.w3.org/html5/spec/Overview.html#the-optgroup-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLOptGroupElement').
        debug('HTMLOptGroupElement available');    
});

exports.HTMLOptGroupElement = HTMLOptGroupElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLOptGroupElement.prototype = new HTMLElement();
__extend__(HTMLOptGroupElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get label(){
        return this.getAttribute('label');
    },
    set label(value){
        this.setAttribute('label',value);
    },
    appendChild: function(node){
        var i,
            length,
            selected = false;
        //make sure at least one is selected by default
        if(node.nodeType === Node.ELEMENT_NODE && node.tagName === 'OPTION'){
            length = this.childNodes.length;
            for(i=0;i<length;i++){
                if(this.childNodes[i].nodeType === Node.ELEMENT_NODE &&
                   this.childNodes[i].tagName === 'OPTION'){
                    //check if it is selected
                    if(this.selected){
                        selected = true;
                        break;
                    }
                }
            }
            if(!selected){
                node.selected = true;
                this.value = node.value?node.value:'';
            }
        }
        return HTMLElement.prototype.appendChild.apply(this, [node]);
    },
    toString: function() {
        return '[object HTMLOptGroupElement]';
    }
});

}(/*HTMLOptGroupElement*/));

/**
 * HTMLOptionElement, Option
 * HTML5: 4.10.10 The option element
 * http://dev.w3.org/html5/spec/Overview.html#the-option-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLOptionElement').
		debug('HTMLOptionElement available');    
});

exports.HTMLOptionElement = HTMLOptionElement = function(ownerDocument) {
    HTMLInputCommon.apply(this, arguments);
    this._selected = null;
};
HTMLOptionElement.prototype = new HTMLInputCommon();
__extend__(HTMLOptionElement.prototype, {

    /**
     * defaultSelected actually reflects the presence of the
     * 'selected' attribute.
     */
    get defaultSelected() {
        return this.hasAttribute('selected');
    },
    set defaultSelected(value) {
        if (value) {
            this.setAttribute('selected','');
        } else {
            if (this.hasAttribute('selected')) {
                this.removeAttribute('selected');
            }
        }
    },
    get form() {
        var parent = __selectparent__(this);
        return parent ? parent.form : null;
    },
    get index() {
        var options, i;

        if (! this.parentNode) {
            return -1;
        }
        options = this.parentNode.options;
        for (i=0; i < options.length; ++i) {
            if (this === options[i]) {
                return i;
            }
        }
        return 0;
    },
    get label() {
        return this.getAttribute('label');
    },
    set label(value) {
        this.setAttribute('label', value);
    },

    /*
     * This is not in the spec, but safari and firefox both
     * use this
     */
    get name() {
        return this.getAttribute('name');
    },
    set name(value) {
        this.setAttribute('name', value);
    },

    /**
     *
     */
    get selected() {
        // if disabled, return false, no matter what
        if (this.disabled) {
            return false;
        }
        if (this._selected === null) {
            return this.defaultSelected;
        }

        return this._selected;
    },
    set selected(value) {
        this._selected = (value) ? true : false;
    },

    get text() {
        var val = this.nodeValue;
        return (val === null || this.value === undefined) ?
            this.innerHTML :
            val;
    },
    get value() {
        var val = this.getAttribute('value');
        return (val === null || val === undefined) ?
            this.textContent :
            val;
    },
    set value(value) {
        this.setAttribute('value', value);
    },
    toString: function() {
        return '[object HTMLOptionElement]';
    }
});

exports.Option = Option = function(text, value, defaultSelected, selected) {

    // Not sure if this is correct:
    //
    // The element's document must be the active document of the
    // browsing context of the Window object on which the interface
    // object of the invoked constructor is found.
    HTMLOptionElement.apply(this, [document]);
    this.nodeName = 'OPTION';

    if (arguments.length >= 1) {
        this.appendChild(document.createTextNode('' + text));
    }
    if (arguments.length >= 2) {
        this.value = value;
    }
    if (arguments.length >= 3) {
        if (defaultSelected) {
            this.defaultSelected = '';
        }
    }
    if (arguments.length >= 4) {
        this.selected = (selected) ? true : false;
    }
};

Option.prototype = new HTMLOptionElement();

// Named Element Support

function updater(node, value) {
    __updateoptions__(node);
}
HTMLElement.registerSetAttribute('OPTION', 'name', updater);
HTMLElement.registerSetAttribute('OPTION', 'id', updater);



}(/*HTMLOptionElement*/));


/*
 * HTML5: The form IDL attribute's behavior depends on whether the
 * option element is in a select element or not. If the option has
 * a select element as its parent, or has a colgroup element as
 * its parent and that colgroup element has a select element as
 * its parent, then the form IDL attribute must return the same
 * value as the form IDL attribute on that select
 * element. Otherwise, it must return null.
 */
__selectparent__ = function(node) {
    var parent = node.parentNode;
    if (!parent) {
        return null;
    }

    if (parent.tagName === 'SELECT') {
        return parent;
    }
    if (parent.tagName === 'COLGROUP') {
        parent = parent.parentNode;
        if (parent && parent.tagName === 'SELECT') {
            return parent;
        }
    }
};
//Blah this is used in parser/htmldocument, so we have to create
//some way to access it outside the module so Envjs.updateOptions
//is a temp place holder for that
__updateoptions__ = Envjs.updateOptions = function(node) {
    var parent = __selectparent__(node),
        s;
    if (parent) {
        // has side effects and updates owner select's options
        s = parent.options;
    }
};

/*
* HTMLParagraphElement - DOM Level 2
*/

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLParagraphElement').
		debug('HTMLParagraphElement available');    
});

exports.HTMLParagraphElement = HTMLParagraphElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLParagraphElement.prototype = new HTMLElement();
__extend__(HTMLParagraphElement.prototype, {
    toString: function(){
        return '[object HTMLParagraphElement]';
    }
});

}(/*HTMLParagraphElement*/));


/**
 * HTMLParamElement
 *
 * HTML5: 4.8.6 The param element
 * http://dev.w3.org/html5/spec/Overview.html#the-param-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLParamElement').
		debug('HTMLParamElement available');    
});

exports.HTMLParamElement = HTMLParamElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLParamElement.prototype = new HTMLElement();
__extend__(HTMLParamElement.prototype, {
    get name() {
        return this.getAttribute('name') || '';
    },
    set name(value) {
        this.setAttribute('name', value);
    },
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
    get value(){
        return this.getAttribute('value');
    },
    set value(value){
        this.setAttribute('value',value);
    },
    get valueType(){
        return this.getAttribute('valuetype');
    },
    set valueType(value){
        this.setAttribute('valuetype',value);
    },
    toString: function() {
        return '[object HTMLParamElement]';
    }
});

}(/*HTMLParamElement*/));

/*
 * HTMLPreElement
 * HTML5: 4.5.4 The pre Element
 * http://dev.w3.org/html5/spec/Overview.html#the-pre-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLPreElement').
		debug('HTMLPreElement available');    
});

exports.HTMLPreElement = HTMLPreElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLPreElement.prototype = new HTMLElement();
__extend__(HTMLPreElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLPreElement]';
    }
});

}(/*HTMLPreElement*/));

/**
 * HTMLScriptElement - DOM Level 2
 *
 * HTML5: 4.3.1 The script element
 * http://dev.w3.org/html5/spec/Overview.html#script
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLScriptElement').
		debug('HTMLScriptElement available');    
});

exports.HTMLScriptElement = HTMLScriptElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLScriptElement.prototype = new HTMLElement();
__extend__(HTMLScriptElement.prototype, {

    /**
     * HTML5 spec @ http://dev.w3.org/html5/spec/Overview.html#script
     *
     * "The IDL attribute text must return a concatenation of the
     * contents of all the text nodes that are direct children of the
     * script element (ignoring any other nodes such as comments or
     * elements), in tree order. On setting, it must act the same way
     * as the textContent IDL attribute."
     *
     * AND... "The term text node refers to any Text node,
     * including CDATASection nodes; specifically, any Node with node
     * type TEXT_NODE (3) or CDATA_SECTION_NODE (4)"
     */
    get text() {
        var kids = this.childNodes;
        var kid;
        var s = '';
        var imax = kids.length;
        for (var i = 0; i < imax; ++i) {
            kid = kids[i];
            if (kid.nodeType === Node.TEXT_NODE ||
                kid.nodeType === Node.CDATA_SECTION_NODE) {
                s += kid.nodeValue;
            }
        }
        return s;
    },

    /**
     * HTML5 spec "Can be set, to replace the element's children with
     * the given value."
     */
    set text(value) {
        // this deletes all children, and make a new single text node
        // with value
        this.textContent = value;

        /* Currently we always execute, but this isn't quite right if
         * the node has *not* been inserted into the document, then it
         * should *not* fire.  The more detailed answer from the spec:
         *
         * When a script element that is neither marked as having
         * "already started" nor marked as being "parser-inserted"
         * experiences one of the events listed in the following list,
         * the user agent must synchronously run the script element:
         *
         *   * The script element gets inserted into a document.
         *   * The script element is in a Document and its child nodes
         *     are changed.
         *   * The script element is in a Document and has a src
         *     attribute set where previously the element had no such
         *     attribute.
         *
         * And no doubt there are other cases as well.
         */
        Envjs.loadInlineScript(this);
    },

    get htmlFor(){
        return this.getAttribute('for');
    },
    set htmlFor(value){
        this.setAttribute('for',value);
    },
    get event(){
        return this.getAttribute('event');
    },
    set event(value){
        this.setAttribute('event',value);
    },
    get charset(){
        return this.getAttribute('charset');
    },
    set charset(value){
        this.setAttribute('charset',value);
    },
    get defer(){
        return this.getAttribute('defer');
    },
    set defer(value){
        this.setAttribute('defer',value);
    },
    get src(){
        return this.getAttribute('src')||'';
    },
    set src(value){
        this.setAttribute('src',value);
    },
    get type(){
        return this.getAttribute('type')||'';
    },
    set type(value){
        this.setAttribute('type',value);
    },
    onload: HTMLEvents.prototype.onload,
    onerror: HTMLEvents.prototype.onerror,
    toString: function() {
        return '[object HTMLScriptElement]';
    }
});

}(/*HTMLScriptElement*/));

/**
 * HTMLSelectElement
 * HTML5: http://dev.w3.org/html5/spec/Overview.html#the-select-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLSelectElement').
		debug('HTMLSelectElement available');    
});

exports.HTMLSelectElement = HTMLSelectElement = function(ownerDocument) {
    HTMLTypeValueInputs.apply(this, arguments);
    this._oldIndex = -1;
};

HTMLSelectElement.prototype = new HTMLTypeValueInputs();
__extend__(HTMLSelectElement.prototype, inputElements_dataProperties);
__extend__(HTMLButtonElement.prototype, inputElements_size);
__extend__(HTMLSelectElement.prototype, inputElements_onchange);
__extend__(HTMLSelectElement.prototype, inputElements_focusEvents);
__extend__(HTMLSelectElement.prototype, {

    get value() {
        var index = this.selectedIndex;
        return (index === -1) ? '' : this.options[index].value;
    },
    set value(newValue) {
        var options = this.options;
        var imax = options.length;
        for (var i=0; i< imax; ++i) {
            if (options[i].value == newValue) {
                this.setAttribute('value', newValue);
                this.selectedIndex = i;
                return;
            }
        }
    },
    get multiple() {
        return this.hasAttribute('multiple');
    },
    set multiple(value) {
        if (value) {
            this.setAttribute('multiple', '');
        } else {
            if (this.hasAttribute('multiple')) {
                this.removeAttribute('multiple');
            }
        }
    },
    // Returns HTMLOptionsCollection
    get options() {
        var nodes = this.getElementsByTagName('option');
        var alist = new NodeList();
        var i, tmp;
        for (i = 0; i < nodes.length; ++i) {
            alist.push(nodes[i]);
            this[i] = nodes[i];
            tmp = nodes[i].name;
            if (tmp) {
                this[tmp] = nodes[i];
            }
            tmp = nodes[i].id;
            if (tmp) {
                this[tmp] = nodes[i];
            }
        }
        return new HTMLCollection(alist);
    },
    get length() {
        return this.options.length;
    },
    item: function(idx) {
        return this.options[idx];
    },
    namedItem: function(aname) {
        return this.options[aname];
    },

    get selectedIndex() {
        var options = this.options;
        var imax = options.length;
        for (var i=0; i < imax; ++i) {
            if (options[i].selected) {
                //console.log('select get selectedIndex %s', i);
                return i;
            }
        }
        //console.log('select get selectedIndex %s', -1);
        return -1;
    },

    set selectedIndex(value) {
        var options = this.options;
        var num = Number(value);
        var imax = options.length;
        for (var i = 0; i < imax; ++i) {
            options[i].selected = (i === num);
        }
    },
    get type() {
        return this.multiple ? 'select-multiple' : 'select-one';
    },

    add: function(element, before) {
        this.appendChild(element);
        //__add__(this);
    },
    remove: function() {
        //__remove__(this);
    },
    toString: function() {
        return '[object HTMLSelectElement]';
    }
});

// Named Element Support
HTMLElement.registerSetAttribute('SELECT', 'name', __updateFormForNamedElement__);

}(/*HTMLSelectElement*/));
/**
 * HTML 5: 4.6.22 The span element
 * http://dev.w3.org/html5/spec/Overview.html#the-span-element
 * 
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLSpanElement').
		debug('HTMLSpanElement available');    
});

exports.HTMLSpanElement = HTMLSpanElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLSpanElement.prototype = new HTMLElement();
__extend__(HTMLSpanElement.prototype, {
    toString: function(){
        return '[object HTMLSpanElement]';
    }
});

}(/*HTMLSpanElement*/));

/**
 * HTMLStyleElement - DOM Level 2
 * HTML5 4.2.6 The style element
 * http://dev.w3.org/html5/spec/Overview.html#the-style-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLStyleElement').
		debug('HTMLStyleElement available');    
});

exports.HTMLStyleElement = HTMLStyleElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLStyleElement.prototype = new HTMLElement();
__extend__(HTMLStyleElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get media(){
        return this.getAttribute('media');
    },
    set media(value){
        this.setAttribute('media',value);
    },
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
    toString: function() {
        return '[object HTMLStyleElement]';
    }
});

}(/*HTMLStyleElement*/));

/**
 * HTMLTableElement - DOM Level 2
 * Implementation Provided by Steven Wood
 *
 * HTML5: 4.9.1 The table element
 * http://dev.w3.org/html5/spec/Overview.html#the-table-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableElement').
		debug('HTMLTableElement available');    
});

exports.HTMLTableElement = HTMLTableElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableElement.prototype = new HTMLElement();
__extend__(HTMLTableElement.prototype, {

    get tFoot() {
        //tFoot returns the table footer.
        return this.getElementsByTagName("tfoot")[0];
    },

    createTFoot : function () {
        var tFoot = this.tFoot;

        if (!tFoot) {
            tFoot = document.createElement("tfoot");
            this.appendChild(tFoot);
        }

        return tFoot;
    },

    deleteTFoot : function () {
        var foot = this.tFoot;
        if (foot) {
            foot.parentNode.removeChild(foot);
        }
    },

    get tHead() {
        //tHead returns the table head.
        return this.getElementsByTagName("thead")[0];
    },

    createTHead : function () {
        var tHead = this.tHead;

        if (!tHead) {
            tHead = document.createElement("thead");
            this.insertBefore(tHead, this.firstChild);
        }

        return tHead;
    },

    deleteTHead : function () {
        var head = this.tHead;
        if (head) {
            head.parentNode.removeChild(head);
        }
    },

    /*appendChild : function (child) {

      var tagName;
      if(child&&child.nodeType==Node.ELEMENT_NODE){
      tagName = child.tagName.toLowerCase();
      if (tagName === "tr") {
      // need an implcit <tbody> to contain this...
      if (!this.currentBody) {
      this.currentBody = document.createElement("tbody");

      Node.prototype.appendChild.apply(this, [this.currentBody]);
      }

      return this.currentBody.appendChild(child);

      } else if (tagName === "tbody" || tagName === "tfoot" && this.currentBody) {
      this.currentBody = child;
      return Node.prototype.appendChild.apply(this, arguments);

      } else {
      return Node.prototype.appendChild.apply(this, arguments);
      }
      }else{
      //tables can still have text node from white space
      return Node.prototype.appendChild.apply(this, arguments);
      }
      },*/

    get tBodies() {
        return new HTMLCollection(this.getElementsByTagName("tbody"));

    },

    get rows() {
        return new HTMLCollection(this.getElementsByTagName("tr"));
    },

    insertRow : function (idx) {
        if (idx === undefined) {
            throw new Error("Index omitted in call to HTMLTableElement.insertRow ");
        }

        var rows = this.rows,
            numRows = rows.length,
            node,
            inserted,
            lastRow;

        if (idx > numRows) {
            throw new Error("Index > rows.length in call to HTMLTableElement.insertRow");
        }

        inserted = document.createElement("tr");
        // If index is -1 or equal to the number of rows,
        // the row is appended as the last row. If index is omitted
        // or greater than the number of rows, an error will result
        if (idx === -1 || idx === numRows) {
            this.appendChild(inserted);
        } else {
            rows[idx].parentNode.insertBefore(inserted, rows[idx]);
        }

        return inserted;
    },

    deleteRow : function (idx) {
        var elem = this.rows[idx];
        elem.parentNode.removeChild(elem);
    },

    get summary() {
        return this.getAttribute("summary");
    },

    set summary(summary) {
        this.setAttribute("summary", summary);
    },

    get align() {
        return this.getAttribute("align");
    },

    set align(align) {
        this.setAttribute("align", align);
    },

    get bgColor() {
        return this.getAttribute("bgColor");
    },

    set bgColor(bgColor) {
        return this.setAttribute("bgColor", bgColor);
    },

    get cellPadding() {
        return this.getAttribute("cellPadding");
    },

    set cellPadding(cellPadding) {
        return this.setAttribute("cellPadding", cellPadding);
    },

    get cellSpacing() {
        return this.getAttribute("cellSpacing");
    },

    set cellSpacing(cellSpacing) {
        this.setAttribute("cellSpacing", cellSpacing);
    },

    get frame() {
        return this.getAttribute("frame");
    },

    set frame(frame) {
        this.setAttribute("frame", frame);
    },

    get rules() {
        return this.getAttribute("rules");
    },

    set rules(rules) {
        this.setAttribute("rules", rules);
    },

    get width() {
        return this.getAttribute("width");
    },

    set width(width) {
        this.setAttribute("width", width);
    },
    toString: function() {
        return '[object HTMLTableElement]';
    }
});

}(/*HTMLTableElement*/));

/*
 * HTMLxElement - DOM Level 2
 * - Contributed by Steven Wood
 *
 * HTML5: 4.9.5 The tbody element
 * http://dev.w3.org/html5/spec/Overview.html#the-tbody-element
 * http://dev.w3.org/html5/spec/Overview.html#htmltablesectionelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableSectionElement').
		debug('HTMLTableSectionElement available');    
});

exports.HTMLTableSectionElement = HTMLTableSectionElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableSectionElement.prototype = new HTMLElement();
__extend__(HTMLTableSectionElement.prototype, {

    /*appendChild : function (child) {

    // disallow nesting of these elements.
    if (child.tagName.match(/TBODY|TFOOT|THEAD/)) {
    return this.parentNode.appendChild(child);
    } else {
    return Node.prototype.appendChild.apply(this, arguments);
    }

    },*/

    get align() {
        return this.getAttribute("align");
    },

    get ch() {
        return this.getAttribute("ch");
    },

    set ch(ch) {
        this.setAttribute("ch", ch);
    },

    // ch gets or sets the alignment character for cells in a column.
    set chOff(chOff) {
        this.setAttribute("chOff", chOff);
    },

    get chOff() {
        return this.getAttribute("chOff");
    },

    get vAlign () {
        return this.getAttribute("vAlign");
    },

    get rows() {
        return new HTMLCollection(this.getElementsByTagName("tr"));
    },

    insertRow : function (idx) {
        if (idx === undefined) {
            throw new Error("Index omitted in call to HTMLTableSectionElement.insertRow ");
        }

        var numRows = this.rows.length,
        node = null;

        if (idx > numRows) {
            throw new Error("Index > rows.length in call to HTMLTableSectionElement.insertRow");
        }

        var row = document.createElement("tr");
        // If index is -1 or equal to the number of rows,
        // the row is appended as the last row. If index is omitted
        // or greater than the number of rows, an error will result
        if (idx === -1 || idx === numRows) {
            this.appendChild(row);
        } else {
            node = this.firstChild;

            for (var i=0; i<idx; i++) {
                node = node.nextSibling;
            }
        }

        this.insertBefore(row, node);

        return row;
    },

    deleteRow : function (idx) {
        var elem = this.rows[idx];
        this.removeChild(elem);
    },

    toString: function() {
        return '[object HTMLTableSectionElement]';
    }
});

}(/*HTMLTableSectionElement*/));


/**
 * HTMLTableCellElement
 * base interface for TD and TH
 *
 * HTML5: 4.9.11 Attributes common to td and th elements
 * http://dev.w3.org/html5/spec/Overview.html#htmltablecellelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableCellElement').
		debug('HTMLTableCellElement available');    
});

exports.HTMLTableCellElement = HTMLTableCellElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableCellElement.prototype = new HTMLElement();
__extend__(HTMLTableCellElement.prototype, {
    // TOOD: attribute unsigned long  colSpan;
    // TODO: attribute unsigned long  rowSpan;
    // TODO: attribute DOMString      headers;
    // TODO: readonly attribute long  cellIndex;

    // Not really necessary but might be helpful in debugging
    toString: function() {
        return '[object HTMLTableCellElement]';
    }

});

}(/*HTMLTableCellElement*/));

/**
 * HTMLTableDataCellElement
 * HTML5: 4.9.9 The td Element
 * http://dev.w3.org/html5/spec/Overview.html#the-td-element
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableDataCellElement').
		debug('HTMLTableDataCellElement available');    
});

exports.HTMLTableDataCellElement = HTMLTableDataCellElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableDataCellElement.prototype = new HTMLTableCellElement();
__extend__(HTMLTableDataCellElement.prototype, {

    // adds no new properties or methods

    toString: function() {
        return '[object HTMLTableDataCellElement]';
    }
});

}(/*HTMLTableDataCellElement*/));



/**
 * HTMLTableHeaderCellElement
 * HTML5: 4.9.10 The th Element
 * http://dev.w3.org/html5/spec/Overview.html#the-th-element
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableHeaderCellElement').
		debug('HTMLTableHeaderCellElement available');    
});

exports.HTMLTableHeaderCellElement = HTMLTableHeaderCellElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableHeaderCellElement.prototype = new HTMLTableCellElement();
__extend__(HTMLTableHeaderCellElement.prototype, {
    // TODO:  attribute DOMString scope
    toString: function() {
        return '[object HTMLTableHeaderCellElement]';
    }
});

}(/*HTMLTableHeaderCellElement*/));


/**
 * HTMLTextAreaElement - DOM Level 2
 * HTML5: 4.10.11 The textarea element
 * http://dev.w3.org/html5/spec/Overview.html#the-textarea-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTextAreaElement').
		debug('HTMLTextAreaElement available');    
});

exports.HTMLTextAreaElement = HTMLTextAreaElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
    this._rawvalue = null;
};
HTMLTextAreaElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLTextAreaElement.prototype, {
    get cols(){
        return Number(this.getAttribute('cols')||'-1');
    },
    set cols(value){
        this.setAttribute('cols', value);
    },
    get rows(){
        return Number(this.getAttribute('rows')||'-1');
    },
    set rows(value){
        this.setAttribute('rows', value);
    },

    /*
     * read-only
     */
    get type() {
        return this.getAttribute('type') || 'textarea';
    },

    /**
     * This modifies the text node under the widget
     */
    get defaultValue() {
        return this.textContent;
    },
    set defaultValue(value) {
        this.textContent = value;
    },

    /**
     * http://dev.w3.org/html5/spec/Overview.html#concept-textarea-raw-value
     */
    get value() {
        return (this._rawvalue === null) ? this.defaultValue : this._rawvalue;
    },
    set value(value) {
        this._rawvalue = value;
    },
    toString: function() {
        return '[object HTMLTextAreaElement]';
    }
});

// Named Element Support
HTMLElement.registerSetAttribute('TEXTAREA', 'name', __updateFormForNamedElement__);

}(/*HTMLTextAreaElement*/));

/**
 * HTMLTitleElement - DOM Level 2
 *
 * HTML5: 4.2.2 The title element
 * http://dev.w3.org/html5/spec/Overview.html#the-title-element-0
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTitleElement').
		debug('HTMLTitleElement available');    
});

exports.HTMLTitleElement = HTMLTitleElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTitleElement.prototype = new HTMLElement();
__extend__(HTMLTitleElement.prototype, {
    get text() {
        return this.innerText;
    },

    set text(titleStr) {
        this.textContent = titleStr;
    },
    toString: function() {
        return '[object HTMLTitleElement]';
    }
});

}(/*HTMLTitleElement*/));

/**
 * HTMLRowElement - DOM Level 2
 * Implementation Provided by Steven Wood
 *
 * HTML5: 4.9.8 The tr element
 * http://dev.w3.org/html5/spec/Overview.html#the-tr-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLTableRowElement').
		debug('HTMLTableRowElement available');    
});

exports.HTMLTableRowElement = HTMLTableRowElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableRowElement.prototype = new HTMLElement();
__extend__(HTMLTableRowElement.prototype, {

    /*appendChild : function (child) {

      var retVal = Node.prototype.appendChild.apply(this, arguments);
      retVal.cellIndex = this.cells.length -1;

      return retVal;
      },*/
    // align gets or sets the horizontal alignment of data within cells of the row.
    get align() {
        return this.getAttribute("align");
    },

    get bgColor() {
        return this.getAttribute("bgcolor");
    },

    get cells() {
        var nl = this.getElementsByTagName("td");
        return new HTMLCollection(nl);
    },

    get ch() {
        return this.getAttribute("ch");
    },

    set ch(ch) {
        this.setAttribute("ch", ch);
    },

    // ch gets or sets the alignment character for cells in a column.
    set chOff(chOff) {
        this.setAttribute("chOff", chOff);
    },

    get chOff() {
        return this.getAttribute("chOff");
    },

    /**
     * http://dev.w3.org/html5/spec/Overview.html#dom-tr-rowindex
     */
    get rowIndex() {
        var nl = this.parentNode.childNodes;
        for (var i=0; i<nl.length; i++) {
            if (nl[i] === this) {
                return i;
            }
        }
        return -1;
    },

    /**
     * http://dev.w3.org/html5/spec/Overview.html#dom-tr-sectionrowindex
     */
    get sectionRowIndex() {
        var nl = this.parentNode.getElementsByTagName(this.tagName);
        for (var i=0; i<nl.length; i++) {
            if (nl[i] === this) {
                return i;
            }
        }
        return -1;
    },

    get vAlign () {
        return this.getAttribute("vAlign");
    },

    insertCell : function (idx) {
        if (idx === undefined) {
            throw new Error("Index omitted in call to HTMLTableRow.insertCell");
        }

        var numCells = this.cells.length,
        node = null;

        if (idx > numCells) {
            throw new Error("Index > rows.length in call to HTMLTableRow.insertCell");
        }

        var cell = document.createElement("td");

        if (idx === -1 || idx === numCells) {
            this.appendChild(cell);
        } else {


            node = this.firstChild;

            for (var i=0; i<idx; i++) {
                node = node.nextSibling;
            }
        }

        this.insertBefore(cell, node);
        cell.cellIndex = idx;

        return cell;
    },
    deleteCell : function (idx) {
        var elem = this.cells[idx];
        this.removeChild(elem);
    },
    toString: function() {
        return '[object HTMLTableRowElement]';
    }

});

}(/*HTMLTableRowElement*/));

/*
 * HTMLUListElement
 * HTML5: 4.5.7 The ul Element
 * http://dev.w3.org/html5/spec/Overview.html#htmlhtmlelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLUListElement').
		debug('HTMLUListElement available');    
});

exports.HTMLUListElement = HTMLUListElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLUListElement.prototype = new HTMLElement();
__extend__(HTMLUListElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLUListElement]';
    }
});

}(/*HTMLUListElement*/));

/**
 * HTMLUnknownElement DOM Level 2
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLUnknownElement').
		debug('HTMLUnknownElement available');    
});

exports.HTMLUnknownElement = HTMLUnknownElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLUnknownElement.prototype = new HTMLElement();
__extend__(HTMLUnknownElement.prototype,{
    toString: function(){
        return '[object HTMLUnknownElement]';
    }
});

}(/*HTMLUnknownElement*/));

/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
