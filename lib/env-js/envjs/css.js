
/**
 * DOM Style Level 2
 
Leaked globally 

var CSS2Properties,
    CSSRule,
    CSSStyleRule,
    CSSImportRule,
    CSSMediaRule,
    CSSFontFaceRule,
    CSSPageRule,
    CSSRuleList,
    CSSStyleSheet,
    StyleSheet,
    StyleSheetList;

*/
	
var Envjs = Envjs || require('./platform/core').Envjs,
	Document = require('./dom').Document,
	HTMLElement = require('./html').HTMLElement;
/*
 * Envjs css.1.3.pre03 
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
 * @author john resig
 */
//from jQuery
function __setArray__( target, array ) {
    // Resetting the length to 0, then using the native Array push
    // is a super-fast way to populate an object with array-like properties
    target.length = 0;
    Array.prototype.push.apply( target, array );
}

/**
 * @author ariel flesler
 *    http://flesler.blogspot.com/2008/11/fast-trim-function-for-javascript.html
 * @param {Object} str
 */
function __trim__( str ){
    return (str || "").replace( /^\s+|\s+$/g, "" );
}


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Document').debug('available'); 
});

/**
 * Interface DocumentStyle (introduced in DOM Level 2)
 * http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/stylesheets.html#StyleSheets-StyleSheet-DocumentStyle
 *
 * interface DocumentStyle {
 *   readonly attribute StyleSheetList   styleSheets;
 * };
 *
 */

__extend__(Document.prototype, {
    get styleSheets() {
        if (! this._styleSheets) {
            this._styleSheets = new StyleSheetList();
        }
        return this._styleSheets;
    }
});

}(/*Envjs.DOM.Document*/));
/*
 * CSS2Properties - DOM Level 2 CSS
 * Renamed to CSSStyleDeclaration??
 */

var __toCamelCase__ = function(name) {
    if (name) {
        return name.replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase();
        });
    }
    return name;
};

var __toDashed__ = function(camelCaseName) {
    if (camelCaseName) {
        return camelCaseName.replace(/[A-Z]/g, function(all) {
            return '-' + all.toLowerCase();
        });
    }
    return camelCaseName;
};

var __cssTextToStyles__,
    __supportedStyles__;
    

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.CSS.CSS2Properties').debug('available'); 
});

exports.CSS2Properties = CSS2Properties = function(element){
    //console.log('css2properties %s', __cssproperties__++);
    this.styleIndex = __supportedStyles__;//non-standard
    this.type = element.tagName;//non-standard
    __setArray__(this, []);
    __cssTextToStyles__(this, element.cssText || '');
};
__extend__(CSS2Properties.prototype, {
    get cssText() {
        var i, css = [];
        for (i = 0; i < this.length; ++i) {
            css.push(this[i] + ': ' + this.getPropertyValue(this[i]) + ';');
        }
        return css.join(' ');
    },
    set cssText(cssText) {
        __cssTextToStyles__(this, cssText);
    },
    getPropertyCSSValue: function(name) {
        //?
    },
    getPropertyPriority: function() {

    },
    getPropertyValue: function(name) {
        var index, cname = __toCamelCase__(name);
        if (cname in this.styleIndex) {
            return this[cname];
        } else {
            index = Array.prototype.indexOf.apply(this, [name]);
            if (index > -1) {
                return this[index];
            }
        }
        return null;
    },
    item: function(index) {
        return this[index];
    },
    removeProperty: function(name) {
        this.styleIndex[name] = null;
        name = __toDashed__(name);
        var index = Array.prototype.indexOf.apply(this, [name]);
        if (index > -1) {
            Array.prototype.splice.apply(this, [1,index]);
        }
    },
    setProperty: function(name, value, priority) {
        var nval;
        name = __toCamelCase__(name);
        if (value !== undefined && name in this.styleIndex) {
            // NOTE:  parseFloat('300px') ==> 300  no
            // NOTE:  Number('300px') ==> Nan      yes
            nval = Number(value);
            this.styleIndex[name] = isNaN(nval) ? value : nval;
            name = __toDashed__(name);
            if (Array.prototype.indexOf.apply(this, [name]) === -1 ){
                Array.prototype.push.apply(this,[name]);
            }
        }
    },
    toString: function() {
        return '[object CSS2Properties]';
    }
});



