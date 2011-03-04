/*
 * Envjs event.1.3.pre03
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 *
 * This file simply provides the global definitions we need to
 * be able to correctly implement to core browser DOM Event interfaces.

 - leaked globally -

var Event,
    MouseEvent,
    UIEvent,
    KeyboardEvent,
    MutationEvent,
    DocumentEvent,
    EventTarget,
    EventException;
    
 */

var Envjs = Envjs || require('./platform/core').Envjs,
	After = After || require('./platform/core').After,
	Document = Document || require('./dom').Document;
/*
 * Envjs event.1.3.pre03 
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
var __addEventListener__,
    __removeEventListener__,
    __dispatchEvent__,
    __captureEvent__,
    __bubbleEvent__;

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.EventTarget').debug('available'); 
});

/**
 * @name EventTarget
 * @w3c:domlevel 2
 * @uri -//TODO: paste dom event level 2 w3c spc uri here
 */
exports.EventTarget = EventTarget = function(){};
EventTarget.prototype.addEventListener = function(type, fn, phase){
    __addEventListener__(this, type, fn, phase);
};
EventTarget.prototype.removeEventListener = function(type, fn, phase){
    __removeEventListener__(this, type, fn, phase);
};
EventTarget.prototype.dispatchEvent = function(event, bubbles){
    __dispatchEvent__(this, event, bubbles);
};

__extend__(Node.prototype, EventTarget.prototype);

var $events = [{}];

__addEventListener__ = function(target, type, fn, phase){
    phase = !!phase?"CAPTURING":"BUBBLING";
    if ( !target.uuid ) {
        target.uuid = $events.length+'';
        log.debug('add event uuid for %s %s', target, target.uuid);
    }
    if ( !$events[target.uuid] ) {
        log.debug('creating listener for target: %s %s', target, target.uuid);
        $events[target.uuid] = {};
    }
    if ( !$events[target.uuid][type] ){
        log.debug('creating listener for type: %s %s %s', target, target.uuid, type);
        $events[target.uuid][type] = {
            CAPTURING:[],
            BUBBLING:[]
        };
    }
    if ( $events[target.uuid][type][phase].indexOf( fn ) < 0 ){
        log.debug( 'adding event listener %s %s %s %s', target, target.uuid, type, phase);
        $events[target.uuid][type][phase].push( fn );
    }
    log.debug('registered event listeners %s', $events.length);
};

__removeEventListener__ = function(target, type, fn, phase){
    phase = !!phase?"CAPTURING":"BUBBLING";
    if ( !target.uuid ) {
        log.debug('target has never had registered events %s', target);
        return;
    }
    if ( !$events[target.uuid] ) {
        log.debug('target has no registered events to remove %s %s', target, target.uuid);
        return;
    }
    if(type == '*'){
        //used to clean all event listeners for a given node
        log.debug('cleaning all event listeners for node %s %s',target, target.uuid);
        delete $events[target.uuid];
        return;
    }else if ( !$events[target.uuid][type] ){
        log.debug('target has no registered events of type %s to remove %s %s', type, target, target.uuid);
        return;
    }
    $events[target.uuid][type][phase] =
        $events[target.uuid][type][phase].filter(function(f){
            log.debug('removing event listener %s %s %s %s',  target, type, phase );
            return f != fn;
        });
};

var __eventuuid__ = 0;

__dispatchEvent__ = function(target, event, bubbles){
    
    if (!event.uuid) {
        event.uuid = __eventuuid__++;
    }
    //the window scope defines the $event object, for IE(^^^) compatibility;
    //$event = event;

    if (bubbles === undefined || bubbles === null) {
        bubbles = true;
    }

    if (!event.target) {
        event.target = target;
    }

    log.debug('dispatching %s %s %s %s', event.uuid, target, event.type, bubbles);
    if ( event.type && (target.nodeType || target === window )) {

        __captureEvent__(target, event);

        event.eventPhase = Event.AT_TARGET;
        if ( target.uuid && $events[target.uuid] && $events[target.uuid][event.type] ) {
            event.currentTarget = target;

            log.debug('begin dispatching capturing phase %s %s', target, event.type);
            $events[target.uuid][event.type].CAPTURING.forEach(function(fn){
                log.debug('capturing event %s', target);
                var returnValue = fn.apply(target, [event]);
                if(returnValue === false){
                    event.stopPropagation();
                }
            });

            log.debug('begin dispatching bubbling phase %s %s', target, event.type);
            $events[target.uuid][event.type].BUBBLING.forEach(function(fn){
                log.debug('bubbling event %s', target);
                var returnValue = fn.apply(target, [event] );
                if(returnValue === false){
                    event.stopPropagation();
                }
            });
        }
        if (target["on" + event.type]) {
            target["on" + event.type](event);
        }
        if (bubbles && !event.cancelled){
            __bubbleEvent__(target, event);
        }
        if(!event._preventDefault){
            //At this point I'm guessing that just HTMLEvents are concerned
            //with default behavior being executed in a browser but I could be
            //wrong as usual.  The goal is much more to filter at this point
            //what events have no need to be handled
            //console.log('triggering default behavior for %s', event.type);
            if(event.type in Envjs.defaultEventBehaviors){
                Envjs.defaultEventBehaviors[event.type](event);
            }
        }
        log.debug('deleting event %s', event.uuid);
        event.target = null;
        event = null;
    }else{
        throw new EventException(EventException.UNSPECIFIED_EVENT_TYPE_ERR);
    }
};