__cssTextToStyles__ = function(css2props, cssText) {
    //console.log('__cssTextToStyles__ %s %s', css2props, cssText);
    var i, style, styles = cssText.split(';');
    for (i = 0; i < styles.length; ++i) {
        style = styles[i].split(':');
        if (style.length === 2) {
            css2props.setProperty(
                style[0].replace(' ', '', 'g'),
                style[1].replace(' ', '', 'g')
            );
        }
    }
};

//Obviously these arent all supported but by commenting out various
//sections this provides a single location to configure what is
//exposed as supported.
__supportedStyles__ = {
    azimuth:                null,
    background:             null,
    backgroundAttachment:   null,
    backgroundColor:        'rgb(0,0,0)',
    backgroundImage:        null,
    backgroundPosition:     null,
    backgroundRepeat:       null,
    border:                 null,
    borderBottom:           null,
    borderBottomColor:      null,
    borderBottomStyle:      null,
    borderBottomWidth:      null,
    borderCollapse:         null,
    borderColor:            null,
    borderLeft:             null,
    borderLeftColor:        null,
    borderLeftStyle:        null,
    borderLeftWidth:        null,
    borderRight:            null,
    borderRightColor:       null,
    borderRightStyle:       null,
    borderRightWidth:       null,
    borderSpacing:          null,
    borderStyle:            null,
    borderTop:              null,
    borderTopColor:         null,
    borderTopStyle:         null,
    borderTopWidth:         null,
    borderWidth:            null,
    bottom:                 null,
    captionSide:            null,
    clear:                  null,
    clip:                   null,
    color:                  null,
    content:                null,
    counterIncrement:       null,
    counterReset:           null,
    cssFloat:               null,
    cue:                    null,
    cueAfter:               null,
    cueBefore:              null,
    cursor:                 null,
    direction:              'ltr',
    display:                null,
    elevation:              null,
    emptyCells:             null,
    font:                   null,
    fontFamily:             null,
    fontSize:               '1em',
    fontSizeAdjust:         null,
    fontStretch:            null,
    fontStyle:              null,
    fontVariant:            null,
    fontWeight:             null,
    height:                 '',
    left:                   null,
    letterSpacing:          null,
    lineHeight:             null,
    listStyle:              null,
    listStyleImage:         null,
    listStylePosition:      null,
    listStyleType:          null,
    margin:                 null,
    marginBottom:           '0px',
    marginLeft:             '0px',
    marginRight:            '0px',
    marginTop:              '0px',
    markerOffset:           null,
    marks:                  null,
    maxHeight:              null,
    maxWidth:               null,
    minHeight:              null,
    minWidth:               null,
    opacity:                1,
    orphans:                null,
    outline:                null,
    outlineColor:           null,
    outlineOffset:          null,
    outlineStyle:           null,
    outlineWidth:           null,
    overflow:               null,
    overflowX:              null,
    overflowY:              null,
    padding:                null,
    paddingBottom:          '0px',
    paddingLeft:            '0px',
    paddingRight:           '0px',
    paddingTop:             '0px',
    page:                   null,
    pageBreakAfter:         null,
    pageBreakBefore:        null,
    pageBreakInside:        null,
    pause:                  null,
    pauseAfter:             null,
    pauseBefore:            null,
    pitch:                  null,
    pitchRange:             null,
    position:               null,
    quotes:                 null,
    richness:               null,
    right:                  null,
    size:                   null,
    speak:                  null,
    speakHeader:            null,
    speakNumeral:           null,
    speakPunctuation:       null,
    speechRate:             null,
    stress:                 null,
    tableLayout:            null,
    textAlign:              null,
    textDecoration:         null,
    textIndent:             null,
    textShadow:             null,
    textTransform:          null,
    top:                    null,
    unicodeBidi:            null,
    verticalAlign:          null,
    visibility:             '',
    voiceFamily:            null,
    volume:                 null,
    whiteSpace:             null,
    widows:                 null,
    width:                  '1px',
    wordSpacing:            null,
    zIndex:                 1
};

var __displayMap__ = {
    DIV      : 'block',
    P        : 'block',
    A        : 'inline',
    CODE     : 'inline',
    PRE      : 'block',
    SPAN     : 'inline',
    TABLE    : 'table',
    THEAD    : 'table-header-group',
    TBODY    : 'table-row-group',
    TR       : 'table-row',
    TH       : 'table-cell',
    TD       : 'table-cell',
    UL       : 'block',
    LI       : 'list-item'
};

var __addStyleAccessor__ = function(name){
    if (name === 'width' || name === 'height') {
        CSS2Properties.prototype.__defineGetter__(name, function() {
            if (this.display === 'none'){
                return '0px';
            }
            return this.styleIndex[name];
        });
    } else if (name === 'display') {
        //display will be set to a tagName specific value if ''
        CSS2Properties.prototype.__defineGetter__(name, function() {
            var val = this.styleIndex[name];
            val = val ? val :__displayMap__[this.type];
            return val;
        });
    } else {
        CSS2Properties.prototype.__defineGetter__(name, function() {
            return this.styleIndex[name];
        });
    }
    CSS2Properties.prototype.__defineSetter__(name, function(value) {
        this.setProperty(name, value);
    });
};

for (var style in __supportedStyles__) {
    if (__supportedStyles__.hasOwnProperty(style)) {
        __addStyleAccessor__(style);
    }
}

}(/*Envjs.CSS.CSS2Properties*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.CSS.CSSRule').debug('available'); 
});

/*
 * CSSRule - DOM Level 2
 */
exports.CSSRule = CSSRule = function(options) {

    var $style,
        $selectorText = options.selectorText ? options.selectorText : '';
        $style = new CSS2Properties({
            cssText: options.cssText ? options.cssText : null
        });

    return __extend__(this, {
        get style(){
            return $style;
        },
        get selectorText(){
            return $selectorText;
        },
        set selectorText(selectorText){
            $selectorText = selectorText;
        },
        toString : function(){
            return "[object CSSRule]";
        }
    });
};

CSSRule.STYLE_RULE     =  1;
CSSRule.IMPORT_RULE    =  3;
CSSRule.MEDIA_RULE     =  4;
CSSRule.FONT_FACE_RULE =  5;
CSSRule.PAGE_RULE      =  6;
//CSSRule.NAMESPACE_RULE = 10;


CSSStyleRule = function() {

};

CSSImportRule = function() {

};

CSSMediaRule = function() {

};

CSSFontFaceRule = function() {

};

CSSPageRule = function() {

};


CSSRuleList = function(data) {
    this.length = 0;
    __setArray__(this, data);
};

__extend__(CSSRuleList.prototype, {
    item : function(index) {
        if ((index >= 0) && (index < this.length)) {
            // bounds check
            return this[index];
        }
        return null;
    },
    toString: function() {
        return '[object CSSRuleList]';
    }
});

}(/*Envjs.CSS.CSSRuleList*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.CSS.CSSStyleSheet').debug('available'); 
});

/**
 * StyleSheet
 * http://dev.w3.org/csswg/cssom/#stylesheet
 *
 * interface StyleSheet {
 *   readonly attribute DOMString type;
 *   readonly attribute DOMString href;
 *   readonly attribute Node ownerNode;
 *   readonly attribute StyleSheet parentStyleSheet;
 *   readonly attribute DOMString title;
 *   [PutForwards=mediaText] readonly attribute MediaList media;
 *          attribute boolean disabled;
 * };
 */
StyleSheet = function() {};

/*
 * CSSStyleSheet
 * http://dev.w3.org/csswg/cssom/#cssstylesheet
 *
 * interface CSSStyleSheet : StyleSheet {
 *   readonly attribute CSSRule ownerRule;
 *   readonly attribute CSSRuleList cssRules;
 *   unsigned long insertRule(DOMString rule, unsigned long index);
 *   void deleteRule(unsigned long index);
 * };
 */
exports.CSSStyleSheets = CSSStyleSheet = function(options){
    var $cssRules,
        $disabled = options.disabled ? options.disabled : false,
        $href = options.href ? options.href : null,
        $parentStyleSheet = options.parentStyleSheet ? options.parentStyleSheet : null,
        $title = options.title ? options.title : "",
        $type = "text/css";

    function parseStyleSheet(text){
        //$debug("parsing css");
        //this is pretty ugly, but text is the entire text of a stylesheet
        var cssRules = [];
        if (!text) {
            text = '';
        }
        text = __trim__(text.replace(/\/\*(\r|\n|.)*\*\//g,""));
        // TODO: @import
        var blocks = text.split("}");
        blocks.pop();
        var i, j, len = blocks.length;
        var definition_block, properties, selectors;
        for (i=0; i<len; i++) {
            definition_block = blocks[i].split("{");
            if (definition_block.length === 2) {
                selectors = definition_block[0].split(",");
                for (j=0; j<selectors.length; j++) {
                    cssRules.push(new CSSRule({
                        selectorText : __trim__(selectors[j]),
                        cssText      : definition_block[1]
                    }));
                }
            }
        }
        return cssRules;
    }

    $cssRules = new CSSRuleList(parseStyleSheet(options.textContent));

    return __extend__(this, {
        get cssRules(){
            return $cssRules;
        },
        get rule(){
            return $cssRules;
        },//IE - may be deprecated
        get href(){
            return $href;
        },
        get parentStyleSheet(){
            return $parentStyleSheet;
        },
        get title(){
            return $title;
        },
        get type(){
            return $type;
        },
        addRule: function(selector, style, index){/*TODO*/},
        deleteRule: function(index){/*TODO*/},
        insertRule: function(rule, index){/*TODO*/},
        //IE - may be deprecated
        removeRule: function(index){
            this.deleteRule(index);
        }
    });
};

exports.StyleSheetList = StyleSheetList = function() {};

StyleSheetList.prototype = [];

__extend__(StyleSheetList.prototype, {
    item : function(index) {
        if ((index >= 0) && (index < this.length)) {
            // bounds check
            return this[index];
        }
        return null;
    },
    toString: function() {
        return '[object StyleSheetList]';
    }
});

}(/*Envjs.CSS.CSSStyleSheet*/));
/**
 * This extends HTMLElement to handle CSS-specific interfaces.
 *
 * More work / research would be needed to extend just (DOM) Element
 * for xml use and additional changes for just HTMLElement.
 */

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.HTML.HTMLElement').debug('available'); 
});