__captureEvent__ = function(target, event){
    var ancestorStack = [],
        parent = target.parentNode,
        stopevent = function(fn){
            var returnValue = fn( event );
            if(returnValue === false){
                event.stopPropagation();
            }
        };

    event.eventPhase = Event.CAPTURING_PHASE;
    while(parent){
        if(parent.uuid && $events[parent.uuid] && $events[parent.uuid][event.type]){
            ancestorStack.push(parent);
        }
        parent = parent.parentNode;
    }
    while(ancestorStack.length && !event.cancelled){
        event.currentTarget = ancestorStack.pop();
        if($events[event.currentTarget.uuid] && $events[event.currentTarget.uuid][event.type]){
            $events[event.currentTarget.uuid][event.type].CAPTURING.forEach(stopevent);
        }
    }
};

__bubbleEvent__ = function(target, event){
    var parent = target.parentNode,
        stopevent = function(fn){
            var returnValue = fn( event );
            if(returnValue === false){
                event.stopPropagation();
            }
        };
    event.eventPhase = Event.BUBBLING_PHASE;
    while(parent){
        if(parent.uuid && $events[parent.uuid] && $events[parent.uuid][event.type] ){
            event.currentTarget = parent;
            $events[event.currentTarget.uuid][event.type].BUBBLING.forEach(stopevent);
        }
        parent = parent.parentNode;
    }
};

}(/*Envjs.DOM2.EventTarget*/));




(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Event').debug('available'); 
});

/**
 * @class Event
 */
exports.Event = Event = function(options){
    // event state is kept read-only by forcing
    // a new object for each event.  This may not
    // be appropriate in the long run and we'll
    // have to decide if we simply dont adhere to
    // the read-only restriction of the specification
    this._bubbles = true;
    this._cancelable = true;
    this._cancelled = false;
    this._currentTarget = null;
    this._target = null;
    this._eventPhase = Event.AT_TARGET;
    this._timeStamp = new Date().getTime();
    this._preventDefault = false;
    this._stopPropogation = false;
};

__extend__(Event.prototype,{
    get bubbles(){return this._bubbles;},
    get cancelable(){return this._cancelable;},
    get currentTarget(){return this._currentTarget;},
    set currentTarget(currentTarget){ this._currentTarget = currentTarget; },
    get eventPhase(){return this._eventPhase;},
    set eventPhase(eventPhase){this._eventPhase = eventPhase;},
    get target(){return this._target;},
    set target(target){ this._target = target;},
    get timeStamp(){return this._timeStamp;},
    get type(){return this._type;},
    initEvent: function(type, bubbles, cancelable){
        this._type=type?type:'';
        this._bubbles=!!bubbles;
        this._cancelable=!!cancelable;
    },
    preventDefault: function(){
        this._preventDefault = true;
    },
    stopPropagation: function(){
        if(this._cancelable){
            this._cancelled = true;
            this._bubbles = false;
        }
    },
    get cancelled(){
        return this._cancelled;
    },
    toString: function(){
        return '[object Event]';
    }
});

__extend__(Event,{
    CAPTURING_PHASE : 1,
    AT_TARGET       : 2,
    BUBBLING_PHASE  : 3
});

}(/*Envjs.DOM.Event*/));



(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.UIEvent').debug('available'); 
});

/**
 * @name UIEvent
 * @param {Object} options
 */
exports.UIEvent = UIEvent = function(options) {
    this._view = null;
    this._detail = 0;
};

UIEvent.prototype = new Event();
__extend__(UIEvent.prototype,{
    get view(){
        return this._view;
    },
    get detail(){
        return this._detail;
    },
    initUIEvent: function(type, bubbles, cancelable, windowObject, detail){
        this.initEvent(type, bubbles, cancelable);
        this._detail = 0;
        this._view = windowObject;
    }
});

}(/*Envjs.DOM.UIEvent*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.MouseEvent').debug('available'); 
});

/**
 * @name MouseEvent
 * @w3c:domlevel 2 
 * @uri http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 */
exports.MouseEvent = MouseEvent = function(options) {
    this._screenX= 0;
    this._screenY= 0;
    this._clientX= 0;
    this._clientY= 0;
    this._ctrlKey= false;
    this._metaKey= false;
    this._altKey= false;
    this._button= null;
    this._relatedTarget= null;
};
MouseEvent.prototype = new UIEvent();
__extend__(MouseEvent.prototype,{
    get screenX(){
        return this._screenX;
    },
    get screenY(){
        return this._screenY;
    },
    get clientX(){
        return this._clientX;
    },
    get clientY(){
        return this._clientY;
    },
    get ctrlKey(){
        return this._ctrlKey;
    },
    get altKey(){
        return this._altKey;
    },
    get shiftKey(){
        return this._shiftKey;
    },
    get metaKey(){
        return this._metaKey;
    },
    get button(){
        return this._button;
    },
    get relatedTarget(){
        return this._relatedTarget;
    },
    initMouseEvent: function(type, bubbles, cancelable, windowObject, detail,
            screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, 
            metaKey, button, relatedTarget){
        this.initUIEvent(type, bubbles, cancelable, windowObject, detail);
        this._screenX = screenX;
        this._screenY = screenY;
        this._clientX = clientX;
        this._clientY = clientY;
        this._ctrlKey = ctrlKey;
        this._altKey = altKey;
        this._shiftKey = shiftKey;
        this._metaKey = metaKey;
        this._button = button;
        this._relatedTarget = relatedTarget;
    }
});

}(/*Envjs.DOM2.MouseEvent*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.KeyboardEvent').
		debug('KeyboardEvent available'); 
});

/**
 * Interface KeyboardEvent (introduced in DOM Level 3)
 */
exports.KeyboardEvent = KeyboardEvent = function(options) {
    this._keyIdentifier = 0;
    this._keyLocation = 0;
    this._ctrlKey = false;
    this._metaKey = false;
    this._altKey = false;
    this._metaKey = false;
};
KeyboardEvent.prototype = new UIEvent();

__extend__(KeyboardEvent.prototype,{

    get ctrlKey(){
        return this._ctrlKey;
    },
    get altKey(){
        return this._altKey;
    },
    get shiftKey(){
        return this._shiftKey;
    },
    get metaKey(){
        return this._metaKey;
    },
    get button(){
        return this._button;
    },
    get relatedTarget(){
        return this._relatedTarget;
    },
    getModifiersState: function(keyIdentifier){

    },
    initMouseEvent: function(type, bubbles, cancelable, windowObject,
            keyIdentifier, keyLocation, modifiersList, repeat){
        this.initUIEvent(type, bubbles, cancelable, windowObject, 0);
        this._keyIdentifier = keyIdentifier;
        this._keyLocation = keyLocation;
        this._modifiersList = modifiersList;
        this._repeat = repeat;
    }
});

KeyboardEvent.DOM_KEY_LOCATION_STANDARD      = 0;
KeyboardEvent.DOM_KEY_LOCATION_LEFT          = 1;
KeyboardEvent.DOM_KEY_LOCATION_RIGHT         = 2;
KeyboardEvent.DOM_KEY_LOCATION_NUMPAD        = 3;
KeyboardEvent.DOM_KEY_LOCATION_MOBILE        = 4;
KeyboardEvent.DOM_KEY_LOCATION_JOYSTICK      = 5;

}(/*Envjs.DOM3.KeyboardEvent*/));


//We dont fire mutation events until someone has registered for them
var __supportedMutations__ = /DOMSubtreeModified|DOMNodeInserted|DOMNodeRemoved|DOMAttrModified|DOMCharacterDataModified/;

var __fireMutationEvents__ = Aspect.before({
    target: EventTarget,
    method: 'addEventListener'
}, function(target, type){
    if(type && type.match(__supportedMutations__)){
        //unweaving removes the __addEventListener__ aspect
        __fireMutationEvents__.unweave();
        // These two methods are enough to cover all dom 2 manipulations
        Aspect.around({
            target: Node,
            method:"removeChild"
        }, function(invocation){
            var event,
                node = invocation['arguments'][0];
            event = node.ownerDocument.createEvent('MutationEvents');
            event.initEvent('DOMNodeRemoved', true, false, node.parentNode, null, null, null, null);
            node.dispatchEvent(event, false);
            return invocation.proceed();

        });
        Aspect.around({
            target: Node,
            method:"appendChild"
        }, function(invocation) {
            var event,
                node = invocation.proceed();
            event = node.ownerDocument.createEvent('MutationEvents');
            event.initEvent('DOMNodeInserted', true, false, node.parentNode, null, null, null, null);
            node.dispatchEvent(event, false);
            return node;
        });
    }
});

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.MutationEvent').debug('available'); 
});