/**
 * Replace or add  the getter for 'style'
 *
 * This could be wrapped in a closure
 */
var $css2properties = [{}];

__extend__(HTMLElement.prototype, {
    get style(){
        if ( !this.css2uuid ) {
            this.css2uuid = $css2properties.length;
            $css2properties[this.css2uuid] = new CSS2Properties(this);
        }
        return $css2properties[this.css2uuid];
    }
});

/**
 * Change for how 'setAttribute("style", ...)' works
 *
 * We are truly adding functionality to HtmlElement.setAttribute, not
 * replacing it.  So we need to save the old one first, call it, then
 * do our stuff.  If we need to do more hacks like this, HTMLElement
 * (or regular Element) needs to have a hooks array or dispatch table
 * for global changes.
 *
 * This could be wrapped in a closure if desired.
 */
var updateCss2Props = function(elem, values) {
    //console.log('__updateCss2Props__ %s %s', elem, values);
    if ( !elem.css2uuid ) {
        elem.css2uuid = $css2properties.length;
        $css2properties[elem.css2uuid] = new CSS2Properties(elem);
    }
    __cssTextToStyles__($css2properties[elem.css2uuid], values);
};

var origSetAttribute =  HTMLElement.prototype.setAttribute;

HTMLElement.prototype.setAttribute = function(name, value) {
    //console.log("CSS set attribute: " + name + ", " + value);
    origSetAttribute.apply(this, arguments);
    if (name === "style") {
        updateCss2Props(this, value);
    }
};

var origGetAttribute =  HTMLElement.prototype.getAttribute;

HTMLElement.prototype.getAttribute = function(name) {
    //console.log("CSS set attribute: " + name + ", " + value);
	var style;
    if (name === "style") {
        style = this.style.cssText;
		return style===""?null:style;
    }else{
	    return origGetAttribute.apply(this, arguments);
	}
};

}(/*Envjs.HTML.HTMLElement*/));

/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