/**
 * @name MutationEvent
 * @param {Object} options
 */
exports.MutationEvent = MutationEvent = function(options) {
    this._cancelable = false;
    this._timeStamp = 0;
};

MutationEvent.prototype = new Event();
__extend__(MutationEvent.prototype,{
    get relatedNode(){
        return this._relatedNode;
    },
    get prevValue(){
        return this._prevValue;
    },
    get newValue(){
        return this._newValue;
    },
    get attrName(){
        return this._attrName;
    },
    get attrChange(){
        return this._attrChange;
    },
    initMutationEvent: function( type, bubbles, cancelable,
            relatedNode, prevValue, newValue, attrName, attrChange ){
        this._relatedNode = relatedNode;
        this._prevValue = prevValue;
        this._newValue = newValue;
        this._attrName = attrName;
        this._attrChange = attrChange;
        switch(type){
            case "DOMSubtreeModified":
                this.initEvent(type, true, false);
                break;
            case "DOMNodeInserted":
                this.initEvent(type, true, false);
                break;
            case "DOMNodeRemoved":
                this.initEvent(type, true, false);
                break;
            case "DOMNodeRemovedFromDocument":
                this.initEvent(type, false, false);
                break;
            case "DOMNodeInsertedIntoDocument":
                this.initEvent(type, false, false);
                break;
            case "DOMAttrModified":
                this.initEvent(type, true, false);
                break;
            case "DOMCharacterDataModified":
                this.initEvent(type, true, false);
                break;
            default:
                this.initEvent(type, bubbles, cancelable);
        }
    }
});

// constants
MutationEvent.ADDITION = 0;
MutationEvent.MODIFICATION = 1;
MutationEvent.REMOVAL = 2;

}(/*Envjs.DOM.MutationEvent*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.EventException').debug('available'); 
});

/**
 * @name EventException
 */
exports.EventException = EventException = function(code) {
  this.code = code;
};
EventException.UNSPECIFIED_EVENT_TYPE_ERR = 0;

}(/*Envjs.DOM2.EventException*/));
/**
 *
 * DOM Level 2: http://www.w3.org/TR/DOM-Level-2-Events/events.html
 * DOM Level 3: http://www.w3.org/TR/DOM-Level-3-Events/
 *
 * interface DocumentEvent {
 *   Event createEvent (in DOMString eventType)
 *      raises (DOMException);
 * };
 *
 * Firefox (3.6) exposes DocumentEvent
 * Safari (4) does NOT.
 */

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DocumentEvent').debug('available'); 
});

/**
 * TODO: Not sure we need a full prototype.  We not just an regular object?
 */
exports.DocumentEvent = DocumentEvent = function(){};
DocumentEvent.prototype.__EventMap__ = {
    // Safari4: singular and plural forms accepted
    // Firefox3.6: singular and plural forms accepted
    'Event'          : Event,
    'Events'         : Event,
    'UIEvent'        : UIEvent,
    'UIEvents'       : UIEvent,
    'MouseEvent'     : MouseEvent,
    'MouseEvents'    : MouseEvent,
    'MutationEvent'  : MutationEvent,
    'MutationEvents' : MutationEvent,

    // Safari4: accepts HTMLEvents, but not HTMLEvent
    // Firefox3.6: accepts HTMLEvents, but not HTMLEvent
    'HTMLEvent'      : Event,
    'HTMLEvents'     : Event,

    // Safari4: both not accepted
    // Firefox3.6, only KeyEvents is accepted
    'KeyEvent'       : KeyboardEvent,
    'KeyEvents'      : KeyboardEvent,

    // Safari4: both accepted
    // Firefox3.6: none accepted
    'KeyboardEvent'  : KeyboardEvent,
    'KeyboardEvents' : KeyboardEvent
};

DocumentEvent.prototype.createEvent = function(eventType) {
    var Clazz = this.__EventMap__[eventType];
    if (Clazz) {
        return new Clazz();
    }
    throw(new DOMException(DOMException.NOT_SUPPORTED_ERR));
};

__extend__(Document.prototype, DocumentEvent.prototype);


}(/*Envjs.DOM.DocumentEvent*/));

/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
