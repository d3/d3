/*
 * Envjs dom.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 * 
 * Parts of the implementation were originally written by:\
 * and Jon van Noort   (jon@webarcana.com.au) \
 * and David Joham     (djoham@yahoo.com)",\ 
 * and Scott Severtson
 * 
 * This file simply provides the global definitions we need to \
 * be able to correctly implement to core browser DOM interfaces."

The following are leaked globally intentionally

var Attr,
    CDATASection,
    CharacterData,
    Comment,
    Document,
    DocumentFragment,
    DocumentType,
    DOMException,
    DOMImplementation,
    Element,
    Entity,
    EntityReference,
    NamedNodeMap,
    Namespace,
    Node,
    NodeList,
    Notation,
    ProcessingInstruction,
    Text,
    Range,
    XMLSerializer,
    DOMParser,
	XPathResult,
	XPathExpression;

*/

var Envjs = Envjs || require('./platform/core').Envjs,
	After = After || require('./platform/core').After;

/*
 * Envjs dom.1.3.pre03 
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
var __findItemIndex__,
	__insertBefore__,
	__replaceChild__,
	__removeChild__,
	__appendChild__,
	__addToIndexes__,
	__removeFromIndexes__,
	__cloneNodes__;
	
//see namednodemap for these implementations
var __addToNamedIndexes__, 
	__removeFromNamedIndexes__;
	
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.NodeList').debug('available'); 
});
/**
 * @class  NodeList -
 *      provides the abstraction of an ordered collection of nodes
 *
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NodeList is attached to (or null)
 */
exports.NodeList = NodeList = function(ownerDocument, parentNode) {
    this.parentNode = parentNode;
    this.ownerDocument = ownerDocument;
    this._readonly = false;
};
NodeList.prototype = [];
__extend__(NodeList.prototype, {
    item : function(index) {
        var ret = null;
        if ((index >= 0) && (index < this.length)) {
            // bounds check
            ret = this[index];
        }
        // if the index is out of bounds, default value null is returned
        return ret;
    },
    get xml() {
        var ret = "",
            j;

        // create string containing the concatenation of the string values of each child
        for (j=0; j < this.length; j++) {
            if(this[j] !== null){
                if(this[j].nodeType == Node.TEXT_NODE && j>0 &&
                   this[j-1].nodeType == Node.TEXT_NODE){
                    //add a single space between adjacent text nodes
                    ret += " "+this[j].xml;
                }else{
                    ret += this[j].xml;
                }
            }
        }
        return ret;
    },
    toArray: function () {
		return this;
    },
    toString: function(){
        return "[object NodeList]";
    }
});


/**
 * @method __findItemIndex__
 *      find the item index of the node
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  node : Node
 * @return : int
 */
__findItemIndex__ = function (nodelist, node) {
    // if node is not found, default value -1 is returned
    // return ret;
	return nodelist.indexOf(node);
};

/**
 * @method __insertBefore__
 *      insert the specified Node into the NodeList before the specified index
 *      Used by Node.insertBefore(). Note: Node.insertBefore() is responsible
 *      for Node Pointer surgery __insertBefore__ simply modifies the internal
 *      data structure (Array).
 * @param  newChild      : Node - the Node to be inserted
 * @param  refChildIndex : int     - the array index to insert the Node before
 */
__insertBefore__ = function(nodelist, newChild, refChildIndex) {
    if ((refChildIndex >= 0) && (refChildIndex <= nodelist.length)) {
        // bounds check
        if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // node is a DocumentFragment
            // append the children of DocumentFragment
            Array.prototype.splice.apply(nodelist,
                [refChildIndex, 0].concat(newChild.childNodes.toArray()));
        }
        else {
            // append the newChild
            Array.prototype.splice.apply(nodelist,[refChildIndex, 0, newChild]);
			__addToIndexes__(newChild, nodelist.parentNode);
        }
    }
};

/**
 * @method __replaceChild__
 *      replace the specified Node in the NodeList at the specified index
 *      Used by Node.replaceChild(). Note: Node.replaceChild() is responsible
 *      for Node Pointer surgery __replaceChild__ simply modifies the internal
 *      data structure (Array).
 *
 * @param  newChild      : Node - the Node to be inserted
 * @param  refChildIndex : int     - the array index to hold the Node
 */
__replaceChild__ = function(nodelist, newChild, refChildIndex) {
    var ret = null;

    // bounds check
    if ((refChildIndex >= 0) && (refChildIndex < nodelist.length)) {
        // preserve old child for return
        ret = nodelist[refChildIndex];

        if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // node is a DocumentFragment
            // get array containing children prior to refChild
            Array.prototype.splice.apply(nodelist,
                [refChildIndex, 1].concat(newChild.childNodes.toArray()));
        }
        else {
            // simply replace node in array (links between Nodes are
            // made at higher level)
            nodelist[refChildIndex] = newChild;
        }
    }
    // return replaced node
    return ret;
};

/**
 * @method __removeChild__
 *      remove the specified Node in the NodeList at the specified index
 *      Used by Node.removeChild(). Note: Node.removeChild() is responsible
 *      for Node Pointer surgery __removeChild__ simply modifies the internal
 *      data structure (Array).
 * @param  refChildIndex : int - the array index holding the Node to be removed
 */
__removeChild__ = function(nodelist, refChildIndex) {
    var ret = null;

    if (refChildIndex > -1) {
        // found it!
        // return removed node
        ret = nodelist[refChildIndex];
        // rebuild array without removed child
        Array.prototype.splice.apply(nodelist,[refChildIndex, 1]);
		__removeFromIndexes__(ret, nodelist.parentNode);
    }
    // return removed node
    return ret;
};

/**
 * @method __appendChild__
 *      append the specified Node to the NodeList. Used by Node.appendChild().
 *      Note: Node.appendChild() is responsible for Node Pointer surgery
 *      __appendChild__ simply modifies the internal data structure (Array).
 * @param  newChild      : Node - the Node to be inserted
 */
__appendChild__ = function(nodelist, newChild) {
	log.debug('Appending child %s to nodelist %s', newChild.nodeName, nodelist.length);
	var i;
    if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
        // newChild is a DocumentFragment
        // append the children of DocumentFragment
        Array.prototype.push.apply(nodelist, newChild.childNodes.toArray() );
		for(i=0;i< newChild.childNodes.length;i++){
			__addToIndexes__(newChild.childNodes[i], nodelist.parentNode);
		}
    } else {
        // simply add node to array (links between Nodes are made at higher level)
        Array.prototype.push.apply(nodelist, [newChild]);
		__addToIndexes__(newChild, nodelist.parentNode);
    }

};

__addToIndexes__ = function(node, ancestor){
	var indexes, index, normalizedName, i, j, descendingIndex, offset, sibling, children, id, name;
	if(node.nodeType == Node.ELEMENT_NODE){
		log.debug('updating node indexes for node %s ancestor %s', node.tagName, ancestor.nodeName);
		//now we need to walk up all ancestors updating nodelist indexes
		normalizedName = (node.tagName+'').toLowerCase();
		
		//if the node doesnt have a parentNode yet then it has been imported
		//into the document, but it is just now being appended.  This means we
		//need to merge the nodes indexes into the ancestors (which will become
		//the parentNode just after this operation completes)
		if(!node.parentNode){
			indexes = node._indexes_;
			for(name in indexes){
				//this is the index of all descendants of the ancestor with the given tagname
				if(!ancestor._indexes_.hasOwnProperty(name) && name != normalizedName ){
					
					ancestor._indexes_[name] = [];
					for(j=0;j<indexes[name].length;j++){
						ancestor._indexes_[name].push(indexes[name][j]);
					}
					
				}else if(name != '*' && name != normalizedName){
					
					offset = 0;
					//this is the index of all descendants with the given tagname
					index = ancestor._indexes_[name];
					children = ancestor.childNodes;
					for(i=0;i<children.length;i++){
						sibling = children[i];
						if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName){
							//find the first child, if any, that exist in this index so we can determine
							//the document offset at which to update this index
							offset += (sibling._indexes_[name]?sibling._indexes_[name].length:0)+1;
						}else if(sibling === node){
							break;
						}
					}
					//the descending index is additively a part of the new index
					descendingIndex = node._indexes_[name]?node._indexes_[name]:[];
					Array.prototype.splice.apply(	
						index, 
						Array.prototype.concat.apply(
							[offset, 0],
							descendingIndex.slice(0,descendingIndex.length)
						)
					);
					log.debug('added %s to index %s -> %s', node.tagName, ancestor.tagName||'document', offset);
					
				}
			}
		}
		//now we basically need to crawl up the ancestor chain, merging indexes
		//using some smarts
		while(ancestor){
			//these are all the indexes already built on the ancestor
			indexes = ancestor._indexes_;
			if(!(normalizedName in indexes)){
				//make sure we have an index for this particular tagname
				indexes[normalizedName] = 
					new NodeList(node.ownerDocument, ancestor);
			}
			
			offset = 1;
			//this is the index of all descendants with the given tagname
			index = indexes[normalizedName];
			children = ancestor.childNodes;
			for(i=0;i<children.length;i++){
				sibling = children[i];
				if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName){
					//find the first child, if any, that exist in this index so we can determine
					//the document offset at which to update this index
					offset += (sibling._indexes_[normalizedName]?sibling._indexes_[normalizedName].length:0)+1;
				}else if(sibling === node){
					break;
				}
			}
			//the descending index is additively a part of the new index
			descendingIndex = node._indexes_[normalizedName]?node._indexes_[normalizedName]:[];
			Array.prototype.splice.apply(	
				index, 
				[offset, 0, node].concat(
					descendingIndex.slice(0,descendingIndex.length)
				)
			);
			log.debug('added %s to index %s -> %s', node.tagName, ancestor.tagName||'document', offset);
			
			
			offset = 0;
			//this is the index of all descendants with the given tagname, so simply follow
			//the same procedure as above but use the '*' index
			index = indexes['*'];
			children = ancestor.childNodes;
			for(i=0;i<children.length;i++){
				sibling = children[i];
				if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE ){
					offset += (sibling._indexes_['*']?sibling._indexes_['*'].length:0)+1;
				}else if(sibling === node){
					break;
				}
			}
			descendingIndex = node._indexes_['*']?node._indexes_['*']:[];
			Array.prototype.splice.apply(
				index, 
				[offset, 0, node].concat(
					descendingIndex.slice(0,descendingIndex.length)
				)
			);
			//console.log('added %s to index * -> %s', node.tagName,  offset);
			
			//handle input type elements and their ancestor form elements
			//So far we dont bother with maintaining document order for this index
			if('FORM' == ancestor.nodeName){
				switch (node.nodeName) {
	            case 'BUTTON':
	            case 'FIELDSET':
	            case 'INPUT':
	            case 'KEYGEN':
	            case 'OBJECT':
	            case 'OUTPUT':
	            case 'SELECT':
	            case 'TEXTAREA':
					if(!indexes.hasOwnProperty('$elements')){
						//make sure we have an index for the form.elements
						indexes.$elements = 
							new NodeList(node.ownerDocument, ancestor);
					}
					Array.prototype.push.apply(indexes.$elements, [node]);
					name = node.getAttribute('name');
					if( name && !ancestor[name] ){
						//<form name='foo'><input name='bar' is available via document.foo.bar
						ancestor[name] = node;
					}
	            }
			}
			//walk straight up the dom updating other indexes
			log.debug('walking up node chain, node %s has parentNode %s', ancestor.nodeName, ancestor.parentNode);
			ancestor = ancestor.parentNode;
			
		}
	}
};

__removeFromIndexes__ = function(node, ancestor){
	var indexes, index, normalizedName, i, length, offset, id, name, doc;
	
	if(node.nodeType == Node.ELEMENT_NODE){
		normalizedName = (node.tagName+'').toLowerCase();
		//console.log('removing node from live indexes for node %s', node.tagName);
		id = node.getAttribute('id');
		if(id){
			node.ownerDocument._indexes_["#"+id] = null;
		}	
		name = node.getAttribute('name');
		if(name){
			__removeFromNamedIndexes__('name', name, node);
		}
		while(ancestor){
			indexes = ancestor._indexes_;
			if(!(normalizedName in indexes)){
				indexes[normalizedName] = 
					new NodeList(node.ownerDocument, ancestor);
				//the index did not exist on the ancestor until now so
				//dont bother cleaning it, just move up the ancestor chain
				ancestor = ancestor.parentNode;
				continue;
			}
			index = indexes[normalizedName];
			i = Array.prototype.indexOf.apply(index, [node]);
			if(i>-1){
				offset = node._indexes_[normalizedName];
				offset = offset?offset.length:0;
				length = 1+offset;
				//console.log('removing %s[%s] from index %s -> %s', node.tagName, i, ancestor.tagName, index.toArray());
				Array.prototype.splice.apply(index, [i,length]); 
			}
			
			index = indexes['*'];
			i = Array.prototype.indexOf.apply(index, [node]);
			if(i>-1){
				offset = node._indexes_['*'];
				offset = offset?offset.length:0;
				length = 1+offset;
				//console.log('removing %s from index * -> %s', node.tagName,  index.toArray());
				Array.prototype.splice.apply(index, [i,length]); 
			}
			
			//handle input type elements and their ancestor form elements
			//So far we dont bother with maintaining document order for this index
			if('FORM' == ancestor.nodeName){
				switch (node.nodeName) {
	            case 'BUTTON':
	            case 'FIELDSET':
	            case 'INPUT':
	            case 'KEYGEN':
	            case 'OBJECT':
	            case 'OUTPUT':
	            case 'SELECT':
	            case 'TEXTAREA':
	                doc = node.ownerDocument;
					if(!indexes.hasOwnProperty('$elements')){
						//make sure we have an index for the form.elements
						indexes.$elements = 
							new NodeList(node.ownerDocument, ancestor);
					}
					offset = Array.prototype.indexOf.apply(doc._indexes_.$elements, [node]);
					if(index > -1){
						Array.prototype.splice.apply(doc._indexes_.$elements,[offset,1]);
					}
					name = node.getAttribute('name');
					if( name && ancestor[name] == node ){
						//<form name='foo'><input name='bar' is no longer available via document.foo.bar
						delete ancestor[name];
					}
	            }
			}
			ancestor = ancestor.parentNode;
		}
	}
};

/**
 * @method __cloneNodes__ -
 *      Returns a NodeList containing clones of the Nodes in this NodeList
 * @param  deep : boolean -
 *      If true, recursively clone the subtree under each of the nodes;
 *      if false, clone only the nodes themselves (and their attributes,
 *      if it is an Element).
 * @param  parentNode : Node - the new parent of the cloned NodeList
 * @return : NodeList - NodeList containing clones of the Nodes in this NodeList
 */
__cloneNodes__ = function(nodelist, deep, parentNode) {
    var cloneNodeList = new NodeList(nodelist.ownerDocument, parentNode);

    // create list containing clones of each child
    for (var i=0; i < nodelist.length; i++) {
        __appendChild__(cloneNodeList, nodelist[i].cloneNode(deep));
    }

    return cloneNodeList;
};

}(/*Envjs.DOM.Nodelist*/));





var __ownerDocument__ = function(node){
        return (node.nodeType == Node.DOCUMENT_NODE)?node:node.ownerDocument;
    },
    __recursivelyGatherText__,
    __isAncestor__,
    __escapeXML__,
    __unescapeXML__,
    __getElementsByTagNameRecursive__,
    __getElementsByTagNameNSRecursive__;

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Node').debug('available'); 
});
/**
 * @class  Node -
 *      The Node interface is the primary datatype for the entire
 *      Document Object Model. It represents a single node in the
 *      document tree.
 * @param  ownerDocument : Document - The Document object associated with this node.
 */

exports.Node = Node = function(ownerDocument) {
    this.baseURI = 'about:blank';
    this.namespaceURI = null;
    this.nodeName = "";
    this.nodeValue = null;

    // A NodeList that contains all children of this node. If there are no
    // children, this is a NodeList containing no nodes.  The content of the
    // returned NodeList is "live" in the sense that, for instance, changes to
    // the children of the node object that it was created from are immediately
    // reflected in the nodes returned by the NodeList accessors; it is not a
    // static snapshot of the content of the node. This is true for every
    // NodeList, including the ones returned by the getElementsByTagName method.
    this.childNodes      = new NodeList(ownerDocument, this);

    // The first child of this node. If there is no such node, this is null
    this.firstChild      = null;
    // The last child of this node. If there is no such node, this is null.
    this.lastChild       = null;
    // The node immediately preceding this node. If there is no such node,
    // this is null.
    this.previousSibling = null;
    // The node immediately following this node. If there is no such node,
    // this is null.
    this.nextSibling     = null;

    this.attributes = null;
    // The namespaces in scope for this node
    this._namespaces = new NamespaceNodeMap(ownerDocument, this);
    this._readonly = false;


    //IMPORTANT: These must come last so rhino will not iterate parent
    //           properties before child properties.  (qunit.equiv issue)

    // The parent of this node. All nodes, except Document, DocumentFragment,
    // and Attr may have a parent.  However, if a node has just been created
    // and not yet added to the tree, or if it has been removed from the tree,
    // this is null
    this.parentNode      = null;
    // The Document object associated with this node
    this.ownerDocument = ownerDocument;
	this._indexes_ = {
		'ancestors'	: new NodeList(ownerDocument, this),
		'*': new NodeList(ownerDocument, this)
	};

};

// nodeType constants
Node.ELEMENT_NODE                = 1;
Node.ATTRIBUTE_NODE              = 2;
Node.TEXT_NODE                   = 3;
Node.CDATA_SECTION_NODE          = 4;
Node.ENTITY_REFERENCE_NODE       = 5;
Node.ENTITY_NODE                 = 6;
Node.PROCESSING_INSTRUCTION_NODE = 7;
Node.COMMENT_NODE                = 8;
Node.DOCUMENT_NODE               = 9;
Node.DOCUMENT_TYPE_NODE          = 10;
Node.DOCUMENT_FRAGMENT_NODE      = 11;
Node.NOTATION_NODE               = 12;
Node.NAMESPACE_NODE              = 13;

Node.DOCUMENT_POSITION_EQUAL        = 0x00;
Node.DOCUMENT_POSITION_DISCONNECTED = 0x01;
Node.DOCUMENT_POSITION_PRECEDING    = 0x02;
Node.DOCUMENT_POSITION_FOLLOWING    = 0x04;
Node.DOCUMENT_POSITION_CONTAINS     = 0x08;
Node.DOCUMENT_POSITION_CONTAINED_BY = 0x10;
Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC      = 0x20;


__extend__(Node.prototype, {
    get localName(){
        return this.prefix?
            this.nodeName.substring(this.prefix.length+1, this.nodeName.length):
            this.nodeName;
    },
    get prefix(){
        return this.nodeName.split(':').length>1?
            this.nodeName.split(':')[0]:
            null;
    },
    set prefix(value){
        if(value === null){
            this.nodeName = this.localName;
        }else{
            this.nodeName = value+':'+this.localName;
        }
    },
    hasAttributes : function() {
        return this.attributes.length ?
            true :
            false ;
    },
    get textContent(){
        return __recursivelyGatherText__(this);
    },
    set textContent(newText){
		log.debug('setText %s', newText);
        while(this.firstChild){
            this.removeChild( this.firstChild );
        }
        var text = this.ownerDocument.createTextNode(newText);
        this.appendChild(text);
    },
    insertBefore : function(newChild, refChild) {
		log.debug('insert %s Before %s', newChild.nodeName, refChild.nodeName);
        var prevNode;

        if(!newChild){
            return newChild;
        }
        if(!refChild){
            this.appendChild(newChild);
            return this.newChild;
        }

        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Node is readonly
            if (this._readonly) {
                throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if newChild was not created by this Document
            if (__ownerDocument__(this) != __ownerDocument__(newChild)) {
                throw(new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if the node is an ancestor
            if (__isAncestor__(this, newChild)) {
                throw(new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
            }
        }

        // if refChild is specified, insert before it
        if (refChild) {
            // find index of refChild
            var itemIndex = __findItemIndex__(this.childNodes, refChild);
            // throw Exception if there is no child node with this id
            if (__ownerDocument__(this).implementation.errorChecking && (itemIndex < 0)) {
                throw(new DOMException(DOMException.NOT_FOUND_ERR));
            }

            // if the newChild is already in the tree,
            var newChildParent = newChild.parentNode;
            if (newChildParent) {
                // remove it
                newChildParent.removeChild(newChild);
            }

            // insert newChild into childNodes
            __insertBefore__(this.childNodes, newChild, itemIndex);

            // do node pointer surgery
            prevNode = refChild.previousSibling;

            // handle DocumentFragment
            if (newChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                if (newChild.childNodes.length > 0) {
                    // set the parentNode of DocumentFragment's children
                    for (var ind = 0; ind < newChild.childNodes.length; ind++) {
                        newChild.childNodes[ind].parentNode = this;
                    }

                    // link refChild to last child of DocumentFragment
                    refChild.previousSibling = newChild.childNodes[newChild.childNodes.length-1];
                }
            }else {
                // set the parentNode of the newChild
                newChild.parentNode = this;
                // link refChild to newChild
                refChild.previousSibling = newChild;
            }

        }else {
            // otherwise, append to end
            prevNode = this.lastChild;
            this.appendChild(newChild);
        }

        if (newChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            // do node pointer surgery for DocumentFragment
            if (newChild.childNodes.length > 0) {
                if (prevNode) {
                    prevNode.nextSibling = newChild.childNodes[0];
                }else {
                    // this is the first child in the list
                    this.firstChild = newChild.childNodes[0];
                }
                newChild.childNodes[0].previousSibling = prevNode;
                newChild.childNodes[newChild.childNodes.length-1].nextSibling = refChild;
            }
        }else {
            // do node pointer surgery for newChild
            if (prevNode) {
                prevNode.nextSibling = newChild;
            }else {
                // this is the first child in the list
                this.firstChild = newChild;
            }
            newChild.previousSibling = prevNode;
            newChild.nextSibling     = refChild;
        }

        return newChild;
    },
    replaceChild : function(newChild, oldChild) {
	
		log.debug('replaceChild  %s with %s', oldChild.nodeName, newChild.nodeName);
        var ret = null;

        if(!newChild  || !oldChild ){
            return oldChild;
        }

        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Node is readonly
            if (this._readonly) {
                throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if newChild was not created by this Document
            if (__ownerDocument__(this) != __ownerDocument__(newChild)) {
                throw(new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if the node is an ancestor
            if (__isAncestor__(this, newChild)) {
                throw(new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
            }
        }

        // get index of oldChild
        var index = __findItemIndex__(this.childNodes, oldChild);

        // throw Exception if there is no child node with this id
        if (__ownerDocument__(this).implementation.errorChecking && (index < 0)) {
            throw(new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // if the newChild is already in the tree,
        var newChildParent = newChild.parentNode;
        if (newChildParent) {
            // remove it
            newChildParent.removeChild(newChild);
        }

        // add newChild to childNodes
        ret = __replaceChild__(this.childNodes,newChild, index);


        if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // do node pointer surgery for Document Fragment
            if (newChild.childNodes.length > 0) {
                for (var ind = 0; ind < newChild.childNodes.length; ind++) {
                    newChild.childNodes[ind].parentNode = this;
                }

                if (oldChild.previousSibling) {
                    oldChild.previousSibling.nextSibling = newChild.childNodes[0];
                } else {
                    this.firstChild = newChild.childNodes[0];
                }

                if (oldChild.nextSibling) {
                    oldChild.nextSibling.previousSibling = newChild;
                } else {
                    this.lastChild = newChild.childNodes[newChild.childNodes.length-1];
                }

                newChild.childNodes[0].previousSibling = oldChild.previousSibling;
                newChild.childNodes[newChild.childNodes.length-1].nextSibling = oldChild.nextSibling;
            }
        } else {
            // do node pointer surgery for newChild
            newChild.parentNode = this;

            if (oldChild.previousSibling) {
                oldChild.previousSibling.nextSibling = newChild;
            }else{
                this.firstChild = newChild;
            }
            if (oldChild.nextSibling) {
                oldChild.nextSibling.previousSibling = newChild;
            }else{
                this.lastChild = newChild;
            }
            newChild.previousSibling = oldChild.previousSibling;
            newChild.nextSibling = oldChild.nextSibling;
        }

        return ret;
    },
    removeChild : function(oldChild) {
		log.debug('removeChild  %s from %s', oldChild.nodeName, this.nodeName);
        if(!oldChild){
            return null;
        }
        // throw Exception if NamedNodeMap is readonly
        if (__ownerDocument__(this).implementation.errorChecking &&
            (this._readonly || oldChild._readonly)) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        // get index of oldChild
        var itemIndex = __findItemIndex__(this.childNodes, oldChild);

        // throw Exception if there is no child node with this id
        if (__ownerDocument__(this).implementation.errorChecking && (itemIndex < 0)) {
            throw(new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // remove oldChild from childNodes
        __removeChild__(this.childNodes, itemIndex);

        // do node pointer surgery
        oldChild.parentNode = null;

        if (oldChild.previousSibling) {
            oldChild.previousSibling.nextSibling = oldChild.nextSibling;
        }else {
            this.firstChild = oldChild.nextSibling;
        }
        if (oldChild.nextSibling) {
            oldChild.nextSibling.previousSibling = oldChild.previousSibling;
        }else {
            this.lastChild = oldChild.previousSibling;
        }

        oldChild.previousSibling = null;
        oldChild.nextSibling = null;

        return oldChild;
    },
    appendChild : function(newChild) {
		log.debug('appendChild  %s to %s', newChild.nodeName, this.nodeName);
        if(!newChild){
            return null;
        }
        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Node is readonly
            if (this._readonly) {
                throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if arg was not created by this Document
            if (__ownerDocument__(this) != __ownerDocument__(this)) {
                throw(new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if the node is an ancestor
            if (__isAncestor__(this, newChild)) {
              throw(new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
            }
        }

        // if the newChild is already in the tree,
        var newChildParent = newChild.parentNode;
        if (newChildParent) {
            // remove it
           //console.debug('removing node %s', newChild);
            newChildParent.removeChild(newChild);
        }

        // add newChild to childNodes
        __appendChild__(this.childNodes, newChild);

        if (newChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            // do node pointer surgery for DocumentFragment
            if (newChild.childNodes.length > 0) {
                for (var ind = 0; ind < newChild.childNodes.length; ind++) {
                    newChild.childNodes[ind].parentNode = this;
                }

                if (this.lastChild) {
                    this.lastChild.nextSibling = newChild.childNodes[0];
                    newChild.childNodes[0].previousSibling = this.lastChild;
                    this.lastChild = newChild.childNodes[newChild.childNodes.length-1];
                } else {
                    this.lastChild = newChild.childNodes[newChild.childNodes.length-1];
                    this.firstChild = newChild.childNodes[0];
                }
            }
        } else {
            // do node pointer surgery for newChild
            if (this.lastChild) {
                this.lastChild.nextSibling = newChild;
                newChild.previousSibling = this.lastChild;
                this.lastChild = newChild;
            } else {
                this.lastChild = newChild;
                this.firstChild = newChild;
            }
       }
       newChild.parentNode = this;
       return newChild;
    },
    hasChildNodes : function() {
        return (this.childNodes.length > 0);
    },
    cloneNode: function(deep) {
		log.debug('cloneNode  %s', deep);
        // use importNode to clone this Node
        //do not throw any exceptions
        try {
            return __ownerDocument__(this).importNode(this, deep);
        } catch (e) {
            //there shouldn't be any exceptions, but if there are, return null
            // may want to warn: $debug("could not clone node: "+e.code);
            return null;
        }
    },
    normalize : function() {
		log.debug('normalize');
        var i;
        var inode;
        var nodesToRemove = new NodeList();

        if (this.nodeType == Node.ELEMENT_NODE || this.nodeType == Node.DOCUMENT_NODE) {
            var adjacentTextNode = null;

            // loop through all childNodes
            for(i = 0; i < this.childNodes.length; i++) {
                inode = this.childNodes.item(i);

                if (inode.nodeType == Node.TEXT_NODE) {
                    // this node is a text node
                    if (inode.length < 1) {
                        // this text node is empty
                        // add this node to the list of nodes to be remove
                        __appendChild__(nodesToRemove, inode);
                    }else {
                        if (adjacentTextNode) {
                            // previous node was also text
                            adjacentTextNode.appendData(inode.data);
                            // merge the data in adjacent text nodes
                            // add this node to the list of nodes to be removed
                            __appendChild__(nodesToRemove, inode);
                        } else {
                            // remember this node for next cycle
                            adjacentTextNode = inode;
                        }
                    }
                } else {
                    // (soon to be) previous node is not a text node
                    adjacentTextNode = null;
                    // normalize non Text childNodes
                    inode.normalize();
                }
            }

            // remove redundant Text Nodes
            for(i = 0; i < nodesToRemove.length; i++) {
                inode = nodesToRemove.item(i);
                inode.parentNode.removeChild(inode);
            }
        }
    },
    isSupported : function(feature, version) {
        // use Implementation.hasFeature to determine if this feature is supported
        return __ownerDocument__(this).implementation.hasFeature(feature, version);
    },
    getElementsByTagName : function(tagname) {
        // delegate to _getElementsByTagNameRecursive
        // recurse childNodes
		log.debug('getElementsByTagName %s',tagname);
		var normalizedName = (tagname+'').toLowerCase();
		if(!this._indexes_[normalizedName]){
			this._indexes_[normalizedName] = new NodeList(__ownerDocument__(this));
		}
        return this._indexes_[normalizedName];
    },
    getElementsByTagNameNS : function(namespaceURI, localName) {
        // delegate to _getElementsByTagNameNSRecursive
		log.debug('getElementsByTagNameNS %s %s',namespaceURI, localName);
        var nodelist = new NodeList(__ownerDocument__(this));
        for (var i = 0; i < this.childNodes.length; i++) {
            __getElementsByTagNameNSRecursive__(
				this.childNodes.item(i),
				namespaceURI, 
				localName,
                nodelist
			);
        }
        return nodelist;
    },
    importNode : function(importedNode, deep) {
		log.debug('importNode %s %s', importedNode.nodeName, deep);
        var i,
			importNode;

        //there is no need to perform namespace checks since everything has already gone through them
        //in order to have gotten into the DOM in the first place. The following line
        //turns namespace checking off in ._isValidNamespace
        __ownerDocument__(this).importing = true;

        if (importedNode.nodeType == Node.ELEMENT_NODE) {
            if (!__ownerDocument__(this).implementation.namespaceAware) {
                // create a local Element (with the name of the importedNode)
                importNode = __ownerDocument__(this).createElement(importedNode.tagName);

                // create attributes matching those of the importedNode
                for(i = 0; i < importedNode.attributes.length; i++) {
                    importNode.setAttribute(importedNode.attributes.item(i).name, importedNode.attributes.item(i).value);
                }
            } else {
                // create a local Element (with the name & namespaceURI of the importedNode)
                importNode = __ownerDocument__(this).createElementNS(importedNode.namespaceURI, importedNode.nodeName);

                // create attributes matching those of the importedNode
                for(i = 0; i < importedNode.attributes.length; i++) {
                    importNode.setAttributeNS(importedNode.attributes.item(i).namespaceURI,
                        importedNode.attributes.item(i).name, importedNode.attributes.item(i).value);
                }

                // create namespace definitions matching those of the importedNode
                for(i = 0; i < importedNode._namespaces.length; i++) {
                    importNode._namespaces[i] = __ownerDocument__(this).createNamespace(importedNode._namespaces.item(i).localName);
                    importNode._namespaces[i].value = importedNode._namespaces.item(i).value;
                }
            }
        } else if (importedNode.nodeType == Node.ATTRIBUTE_NODE) {
            if (!__ownerDocument__(this).implementation.namespaceAware) {
                // create a local Attribute (with the name of the importedAttribute)
                importNode = __ownerDocument__(this).createAttribute(importedNode.name);
            } else {
                // create a local Attribute (with the name & namespaceURI of the importedAttribute)
                importNode = __ownerDocument__(this).createAttributeNS(importedNode.namespaceURI, importedNode.nodeName);

                // create namespace definitions matching those of the importedAttribute
                for(i = 0; i < importedNode._namespaces.length; i++) {
                    importNode._namespaces[i] = __ownerDocument__(this).createNamespace(importedNode._namespaces.item(i).localName);
                    importNode._namespaces[i].value = importedNode._namespaces.item(i).value;
                }
            }

            // set the value of the local Attribute to match that of the importedAttribute
            importNode.value = importedNode.value;

        } else if (importedNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // create a local DocumentFragment
            importNode = __ownerDocument__(this).createDocumentFragment();
        } else if (importedNode.nodeType == Node.NAMESPACE_NODE) {
            // create a local NamespaceNode (with the same name & value as the importedNode)
            importNode = __ownerDocument__(this).createNamespace(importedNode.nodeName);
            importNode.value = importedNode.value;
        } else if (importedNode.nodeType == Node.TEXT_NODE) {
            // create a local TextNode (with the same data as the importedNode)
            importNode = __ownerDocument__(this).createTextNode(importedNode.data);
        } else if (importedNode.nodeType == Node.CDATA_SECTION_NODE) {
            // create a local CDATANode (with the same data as the importedNode)
            importNode = __ownerDocument__(this).createCDATASection(importedNode.data);
        } else if (importedNode.nodeType == Node.PROCESSING_INSTRUCTION_NODE) {
            // create a local ProcessingInstruction (with the same target & data as the importedNode)
            importNode = __ownerDocument__(this).createProcessingInstruction(importedNode.target, importedNode.data);
        } else if (importedNode.nodeType == Node.COMMENT_NODE) {
            // create a local Comment (with the same data as the importedNode)
            importNode = __ownerDocument__(this).createComment(importedNode.data);
        } else {  // throw Exception if nodeType is not supported
            throw(new DOMException(DOMException.NOT_SUPPORTED_ERR));
        }

        if (deep) {
            // recurse childNodes
            for(i = 0; i < importedNode.childNodes.length; i++) {
                importNode.appendChild(__ownerDocument__(this).importNode(importedNode.childNodes.item(i), true));
            }
        }

        //reset importing
        __ownerDocument__(this).importing = false;
        return importNode;

    },
    contains : function(node){
        log.debug("this %s contains %s ?", this.nodeName, node.nodeName);
        while(node && node != this ){
            node = node.parentNode;
        }
        return !!node;
    },
    compareDocumentPosition : function(b){
        log.debug("compareDocumentPosition of this %s to %s", this.nodeName, b.nodeName);
        var i,
            length,
            a = this,
            parent,
            aparents,
            bparents;
        //handle a couple simpler case first
        if(a === b) {
            return Node.DOCUMENT_POSITION_EQUAL;
        }
        if(a.ownerDocument !== b.ownerDocument) {
            return Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC|
               Node.DOCUMENT_POSITION_FOLLOWING|
               Node.DOCUMENT_POSITION_DISCONNECTED;
        }
        if(a.parentNode === b.parentNode){
            length = a.parentNode.childNodes.length;
            for(i=0;i<length;i++){
                if(a.parentNode.childNodes[i] === a){
                    return Node.DOCUMENT_POSITION_FOLLOWING;
                }else if(a.parentNode.childNodes[i] === b){
                    return Node.DOCUMENT_POSITION_PRECEDING;
                }
            }
        }

        if(a.contains(b)) {
            return Node.DOCUMENT_POSITION_CONTAINED_BY|
                   Node.DOCUMENT_POSITION_FOLLOWING;
        }
        if(b.contains(a)) {
            return Node.DOCUMENT_POSITION_CONTAINS|
                   Node.DOCUMENT_POSITION_PRECEDING;
        }
        aparents = [];
        parent = a.parentNode;
        while(parent){
            aparents[aparents.length] = parent;
            parent = parent.parentNode;
        }

        bparents = [];
        parent = b.parentNode;
        while(parent){
            i = aparents.indexOf(parent);
            if(i < 0){
                bparents[bparents.length] = parent;
                parent = parent.parentNode;
            }else{
                //i cant be 0 since we already checked for equal parentNode
                if(bparents.length > aparents.length){
                    return Node.DOCUMENT_POSITION_FOLLOWING;
                }else if(bparents.length < aparents.length){
                    return Node.DOCUMENT_POSITION_PRECEDING;
                }else{
                    //common ancestor diverge point
                    if (i === 0) {
                        return Node.DOCUMENT_POSITION_FOLLOWING;
                    } else {
                        parent = aparents[i-1];
                    }
                    return parent.compareDocumentPosition(bparents.pop());
                }
            }
        }

        return Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC|
               Node.DOCUMENT_POSITION_DISCONNECTED;

    },
    toString : function() {
        return '[object Node]';
    }

});


}(/*Envjs.DOM.Node*/));


/**
 * @method __getElementsByTagNameRecursive__ - implements getElementsByTagName()
 * @param  elem     : Element  - The element which are checking and then recursing into
 * @param  tagname  : string      - The name of the tag to match on. The special value "*" matches all tags
 * @param  nodeList : NodeList - The accumulating list of matching nodes
 *
 * @return : NodeList
 */
__getElementsByTagNameRecursive__ = function (elem, tagname, nodeList) {

    if (elem.nodeType == Node.ELEMENT_NODE || elem.nodeType == Node.DOCUMENT_NODE) {

        if(elem.nodeType !== Node.DOCUMENT_NODE &&
            ((elem.nodeName.toUpperCase() == tagname.toUpperCase()) ||
                (tagname == "*")) ){
            // add matching node to nodeList
            __appendChild__(nodeList, elem);
        }

        // recurse childNodes
        for(var i = 0; i < elem.childNodes.length; i++) {
            nodeList = __getElementsByTagNameRecursive__(elem.childNodes.item(i), tagname, nodeList);
        }
    }

    return nodeList;
};

/**
 * @method __getElementsByTagNameNSRecursive__
 *      implements getElementsByTagName()
 *
 * @param  elem     : Element  - The element which are checking and then recursing into
 * @param  namespaceURI : string - the namespace URI of the required node
 * @param  localName    : string - the local name of the required node
 * @param  nodeList     : NodeList - The accumulating list of matching nodes
 *
 * @return : NodeList
 */
__getElementsByTagNameNSRecursive__ = function(elem, namespaceURI, localName, nodeList) {
    if (elem.nodeType == Node.ELEMENT_NODE || elem.nodeType == Node.DOCUMENT_NODE) {

        if (((elem.namespaceURI == namespaceURI) || (namespaceURI == "*")) &&
            ((elem.localName == localName) || (localName == "*"))) {
            // add matching node to nodeList
            __appendChild__(nodeList, elem);
        }

        // recurse childNodes
        for(var i = 0; i < elem.childNodes.length; i++) {
            nodeList = __getElementsByTagNameNSRecursive__(
                elem.childNodes.item(i), namespaceURI, localName, nodeList);
        }
    }

    return nodeList;
};

/**
 * @method __isAncestor__ - returns true if node is ancestor of target
 * @param  target         : Node - The node we are using as context
 * @param  node         : Node - The candidate ancestor node
 * @return : boolean
 */
__isAncestor__ = function(target, node) {
    // if this node matches, return true,
    // otherwise recurse up (if there is a parentNode)
    return ((target == node) || ((target.parentNode) && (__isAncestor__(target.parentNode, node))));
};



__recursivelyGatherText__ = function(aNode) {
    var accumulateText = "",
        idx,
        node;
    for (idx=0;idx < aNode.childNodes.length;idx++){
        node = aNode.childNodes.item(idx);
        if(node.nodeType == Node.TEXT_NODE){
            accumulateText += node.data;
        }else{
            accumulateText += __recursivelyGatherText__(node);
        }
    }
    return accumulateText;
};

/**
 * function __escapeXML__
 * @param  str : string - The string to be escaped
 * @return : string - The escaped string
 */
var escAmpRegEx = /&(?!(amp;|lt;|gt;|quot|apos;))/g;
var escLtRegEx = /</g;
var escGtRegEx = />/g;
var quotRegEx = /"/g;
var aposRegEx = /'/g;
__escapeXML__ = function(str) {
    str = str.replace(escAmpRegEx, "&amp;").
            replace(escLtRegEx, "&lt;").
            replace(escGtRegEx, "&gt;").
            replace(quotRegEx, "&quot;").
            replace(aposRegEx, "&apos;");

    return str;
};

/**
 * function __unescapeXML__
 * @param  str : string - The string to be unescaped
 * @return : string - The unescaped string
 */
var unescAmpRegEx = /&amp;/g;
var unescLtRegEx = /&lt;/g;
var unescGtRegEx = /&gt;/g;
var unquotRegEx = /&quot;/g;
var unaposRegEx = /&apos;/g;
__unescapeXML__ = function(str) {
    str = str.replace(unescAmpRegEx, "&").
            replace(unescLtRegEx, "<").
            replace(unescGtRegEx, ">").
            replace(unquotRegEx, "\"").
            replace(unaposRegEx, "'");

    return str;
};

var __findNamedItemIndex__,
    __findNamedItemNSIndex__,
    __hasAttribute__,
    __hasAttributeNS__,
    __cloneNamedNodes__;
//see nodelist for these declarations
/*var __addToNamedIndexes__, 
    __removeFromNamedIndexes__;*/

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.NamedNodeMap').debug('available'); 
});
/**
 * @class  NamedNodeMap -
 *      used to represent collections of nodes that can be accessed by name
 *      typically a set of Element attributes
 *
 * @extends NodeList -
 *      note W3C spec says that this is not the case, but we need an item()
 *      method identical to NodeList's, so why not?
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NamedNodeMap is attached to (or null)
 */
exports.NamedNodeMap = NamedNodeMap = function(ownerDocument, parentNode) {
    NodeList.apply(this, arguments);
};
NamedNodeMap.prototype = new NodeList();
__extend__(NamedNodeMap.prototype, {
    add: function(name) {
        this[this.length] = name;
    },
    getNamedItem: function(name) {
        var ret = null;
        log.debug('getNamedItem %s', name);
        // test that Named Node exists
        var itemIndex = __findNamedItemIndex__(this, name);

        if (itemIndex > -1) {
            //console.log('found it!');
            ret = this[itemIndex];
        }
        // if node is not found, default value null is returned
        return ret;
    },
    setNamedItem: function(arg) {
        var doc = __ownerDocument__(this);
        log.debug('setNamedItem %s', arg.name);
        // test for exceptions
        if (doc.implementation.errorChecking) {
            // throw Exception if arg was not created by this Document
            if (this.ownerDocument != arg.ownerDocument) {
                throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if DOMNamedNodeMap is readonly
            if (this._readonly || (this.parentNode && this.parentNode._readonly)) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if arg is already an attribute of another Element object
            if (arg.ownerElement && (arg.ownerElement != this.parentNode)) {
                throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
            }
        }

        // console.log('setNamedItem __findNamedItemIndex__ ');
        // get item index
        var itemIndex = __findNamedItemIndex__(this, arg.name);
        var ret = null;

        //console.log('setNamedItem __findNamedItemIndex__ %s', itemIndex);
        if (itemIndex > -1) {
            // found it!
            ret = this[itemIndex];
            // use existing Attribute
            // throw Exception if DOMAttr is readonly
            if (doc.implementation.errorChecking && ret._readonly) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            } else {
                this[itemIndex] = arg;
                // over-write existing NamedNode
                this[arg.name.toLowerCase()] = arg;
            }
        } else {
            // add new NamedNode
            //console.log('setNamedItem add new named node map (by index)');
            Array.prototype.push.apply(this, [arg]);
            this[arg.name] = arg;

        }

        arg.ownerElement = this.parentNode;
        // update ownerElement
        // return old node or new node
        
        //add to named node indexes on the document
        __addToNamedIndexes__(arg.name, arg.value, arg.ownerElement);
        
        return ret;
    },
    removeNamedItem: function(name) {
        var ret = null, doc = __ownerDocument__(this);
        // test for exceptions
        // throw Exception if NamedNodeMap is readonly
        if (doc.implementation.errorChecking &&
            (this._readonly || (this.parentNode && this.parentNode._readonly))) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        // get item index
        var itemIndex = __findNamedItemIndex__(this, name);

        // throw Exception if there is no node named name in this map
        if (doc.implementation.errorChecking && (itemIndex < 0)) {
            throw (new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // get Node
        var oldNode = this[itemIndex];
        //this[oldNode.name] = undefined;
        // throw Exception if Node is readonly
        if (doc.implementation.errorChecking && oldNode._readonly) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        
        //remove from named node indexes on the document
        __removeFromNamedIndexes__(name, oldNode.value, oldNode.ownerElement);
        
        // return removed node
        return __removeChild__(this, itemIndex);
    },
    getNamedItemNS: function(namespaceURI, localName) {
        var ret = null;

        // test that Named Node exists
        var itemIndex = __findNamedItemNSIndex__(this, namespaceURI, localName);

        if (itemIndex > -1) {
            // found it! return NamedNode
            ret = this[itemIndex];
        }
        // if node is not found, default value null is returned
        return ret;
    },
    setNamedItemNS: function(arg) {
        log.debug('setNamedItemNS %s %s', arg.namespaceURI, arg.localName);
        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if NamedNodeMap is readonly
            if (this._readonly || (this.parentNode && this.parentNode._readonly)) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if arg was not created by this Document
            if (__ownerDocument__(this) != __ownerDocument__(arg)) {
                throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if arg is already an attribute of another Element object
            if (arg.ownerElement && (arg.ownerElement != this.parentNode)) {
                throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
            }
        }

        // get item index
        var itemIndex = __findNamedItemNSIndex__(this, arg.namespaceURI, arg.localName);
        var ret = null;

        if (itemIndex > -1) {
            // found it!
            // use existing Attribute
            ret = this[itemIndex];
            // throw Exception if Attr is readonly
            if (__ownerDocument__(this).implementation.errorChecking && ret._readonly) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            } else {
                // over-write existing NamedNode
                this[itemIndex] = arg;
            }
        } else {
            // add new NamedNode
            Array.prototype.push.apply(this, [arg]);
        }
        arg.ownerElement = this.parentNode;
        
        //add to named node indexes on the document
        __addToNamedIndexes__(
            arg.namespaceURI?arg.namespaceURI+':'+arg.localName:arg.localName, 
            arg.value, 
            arg.ownerElement
        );
        
        // return old node or null
        return ret;
    },
    removeNamedItemNS: function(namespaceURI, localName) {
        var ret = null;

        // test for exceptions
        // throw Exception if NamedNodeMap is readonly
        if (__ownerDocument__(this).implementation.errorChecking && (this._readonly || (this.parentNode && this.parentNode._readonly))) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        // get item index
        var itemIndex = __findNamedItemNSIndex__(this, namespaceURI, localName);

        // throw Exception if there is no matching node in this map
        if (__ownerDocument__(this).implementation.errorChecking && (itemIndex < 0)) {
            throw (new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // get Node
        var oldNode = this[itemIndex];

        //remove from named node indexes on the document
        __removeFromNamedIndexes__(
            namespaceURI?namespaceURI+'::'+localName:localName, 
            oldNode.value, 
            oldNode.ownerElement
        );
        
        // return removed node
        return __removeChild__(this, itemIndex);
    },
    get xml() {
        var ret = "";

        // create string containing concatenation of all (but last) 
        // Attribute string values (separated by spaces)
        for (var i = 0; i < this.length - 1; i++) {
            ret += this[i].xml + " ";
        }

        // add last Attribute to string (without trailing space)
        if (this.length > 0) {
            ret += this[this.length - 1].xml;
        }

        return ret;
    },
    toString: function() {
        return "[object NamedNodeMap]";
    }

});

__addToNamedIndexes__ = function(name, value, element){
    log.debug('addToNamedIndexes %s %s', name, value);
    var doc = __ownerDocument__(element);
    switch(name.toLowerCase()){
        case "id": 
            log.debug('addToNamedIndexes #id %s', value);
            doc._indexes_["#"+value] = element; break;
        case "name":
            log.debug('addToNamedIndexes @name %s', value);
            if(!(doc._indexes_['@'+value])){
                doc._indexes_["@"+value] = new NodeList(doc, null);
            }
            if(element.tagName.toLowerCase() === 'form'){
                if( !doc[value] ){
                    //<form name='foo' is available via document.foo
                    doc[value] = element;
                }
            }
            //also add to general name index for getElementsByName
            Array.prototype.push.apply(doc._indexes_["@"+value],[element]);
            break;
    }
};

__removeFromNamedIndexes__ = function(name, value, element){
    var index, doc = __ownerDocument__(element);
    //console.log('checking named index for removing %s=%s', name, value);
    switch(name.toLowerCase()){
        case "id": 
            //console.log('(%s) replacing id index value #%s = %s', doc, value, element?element.tagName:'no parent');
            doc._indexes_["#"+value] = null; break;
        case "name":
            if(!(doc._indexes_['@'+value])){
                doc._indexes_["@"+value] = new NodeList(doc, null);
            }
            if(element.tagName.toLowerCase() === 'form'){
                if(doc[value]){
                    //<form name='foo' is no longer available via document.foo
                    delete doc[value];
                }
            }
            //also remove from general name index for getElementsByName
            index = Array.prototype.indexOf.apply(doc._indexes_["@"+value], [element]);
            if(index > -1){
                Array.prototype.splice.apply(doc._indexes_["@"+value],[index,1]);
            }
            break;
    }
};

}(/*Envjs.DOM.NamedNodeMap*/));



/**
 * @method __findNamedItemIndex__
 *      find the item index of the node with the specified name
 *
 * @param  name : string - the name of the required node
 * @param  isnsmap : if its a NamespaceNodeMap
 * @return : int
 */
__findNamedItemIndex__ = function(namednodemap, name, isnsmap) {
    var ret = -1;
    // loop through all nodes
    for (var i = 0; i < namednodemap.length; i++) {
        //console.log("namednodemap (local %s, name %s), name %s, isnsmap %s",
        //      namednodemap.localName, namednodemap.name, name, isnsmap)
        // compare name to each node's nodeName
        if (namednodemap[i].localName && name && isnsmap) {
            if (namednodemap[i].localName.toLowerCase() == name.toLowerCase()) {
                // found it!
                ret = i;
                break;
            }
        } else {
            if (namednodemap[i].name && name) {
                if (namednodemap[i].name.toLowerCase() == name.toLowerCase()) {
                    // found it!
                    ret = i;
                    break;
                }
            }
        }
    }
    // if node is not found, default value -1 is returned
    return ret;
};


/**
 * @method __findNamedItemNSIndex__
 *      find the item index of the node with the specified
 *      namespaceURI and localName
 *
 * @param  namespaceURI : string - the namespace URI of the required node
 * @param  localName    : string - the local name of the required node
 * @return : int
 */
__findNamedItemNSIndex__ = function(namednodemap, namespaceURI, localName) {
    var ret = -1;
    // test that localName is not null
    if (localName) {
        // loop through all nodes
        for (var i = 0; i < namednodemap.length; i++) {
            if (namednodemap[i].namespaceURI && namednodemap[i].localName) {
                // compare name to each node's namespaceURI and localName
                if ((namednodemap[i].namespaceURI.toLowerCase() == namespaceURI.toLowerCase()) &&
                (namednodemap[i].localName.toLowerCase() == localName.toLowerCase())) {
                    // found it!
                    ret = i;
                    break;
                }
            }
        }
    }
    // if node is not found, default value -1 is returned
    return ret;
};


/**
 * @method __hasAttribute__
 *      Returns true if specified node exists
 *
 * @param  name : string - the name of the required node
 * @return : boolean
 */
__hasAttribute__ = function(namednodemap, name) {
    var ret = false;
    // test that Named Node exists
    var itemIndex = __findNamedItemIndex__(namednodemap, name);
    if (itemIndex > -1) {
        // found it!
        ret = true;
    }
    // if node is not found, default value false is returned
    return ret;
};

/**
 * @method __hasAttributeNS__
 *      Returns true if specified node exists
 *
 * @param  namespaceURI : string - the namespace URI of the required node
 * @param  localName    : string - the local name of the required node
 * @return : boolean
 */
__hasAttributeNS__ = function(namednodemap, namespaceURI, localName) {
    var ret = false,
        // test that Named Node exists
        itemIndex = __findNamedItemNSIndex__(namednodemap, namespaceURI, localName);
    if (itemIndex > -1) {
        // found it!
        ret = true;
    }
    // if node is not found, default value false is returned
    return ret;
};

/**
 * @method __cloneNamedNodes__
 *      Returns a NamedNodeMap containing clones of the Nodes in this NamedNodeMap
 *
 * @param  parentNode : Node - the new parent of the cloned NodeList
 * @param  isnsmap : bool - is this a NamespaceNodeMap
 * @return NamedNodeMap containing clones of the Nodes in this NamedNodeMap
 */
__cloneNamedNodes__ = function(namednodemap, parentNode, isnsmap) {
    var cloneNamedNodeMap = isnsmap ?
    new NamespaceNodeMap(namednodemap.ownerDocument, parentNode) :
    new NamedNodeMap(namednodemap.ownerDocument, parentNode);

    // create list containing clones of all children
    for (var i = 0; i < namednodemap.length; i++) {
        __appendChild__(cloneNamedNodeMap, namednodemap[i].cloneNode(false));
    }

    return cloneNamedNodeMap;
};


/**
 * @class  NamespaceNodeMap -
 *      used to represent collections of namespace nodes that can be
 *      accessed by name typically a set of Element attributes
 *
 * @extends NamedNodeMap
 *
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NamespaceNodeMap is attached to (or null)
 */
NamespaceNodeMap = function(ownerDocument, parentNode) {
    NamedNodeMap.apply(this, arguments);
};
NamespaceNodeMap.prototype = new NamedNodeMap();
__extend__(NamespaceNodeMap.prototype, {
    get xml() {
        var ret = "",
            ns,
            ind,
            namespaces,
            i;
        // identify namespaces declared local to this Element (ie, not inherited)
        for (ind = 0; ind < this.length; ind++) {
            // if namespace declaration does not exist in the containing node's, parentNode's namespaces
            ns = this[ind];
            namespaces = this.parentNode.parentNode._namespaces;
            for(i=0;i<namespaces.length;i++){
                if(namespaces[i].nodeName === this[ind].nodeName &&
                    namespaces[i].nodeValue === this[ind].nodeValue){
                    ns = null;
                    break;
                }
            }
            if(ns){
                // display the namespace declaration
                ret += " "+this[ind].xml;
            }
        }
        return ret;
    },
    toString: function() {
        return "[object NamespacedNodeMap]";
    }
});

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Namespace').debug('available'); 
});

/**
 * @class  Namespace -
 *      The Namespace interface represents an namespace in an Element object
 *
 * @param  ownerDocument : The Document object associated with this node.
 */
exports.Namespace = Namespace = function(ownerDocument) {
    Node.apply(this, arguments);
    // the name of this attribute
    this.name      = "";

    // If this attribute was explicitly given a value in the original document,
    // this is true; otherwise, it is false.
    // Note that the implementation is in charge of this attribute, not the user.
    // If the user changes the value of the attribute (even if it ends up having
    // the same value as the default value) then the specified flag is
    // automatically flipped to true
    this.specified = false;
};
Namespace.prototype = new Node();
__extend__(Namespace.prototype, {
    get value(){
        // the value of the attribute is returned as a string
        return this.nodeValue;
    },
    set value(value){
        this.nodeValue = value+'';
    },
    get nodeType(){
        return Node.NAMESPACE_NODE;
    },
    get xml(){
        var ret = "";

          // serialize Namespace Declaration
          if (this.nodeName != "") {
            ret += "xmlns:"+this.nodeName +"=\""+ __escapeXML__(this.nodeValue) +"\"";
          }
          else {  
            // handle default namespace
            ret += "xmlns=\""+ __escapeXML__(this.nodeValue) +"\"";
          }

          return ret;
    },
    toString: function(){
        return '[object Namespace]';
    }
});

}(/*Envjs.DOM.Namespace*/));



(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.CharacterData').debug('available'); 
});
/**
 * @class  CharacterData - parent abstract class for Text and Comment
 * @extends Node
 * @param  ownerDocument : The Document object associated with this node.
 */
exports.CharacterData = CharacterData = function(ownerDocument) {
    Node.apply(this, arguments);
};
CharacterData.prototype = new Node();
__extend__(CharacterData.prototype,{
    get data(){
        return this.nodeValue;
    },
    set data(data){
        this.nodeValue = data;
    },
    get textContent(){
        return this.nodeValue;
    },
    set textContent(newText){
        this.nodeValue = newText;
    },
    get length(){return this.nodeValue.length;},
    appendData: function(arg){
        // throw Exception if CharacterData is readonly
        if (__ownerDocument__(this).implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        // append data
        this.data = "" + this.data + arg;
    },
    deleteData: function(offset, count){
        // throw Exception if CharacterData is readonly
        if (__ownerDocument__(this).implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        if (this.data) {
            // throw Exception if offset is negative or greater than the data length,
            if (__ownerDocument__(this).implementation.errorChecking &&
                ((offset < 0) || (offset >  this.data.length) || (count < 0))) {
                throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }

            // delete data
            if(!count || (offset + count) > this.data.length) {
              this.data = this.data.substring(0, offset);
            }else {
              this.data = this.data.substring(0, offset).
                concat(this.data.substring(offset + count));
            }
        }
    },
    insertData: function(offset, arg){
        // throw Exception if CharacterData is readonly
        if(__ownerDocument__(this).implementation.errorChecking && this._readonly){
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        if(this.data){
            // throw Exception if offset is negative or greater than the data length,
            if (__ownerDocument__(this).implementation.errorChecking &&
                ((offset < 0) || (offset >  this.data.length))) {
                throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }

            // insert data
            this.data =  this.data.substring(0, offset).concat(arg, this.data.substring(offset));
        }else {
            // throw Exception if offset is negative or greater than the data length,
            if (__ownerDocument__(this).implementation.errorChecking && (offset !== 0)) {
               throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }

            // set data
            this.data = arg;
        }
    },
    replaceData: function(offset, count, arg){
        // throw Exception if CharacterData is readonly
        if (__ownerDocument__(this).implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        if (this.data) {
            // throw Exception if offset is negative or greater than the data length,
            if (__ownerDocument__(this).implementation.errorChecking &&
                ((offset < 0) || (offset >  this.data.length) || (count < 0))) {
                throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }

            // replace data
            this.data = this.data.substring(0, offset).
                concat(arg, this.data.substring(offset + count));
        }else {
            // set data
            this.data = arg;
        }
    },
    substringData: function(offset, count){
        var ret = null;
        if (this.data) {
            // throw Exception if offset is negative or greater than the data length,
            // or the count is negative
            if (__ownerDocument__(this).implementation.errorChecking &&
                ((offset < 0) || (offset > this.data.length) || (count < 0))) {
                throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }
            // if count is not specified
            if (!count) {
                ret = this.data.substring(offset); // default to 'end of string'
            }else{
                ret = this.data.substring(offset, offset + count);
            }
        }
        return ret;
    },
    toString : function(){
        return "[object CharacterData]";
    }
});

}(/*Envjs.DOM.CharacterData*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Text').debug('available'); 
});
/**
 * @class  Text
 *      The Text interface represents the textual content (termed
 *      character data in XML) of an Element or Attr.
 *      If there is no markup inside an element's content, the text is
 *      contained in a single object implementing the Text interface that
 *      is the only child of the element. If there is markup, it is
 *      parsed into a list of elements and Text nodes that form the
 *      list of children of the element.
 * @extends CharacterData
 * @param  ownerDocument The Document object associated with this node.
 */
exports.Text = Text = function(ownerDocument) {
    CharacterData.apply(this, arguments);
    this.nodeName  = "#text";
};
Text.prototype = new CharacterData();
__extend__(Text.prototype,{
    get localName(){
        return null;
    },
    // Breaks this Text node into two Text nodes at the specified offset,
    // keeping both in the tree as siblings. This node then only contains
    // all the content up to the offset point.  And a new Text node, which
    // is inserted as the next sibling of this node, contains all the
    // content at and after the offset point.
    splitText : function(offset) {
        var data,
            inode;
        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Node is readonly
            if (this._readonly) {
              throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }
            // throw Exception if offset is negative or greater than the data length,
            if ((offset < 0) || (offset > this.data.length)) {
              throw(new DOMException(DOMException.INDEX_SIZE_ERR));
            }
        }
        if (this.parentNode) {
            // get remaining string (after offset)
            data  = this.substringData(offset);
            // create new TextNode with remaining string
            inode = __ownerDocument__(this).createTextNode(data);
            // attach new TextNode
            if (this.nextSibling) {
              this.parentNode.insertBefore(inode, this.nextSibling);
            } else {
              this.parentNode.appendChild(inode);
            }
            // remove remaining string from original TextNode
            this.deleteData(offset);
        }
        return inode;
    },
    get nodeType(){
        return Node.TEXT_NODE;
    },
    get xml(){
        return __escapeXML__(""+ this.nodeValue);
    },
    toString: function(){
        return "[object Text]";
    }
});

}(/*Envjs.DOM.Text*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.CDATASection').debug('available'); 
});
/**
 * @class CDATASection 
 *      CDATA sections are used to escape blocks of text containing 
 *      characters that would otherwise be regarded as markup.
 *      The only delimiter that is recognized in a CDATA section is 
 *      the "\]\]\>" string that ends the CDATA section
 * @extends Text
 * @param  ownerDocument : The Document object associated with this node.
 */
exports.CDATASection = CDATASection = function(ownerDocument) {
    Text.apply(this, arguments);
    this.nodeName = '#cdata-section';
};
CDATASection.prototype = new Text();
__extend__(CDATASection.prototype,{
    get nodeType(){
        return Node.CDATA_SECTION_NODE;
    },
    get xml(){
        return "<![CDATA[" + this.nodeValue + "]]>";
    },
    toString : function(){
        return "[object CDATASection]";
    }
});

}(/*Envjs.DOM.CDATASection*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Comment').debug('available'); 
});
/**
 * @class  Comment
 *      This represents the content of a comment, i.e., all the
 *      characters between the starting '<!--' and ending '-->'
 * @extends CharacterData
 * @param  ownerDocument :  The Document object associated with this node.
 */
exports.Comment = Comment = function(ownerDocument) {
    CharacterData.apply(this, arguments);
    this.nodeName  = "#comment";
};
Comment.prototype = new CharacterData();
__extend__(Comment.prototype, {
    get localName(){
        return null;
    },
    get nodeType(){
        return Node.COMMENT_NODE;
    },
    get xml(){
        return "<!--" + this.nodeValue + "-->";
    },
    toString : function(){
        return "[object Comment]";
    }
});

}(/*Envjs.DOM.Comment*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DOMImplementation').debug('available'); 
});
/**
 * @class  DOMImplementation -
 *      provides a number of methods for performing operations
 *      that are independent of any particular instance of the
 *      document object model.
 *
 * @author Jon van Noort (jon@webarcana.com.au)
 */
exports.DOMImplementation = DOMImplementation = function() {
    this.preserveWhiteSpace = true;  // by default, ignore whitespace
    this.namespaceAware = true;       // by default, handle namespaces
    this.errorChecking  = false;      // by default, test for exceptions
};

__extend__(DOMImplementation.prototype,{
    // @param  feature : string - The package name of the feature to test.
    //      the legal only values are "XML" and "HTML" (case-insensitive).
    // @param  version : string - This is the version number of the package
    //       name to test. In Level 1, this is the string "1.0".*
    // @return : boolean
    hasFeature : function(feature, version) {
        var ret = false;
        if (feature.toLowerCase() == "xml") {
            ret = (!version || (version == "1.0") || (version == "2.0"));
        }
        else if (feature.toLowerCase() == "html") {
            ret = (!version || (version == "1.0"));
        }
        else if (feature.toLowerCase() == "core") {
            ret = (!version || (version == "2.0"));
        }
        else if (feature == "http://www.w3.org/TR/SVG11/feature#BasicStructure") {
            ret = (version == "1.1");
        }
        return ret;
    },
    createDocumentType : function(qname, publicId, systemId){
        var doctype = new DocumentType();
        doctype.nodeName = qname?qname.toUpperCase():null;
        doctype.publicId = publicId?publicId:null;
        doctype.systemId = systemId?systemId:null;
        return doctype;
    },
    createDocument : function(nsuri, qname, doctype){

        var doc = null, documentElement;

        doc = new Document(this, null);
        if(doctype){
            doc.doctype = doctype;
        }

        if(nsuri && qname){
            documentElement = doc.createElementNS(nsuri, qname);
        }else if(qname){
            documentElement = doc.createElement(qname);
        }
        if(documentElement){
            doc.appendChild(documentElement);
        }
        return doc;
    },
    createHTMLDocument : function(title){
        var doc = new HTMLDocument(this, null, "");
        var html = doc.createElement("html"); doc.appendChild(html);
        var head = doc.createElement("head"); html.appendChild(head);
        var body = doc.createElement("body"); html.appendChild(body);
        var t = doc.createElement("title"); head.appendChild(t);
        if( title) {
            t.appendChild(doc.createTextNode(title));
        }
        return doc;
    },
    translateErrCode : function(code) {
        //convert DOMException Code to human readable error message;
      var msg = "";

      switch (code) {
        case DOMException.INDEX_SIZE_ERR :                // 1
           msg = "INDEX_SIZE_ERR: Index out of bounds";
           break;

        case DOMException.DOMSTRING_SIZE_ERR :            // 2
           msg = "DOMSTRING_SIZE_ERR: The resulting string is too long to fit in a DOMString";
           break;

        case DOMException.HIERARCHY_REQUEST_ERR :         // 3
           msg = "HIERARCHY_REQUEST_ERR: The Node can not be inserted at this location";
           break;

        case DOMException.WRONG_DOCUMENT_ERR :            // 4
           msg = "WRONG_DOCUMENT_ERR: The source and the destination Documents are not the same";
           break;

        case DOMException.INVALID_CHARACTER_ERR :         // 5
           msg = "INVALID_CHARACTER_ERR: The string contains an invalid character";
           break;

        case DOMException.NO_DATA_ALLOWED_ERR :           // 6
           msg = "NO_DATA_ALLOWED_ERR: This Node / NodeList does not support data";
           break;

        case DOMException.NO_MODIFICATION_ALLOWED_ERR :   // 7
           msg = "NO_MODIFICATION_ALLOWED_ERR: This object cannot be modified";
           break;

        case DOMException.NOT_FOUND_ERR :                 // 8
           msg = "NOT_FOUND_ERR: The item cannot be found";
           break;

        case DOMException.NOT_SUPPORTED_ERR :             // 9
           msg = "NOT_SUPPORTED_ERR: This implementation does not support function";
           break;

        case DOMException.INUSE_ATTRIBUTE_ERR :           // 10
           msg = "INUSE_ATTRIBUTE_ERR: The Attribute has already been assigned to another Element";
           break;

        // Introduced in DOM Level 2:
        case DOMException.INVALID_STATE_ERR :             // 11
           msg = "INVALID_STATE_ERR: The object is no longer usable";
           break;

        case DOMException.SYNTAX_ERR :                    // 12
           msg = "SYNTAX_ERR: Syntax error";
           break;

        case DOMException.INVALID_MODIFICATION_ERR :      // 13
           msg = "INVALID_MODIFICATION_ERR: Cannot change the type of the object";
           break;

        case DOMException.NAMESPACE_ERR :                 // 14
           msg = "NAMESPACE_ERR: The namespace declaration is incorrect";
           break;

        case DOMException.INVALID_ACCESS_ERR :            // 15
           msg = "INVALID_ACCESS_ERR: The object does not support this function";
           break;

        default :
           msg = "UNKNOWN: Unknown Exception Code ("+ code +")";
      }

      return msg;
    },
    toString : function(){
        return "[object DOMImplementation]";
    }
});

}(/*Envjs.DOM.DOMImplementation*/));




/**
 * @method DOMImplementation._isNamespaceDeclaration - Return true, if attributeName is a namespace declaration
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  attributeName : string - the attribute name
 * @return : boolean
 */
function __isNamespaceDeclaration__(attributeName) {
  // test if attributeName is 'xmlns'
  return (attributeName.indexOf('xmlns') > -1);
}

/**
 * @method DOMImplementation._isIdDeclaration - Return true, if attributeName is an id declaration
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  attributeName : string - the attribute name
 * @return : boolean
 */
function __isIdDeclaration__(attributeName) {
  // test if attributeName is 'id' (case insensitive)
  return attributeName?(attributeName.toLowerCase() == 'id'):false;
}

/**
 * @method DOMImplementation._isValidName - Return true,
 *   if name contains no invalid characters
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  name : string - the candidate name
 * @return : boolean
 */
var re_validName = /^[a-zA-Z_:][a-zA-Z0-9\.\-_:]*$/;
function __isValidName__(name) {
  // test if name contains only valid characters
  return name.match(re_validName);
}

/**
 * @method DOMImplementation._isValidString - Return true, if string does not contain any illegal chars
 *  All of the characters 0 through 31 and character 127 are nonprinting control characters.
 *  With the exception of characters 09, 10, and 13, (Ox09, Ox0A, and Ox0D)
 *  Note: different from _isValidName in that ValidStrings may contain spaces
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  name : string - the candidate string
 * @return : boolean
 */
var re_invalidStringChars = /\x01|\x02|\x03|\x04|\x05|\x06|\x07|\x08|\x0B|\x0C|\x0E|\x0F|\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F|\x7F/;
function __isValidString__(name) {
  // test that string does not contains invalid characters
  return (name.search(re_invalidStringChars) < 0);
}

/**
 * @method DOMImplementation._parseNSName - parse the namespace name.
 *  if there is no colon, the
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  qualifiedName : string - The qualified name
 * @return : NSName - [
         .prefix        : string - The prefix part of the qname
         .namespaceName : string - The namespaceURI part of the qname
    ]
 */
function __parseNSName__(qualifiedName) {
    var resultNSName = {};
    // unless the qname has a namespaceName, the prefix is the entire String
    resultNSName.prefix          = qualifiedName;
    resultNSName.namespaceName   = "";
    // split on ':'
    var delimPos = qualifiedName.indexOf(':');
    if (delimPos > -1) {
        // get prefix
        resultNSName.prefix        = qualifiedName.substring(0, delimPos);
        // get namespaceName
        resultNSName.namespaceName = qualifiedName.substring(delimPos +1, qualifiedName.length);
    }
    return resultNSName;
}

/**
 * @method DOMImplementation._parseQName - parse the qualified name
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  qualifiedName : string - The qualified name
 * @return : QName
 */
function __parseQName__(qualifiedName) {
    var resultQName = {};
    // unless the qname has a prefix, the local name is the entire String
    resultQName.localName = qualifiedName;
    resultQName.prefix    = "";
    // split on ':'
    var delimPos = qualifiedName.indexOf(':');
    if (delimPos > -1) {
        // get prefix
        resultQName.prefix    = qualifiedName.substring(0, delimPos);
        // get localName
        resultQName.localName = qualifiedName.substring(delimPos +1, qualifiedName.length);
    }
    return resultQName;
}
var __isValidNamespace__;

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Document').debug('available'); 
});

/**
 * @class  Document - The Document interface represents the entire HTML
 *      or XML document. Conceptually, it is the root of the document tree,
 *      and provides the primary access to the document's data.
 *
 * @extends Node
 * @param  implementation : DOMImplementation - the creator Implementation
 */
exports.Document = Document = function(implementation, docParentWindow) {
    Node.apply(this, [this]);

    this.async = true;
    // The Document Type Declaration (see DocumentType) associated with this document
    this.doctype = null;
    // The DOMImplementation object that handles this document.
    this.implementation = implementation;

    this.nodeName  = "#document";
    // initially false, set to true by parser
    this.parsing = false;
    this.baseURI = 'about:blank';
    
    this.ownerDocument = null;

    this.importing = false;
};

Document.prototype = new Node();
__extend__(Document.prototype,{
    get localName(){
        return null;
    },
    get textContent(){
        return null;
    },
    get all(){
        log.debug('all');
        return this.getElementsByTagName('*');
    },
    get documentElement(){
        var i, length = this.childNodes?this.childNodes.length:0;
        for(i=0;i<length;i++){
            if(this.childNodes[i].nodeType === Node.ELEMENT_NODE){
                return this.childNodes[i];
            }
        }
        return null;
    },
    get documentURI(){
        log.debug('documentURI %s',this.baseURI);
        return this.baseURI;
    },
    createExpression: function(xpath, nsuriMap){
        log.debug('createExpression %s %s',xpath, nsuriMap);
        return new XPathExpression(xpath, nsuriMap);
    },
    createDocumentFragment: function() {
        log.debug('createDocumentFragment');
        var node = new DocumentFragment(this);
        return node;
    },
    createTextNode: function(data) {
        log.debug('createTextNode %s', data);
        var node = new Text(this);
        node.data = data;
        return node;
    },
    createComment: function(data) {
        log.debug('createComment %s', data);
        var node = new Comment(this);
        node.data = data;
        return node;
    },
    createCDATASection : function(data) {
        log.debug('createCDATASection %s', data);
        var node = new CDATASection(this);
        node.data = data;
        return node;
    },
    createProcessingInstruction: function(target, data) {
        log.debug('createProcessingInstruction %s %s', target, data);
        // throw Exception if the target string contains an illegal character
        if (__ownerDocument__(this).implementation.errorChecking &&
            (!__isValidName__(target))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
        }

        var node = new ProcessingInstruction(this);
        node.target = target;
        node.data = data;
        return node;
    },
    createElement: function(tagName) {
        log.debug('createElement %s', tagName);
        // throw Exception if the tagName string contains an illegal character
        if (__ownerDocument__(this).implementation.errorChecking &&
            (!__isValidName__(tagName))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
        }
        var node = new Element(this);
        node.nodeName = tagName;
        return node;
    },
    createElementNS : function(namespaceURI, qualifiedName) {
        //we use this as a parser flag to ignore the xhtml
        //namespace assumed by the parser
        log.debug('createElementNS %s %s', namespaceURI, qualifiedName);
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if the Namespace is invalid
            if (!__isValidNamespace__(this, namespaceURI, qualifiedName)) {
                throw(new DOMException(DOMException.NAMESPACE_ERR));
            }

            // throw Exception if the qualifiedName string contains an illegal character
            if (!__isValidName__(qualifiedName)) {
                throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
        }
        var node  = new Element(this);
        var qname = __parseQName__(qualifiedName);
        node.namespaceURI = namespaceURI;
        node.prefix       = qname.prefix;
        node.nodeName     = qualifiedName;

        return node;
    },
    createAttribute : function(name) {
        log.debug('createAttribute %s ', name);
        // throw Exception if the name string contains an illegal character
        if (__ownerDocument__(this).implementation.errorChecking &&
            (!__isValidName__(name))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
        }
        var node = new Attr(this);
        node.nodeName = name;
        return node;
    },
    createAttributeNS : function(namespaceURI, qualifiedName) {
        //we use this as a parser flag to ignore the xhtml
        //namespace assumed by the parser
        log.debug('createAttributeNS %s %s', namespaceURI, qualifiedName);
        // test for exceptions
        if (this.implementation.errorChecking) {
            // throw Exception if the Namespace is invalid
            if (!__isValidNamespace__(this, namespaceURI, qualifiedName, true)) {
                throw(new DOMException(DOMException.NAMESPACE_ERR));
            }

            // throw Exception if the qualifiedName string contains an illegal character
            if (!__isValidName__(qualifiedName)) {
                throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
        }
        var node  = new Attr(this);
        var qname = __parseQName__(qualifiedName);
        node.namespaceURI = namespaceURI === '' ? null : namespaceURI;
        node.prefix       = qname.prefix;
        node.nodeName     = qualifiedName;
        node.nodeValue    = "";
        return node;
    },
    createNamespace : function(qualifiedName) {
        log.debug('createNamespace %s', qualifiedName);
        // create Namespace specifying 'this' as ownerDocument
        var node  = new Namespace(this);
        var qname = __parseQName__(qualifiedName);

        // assign values to properties (and aliases)
        node.prefix       = qname.prefix;
        node.nodeName    = qname.localName;
        node.name         = qualifiedName;
        node.nodeValue    = "";

        return node;
    },
    createEntityReference: function(){
        log.debug('createEntityReference');
    },
    createRange: function(){
        log.debug('createRange');
        return new Range();
    },

    evaluate: function(xpathText, contextNode, nsuriMapper, resultType, result){
        //return new XPathExpression().evaluate();
        throw 'Include src/dom/xpath.js for evaluate support.';
    },

    getElementById : function(elementId) {
        log.debug('getElementById %s = %s', elementId, this._indexes_["#"+elementId]);
        return this._indexes_["#"+elementId]||null;
    },
    normalizeDocument: function(){
        log.debug('normalizeDocument');
        this.normalize();
    },
    get nodeType(){
        return Node.DOCUMENT_NODE;
    },
    get xml(){
        return this.documentElement.xml;
    },
    toString: function(){
        return "[object XMLDocument]";
    },
    get defaultView(){
        log.debug('defaultView');
        return { getComputedStyle: function(elem){
            return window.getComputedStyle(elem);
        }};
    }
});

}(/*Envjs.DOM.Document*/));


/*
 * Helper function
 *
 */
__isValidNamespace__ = function(doc, namespaceURI, qualifiedName, isAttribute) {

    if (doc.importing === true) {
        //we're doing an importNode operation (or a cloneNode) - in both cases, there
        //is no need to perform any namespace checking since the nodes have to have been valid
        //to have gotten into the DOM in the first place
        return true;
    }

    var valid = true;
    // parse QName
    var qName = __parseQName__(qualifiedName);


    //only check for namespaces if we're finished parsing
    if (this.parsing === false) {

        // if the qualifiedName is malformed
        if (qName.localName.indexOf(":") > -1 ){
            valid = false;
        }

        if ((valid) && (!isAttribute)) {
            // if the namespaceURI is not null
            if (!namespaceURI) {
                valid = false;
            }
        }

        // if the qualifiedName has a prefix
        if ((valid) && (qName.prefix === "")) {
            valid = false;
        }
    }

    // if the qualifiedName has a prefix that is "xml" and the namespaceURI is
    //  different from "http://www.w3.org/XML/1998/namespace" [Namespaces].
    if ((valid) && (qName.prefix === "xml") && (namespaceURI !== "http://www.w3.org/XML/1998/namespace")) {
        valid = false;
    }

    return valid;
};

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DocumentType').debug('available'); 
});

/**
 * @author envjs team
 * @param {Document} onwnerDocument
 */
exports.DocumentType = DocumentType = function(ownerDocument) {
    Node.apply(this, arguments);
    this.systemId = null;
    this.publicId = null;
};
DocumentType.prototype = new Node();
__extend__({
    get name(){
        return this.nodeName;
    },
    get entities(){
        return null;
    },
    get internalSubsets(){
        return null;
    },
    get notations(){
        return null;
    },
    toString : function(){
        return "[object DocumentType]";
    }
});

}(/*Envjs.DOM.DocumentType*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DocumentFragment').debug('available'); 
});
/**
 * @class  DocumentFragment -
 *      DocumentFragment is a "lightweight" or "minimal" Document object.
 * @extends Node
 * @param  ownerDocument :  The Document object associated with this node.
 */
exports.DocumentFragment = DocumentFragment =function(ownerDocument) {
    Node.apply(this, arguments);
    this.nodeName  = "#document-fragment";
};
DocumentFragment.prototype = new Node();
__extend__(DocumentFragment.prototype,{
    get nodeType(){
        return Node.DOCUMENT_FRAGMENT_NODE;
    },
    get xml(){
        var xml = "",
        count = this.childNodes.length;

        // create string concatenating the serialized ChildNodes
        for (var i = 0; i < count; i++) {
            xml += this.childNodes.item(i).xml;
        }

        return xml;
    },
    toString : function(){
        return "[object DocumentFragment]";
    },
    get localName(){
        return null;
    }
});

}(/*Envjs.DOM.DocumentFragment*/));



(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DOMException').debug('available'); 
});
/**
 * @class  DOMException - raised when an operation is impossible to perform
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  code : int - the exception code (one of the DOMException constants)
 */
exports.DOMException = DOMException = function(code) {
    this.code = code;
};

// DOMException constants
// Introduced in DOM Level 1:
DOMException.INDEX_SIZE_ERR                 = 1;
DOMException.DOMSTRING_SIZE_ERR             = 2;
DOMException.HIERARCHY_REQUEST_ERR          = 3;
DOMException.WRONG_DOCUMENT_ERR             = 4;
DOMException.INVALID_CHARACTER_ERR          = 5;
DOMException.NO_DATA_ALLOWED_ERR            = 6;
DOMException.NO_MODIFICATION_ALLOWED_ERR    = 7;
DOMException.NOT_FOUND_ERR                  = 8;
DOMException.NOT_SUPPORTED_ERR              = 9;
DOMException.INUSE_ATTRIBUTE_ERR            = 10;

// Introduced in DOM Level 2:
DOMException.INVALID_STATE_ERR              = 11;
DOMException.SYNTAX_ERR                     = 12;
DOMException.INVALID_MODIFICATION_ERR       = 13;
DOMException.NAMESPACE_ERR                  = 14;
DOMException.INVALID_ACCESS_ERR             = 15;

//Introduced in DOM Level 3:
DOMException.VALIDATION_ERR                 = 16;
DOMException.TYPE_MISMATCH_ERR              = 17;

}(/*Envjs.DOM.DOMException*/));
var __E4XParser__,
    __E4XtoDomNode__;
    
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DOMParser').debug('available'); 
});

/**
 * @author ariel flesler
 *    http://flesler.blogspot.com/2008/11/fast-trim-function-for-javascript.html
 * @param {Object} str
 */
function trim( str ){
    return (str || "").replace( /^\s+|\s+$/g, "" );
}

// =========================================================================
//
// xmlsax.js - an XML SAX parser in JavaScript.
//
// version 3.1
//
// =========================================================================
//
// Copyright (C) 2001 - 2002 David Joham (djoham@yahoo.com) and Scott Severtson
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//
//
// Visit the XML for <SCRIPT> home page at http://xmljs.sourceforge.net
//

// CONSTANTS
var whitespace = "\n\r\t ";

/**
*   function:   SAXStrings
*   Author:   Scott Severtson
*   Description: a useful object containing string manipulation functions
**/

var SAXStrings = function() {};

SAXStrings.WHITESPACE = " \t\n\r";
SAXStrings.NONWHITESPACE = /\S/;
SAXStrings.QUOTES = "\"'";

SAXStrings.prototype.getColumnNumber = function(strD, iP) {
    if((strD === null) || (strD.length === 0)) {
        return -1;
    }
    iP = iP || strD.length;

    var arrD = strD.substring(0, iP).split("\n");
    var strLine = arrD[arrD.length - 1];
    arrD.length--;
    var iLinePos = arrD.join("\n").length;

    return iP - iLinePos;
};


SAXStrings.prototype.getLineNumber = function(strD, iP) {
    if((strD === null) || (strD.length === 0)) {
        return -1;
    }
    iP = iP || strD.length;
    return strD.substring(0, iP).split("\n").length;
};


SAXStrings.prototype.indexOfNonWhitespace = function(strD, iB, iE) {
    if((strD === null) || (strD.length === 0)) {
        return -1;
    }
    iB = iB || 0;
    iE = iE || strD.length;

    while( strD.charCodeAt(iB++) < 33 ){
        continue;
    }
    return (iB > iE)?-1:iB-1;

};


SAXStrings.prototype.indexOfWhitespace = function(strD, iB, iE) {
    if((strD === null) || (strD.length === 0)) {
        return -1;
    }
    iB = iB || 0;
    iE = iE || strD.length;

    while( strD.charCodeAt(iB++) >= 33 ){
        continue;
    }
    return (iB > iE)?-1:iB-1;
};


SAXStrings.prototype.isEmpty = function(strD) {
    return (strD === null) || (strD.length === 0);
};

SAXStrings.prototype.lastIndexOfNonWhitespace = function(strD, iB, iE) {
    if((strD === null) || (strD.length === 0)) {
        return -1;
    }
    iB = iB || 0;
    iE = iE || strD.length;

    while( (iE >= iB) && strD.charCodeAt(--iE) < 33 ){
        continue;
    }
    return (iE < iB)?-1:iE;
};


SAXStrings.prototype.replace = function(strD, iB, iE, strF, strR) {
    if((strD === null) || (strD.length === 0)) {
        return "";
    }
    iB = iB || 0;
    iE = iE || strD.length;
    return strD.substring(iB, iE).split(strF).join(strR);
};

var saxstrings = new SAXStrings();


/***************************************************************************************************************
Stack: A simple stack class, used for verifying document structure.

    Author:   Scott Severtson
*****************************************************************************************************************/

var Stack = function() {
    this.m_arr = [];
};
__extend__(Stack.prototype, {
    clear : function() {
        this.m_arr = [];
    },
    count : function() {
        return this.m_arr.length;
    },
    destroy : function() {
        this.m_arr = null;
    },
    peek : function() {
        if(this.m_arr.length === 0) {
            return null;
        }
        return this.m_arr[this.m_arr.length - 1];
    },
    pop : function() {
        if(this.m_arr.length === 0) {
            return null;
        }
        var o = this.m_arr[this.m_arr.length - 1];
        this.m_arr.length--;
        return o;
    },
    push : function(o) {
        this.m_arr[this.m_arr.length] = o;
    }
});

/**
* function: isEmpty
* Author: mike@idle.org
* Description:  convenience function to identify an empty string
**/
function isEmpty(str) {
    return (str===null) || (str.length===0);
}

/**
 * function __escapeXML__
 * author: David Joham djoham@yahoo.com
 * @param  str : string - The string to be escaped
 * @return : string - The escaped string
 */
var escAmpRegEx = /&/g;
var escLtRegEx = /</g;
var escGtRegEx = />/g;
var quotRegEx = /"/g;
var aposRegEx = /'/g;
function __escapeXML__(str) {
    str = str.replace(escAmpRegEx, "&amp;").
            replace(escLtRegEx, "&lt;").
            replace(escGtRegEx, "&gt;").
            replace(quotRegEx, "&quot;").
            replace(aposRegEx, "&apos;");

    return str;
}

/**
 * function __unescapeXML__
 * author: David Joham djoham@yahoo.com
 * @param  str : string - The string to be unescaped
 * @return : string - The unescaped string
 */
var unescAmpRegEx = /&amp;/g;
var unescLtRegEx = /&lt;/g;
var unescGtRegEx = /&gt;/g;
var unquotRegEx = /&quot;/g;
var unaposRegEx = /&apos;/g;
function __unescapeXML__(str) {
    str = str.replace(unescAmpRegEx, "&").
            replace(unescLtRegEx, "<").
            replace(unescGtRegEx, ">").
            replace(unquotRegEx, "\"").
            replace(unaposRegEx, "'");

    return str;
}


/**
*   function:   this is the constructor to the XMLP Object
*   Author:   Scott Severtson
*   Description:XMLP is a pull-based parser. The calling application passes in a XML string
*   to the constructor, then repeatedly calls .next() to parse the next segment.
*   .next() returns a flag indicating what type of segment was found, and stores
*   data temporarily in couple member variables (name, content, array of
*   attributes), which can be accessed by several .get____() methods.
*
*   Basically, XMLP is the lowest common denominator parser - an very simple
*   API which other wrappers can be built against.
**/


var XMLP = function(strXML) {
    // Normalize line breaks
    strXML = saxstrings.replace(strXML, null, null, "\r\n", "\n");
    strXML = saxstrings.replace(strXML, null, null, "\r", "\n");

    this.m_xml = strXML;
    this.m_iP = 0;
    this.m_iState = XMLP._STATE_PROLOG;
    this.m_stack = new Stack();
    this._clearAttributes();
    this.replaceEntities = true;
};


// CONSTANTS    (these must be below the constructor)


XMLP._NONE    = 0;
XMLP._ELM_B   = 1;
XMLP._ELM_E   = 2;
XMLP._ELM_EMP = 3;
XMLP._ATT     = 4;
XMLP._TEXT    = 5;
XMLP._ENTITY  = 6;
XMLP._PI      = 7;
XMLP._CDATA   = 8;
XMLP._COMMENT = 9;
XMLP._DTD     = 10;
XMLP._ERROR   = 11;

XMLP._CONT_XML = 0;
XMLP._CONT_ALT = 1;

XMLP._ATT_NAME = 0;
XMLP._ATT_VAL  = 1;

XMLP._STATE_PROLOG = 1;
XMLP._STATE_DOCUMENT = 2;
XMLP._STATE_MISC = 3;

XMLP._errs = [];
XMLP._errs[XMLP.ERR_CLOSE_PI       = 0 ] = "PI: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_DTD      = 1 ] = "DTD: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_COMMENT  = 2 ] = "Comment: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_CDATA    = 3 ] = "CDATA: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ELM      = 4 ] = "Element: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ENTITY   = 5 ] = "Entity: missing closing sequence";
XMLP._errs[XMLP.ERR_PI_TARGET      = 6 ] = "PI: target is required";
XMLP._errs[XMLP.ERR_ELM_EMPTY      = 7 ] = "Element: cannot be both empty and closing";
XMLP._errs[XMLP.ERR_ELM_NAME       = 8 ] = "Element: name must immediatly follow \"<\"";
XMLP._errs[XMLP.ERR_ELM_LT_NAME    = 9 ] = "Element: \"<\" not allowed in element names";
XMLP._errs[XMLP.ERR_ATT_VALUES     = 10] = "Attribute: values are required and must be in quotes";
XMLP._errs[XMLP.ERR_ATT_LT_NAME    = 11] = "Element: \"<\" not allowed in attribute names";
XMLP._errs[XMLP.ERR_ATT_LT_VALUE   = 12] = "Attribute: \"<\" not allowed in attribute values";
XMLP._errs[XMLP.ERR_ATT_DUP        = 13] = "Attribute: duplicate attributes not allowed";
XMLP._errs[XMLP.ERR_ENTITY_UNKNOWN = 14] = "Entity: unknown entity";
XMLP._errs[XMLP.ERR_INFINITELOOP   = 15] = "Infininte loop";
XMLP._errs[XMLP.ERR_DOC_STRUCTURE  = 16] = "Document: only comments, processing instructions, or whitespace allowed outside of document element";
XMLP._errs[XMLP.ERR_ELM_NESTING    = 17] = "Element: must be nested correctly";



XMLP.prototype._addAttribute = function(name, value) {
    this.m_atts[this.m_atts.length] = [name, value];
};


XMLP.prototype._checkStructure = function(iEvent) {

        if(XMLP._STATE_PROLOG == this.m_iState) {
                if((XMLP._TEXT == iEvent) || (XMLP._ENTITY == iEvent)) {
            if(saxstrings.indexOfNonWhitespace(this.getContent(), this.getContentBegin(), this.getContentEnd()) != -1) {
                                return this._setErr(XMLP.ERR_DOC_STRUCTURE);
            }
        }

        if((XMLP._ELM_B == iEvent) || (XMLP._ELM_EMP == iEvent)) {
            this.m_iState = XMLP._STATE_DOCUMENT;
            // Don't return - fall through to next state
        }
    }
    if(XMLP._STATE_DOCUMENT == this.m_iState) {
        if((XMLP._ELM_B == iEvent) || (XMLP._ELM_EMP == iEvent)) {
            this.m_stack.push(this.getName());
        }

        if((XMLP._ELM_E == iEvent) || (XMLP._ELM_EMP == iEvent)) {
            var strTop = this.m_stack.pop();
            if((strTop === null) || (strTop != this.getName())) {
                return this._setErr(XMLP.ERR_ELM_NESTING);
            }
        }

        if(this.m_stack.count() === 0) {
            this.m_iState = XMLP._STATE_MISC;
            return iEvent;
        }
    }
    if(XMLP._STATE_MISC == this.m_iState) {
                if((XMLP._ELM_B == iEvent) || (XMLP._ELM_E == iEvent) || (XMLP._ELM_EMP == iEvent) || (XMLP.EVT_DTD == iEvent)) {
                        return this._setErr(XMLP.ERR_DOC_STRUCTURE);
        }

        if((XMLP._TEXT == iEvent) || (XMLP._ENTITY == iEvent)) {
                        if(saxstrings.indexOfNonWhitespace(this.getContent(), this.getContentBegin(), this.getContentEnd()) != -1) {
                                return this._setErr(XMLP.ERR_DOC_STRUCTURE);
            }
        }
    }

    return iEvent;

};


XMLP.prototype._clearAttributes = function() {
    this.m_atts = [];
};


XMLP.prototype._findAttributeIndex = function(name) {
    for(var i = 0; i < this.m_atts.length; i++) {
        if(this.m_atts[i][XMLP._ATT_NAME] == name) {
            return i;
        }
    }
    return -1;

};

XMLP.prototype.getAttributeCount = function() {
    return this.m_atts ? this.m_atts.length : 0;
};

XMLP.prototype.getAttributeName = function(index) {
    return ((index < 0) || (index >= this.m_atts.length)) ? null : this.m_atts[index][XMLP._ATT_NAME];
};

XMLP.prototype.getAttributeValue = function(index) {
    return ((index < 0) || (index >= this.m_atts.length)) ? null : __unescapeXML__(this.m_atts[index][XMLP._ATT_VAL]);
};

XMLP.prototype.getAttributeValueByName = function(name) {
    return this.getAttributeValue(this._findAttributeIndex(name));
};


XMLP.prototype.getColumnNumber = function() {
    return saxstrings.getColumnNumber(this.m_xml, this.m_iP);
};


XMLP.prototype.getContent = function() {
    return (this.m_cSrc == XMLP._CONT_XML) ? this.m_xml : this.m_cAlt;
};


XMLP.prototype.getContentBegin = function() {
    return this.m_cB;
};


XMLP.prototype.getContentEnd = function() {
    return this.m_cE;
};


XMLP.prototype.getLineNumber = function() {
    return saxstrings.getLineNumber(this.m_xml, this.m_iP);
};


XMLP.prototype.getName = function() {
    return this.m_name;
};


XMLP.prototype.next = function() {
    return this._checkStructure(this._parse());
};

XMLP.prototype.appendFragment = function(xmlfragment) {
    var start = this.m_xml.slice(0,this.m_iP);
    var end = this.m_xml.slice(this.m_iP);
    this.m_xml = start+xmlfragment+end;
};


XMLP.prototype._parse = function() {

    if(this.m_iP == this.m_xml.length) {
        return XMLP._NONE;
    }

    if(this.m_iP == this.m_xml.indexOf("<", this.m_iP)){
        if(this.m_xml.charAt(this.m_iP+1) == "?") {
            return this._parsePI(this.m_iP + 2);
        }
        else if(this.m_xml.charAt(this.m_iP+1) == "!") {
            if(this.m_xml.charAt(this.m_iP+2) == "D") {
                return this._parseDTD(this.m_iP + 9);
            }
            else if(this.m_xml.charAt(this.m_iP+2) == "-") {
                return this._parseComment(this.m_iP + 4);
            }
            else if(this.m_xml.charAt(this.m_iP+2) == "[") {
                return this._parseCDATA(this.m_iP + 9);
            }
        }
        else{
            return this._parseElement(this.m_iP + 1);
        }
    }
    else if(this.m_iP == this.m_xml.indexOf("&", this.m_iP)) {
        return this._parseEntity(this.m_iP + 1);
    }
    else{
        return this._parseText(this.m_iP);
    }


};


XMLP.prototype._parseAttribute = function(iB, iE) {
    var iNB, iNE, iEq, iVB, iVE;
    var cQuote, strN, strV, iRet;

        this.m_cAlt = ""; //resets the value so we don't use an old one by accident (see testAttribute7 in the test suite)

    iNB = saxstrings.indexOfNonWhitespace(this.m_xml, iB, iE);
    if((iNB == -1) ||(iNB >= iE)) {
        return iNB;
    }

    iEq = this.m_xml.indexOf("=", iNB);
    if((iEq == -1) || (iEq > iE)) {
        return this._setErr(XMLP.ERR_ATT_VALUES);
    }

    iNE = saxstrings.lastIndexOfNonWhitespace(this.m_xml, iNB, iEq);

    iVB = saxstrings.indexOfNonWhitespace(this.m_xml, iEq + 1, iE);
    if((iVB == -1) ||(iVB > iE)) {
        return this._setErr(XMLP.ERR_ATT_VALUES);
    }

    cQuote = this.m_xml.charAt(iVB);
    if(SAXStrings.QUOTES.indexOf(cQuote) == -1) {
        return this._setErr(XMLP.ERR_ATT_VALUES);
    }

    iVE = this.m_xml.indexOf(cQuote, iVB + 1);
    if((iVE == -1) ||(iVE > iE)) {
        return this._setErr(XMLP.ERR_ATT_VALUES);
    }

    strN = this.m_xml.substring(iNB, iNE + 1);
    strV = this.m_xml.substring(iVB + 1, iVE);

    if(strN.indexOf("<") != -1) {
        return this._setErr(XMLP.ERR_ATT_LT_NAME);
    }

    if(strV.indexOf("<") != -1) {
        return this._setErr(XMLP.ERR_ATT_LT_VALUE);
    }

    strV = saxstrings.replace(strV, null, null, "\n", " ");
    strV = saxstrings.replace(strV, null, null, "\t", " ");
        iRet = this._replaceEntities(strV);
    if(iRet == XMLP._ERROR) {
        return iRet;
    }

    strV = this.m_cAlt;

    if(this._findAttributeIndex(strN) == -1) {
        this._addAttribute(strN, strV);
    }else {
        return this._setErr(XMLP.ERR_ATT_DUP);
    }

    this.m_iP = iVE + 2;

    return XMLP._ATT;

};


XMLP.prototype._parseCDATA = function(iB) {
    var iE = this.m_xml.indexOf("]]>", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_CDATA);
    }

    this._setContent(XMLP._CONT_XML, iB, iE);

    this.m_iP = iE + 3;

    return XMLP._CDATA;
};


XMLP.prototype._parseComment = function(iB) {
    var iE = this.m_xml.indexOf("-" + "->", iB);
    if (iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_COMMENT);
    }

    this._setContent(XMLP._CONT_XML, iB, iE);

    this.m_iP = iE + 3;

    return XMLP._COMMENT;

};


XMLP.prototype._parseDTD = function(iB) {
    // Eat DTD
    var iE, strClose, iInt, iLast;

    iE = this.m_xml.indexOf(">", iB);
    if(iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_DTD);
    }

    iInt = this.m_xml.indexOf("[", iB);
    strClose = ((iInt != -1) && (iInt < iE)) ? "]>" : ">";

    while(true) {

        iE = this.m_xml.indexOf(strClose, iB);
        if(iE == -1) {
            return this._setErr(XMLP.ERR_CLOSE_DTD);
        }

        // Make sure it is not the end of a CDATA section
        if (this.m_xml.substring(iE - 1, iE + 2) != "]]>") {
            break;
        }
    }

    this.m_iP = iE + strClose.length;

    return XMLP._DTD;

};


XMLP.prototype._parseElement = function(iB) {
    var iE, iDE, iNE, iRet;
    var iType, strN, iLast;

    iDE = iE = this.m_xml.indexOf(">", iB);
    if(iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_ELM);
    }

    if(this.m_xml.charAt(iB) == "/") {
        iType = XMLP._ELM_E;
        iB++;
    } else {
        iType = XMLP._ELM_B;
    }

    if(this.m_xml.charAt(iE - 1) == "/") {
        if(iType == XMLP._ELM_E) {
            return this._setErr(XMLP.ERR_ELM_EMPTY);
        }
        iType = XMLP._ELM_EMP;
        iDE--;
    }

    iDE = saxstrings.lastIndexOfNonWhitespace(this.m_xml, iB, iDE);

    this._clearAttributes();

    iNE = saxstrings.indexOfWhitespace(this.m_xml, iB, iDE);
    if(iNE == -1) {
        iNE = iDE + 1;
    } else {
        this.m_iP = iNE;
        while(this.m_iP < iDE) {
            iRet = this._parseAttribute(this.m_iP, iDE);
            if(iRet == XMLP._ERROR){ 
                return iRet;
            }
        }
    }

    strN = this.m_xml.substring(iB, iNE);

    this.m_name = strN;
    this.m_iP = iE + 1;

    return iType;

};


XMLP.prototype._parseEntity = function(iB) {
    var iE = this.m_xml.indexOf(";", iB);
    if(iE == -1) {
        return this._setErr(XMLP.ERR_CLOSE_ENTITY);
    }

    this.m_iP = iE + 1;

    return this._replaceEntity(this.m_xml, iB, iE);

};


XMLP.prototype._parsePI = function(iB) {

    var iE, iTB, iTE, iCB, iCE;

    iE = this.m_xml.indexOf("?>", iB);
    if(iE   == -1) {
        return this._setErr(XMLP.ERR_CLOSE_PI);
    }

    iTB = saxstrings.indexOfNonWhitespace(this.m_xml, iB, iE);
    if(iTB == -1) {
        return this._setErr(XMLP.ERR_PI_TARGET);
    }

    iTE = saxstrings.indexOfWhitespace(this.m_xml, iTB, iE);
    if(iTE  == -1) {
        iTE = iE;
    }

    iCB = saxstrings.indexOfNonWhitespace(this.m_xml, iTE, iE);
    if(iCB == -1) {
        iCB = iE;
    }

    iCE = saxstrings.lastIndexOfNonWhitespace(this.m_xml, iCB, iE);
    if(iCE  == -1) {
        iCE = iE - 1;
    }

    this.m_name = this.m_xml.substring(iTB, iTE);
    this._setContent(XMLP._CONT_XML, iCB, iCE + 1);
    this.m_iP = iE + 2;

    return XMLP._PI;

};


XMLP.prototype._parseText = function(iB) {
    var iE, iEE;

    iE = this.m_xml.indexOf("<", iB);
    if(iE == -1) {
        iE = this.m_xml.length;
    }

    if(this.replaceEntities) {
        iEE = this.m_xml.indexOf("&", iB);
        if((iEE != -1) && (iEE <= iE)) {
            iE = iEE;
        }
    }

    this._setContent(XMLP._CONT_XML, iB, iE);

    this.m_iP = iE;

    return XMLP._TEXT;

};


XMLP.prototype._replaceEntities = function(strD, iB, iE) {
    if(saxstrings.isEmpty(strD)){ 
        return "";
    }
    iB = iB || 0;
    iE = iE || strD.length;

    var iEB, iEE, iRet, strRet = "";

    iEB = strD.indexOf("&", iB);
    iEE = iB;

    while((iEB > 0) && (iEB < iE)) {
        strRet += strD.substring(iEE, iEB);

        iEE = strD.indexOf(";", iEB) + 1;

        if((iEE === 0) || (iEE > iE)) {
            return this._setErr(XMLP.ERR_CLOSE_ENTITY);
        }

        iRet = this._replaceEntity(strD, iEB + 1, iEE - 1);
        if(iRet == XMLP._ERROR) {
            return iRet;
        }

        strRet += this.m_cAlt;

        iEB = strD.indexOf("&", iEE);
    }

    if(iEE != iE) {
        strRet += strD.substring(iEE, iE);
    }

    this._setContent(XMLP._CONT_ALT, strRet);

    return XMLP._ENTITY;

};


XMLP.prototype._replaceEntity = function(strD, iB, iE) {
    var strEnt;
    if(saxstrings.isEmpty(strD)){
        return -1;
    }
    iB = iB || 0;
    iE = iE || strD.length;

    switch(strD.substring(iB, iE)) {
        case "amp":  strEnt = "&";  break;
        case "lt":   strEnt = "<";  break;
        case "gt":   strEnt = ">";  break;
        case "apos": strEnt = "'";  break;
        case "quot": strEnt = "\""; break;
        default:
            if(strD.charAt(iB) == "#") {
                strEnt = String.fromCharCode(parseInt(strD.substring(iB + 1, iE),10))+'';
            } else {
                return this._setErr(XMLP.ERR_ENTITY_UNKNOWN);
            }
        break;
    }
    this._setContent(XMLP._CONT_ALT, strEnt);

    return XMLP._ENTITY;
};


XMLP.prototype._setContent = function(iSrc) {
    var args = arguments;

    if(XMLP._CONT_XML == iSrc) {
        this.m_cAlt = null;
        this.m_cB = args[1];
        this.m_cE = args[2];
    } else {
        this.m_cAlt = args[1];
        this.m_cB = 0;
        this.m_cE = args[1].length;
    }
    this.m_cSrc = iSrc;

};


XMLP.prototype._setErr = function(iErr) {
    var strErr = XMLP._errs[iErr];

    this.m_cAlt = strErr;
    this.m_cB = 0;
    this.m_cE = strErr.length;
    this.m_cSrc = XMLP._CONT_ALT;

    return XMLP._ERROR;

};




/**
* function:   SAXDriver
* Author:   Scott Severtson
* Description:
*    SAXDriver is an object that basically wraps an XMLP instance, and provides an
*   event-based interface for parsing. This is the object users interact with when coding
*   with XML for <SCRIPT>
**/

var SAXDriver = function() {
    this.m_hndDoc = null;
    this.m_hndErr = null;
    this.m_hndLex = null;
};


// CONSTANTS
SAXDriver.DOC_B = 1;
SAXDriver.DOC_E = 2;
SAXDriver.ELM_B = 3;
SAXDriver.ELM_E = 4;
SAXDriver.CHARS = 5;
SAXDriver.PI    = 6;
SAXDriver.CD_B  = 7;
SAXDriver.CD_E  = 8;
SAXDriver.CMNT  = 9;
SAXDriver.DTD_B = 10;
SAXDriver.DTD_E = 11;



SAXDriver.prototype.parse = function(strD) {
    var parser = new XMLP(strD);

    if(this.m_hndDoc && this.m_hndDoc.setDocumentLocator) {
        this.m_hndDoc.setDocumentLocator(this);
    }

    this.m_parser = parser;
    this.m_bErr = false;

    if(!this.m_bErr) {
        this._fireEvent(SAXDriver.DOC_B);
    }
    this._parseLoop();
    if(!this.m_bErr) {
        this._fireEvent(SAXDriver.DOC_E);
    }

    this.m_xml = null;
    this.m_iP = 0;

};


SAXDriver.prototype.setDocumentHandler = function(hnd) {
    this.m_hndDoc = hnd;
};

SAXDriver.prototype.setErrorHandler = function(hnd) {
    this.m_hndErr = hnd;
};

SAXDriver.prototype.setLexicalHandler = function(hnd) {
    this.m_hndLex = hnd;
};

/**
 * LOCATOR/PARSE EXCEPTION INTERFACE
 **/
SAXDriver.prototype.getColumnNumber = function() {
    return this.m_parser.getColumnNumber();
};

SAXDriver.prototype.getLineNumber = function() {
    return this.m_parser.getLineNumber();
};

SAXDriver.prototype.getMessage = function() {
    return this.m_strErrMsg;
};


SAXDriver.prototype.getPublicId = function() {
    return null;
};


SAXDriver.prototype.getSystemId = function() {
    return null;
};

/**
 * Attribute List Interface
 **/

SAXDriver.prototype.getLength = function() {
    return this.m_parser.getAttributeCount();
};


SAXDriver.prototype.getName = function(index) {
    return this.m_parser.getAttributeName(index);
};


SAXDriver.prototype.getValue = function(index) {
    return this.m_parser.getAttributeValue(index);
};


SAXDriver.prototype.getValueByName = function(name) {
    return this.m_parser.getAttributeValueByName(name);
};


/**
 *    Private functions
 **/

SAXDriver.prototype._fireError = function(strMsg) {
    this.m_strErrMsg = strMsg;
    this.m_bErr = true;

    if(this.m_hndErr && this.m_hndErr.fatalError) {
        this.m_hndErr.fatalError(this);
    }
};


SAXDriver.prototype._fireEvent = function(iEvt) {
    var hnd, func, args = arguments, iLen = args.length - 1;
    
    if(this.m_bErr){
        return;
    }

    if(SAXDriver.DOC_B == iEvt) {
        func = "startDocument";         
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.DOC_E == iEvt) {
        func = "endDocument";           
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.ELM_B == iEvt) {
        func = "startElement";          
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.ELM_E == iEvt) {
        func = "endElement";
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.CHARS == iEvt) {
        func = "characters";
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.PI    == iEvt) {
        func = "processingInstruction"; 
        hnd = this.m_hndDoc;
    }
    else if (SAXDriver.CD_B  == iEvt) {
        func = "startCDATA";            
        hnd = this.m_hndLex;
    }
    else if (SAXDriver.CD_E  == iEvt) {
        func = "endCDATA";              
        hnd = this.m_hndLex;
    }
    else if (SAXDriver.CMNT  == iEvt) {
        func = "comment";               
        hnd = this.m_hndLex;
    }

    if(hnd && hnd[func]) {
        if(0 === iLen) {
            hnd[func]();
        }
        else if (1 == iLen) {
            hnd[func](args[1]);
        }
        else if (2 == iLen) {
            hnd[func](args[1], args[2]);
        }
        else if (3 == iLen) {
            hnd[func](args[1], args[2], args[3]);
        }
    }
};


SAXDriver.prototype._parseLoop = function(parser) {
    var iEvent;

    parser = this.m_parser;
    while(!this.m_bErr) {
        iEvent = parser.next();

        if(iEvent == XMLP._ELM_B) {
            this._fireEvent(SAXDriver.ELM_B, parser.getName(), this);
        }
        else if(iEvent == XMLP._ELM_E) {
            this._fireEvent(SAXDriver.ELM_E, parser.getName());
        }
        else if(iEvent == XMLP._ELM_EMP) {
            this._fireEvent(SAXDriver.ELM_B, parser.getName(), this);
            this._fireEvent(SAXDriver.ELM_E, parser.getName());
        }
        else if(iEvent == XMLP._TEXT) {
            this._fireEvent(SAXDriver.CHARS, parser.getContent(), parser.getContentBegin(), parser.getContentEnd() - parser.getContentBegin());
        }
        else if(iEvent == XMLP._ENTITY) {
            this._fireEvent(SAXDriver.CHARS, parser.getContent(), parser.getContentBegin(), parser.getContentEnd() - parser.getContentBegin());
        }
        else if(iEvent == XMLP._PI) {
            this._fireEvent(SAXDriver.PI, parser.getName(), parser.getContent().substring(parser.getContentBegin(), parser.getContentEnd()));
        }
        else if(iEvent == XMLP._CDATA) {
            this._fireEvent(SAXDriver.CD_B);
            this._fireEvent(SAXDriver.CHARS, parser.getContent(), parser.getContentBegin(), parser.getContentEnd() - parser.getContentBegin());
            this._fireEvent(SAXDriver.CD_E);
        }
        else if(iEvent == XMLP._COMMENT) {
            this._fireEvent(SAXDriver.CMNT, parser.getContent(), parser.getContentBegin(), parser.getContentEnd() - parser.getContentBegin());
        }
        else if(iEvent == XMLP._DTD) {
        }
        else if(iEvent == XMLP._ERROR) {
            this._fireError(parser.getContent());
        }
        else if(iEvent == XMLP._NONE) {
            return;
        }
    }
};

/**
* Defined 'globally' to this scope.  Remember everything is wrapped in a closure so this doesnt show up
* in the outer most global scope.
*/

/**
 *  process SAX events
 *
 * @author Jon van Noort (jon@webarcana.com.au), David Joham (djoham@yahoo.com) and Scott Severtson
 *
 * @param  impl : DOMImplementation
 * @param  doc : DOMDocument - the Document to contain the parsed XML string
 * @param  p   : XMLP        - the SAX Parser
 *
 * @return : DOMDocument
 */
function __parseLoop__(impl, doc, p) {
    var iEvt, iNode, iAttr, iNS, strName;
    var iNodeParent = doc;

    var el_close_count = 0;

    var entitiesList = [];
    var textNodesList = [];
    var i;
    var pName;
    var namespaceDec;
    var pContent;
    var textNode;

    // if namespaceAware, add default namespace
    if (impl.namespaceAware) {
        // add the default-default namespace
        iNS = doc.createNamespace(""); 
        iNS.value = "http://www.w3.org/2000/xmlns/";
        //doc._namespaces.setNamedItem(iNS);
    }

  // loop until SAX parser stops emitting events
  while(true) {
    // get next event
    iEvt = p.next();

    if (iEvt == XMLP._ELM_B) {                      // Begin-Element Event
      pName = p.getName();                      // get the Element name
      pName = trim(pName, true, true);              // strip spaces from Element name
      if(pName.toLowerCase() == 'script'){
        p.replaceEntities = false;
      }

      if (!impl.namespaceAware) {
        iNode = doc.createElement(p.getName());     // create the Element

        // add attributes to Element
        for(i = 0; i < p.getAttributeCount(); i++) {
          strName = p.getAttributeName(i);          // get Attribute name
          iAttr = iNode.getAttributeNode(strName);  // if Attribute exists, use it

          if(!iAttr) {
            iAttr = doc.createAttribute(strName);   // otherwise create it
          }

          iAttr.value = p.getAttributeValue(i);   // set Attribute value
          iNode.setAttributeNode(iAttr);            // attach Attribute to Element
        }
      }
      else {  // Namespace Aware
        // create element (with empty namespaceURI,
        //  resolve after namespace 'attributes' have been parsed)
        iNode = doc.createElementNS("", p.getName());

        // duplicate ParentNode's Namespace definitions
        iNode._namespaces = __cloneNamedNodes__(iNodeParent._namespaces, iNode, true);

        // add attributes to Element
        for(i = 0; i < p.getAttributeCount(); i++) {
          strName = p.getAttributeName(i);          // get Attribute name

          // if attribute is a namespace declaration
          if (__isNamespaceDeclaration__(strName)) {
            // parse Namespace Declaration
            namespaceDec = __parseNSName__(strName);

            if (strName != "xmlns") {
              iNS = doc.createNamespace(strName);   // define namespace
            }
            else {
              iNS = doc.createNamespace("");        // redefine default namespace
            }
            iNS.value = p.getAttributeValue(i);   // set value = namespaceURI

            iNode._namespaces.setNamedItem(iNS);    // attach namespace to namespace collection
          }
          else {  // otherwise, it is a normal attribute
            iAttr = iNode.getAttributeNode(strName);        // if Attribute exists, use it

            if(!iAttr) {
              iAttr = doc.createAttributeNS("", strName);   // otherwise create it
            }

            iAttr.value = p.getAttributeValue(i);         // set Attribute value
            iNode.setAttributeNodeNS(iAttr);                // attach Attribute to Element

            if (__isIdDeclaration__(strName)) {
              iNode.id = p.getAttributeValue(i);    // cache ID for getElementById()
            }
          }
        }

        // resolve namespaceURIs for this Element
        if (iNode._namespaces.getNamedItem(iNode.prefix)) {
          iNode.namespaceURI = iNode._namespaces.getNamedItem(iNode.prefix).value;
        }

        //  for this Element's attributes
        for (i = 0; i < iNode.attributes.length; i++) {
          if (iNode.attributes.item(i).prefix != "") {  // attributes do not have a default namespace
            if (iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)) {
              iNode.attributes.item(i).namespaceURI = iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
            }
          }
        }
      }

      iNodeParent.appendChild(iNode);               // attach Element to parentNode
      iNodeParent = iNode;                          // descend one level of the DOM Tree
    }

    else if(iEvt == XMLP._ELM_E) {                  // End-Element Event
      
      iNodeParent = iNodeParent.parentNode;         // ascend one level of the DOM Tree

    }

    else if(iEvt == XMLP._ELM_EMP) {                // Empty Element Event
      pName = p.getName();                          // get the Element name
      pName = trim(pName, true, true);              // strip spaces from Element name

      if (!impl.namespaceAware) {
        iNode = doc.createElement(pName);           // create the Element

        // add attributes to Element
        for(i = 0; i < p.getAttributeCount(); i++) {
          strName = p.getAttributeName(i);          // get Attribute name
          iAttr = iNode.getAttributeNode(strName);  // if Attribute exists, use it

          if(!iAttr) {
            iAttr = doc.createAttribute(strName);   // otherwise create it
          }

          iAttr.value = p.getAttributeValue(i);   // set Attribute value
          iNode.setAttributeNode(iAttr);            // attach Attribute to Element
        }
      }
      else {  // Namespace Aware
        // create element (with empty namespaceURI,
        //  resolve after namespace 'attributes' have been parsed)
        iNode = doc.createElementNS("", p.getName());

        // duplicate ParentNode's Namespace definitions
        iNode._namespaces = __cloneNamedNodes__(iNodeParent._namespaces, iNode, true);

        // add attributes to Element
        for(i = 0; i < p.getAttributeCount(); i++) {
          strName = p.getAttributeName(i);          // get Attribute name

          // if attribute is a namespace declaration
          if (__isNamespaceDeclaration__(strName)) {
            // parse Namespace Declaration
            namespaceDec = __parseNSName__(strName);

            if (strName != "xmlns") {
              iNS = doc.createNamespace(strName);   // define namespace
            } else {
              iNS = doc.createNamespace("");        // redefine default namespace
            }
            iNS.value = p.getAttributeValue(i);   // set value = namespaceURI

            iNode._namespaces.setNamedItem(iNS);    // attach namespace to namespace collection
          }
          else {  // otherwise, it is a normal attribute
            iAttr = iNode.getAttributeNode(strName);        // if Attribute exists, use it

            if(!iAttr) {
              iAttr = doc.createAttributeNS("", strName);   // otherwise create it
            }

            iAttr.value = p.getAttributeValue(i);         // set Attribute value
            iNode.setAttributeNodeNS(iAttr);                // attach Attribute to Element

            if (__isIdDeclaration__(strName)) {
              iNode.id = p.getAttributeValue(i);    // cache ID for getElementById()
            }
          }
        }

        // resolve namespaceURIs for this Element
        if (iNode._namespaces.getNamedItem(iNode.prefix)) {
          iNode.namespaceURI = iNode._namespaces.getNamedItem(iNode.prefix).value;
        }

        //  for this Element's attributes
        for (i = 0; i < iNode.attributes.length; i++) {
          if (iNode.attributes.item(i).prefix != "") {  // attributes do not have a default namespace
            if (iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)) {
              iNode.attributes.item(i).namespaceURI = iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
            }
          }
        }
      }

      // if this is the Root Element
      if (iNodeParent.nodeType == Node.DOCUMENT_NODE) {
        iNodeParent.documentElement = iNode;        // register this Element as the Document.documentElement
      }

      iNodeParent.appendChild(iNode);               // attach Element to parentNode
    }
    else if(iEvt == XMLP._TEXT || iEvt == XMLP._ENTITY) {                   // TextNode and entity Events
      // get Text content
      pContent = p.getContent().substring(p.getContentBegin(), p.getContentEnd());

      if (!impl.preserveWhiteSpace ) {
        if (trim(pContent, true, true) == "") {
            pContent = ""; //this will cause us not to create the text node below
        }
      }

      if (pContent.length > 0) {                    // ignore empty TextNodes
        textNode = doc.createTextNode(pContent);
        iNodeParent.appendChild(textNode); // attach TextNode to parentNode

        //the sax parser breaks up text nodes when it finds an entity. For
        //example hello&lt;there will fire a text, an entity and another text
        //this sucks for the dom parser because it looks to us in this logic
        //as three text nodes. I fix this by keeping track of the entity nodes
        //and when we're done parsing, calling normalize on their parent to
        //turn the multiple text nodes into one, which is what DOM users expect
        //the code to do this is at the bottom of this function
        if (iEvt == XMLP._ENTITY) {
            entitiesList[entitiesList.length] = textNode;
        }
        else {
            //I can't properly decide how to handle preserve whitespace
            //until the siblings of the text node are built due to
            //the entitiy handling described above. I don't know that this
            //will be all of the text node or not, so trimming is not appropriate
            //at this time. Keep a list of all the text nodes for now
            //and we'll process the preserve whitespace stuff at a later time.
            textNodesList[textNodesList.length] = textNode;
        }
      }
    }
    else if(iEvt == XMLP._PI) {                     // ProcessingInstruction Event
      // attach ProcessingInstruction to parentNode
      iNodeParent.appendChild(doc.createProcessingInstruction(p.getName(), p.getContent().substring(p.getContentBegin(), p.getContentEnd())));
    }
    else if(iEvt == XMLP._CDATA) {                  // CDATA Event
      // get CDATA data
      pContent = p.getContent().substring(p.getContentBegin(), p.getContentEnd());

      if (!impl.preserveWhiteSpace) {
        pContent = trim(pContent, true, true);      // trim whitespace
        pContent.replace(/ +/g, ' ');               // collapse multiple spaces to 1 space
      }

      if (pContent.length > 0) {                    // ignore empty CDATANodes
        iNodeParent.appendChild(doc.createCDATASection(pContent)); // attach CDATA to parentNode
      }
    }
    else if(iEvt == XMLP._COMMENT) {                // Comment Event
      // get COMMENT data
      pContent = p.getContent().substring(p.getContentBegin(), p.getContentEnd());

      if (!impl.preserveWhiteSpace) {
        pContent = trim(pContent, true, true);      // trim whitespace
        pContent.replace(/ +/g, ' ');               // collapse multiple spaces to 1 space
      }

      if (pContent.length > 0) {                    // ignore empty CommentNodes
        iNodeParent.appendChild(doc.createComment(pContent));  // attach Comment to parentNode
      }
    }
    else if(iEvt == XMLP._DTD) {                    // ignore DTD events
    }
    else if(iEvt == XMLP._ERROR) {
        console.log("Fatal Error: " + p.getContent() +
                "\nLine: " + p.getLineNumber() +
                "\nColumn: " + p.getColumnNumber() + "\n");
        throw(new DOMException(DOMException.SYNTAX_ERR));
    }
    else if(iEvt == XMLP._NONE) {                   // no more events
      if (iNodeParent == doc) {                     // confirm that we have recursed back up to root
        break;
      }
      else {
        throw(new DOMException(DOMException.SYNTAX_ERR));  // one or more Tags were not closed properly
      }
        break;

    }
  }

  var entity,
      parentNode,
      children,
      child,
      childData,
      j;
  //normalize any entities in the DOM to a single textNode
  for (i = 0; i < entitiesList.length; i++) {
      entity = entitiesList[i];
      //its possible (if for example two entities were in the
      //same domnode, that the normalize on the first entitiy
      //will remove the parent for the second. Only do normalize
      //if I can find a parent node
      parentNode = entity.parentNode;
      if (parentNode) {
          parentNode.normalize();

          //now do whitespace (if necessary)
          //it was not done for text nodes that have entities
          if(!impl.preserveWhiteSpace) {
                children = parentNode.childNodes;
                for ( j = 0; j < children.length; j++) {
                    child = children.item(j);
                    if (child.nodeType == Node.TEXT_NODE) {
                        childData = child.data;
                        childData.replace(/\s/g, ' ');
                        child.data = childData;
                    }
                }
          }
      }
  }

  //do the preserve whitespace processing on the rest of the text nodes
  //It's possible (due to the processing above) that the node will have been
  //removed from the tree. Only do whitespace checking if parentNode is not null.
  //This may duplicate the whitespace processing for some nodes that had entities in them
  //but there's no way around that
  if (!impl.preserveWhiteSpace) {
    for (i = 0; i < textNodesList.length; i++) {
        var node = textNodesList[i];
        if (node.parentNode !== null) {
            var nodeData = node.data;
            nodeData.replace(/\s/g, ' ');
            node.data = nodeData;
        }
    }
  }
}


/**
 * @method DOMImplementation._isNamespaceDeclaration - Return true, if attributeName is a namespace declaration
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  attributeName : string - the attribute name
 * @return : boolean
 */
function __isNamespaceDeclaration__(attributeName) {
  // test if attributeName is 'xmlns'
  return (attributeName.indexOf('xmlns') > -1);
}

/**
 * @method DOMImplementation._isIdDeclaration - Return true, if attributeName is an id declaration
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  attributeName : string - the attribute name
 * @return : boolean
 */
function __isIdDeclaration__(attributeName) {
  // test if attributeName is 'id' (case insensitive)
  return (attributeName.toLowerCase() == 'id');
}

/**
 * @method DOMImplementation._isValidName - Return true,
 *   if name contains no invalid characters
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  name : string - the candidate name
 * @return : boolean
 */
function __isValidName__(name) {
  // test if name contains only valid characters
  return name.match(re_validName);
}
var re_validName = /^[a-zA-Z_:][a-zA-Z0-9\.\-_:]*$/;

/**
 * @method DOMImplementation._isValidString - Return true, if string does not contain any illegal chars
 *  All of the characters 0 through 31 and character 127 are nonprinting control characters.
 *  With the exception of characters 09, 10, and 13, (Ox09, Ox0A, and Ox0D)
 *  Note: different from _isValidName in that ValidStrings may contain spaces
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  name : string - the candidate string
 * @return : boolean
 */
function __isValidString__(name) {
  // test that string does not contains invalid characters
  return (name.search(re_invalidStringChars) < 0);
}
var re_invalidStringChars = /\x01|\x02|\x03|\x04|\x05|\x06|\x07|\x08|\x0B|\x0C|\x0E|\x0F|\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F|\x7F/;

/**
 * @method DOMImplementation._parseNSName - parse the namespace name.
 *  if there is no colon, the
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  qualifiedName : string - The qualified name
 * @return : NSName - [
         .prefix        : string - The prefix part of the qname
         .namespaceName : string - The namespaceURI part of the qname
    ]
 */
function __parseNSName__(qualifiedName) {
  var resultNSName = {};

  resultNSName.prefix          = qualifiedName;  // unless the qname has a namespaceName, the prefix is the entire String
  resultNSName.namespaceName   = "";

  // split on ':'
  var delimPos = qualifiedName.indexOf(':');
  if (delimPos > -1) {
    // get prefix
    resultNSName.prefix        = qualifiedName.substring(0, delimPos);
    // get namespaceName
    resultNSName.namespaceName = qualifiedName.substring(delimPos +1, qualifiedName.length);
  }
  return resultNSName;
}

/**
 * @method DOMImplementation._parseQName - parse the qualified name
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  qualifiedName : string - The qualified name
 * @return : QName
 */
function __parseQName__(qualifiedName) {
  var resultQName = {};

  resultQName.localName = qualifiedName;  // unless the qname has a prefix, the local name is the entire String
  resultQName.prefix    = "";

  // split on ':'
  var delimPos = qualifiedName.indexOf(':');

  if (delimPos > -1) {
    // get prefix
    resultQName.prefix    = qualifiedName.substring(0, delimPos);

    // get localName
    resultQName.localName = qualifiedName.substring(delimPos +1, qualifiedName.length);
  }

  return resultQName;
}


/**
 *
 * This file only handles XML parser.
 * It is extended by parser/domparser.js (and parser/htmlparser.js)
 *
 * This depends on e4x, which some engines may not have.
 *
 * @author thatcher
 */
exports.DOMParser = DOMParser = function(principle, documentURI, baseURI) {
    // TODO: why/what should these 3 args do?
};
__extend__(DOMParser.prototype,{
    parseFromString: function(xmlstring, mimetype){
        // create SAX Parser
        var parser = new XMLP(xmlstring+'');
        var doc = new Document(new DOMImplementation());
    
        // populate Document with Parsed Nodes
        //try {
            __parseLoop__(doc.implementation, doc, parser);
        /*} catch (e) {
            console.log(
                "Error parsing XML %s %s",  
                doc.implementation.translateErrCode(e.code),
                e
            );
        }*/

        // set parseComplete flag, (Some validation Rules are relaxed if this is false)
        doc._parseComplete = true;
        return doc;
    
        /*var e4xsupport = false;
        try{e4xsupport = new XML();}catch(e){}
        if(e4xsupport){
            return __E4XParser__(xmlstring, mimetype);
        }else{
            var doc = new Document(new DOMImplementation());
            //requires envjs parser.js module/mixins
            XMLParser.parseDocument(xmlstring, doc, mimetype);
            //console.log('xml \n %s', doc.documentElement.xml);
            return doc; 
        }*/
    }
});

__E4XParser__ = function(xmlstring, mimetype){
    
    var doc = new Document(new DOMImplementation()),
        e4;

    // The following are e4x directives.
    // Full spec is here:
    // http://www.ecma-international.org/publications/standards/Ecma-357.htm
    //
    // that is pretty gross, so checkout this summary
    // http://rephrase.net/days/07/06/e4x
    //
    // also see the Mozilla Developer Center:
    // https://developer.mozilla.org/en/E4X
    //
    XML.ignoreComments = false;
    XML.ignoreProcessingInstructions = false;
    XML.ignoreWhitespace = false;

    // for some reason e4x can't handle initial xml declarations
    // https://bugzilla.mozilla.org/show_bug.cgi?id=336551
    // The official workaround is the big regexp below
    // but simpler one seems to be ok
    // xmlstring = xmlstring.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
    //
    xmlstring = xmlstring.replace(/<\?xml.*\?>/, '');

    e4 = new XMLList(xmlstring);

    __E4XtoDomNode__(e4, doc, doc);

    //console.log('xml \n %s', doc.documentElement.xml);
    return doc;
};

__E4XtoDomNode__ = function(e4, parent, doc){
    var xnode,
        domnode,
        children,
        target,
        value,
        length,
        element,
        kind,
        item;
    //console.log('converting e4x node list \n %s', e4)

    // not using the for each(item in e4) since some engines can't
    // handle the syntax (i.e. says syntax error)
    //
    // for each(xnode in e4) {
    for (item in e4) {
        // NO do not do this if (e4.hasOwnProperty(item)) {
        // breaks spidermonkey
        if(item){
            xnode = e4[item];

            kind = xnode.nodeKind();
            //console.log('treating node kind %s', kind);
            switch(kind){
            case 'element':
                // add node
                //console.log('creating element %s %s', xnode.localName(), xnode.namespace());
                if(xnode.namespace() && (xnode.namespace()+'') !== ''){
                    //console.log('createElementNS %s %s',xnode.namespace()+'', xnode.localName() );
                    domnode = doc.createElementNS(xnode.namespace()+'', xnode.localName());
                }else{
                    domnode = doc.createElement(xnode.name()+'');
                }
                parent.appendChild(domnode);

                // add attributes
                __E4XtoDomNode__(xnode.attributes(), domnode, doc);

                // add children
                children = xnode.children();
                length = children.length();
                //console.log('recursing? %s', length ? 'yes' : 'no');
                if (length > 0) {
                    __E4XtoDomNode__(children, domnode, doc);
                }
                break;
            case 'attribute':
                // console.log('setting attribute %s %s %s',
                //       xnode.localName(), xnode.namespace(), xnode.valueOf());

                //
                // cross-platform alert.  The original code used
                //  xnode.text() to get the attribute value
                //  This worked in Rhino, but did not in Spidermonkey
                //  valueOf seemed to work in both
                //
                if(xnode.namespace() && xnode.namespace().prefix){
                    //console.log("%s", xnode.namespace().prefix);
                    parent.setAttributeNS(xnode.namespace()+'',
                                          xnode.namespace().prefix+':'+xnode.localName(),
                                          xnode.valueOf());
                }else if((xnode.name()+'').match('http://www.w3.org/2000/xmlns/::')){
                    if(xnode.localName()!=='xmlns'){
                        parent.setAttributeNS('http://www.w3.org/2000/xmlns/',
                                              'xmlns:'+xnode.localName(),
                                              xnode.valueOf());
                    }
                }else{
                    //console.log('setting attribute %s', xnode.localName());
                    parent.setAttribute(xnode.localName()+'', xnode.valueOf());
                }
                break;
            case 'text':
                //console.log('creating text node : %s', xnode);
                domnode = doc.createTextNode(xnode+'');
                parent.appendChild(domnode);
                break;
            case 'comment':
                //console.log('creating comment node : %s', xnode);
                value = xnode+'';
                domnode = doc.createComment(value.substring(4,value.length-3));
                parent.appendChild(domnode);
                break;
            case 'processing-instruction':
                //console.log('creating processing-instruction node : %s', xnode);
                value = xnode+'';
                target = value.split(' ')[0].substring(2);
                value = value.split(' ').splice(1).join(' ').replace('?>','');
                //console.log('creating processing-instruction data : %s', value);
                domnode = doc.createProcessingInstruction(target, value);
                parent.appendChild(domnode);
                break;
            default:
                log.error('e4x DOM ERROR');
                throw "Assertion failed in xml parser";
            }
        }
    }
};


}(/*Envjs.DOM.DOMParser*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Attr').debug('available'); 
});
    
/**
 * @class  Attr
 *      The Attr interface represents an attribute in an Element object
 * @extends Node
 * @param  ownerDocument : The Document object associated with this node.
 */
exports.Attr = Attr = function(ownerDocument) {
    Node.apply(this, arguments);
    // set when Attr is added to NamedNodeMap
    this.ownerElement = null;
    //TODO: our implementation of Attr is incorrect because we don't
    //      treat the value of the attribute as a child text node.
};
Attr.prototype = new Node();
__extend__(Attr.prototype, {
    // the name of this attribute
    get name(){
        return this.nodeName;
    },
    // the value of the attribute is returned as a string
    get value(){
        return this.nodeValue||'';
    },
    set value(value){
        // throw Exception if Attribute is readonly
        if (__ownerDocument__(this).implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        // delegate to node
        this.nodeValue = value;
    },
    get textContent(){
        return this.nodeValue;
    },
    set textContent(newText){
        this.nodeValue = newText;
    },
    get specified(){
        return (this !== null && this !== undefined);
    },
    get nodeType(){
        return Node.ATTRIBUTE_NODE;
    },
    get xml() {
        if (this.nodeValue) {
            return  __escapeXML__(this.nodeValue+"");
        } else {
            return '';
        }
    },
    toString : function() {
        return '[object Attr]';
    }
});

}(/*Envjs.DOM.Attr*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Element').debug('available'); 
});
/**
 * @class  Element -
 *      By far the vast majority of objects (apart from text)
 *      that authors encounter when traversing a document are
 *      Element nodes.
 * @extends Node
 * @param  ownerDocument : The Document object associated with this node.
 */
exports.Element = Element = function(ownerDocument) {
    Node.apply(this, arguments);
    this.attributes = new NamedNodeMap(this.ownerDocument, this);
};
Element.prototype = new Node();
__extend__(Element.prototype, {
    // The name of the element.
    get tagName(){
        return this.nodeName;
    },

    getAttribute: function(name) {
        var ret = null;
        // if attribute exists, use it
        var attr = this.attributes.getNamedItem(name);
        if (attr) {
            ret = attr.value;
        }
        // if Attribute exists, return its value, otherwise, return null
        return ret;
    },

    setAttribute : function (name, value) {
		log.debug('setting attribute %s = %s for element %s', name, value, this.nodeName);
        // if attribute exists, use it
        var attr = this.attributes.getNamedItem(name);
        if (attr===null||attr===undefined) {
            // otherwise create it
            attr = __ownerDocument__(this).createAttribute(name);
           //console.log('attr %s', attr);
        }


        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Attribute is readonly
            if (attr._readonly) {
                throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if the value string contains an illegal character
            if (!__isValidString__(value+'')) {
                throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
        }

        // assign values to properties (and aliases)
        attr.value     = value + '';

        // add/replace Attribute in NamedNodeMap
        this.attributes.setNamedItem(attr);
        //console.log('element setNamedItem %s = %s', attr.name, attr.value);
    },
    removeAttribute : function removeAttribute(name) {
		log.debug('removing attribute %s for element %s', name, this.nodeName);
        // delegate to NamedNodeMap.removeNamedItem
        return this.attributes.removeNamedItem(name);
    },
    getAttributeNode : function getAttributeNode(name) {
        // delegate to NamedNodeMap.getNamedItem
        return this.attributes.getNamedItem(name);
    },
    setAttributeNode: function(newAttr) {
        // delegate to NamedNodeMap.setNamedItem
        return this.attributes.setNamedItem(newAttr);
    },
    removeAttributeNode: function(oldAttr) {
      // throw Exception if Attribute is readonly
      if (__ownerDocument__(this).implementation.errorChecking && oldAttr._readonly) {
        throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
      }

      // get item index
      var itemIndex = this.attributes._findItemIndex(oldAttr._id);

      // throw Exception if node does not exist in this map
      if (__ownerDocument__(this).implementation.errorChecking && (itemIndex < 0)) {
        throw(new DOMException(DOMException.NOT_FOUND_ERR));
      }

      return this.attributes._removeChild(itemIndex);
    },
    getAttributeNS : function(namespaceURI, localName) {
        var ret = "";
        // delegate to NAmedNodeMap.getNamedItemNS
        var attr = this.attributes.getNamedItemNS(namespaceURI, localName);
        if (attr) {
            ret = attr.value;
        }
        return ret;  // if Attribute exists, return its value, otherwise return ""
    },
    setAttributeNS : function(namespaceURI, qualifiedName, value) {
		log.debug('setAttributeNS %s:%s for element %s', namespaceURI, qualifiedName, this.nodeName);
        // call NamedNodeMap.getNamedItem
        //console.log('setAttributeNS %s %s %s', namespaceURI, qualifiedName, value);
        var attr = this.attributes.getNamedItem(namespaceURI, qualifiedName);

        if (!attr) {  // if Attribute exists, use it
            // otherwise create it
            attr = __ownerDocument__(this).createAttributeNS(namespaceURI, qualifiedName);
        }

        value = '' + value;

        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if Attribute is readonly
            if (attr._readonly) {
                throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if the Namespace is invalid
            if (!__isValidNamespace__(this.ownerDocument, namespaceURI, qualifiedName, true)) {
                throw(new DOMException(DOMException.NAMESPACE_ERR));
            }

            // throw Exception if the value string contains an illegal character
            if (!__isValidString__(value)) {
                throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
        }

        // assign values to properties (and aliases)
        attr.value     = value;
        attr.nodeValue = value;

        // delegate to NamedNodeMap.setNamedItem
        this.attributes.setNamedItemNS(attr);
    },
    removeAttributeNS : function(namespaceURI, localName) {
        // delegate to NamedNodeMap.removeNamedItemNS
        return this.attributes.removeNamedItemNS(namespaceURI, localName);
    },
    getAttributeNodeNS : function(namespaceURI, localName) {
        // delegate to NamedNodeMap.getNamedItemNS
        return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    setAttributeNodeNS : function(newAttr) {
        // delegate to NamedNodeMap.setNamedItemNS
        return this.attributes.setNamedItemNS(newAttr);
    },
    hasAttribute : function(name) {
        // delegate to NamedNodeMap._hasAttribute
        return __hasAttribute__(this.attributes,name);
    },
    hasAttributeNS : function(namespaceURI, localName) {
        // delegate to NamedNodeMap._hasAttributeNS
        return __hasAttributeNS__(this.attributes, namespaceURI, localName);
    },
    get nodeType(){
        return Node.ELEMENT_NODE;
    },
    get xml() {
        var ret = "",
            ns = "",
            attrs,
            attrstring,
            i;

        // serialize namespace declarations
        if (this.namespaceURI){
            if((this === this.ownerDocument.documentElement) ||
               (!this.parentNode)||
               (this.parentNode && (this.parentNode.namespaceURI !== this.namespaceURI))) {
                ns = ' xmlns' + (this.prefix?(':'+this.prefix):'') +
                    '="' + this.namespaceURI + '"';
            }
        }
        
        attrstring = "";
        if(this._namespaces && this._namespaces.length){
           attrstring += this._namespaces.xml;
        }
        

        // serialize Attribute declarations
        attrs = this.attributes;
        for(i=0;i< attrs.length;i++){
            if(attrs[i].name.match('xmlns:')) {
                attrstring += " "+attrs[i].name+'="'+attrs[i].xml+'"';
            }
        }
        for(i=0;i< attrs.length;i++){
            if(!attrs[i].name.match('xmlns:')) {
                attrstring += " "+attrs[i].name+'="'+attrs[i].xml+'"';
            }
        }

        if(this.hasChildNodes()){
            // serialize this Element
            ret += "<" + this.tagName + ns + attrstring +">";
            ret += this.childNodes.xml;
            ret += "</" + this.tagName + ">";
        }else{
            ret += "<" + this.tagName + ns + attrstring +"/>";
        }

        return ret;
    },
    toString : function(){
        return '[object Element]';
    }
});

}(/*Envjs.DOM.Element*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.ProcessingInstruction').debug('available'); 
});
/**
 * @class  ProcessingInstruction -
 *      The ProcessingInstruction interface represents a
 *      "processing instruction", used in XML as a way to
 *      keep processor-specific information in the text of
 *      the document
 * @extends Node
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  ownerDocument :  The Document object associated with this node.
 */
exports.ProcessingInstruction = ProcessingInstruction = function(ownerDocument) {
    Node.apply(this, arguments);
};
ProcessingInstruction.prototype = new Node();
__extend__(ProcessingInstruction.prototype, {
    get data(){
        return this.nodeValue;
    },
    set data(data){
        // throw Exception if Node is readonly
        if (__ownerDocument__(this).errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        this.nodeValue = data;
    },
    get textContent(){
        return this.data;
    },
    get localName(){
        return null;
    },
    get target(){
      // The target of this processing instruction.
      // XML defines this as being the first token following the markup that begins the processing instruction.
      // The content of this processing instruction.
        return this.nodeName;
    },
    set target(value){
      // The target of this processing instruction.
      // XML defines this as being the first token following the markup that begins the processing instruction.
      // The content of this processing instruction.
        this.nodeName = value;
    },
    get nodeType(){
        return Node.PROCESSING_INSTRUCTION_NODE;
    },
    get xml(){
        return "<?" + this.nodeName +" "+ this.nodeValue + "?>";
    },
    toString : function(){
        return "[object ProcessingInstruction]";
    }
});

}(/*Envjs.DOM.ProcessingInstruction*/));



(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Entity').debug('available'); 
});
/**
 * @author envjs team
 */

exports.Entity = Entity = function() {
    throw new Error("Entity Not Implemented" );
};

Entity.constants = {
        // content taken from W3C "HTML 4.01 Specification"
        //                        "W3C Recommendation 24 December 1999"

    nbsp: "\u00A0",
    iexcl: "\u00A1",
    cent: "\u00A2",
    pound: "\u00A3",
    curren: "\u00A4",
    yen: "\u00A5",
    brvbar: "\u00A6",
    sect: "\u00A7",
    uml: "\u00A8",
    copy: "\u00A9",
    ordf: "\u00AA",
    laquo: "\u00AB",
    not: "\u00AC",
    shy: "\u00AD",
    reg: "\u00AE",
    macr: "\u00AF",
    deg: "\u00B0",
    plusmn: "\u00B1",
    sup2: "\u00B2",
    sup3: "\u00B3",
    acute: "\u00B4",
    micro: "\u00B5",
    para: "\u00B6",
    middot: "\u00B7",
    cedil: "\u00B8",
    sup1: "\u00B9",
    ordm: "\u00BA",
    raquo: "\u00BB",
    frac14: "\u00BC",
    frac12: "\u00BD",
    frac34: "\u00BE",
    iquest: "\u00BF",
    Agrave: "\u00C0",
    Aacute: "\u00C1",
    Acirc: "\u00C2",
    Atilde: "\u00C3",
    Auml: "\u00C4",
    Aring: "\u00C5",
    AElig: "\u00C6",
    Ccedil: "\u00C7",
    Egrave: "\u00C8",
    Eacute: "\u00C9",
    Ecirc: "\u00CA",
    Euml: "\u00CB",
    Igrave: "\u00CC",
    Iacute: "\u00CD",
    Icirc: "\u00CE",
    Iuml: "\u00CF",
    ETH: "\u00D0",
    Ntilde: "\u00D1",
    Ograve: "\u00D2",
    Oacute: "\u00D3",
    Ocirc: "\u00D4",
    Otilde: "\u00D5",
    Ouml: "\u00D6",
    times: "\u00D7",
    Oslash: "\u00D8",
    Ugrave: "\u00D9",
    Uacute: "\u00DA",
    Ucirc: "\u00DB",
    Uuml: "\u00DC",
    Yacute: "\u00DD",
    THORN: "\u00DE",
    szlig: "\u00DF",
    agrave: "\u00E0",
    aacute: "\u00E1",
    acirc: "\u00E2",
    atilde: "\u00E3",
    auml: "\u00E4",
    aring: "\u00E5",
    aelig: "\u00E6",
    ccedil: "\u00E7",
    egrave: "\u00E8",
    eacute: "\u00E9",
    ecirc: "\u00EA",
    euml: "\u00EB",
    igrave: "\u00EC",
    iacute: "\u00ED",
    icirc: "\u00EE",
    iuml: "\u00EF",
    eth: "\u00F0",
    ntilde: "\u00F1",
    ograve: "\u00F2",
    oacute: "\u00F3",
    ocirc: "\u00F4",
    otilde: "\u00F5",
    ouml: "\u00F6",
    divide: "\u00F7",
    oslash: "\u00F8",
    ugrave: "\u00F9",
    uacute: "\u00FA",
    ucirc: "\u00FB",
    uuml: "\u00FC",
    yacute: "\u00FD",
    thorn: "\u00FE",
    yuml: "\u00FF",
    fnof: "\u0192",
    Alpha: "\u0391",
    Beta: "\u0392",
    Gamma: "\u0393",
    Delta: "\u0394",
    Epsilon: "\u0395",
    Zeta: "\u0396",
    Eta: "\u0397",
    Theta: "\u0398",
    Iota: "\u0399",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Nu: "\u039D",
    Xi: "\u039E",
    Omicron: "\u039F",
    Pi: "\u03A0",
    Rho: "\u03A1",
    Sigma: "\u03A3",
    Tau: "\u03A4",
    Upsilon: "\u03A5",
    Phi: "\u03A6",
    Chi: "\u03A7",
    Psi: "\u03A8",
    Omega: "\u03A9",
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    omicron: "\u03BF",
    pi: "\u03C0",
    rho: "\u03C1",
    sigmaf: "\u03C2",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    thetasym: "\u03D1",
    upsih: "\u03D2",
    piv: "\u03D6",
    bull: "\u2022",
    hellip: "\u2026",
    prime: "\u2032",
    Prime: "\u2033",
    oline: "\u203E",
    frasl: "\u2044",
    weierp: "\u2118",
    image: "\u2111",
    real: "\u211C",
    trade: "\u2122",
    alefsym: "\u2135",
    larr: "\u2190",
    uarr: "\u2191",
    rarr: "\u2192",
    darr: "\u2193",
    harr: "\u2194",
    crarr: "\u21B5",
    lArr: "\u21D0",
    uArr: "\u21D1",
    rArr: "\u21D2",
    dArr: "\u21D3",
    hArr: "\u21D4",
    forall: "\u2200",
    part: "\u2202",
    exist: "\u2203",
    empty: "\u2205",
    nabla: "\u2207",
    isin: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    prod: "\u220F",
    sum: "\u2211",
    minus: "\u2212",
    lowast: "\u2217",
    radic: "\u221A",
    prop: "\u221D",
    infin: "\u221E",
    ang: "\u2220",
    and: "\u2227",
    or: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    intXX: "\u222B",
    there4: "\u2234",
    sim: "\u223C",
    cong: "\u2245",
    asymp: "\u2248",
    ne: "\u2260",
    equiv: "\u2261",
    le: "\u2264",
    ge: "\u2265",
    sub: "\u2282",
    sup: "\u2283",
    nsub: "\u2284",
    sube: "\u2286",
    supe: "\u2287",
    oplus: "\u2295",
    otimes: "\u2297",
    perp: "\u22A5",
    sdot: "\u22C5",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    lang: "\u2329",
    rang: "\u232A",
    loz: "\u25CA",
    spades: "\u2660",
    clubs: "\u2663",
    hearts: "\u2665",
    diams: "\u2666",
    quot: "\u0022",
    amp: "\u0026",
    lt: "\u003C",
    gt: "\u003E",
    OElig: "\u0152",
    oelig: "\u0153",
    Scaron: "\u0160",
    scaron: "\u0161",
    Yuml: "\u0178",
    circ: "\u02C6",
    tilde: "\u02DC",
    ensp: "\u2002",
    emsp: "\u2003",
    thinsp: "\u2009",
    zwnj: "\u200C",
    zwj: "\u200D",
    lrm: "\u200E",
    rlm: "\u200F",
    ndash: "\u2013",
    mdash: "\u2014",
    lsquo: "\u2018",
    rsquo: "\u2019",
    sbquo: "\u201A",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bdquo: "\u201E",
    dagger: "\u2020",
    Dagger: "\u2021",
    permil: "\u2030",
    lsaquo: "\u2039",
    rsaquo: "\u203A",
    euro: "\u20AC",

    // non-standard entities
    apos: "'"
};


}(/*Envjs.DOM.Entity*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.EntityReference').debug('available'); 
});
/**
 * @author envjs team
 */

exports.EntityReference = EntityReference = function() {
    throw new Error("EntityReference Not Implemented" );
};

}(/*Envjs.DOM.EntityReference*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.NodeList').debug('available'); 
});
/**
 * @author envjs team
 */
exports.Notation = Notation = function() {
    throw new Error("Notation Not Implemented" );
};

}(/*Envjs.DOM.Notation*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Range').debug('available'); 
});

/**
 * @author thatcher
 */
exports.Range = Range = function(){};

__extend__(Range.prototype, {
    get startContainer(){

    },
    get endContainer(){

    },
    get startOffset(){

    },
    get endOffset(){

    },
    get collapsed(){

    },
    get commonAncestorContainer(){

    },
    setStart: function(refNode, offset){//throws RangeException

    },
    setEnd: function(refNode, offset){//throws RangeException
    
    },
    setStartBefore: function(refNode){//throws RangeException
    
    },
    setStartAfter: function(refNode){//throws RangeException
    
    },
    setEndBefore: function(refNode){//throws RangeException
    
    },
    setEndAfter: function(refNode){//throws RangeException
    
    },
    collapse: function(toStart){//throws RangeException
    
    },
    selectNode: function(refNode){//throws RangeException
    
    },
    selectNodeContents: function(refNode){//throws RangeException
    
    },
    compareBoundaryPoints: function(how, sourceRange){

    },
    deleteContents: function(){

    },
    extractContents: function(){

    },
    cloneContents: function(){

    },
    insertNode: function(newNode){

    },
    surroundContents: function(newParent){

    },
    cloneRange: function(){

    },
    toString: function(){
        return '[object Range]';
    },
    detach: function(){

    }
});


// CompareHow
Range.START_TO_START                 = 0;
Range.START_TO_END                   = 1;
Range.END_TO_END                     = 2;
Range.END_TO_START                   = 3;
  


}(/*Envjs.DOM.Range*/));

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.XMLSerializer').debug('available'); 
});

/**
 * @author envjs team
 * @class XMLSerializer
 */

exports.XMLSerializer = XMLSerializer = function() {};

__extend__(XMLSerializer.prototype, {
    serializeToString: function(node){
        return node.xml;
    },
    toString : function(){
        return "[object XMLSerializer]";
    }
});

}(/*Envjs.DOM.XMLSerilaizer*/));


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.XPathResult').debug('available'); 
});

/**
 * @author envjs team
 * @class XPathResult
 */

exports.XPathResult = XPathResult = function(resultType, results){
    if( undefined === resultType){
        resultType = XPathResult.ANY_TYPE;
    }
    this.type = resultType;
    this.results = results;
    this.currentIndex = -1;
};

XPathResult.ANY_TYPE = 0;
XPathResult.NUMBER_TYPE  = 1;
XPathResult.STRING_TYPE  = 2;
XPathResult.BOOLEAN_TYPE  = 3;
XPathResult.UNORDERED_NODE_ITERATOR_TYPE  = 4;
XPathResult.ORDERED_NODE_ITERATOR_TYPE  = 5;
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE  = 7;
XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

__extend__(XPathResult.prototype, {
    get numberValue(){
        return this.results.numberValue();
    },
    get stringValue(){
        return this.results.stringValue();
    },
    get booleanValue(){
        return this.results.booleanValue();
    },
    get singleNodeValue(){
        var nodelist = this.results.nodeSetValue();
        return nodelist.length?nodelist[0]:null;
    },
    get invalidIteratorState(){
        return (this.currentIndex < this.results.length)?false:true;
    },
    get snapshotLength(){
        return 'value' in this.results?this.results.value.length:0;
    },
    iterateNext: function(){
        return (++this.currentIndex < this.results.value.length) ? 
            this.results.value[this.currentIndex] : 
            null;
    },
    snapshotItem: function(index){
        return index < this.results.value.length ? 
            this.results.value[index] : 
            null;
    }
});

var __compileXPath__;
    
exports.XPathResult = XPathExpression = function(xpathText, nsuriMap){
    this.raw = xpathText;
    this.compiled = __compileXPath__(xpathText, nsuriMap);
};
//redefined in closure below
XPathExpression.prototype.evaluate = function(contextNode, resultType, result){
    throw 'Not Implemented';
};

// Copyright 2005 Google
//
// Author: Steffen Meschkat <mesch@google.com>
//
// Miscellaneous utility and placeholder functions.

// Dummy implmentation for the logging functions. Replace by something
// useful when you want to debug.
function xpathLog(msg) {}
function xsltLog(msg) {}
function xsltLogXml(msg) {}

var ajaxsltIsIE6 = false;//navigator.appVersion.match(/MSIE 6.0/);

// Based on <http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/
// core.html#ID-1950641247>
var DOM_ELEMENT_NODE = 1;
var DOM_ATTRIBUTE_NODE = 2;
var DOM_TEXT_NODE = 3;
var DOM_CDATA_SECTION_NODE = 4;
var DOM_ENTITY_REFERENCE_NODE = 5;
var DOM_ENTITY_NODE = 6;
var DOM_PROCESSING_INSTRUCTION_NODE = 7;
var DOM_COMMENT_NODE = 8;
var DOM_DOCUMENT_NODE = 9;
var DOM_DOCUMENT_TYPE_NODE = 10;
var DOM_DOCUMENT_FRAGMENT_NODE = 11;
var DOM_NOTATION_NODE = 12;

// Throws an exception if false.
function assert(b) {
  if (!b) {
    throw "Assertion failed";
  }
}

// Splits a string s at all occurrences of character c. This is like
// the split() method of the string object, but IE omits empty
// strings, which violates the invariant (s.split(x).join(x) == s).
function stringSplit(s, c) {
  var a = s.indexOf(c);
  if (a == -1) {
    return [ s ];
  }
  var parts = [];
  parts.push(s.substr(0,a));
  while (a != -1) {
    var a1 = s.indexOf(c, a + 1);
    if (a1 != -1) {
      parts.push(s.substr(a + 1, a1 - a - 1));
    } else {
      parts.push(s.substr(a + 1));
    }
    a = a1;
  }
  return parts;
}



// Applies the given function to each element of the array, preserving
// this, and passing the index.
function mapExec(array, func) {
  for (var i = 0; i < array.length; ++i) {
    func.call(this, array[i], i);
  }
}

// Returns an array that contains the return value of the given
// function applied to every element of the input array.
function mapExpr(array, func) {
  var ret = [];
  for (var i = 0; i < array.length; ++i) {
    ret.push(func(array[i]));
  }
  return ret;
}

// Reverses the given array in place.
function reverseInplace(array) {
  for (var i = 0; i < array.length / 2; ++i) {
    var h = array[i];
    var ii = array.length - i - 1;
    array[i] = array[ii];
    array[ii] = h;
  }
}

// Removes value from array. Returns the number of instances of value
// that were removed from array.
function removeFromArray(array, value, opt_notype) {
  var shift = 0;
  for (var i = 0; i < array.length; ++i) {
    if (array[i] === value || (opt_notype && array[i] == value)) {
      array.splice(i--, 1);
      shift++;
    }
  }
  return shift;
}

// Shallow-copies an array to the end of another array
// Basically Array.concat, but works with other non-array collections
function copyArray(dst, src) {
  if (!src){ 
      return; 
  }
  var dstLength = dst.length;
  for (var i = src.length - 1; i >= 0; --i) {
    dst[i+dstLength] = src[i];
  }
}

/**
 * This is an optimization for copying attribute lists in IE. IE includes many
 * extraneous properties in its DOM attribute lists, which take require
 * significant extra processing when evaluating attribute steps. With this
 * function, we ignore any such attributes that has an empty string value.
 */
function copyArrayIgnoringAttributesWithoutValue(dst, src)
{
  if (!src){
       return;
   }
  for (var i = src.length - 1; i >= 0; --i) {
    // this test will pass so long as the attribute has a non-empty string
    // value, even if that value is "false", "0", "undefined", etc.
    if (src[i].nodeValue) {
      dst.push(src[i]);
    }
  }
}

var JSURL_REGEX = /^javascript:/;
function xmlValueIE6Hack(node) {
    // Issue 19, IE6 mangles href attribute when it's a javascript: url
    var nodeName = node.nodeName;
    var nodeValue = node.nodeValue;
    if (nodeName.length != 4){ 
        return nodeValue; 
    }
    if (!/^href$/i.test(nodeName)){
         return nodeValue;
    }
    if (!JSURL_REGEX.test(nodeValue)){
         return nodeValue;
    }
    return unescape(nodeValue);
}

// Returns the text value of a node; for nodes without children this
// is the nodeValue, for nodes with children this is the concatenation
// of the value of all children.
function xmlValue(node) {
  if (!node) {
    return '';
  }

  var ret = '';
  if (node.nodeType == DOM_TEXT_NODE ||
      node.nodeType == DOM_CDATA_SECTION_NODE) {
    ret += node.nodeValue;

  } else if (node.nodeType == DOM_ATTRIBUTE_NODE) {
    if (ajaxsltIsIE6) {
      ret += xmlValueIE6Hack(node);
    } else {
      ret += node.nodeValue;
    }
  } else if (node.nodeType == DOM_ELEMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      ret += arguments.callee(node.childNodes[i]);
    }
  }
  return ret;
}


function xmlFullNodeName(n) {
  if (n.prefix && n.nodeName.indexOf(n.prefix + ':') !== 0) {
    return n.prefix + ':' + n.nodeName;
  } else {
    return n.nodeName;
  }
}

// Escape XML special markup chracters: tag delimiter < > and entity
// reference start delimiter &. The escaped string can be used in XML
// text portions (i.e. between tags).
function xmlEscapeText(s) {
  return ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').
    replace(/>/g, '&gt;');
}

// Escape XML special markup characters: tag delimiter < > entity
// reference start delimiter & and quotes ". The escaped string can be
// used in double quoted XML attribute value portions (i.e. in
// attributes within start tags).
function xmlEscapeAttr(s) {
  return xmlEscapeText(s).replace(/\"/g, '&quot;');
}

// Escape markup in XML text, but don't touch entity references. The
// escaped string can be used as XML text (i.e. between tags).
function xmlEscapeTags(s) {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Wrapper function to access the owner document uniformly for document
 * and other nodes: for the document node, the owner document is the
 * node itself, for all others it's the ownerDocument property.
 *
 * @param {Node} node
 * @return {Document}
 */
function xmlOwnerDocument(node) {
  if (node.nodeType == DOM_DOCUMENT_NODE) {
    return node;
  } else {
    return node.ownerDocument;
  }
}


function xmlTextR(node, buf, cdata) {
    var i;
  if (node.nodeType == DOM_TEXT_NODE) {
    buf.push(xmlEscapeText(node.nodeValue));

  } else if (node.nodeType == DOM_CDATA_SECTION_NODE) {
    if (cdata) {
      buf.push(node.nodeValue);
    } else {
      buf.push('<![CDATA[' + node.nodeValue + ']]>');
    }

  } else if (node.nodeType == DOM_COMMENT_NODE) {
    buf.push('<!--' + node.nodeValue + '-->');

  } else if (node.nodeType == DOM_ELEMENT_NODE) {
    buf.push('<' + xmlFullNodeName(node));
    for (i = 0; i < node.attributes.length; ++i) {
      var a = node.attributes[i];
      if (a && a.nodeName && a.nodeValue) {
        buf.push(' ' + xmlFullNodeName(a) + '="' +
                 xmlEscapeAttr(a.nodeValue) + '"');
      }
    }

    if (node.childNodes.length === 0) {
      buf.push('/>');
    } else {
      buf.push('>');
      for (i = 0; i < node.childNodes.length; ++i) {
        arguments.callee(node.childNodes[i], buf, cdata);
      }
      buf.push('</' + xmlFullNodeName(node) + '>');
    }

  } else if (node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    for (i = 0; i < node.childNodes.length; ++i) {
      arguments.callee(node.childNodes[i], buf, cdata);
    }
  }
}

// Returns the representation of a node as XML text.
function xmlText(node, opt_cdata) {
  var buf = [];
  xmlTextR(node, buf, opt_cdata);
  return buf.join('');
}

// Wrapper around DOM methods so we can condense their invocations.
function domGetAttribute(node, name) {
  return node.getAttribute(name);
}

function domSetAttribute(node, name, value) {
  return node.setAttribute(name, value);
}

function domRemoveAttribute(node, name) {
  return node.removeAttribute(name);
}

function domAppendChild(node, child) {
  return node.appendChild(child);
}

function domRemoveChild(node, child) {
  return node.removeChild(child);
}

function domReplaceChild(node, newChild, oldChild) {
  return node.replaceChild(newChild, oldChild);
}

function domInsertBefore(node, newChild, oldChild) {
  return node.insertBefore(newChild, oldChild);
}

function domRemoveNode(node) {
  return domRemoveChild(node.parentNode, node);
}

function domCreateTextNode(doc, text) {
  return doc.createTextNode(text);
}

function domCreateElement(doc, name) {
  return doc.createElement(name);
}

function domCreateAttribute(doc, name) {
  return doc.createAttribute(name);
}

function domCreateCDATASection(doc, data) {
  return doc.createCDATASection(data);
}

function domCreateComment(doc, text) {
  return doc.createComment(text);
}

function domCreateDocumentFragment(doc) {
  return doc.createDocumentFragment();
}

function domGetElementById(doc, id) {
  return doc.getElementById(id);
}

// Same for window methods.
function windowSetInterval(win, fun, time) {
  return win.setInterval(fun, time);
}

function windowClearInterval(win, id) {
  return win.clearInterval(id);
}

// The following function does what document.importNode(node, true)
// would do for us here; however that method is broken in Safari/1.3,
// so we have to emulate it.
function xmlImportNode(doc, node) {
  if (node.nodeType == DOM_TEXT_NODE) {
    return domCreateTextNode(doc, node.nodeValue);

  } else if (node.nodeType == DOM_CDATA_SECTION_NODE) {
    return domCreateCDATASection(doc, node.nodeValue);

  } else if (node.nodeType == DOM_ELEMENT_NODE) {
    var newNode = domCreateElement(doc, node.nodeName);
    for (var i = 0; i < node.attributes.length; ++i) {
      var an = node.attributes[i];
      var name = an.nodeName;
      var value = an.nodeValue;
      domSetAttribute(newNode, name, value);
    }

    for (var c = node.firstChild; c; c = c.nextSibling) {
      var cn = arguments.callee(doc, c);
      domAppendChild(newNode, cn);
    }

    return newNode;

  } else {
    return domCreateComment(doc, node.nodeName);
  }
}





// A set data structure. It can also be used as a map (i.e. the keys
// can have values other than 1), but we don't call it map because it
// would be ambiguous in this context. Also, the map is iterable, so
// we can use it to replace for-in loops over core javascript Objects.
// For-in iteration breaks when Object.prototype is modified, which
// some clients of the maps API do.
//
// NOTE(mesch): The set keys by the string value of its element, NOT
// by the typed value. In particular, objects can't be used as keys.
//
// @constructor
function Set() {
  this.keys = [];
}

Set.prototype.size = function() {
  return this.keys.length;
};

// Adds the entry to the set, ignoring if it is present.
Set.prototype.add = function(key, opt_value) {
  var value = opt_value || 1;
  if (!this.contains(key)) {
    this[':' + key] = value;
    this.keys.push(key);
  }
};

// Sets the entry in the set, adding if it is not yet present.
Set.prototype.set = function(key, opt_value) {
  var value = opt_value || 1;
  if (!this.contains(key)) {
    this[':' + key] = value;
    this.keys.push(key);
  } else {
    this[':' + key] = value;
  }
};

// Increments the key's value by 1. This works around the fact that
// numbers are always passed by value, never by reference, so that we
// can't increment the value returned by get(), or the iterator
// argument. Sets the key's value to 1 if it doesn't exist yet.
Set.prototype.inc = function(key) {
  if (!this.contains(key)) {
    this[':' + key] = 1;
    this.keys.push(key);
  } else {
    this[':' + key]++;
  }
};

Set.prototype.get = function(key) {
  if (this.contains(key)) {
    return this[':' + key];
  }
};

// Removes the entry from the set.
Set.prototype.remove = function(key) {
  if (this.contains(key)) {
    delete this[':' + key];
    removeFromArray(this.keys, key, true);
  }
};

// Tests if an entry is in the set.
Set.prototype.contains = function(entry) {
  return typeof this[':' + entry] != 'undefined';
};

// Gets a list of values in the set.
Set.prototype.items = function() {
  var list = [];
  for (var i = 0; i < this.keys.length; ++i) {
    var k = this.keys[i];
    var v = this[':' + k];
    list.push(v);
  }
  return list;
};


// Invokes function f for every key value pair in the set as a method
// of the set.
Set.prototype.map = function(f) {
  for (var i = 0; i < this.keys.length; ++i) {
    var k = this.keys[i];
    f.call(this, k, this[':' + k]);
  }
};

Set.prototype.clear = function() {
  for (var i = 0; i < this.keys.length; ++i) {
    delete this[':' + this.keys[i]];
  }
  this.keys.length = 0;
};


// Copyright 2006 Google Inc.
// All Rights Reserved
//
// Defines regular expression patterns to extract XML tokens from string.
// See <http://www.w3.org/TR/REC-xml/#sec-common-syn>,
// <http://www.w3.org/TR/xml11/#sec-common-syn> and
// <http://www.w3.org/TR/REC-xml-names/#NT-NCName> for the specifications.
//
// Author: Junji Takagi <jtakagi@google.com>

// Detect whether RegExp supports Unicode characters or not.

var REGEXP_UNICODE = (function() {
  var tests = [' ', '\u0120', -1,  // Konquerer 3.4.0 fails here.
               '!', '\u0120', -1,
               '\u0120', '\u0120', 0,
               '\u0121', '\u0120', -1,
               '\u0121', '\u0120|\u0121', 0,
               '\u0122', '\u0120|\u0121', -1,
               '\u0120', '[\u0120]', 0,  // Safari 2.0.3 fails here.
               '\u0121', '[\u0120]', -1,
               '\u0121', '[\u0120\u0121]', 0,  // Safari 2.0.3 fails here.
               '\u0122', '[\u0120\u0121]', -1,
               '\u0121', '[\u0120-\u0121]', 0,  // Safari 2.0.3 fails here.
               '\u0122', '[\u0120-\u0121]', -1];
  for (var i = 0; i < tests.length; i += 3) {
    if (tests[i].search(new RegExp(tests[i + 1])) != tests[i + 2]) {
      return false;
    }
  }
  return true;
}());

// Common tokens in XML 1.0 and XML 1.1.

var XML_S = '[ \t\r\n]+';
var XML_EQ = '(' + XML_S + ')?=(' + XML_S + ')?';
var XML_CHAR_REF = '&#[0-9]+;|&#x[0-9a-fA-F]+;';

// XML 1.0 tokens.

var XML10_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.0"|' + "'1\\.0')";
var XML10_BASE_CHAR = (REGEXP_UNICODE) ?
  '\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff' +
  '\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3' +
  '\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386' +
  '\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc' +
  '\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c' +
  '\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb' +
  '\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea' +
  '\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be' +
  '\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d' +
  '\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2' +
  '\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a' +
  '\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36' +
  '\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d' +
  '\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9' +
  '\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30' +
  '\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a' +
  '\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4' +
  '\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10' +
  '\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c' +
  '\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1' +
  '\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61' +
  '\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84' +
  '\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5' +
  '\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4' +
  '\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103' +
  '\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c' +
  '\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169' +
  '\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af' +
  '\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b' +
  '\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d' +
  '\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc' +
  '\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec' +
  '\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182' +
  '\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3' :
  'A-Za-z';
var XML10_IDEOGRAPHIC = (REGEXP_UNICODE) ?
  '\u4e00-\u9fa5\u3007\u3021-\u3029' :
  '';
var XML10_COMBINING_CHAR = (REGEXP_UNICODE) ?
  '\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9' +
  '\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc' +
  '\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c' +
  '\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be' +
  '\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02' +
  '\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71' +
  '\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03' +
  '\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83' +
  '\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44' +
  '\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4' +
  '\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43' +
  '\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1' +
  '\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39' +
  '\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad' +
  '\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a' :
  '';
var XML10_DIGIT = (REGEXP_UNICODE) ?
  '\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef' +
  '\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f' +
  '\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29' :
  '0-9';
var XML10_EXTENDER = (REGEXP_UNICODE) ?
  '\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035' +
  '\u309d-\u309e\u30fc-\u30fe' :
  '';
var XML10_LETTER = XML10_BASE_CHAR + XML10_IDEOGRAPHIC;
var XML10_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._:' +
                      XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML10_NAME = '[' + XML10_LETTER + '_:][' + XML10_NAME_CHAR + ']*';

var XML10_ENTITY_REF = '&' + XML10_NAME + ';';
var XML10_REFERENCE = XML10_ENTITY_REF + '|' + XML_CHAR_REF;
var XML10_ATT_VALUE = '"(([^<&"]|' + XML10_REFERENCE + ')*)"|' +
                      "'(([^<&']|" + XML10_REFERENCE + ")*)'";
var XML10_ATTRIBUTE =
  '(' + XML10_NAME + ')' + XML_EQ + '(' + XML10_ATT_VALUE + ')';

// XML 1.1 tokens.
// TODO(jtakagi): NameStartChar also includes \u10000-\ueffff.
// ECMAScript Language Specifiction defines UnicodeEscapeSequence as
// "\u HexDigit HexDigit HexDigit HexDigit" and we may need to use
// surrogate pairs, but any browser doesn't support surrogate paris in
// character classes of regular expression, so avoid including them for now.

var XML11_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.1"|' + "'1\\.1')";
var XML11_NAME_START_CHAR = (REGEXP_UNICODE) ?
  ':A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d' +
  '\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff' +
  '\uf900-\ufdcf\ufdf0-\ufffd' :
  ':A-Z_a-z';
var XML11_NAME_CHAR = XML11_NAME_START_CHAR +
  ((REGEXP_UNICODE) ? '\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-' : '\\.0-9-');
var XML11_NAME = '[' + XML11_NAME_START_CHAR + '][' + XML11_NAME_CHAR + ']*';

var XML11_ENTITY_REF = '&' + XML11_NAME + ';';
var XML11_REFERENCE = XML11_ENTITY_REF + '|' + XML_CHAR_REF;
var XML11_ATT_VALUE = '"(([^<&"]|' + XML11_REFERENCE + ')*)"|' +
                      "'(([^<&']|" + XML11_REFERENCE + ")*)'";
var XML11_ATTRIBUTE =
  '(' + XML11_NAME + ')' + XML_EQ + '(' + XML11_ATT_VALUE + ')';

// XML Namespace tokens.
// Used in XML parser and XPath parser.

var XML_NC_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._' +
                       XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML_NC_NAME = '[' + XML10_LETTER + '_][' + XML_NC_NAME_CHAR + ']*';
// Copyright 2005 Google Inc.
// All Rights Reserved
//
// Author: Steffen Meschkat <mesch@google.com>
//
// An XML parse and a minimal DOM implementation that just supportes
// the subset of the W3C DOM that is used in the XSLT implementation.

// NOTE: The split() method in IE omits empty result strings. This is
// utterly annoying. So we don't use it here.

// Resolve entities in XML text fragments. According to the DOM
// specification, the DOM is supposed to resolve entity references at
// the API level. I.e. no entity references are passed through the
// API. See "Entities and the DOM core", p.12, DOM 2 Core
// Spec. However, different browsers actually pass very different
// values at the API. See <http://mesch.nyc/test-xml-quote>.
function xmlResolveEntities(s) {

  var parts = stringSplit(s, '&');

  var ret = parts[0];
  for (var i = 1; i < parts.length; ++i) {
    var rp = parts[i].indexOf(';');
    if (rp == -1) {
      // no entity reference: just a & but no ;
      ret += parts[i];
      continue;
    }

    var entityName = parts[i].substring(0, rp);
    var remainderText = parts[i].substring(rp + 1);

    var ch;
    switch (entityName) {
      case 'lt':
        ch = '<';
        break;
      case 'gt':
        ch = '>';
        break;
      case 'amp':
        ch = '&';
        break;
      case 'quot':
        ch = '"';
        break;
      case 'apos':
        ch = '\'';
        break;
      case 'nbsp':
        ch = String.fromCharCode(160);
        break;
      default:
        // Cool trick: let the DOM do the entity decoding. We assign
        // the entity text through non-W3C DOM properties and read it
        // through the W3C DOM. W3C DOM access is specified to resolve
        // entities.
        var span = domCreateElement(window.document, 'span');
        span.innerHTML = '&' + entityName + '; ';
        ch = span.childNodes[0].nodeValue.charAt(0);
    }
    ret += ch + remainderText;
  }

  return ret;
}

var XML10_TAGNAME_REGEXP = new RegExp('^(' + XML10_NAME + ')');
var XML10_ATTRIBUTE_REGEXP = new RegExp(XML10_ATTRIBUTE, 'g');

var XML11_TAGNAME_REGEXP = new RegExp('^(' + XML11_NAME + ')');
var XML11_ATTRIBUTE_REGEXP = new RegExp(XML11_ATTRIBUTE, 'g');




// Traverses the element nodes in the DOM section underneath the given
// node and invokes the given callbacks as methods on every element
// node encountered. Function opt_pre is invoked before a node's
// children are traversed; opt_post is invoked after they are
// traversed. Traversal will not be continued if a callback function
// returns boolean false. NOTE(mesch): copied from
// <//google3/maps/webmaps/javascript/dom.js>.
function domTraverseElements(node, opt_pre, opt_post) {
  var ret;
  if (opt_pre) {
    ret = opt_pre.call(null, node);
    if (typeof ret == 'boolean' && !ret) {
      return false;
    }
  }

  for (var c = node.firstChild; c; c = c.nextSibling) {
    if (c.nodeType == DOM_ELEMENT_NODE) {
      ret = arguments.callee.call(this, c, opt_pre, opt_post);
      if (typeof ret == 'boolean' && !ret) {
        return false;
      }
    }
  }

  if (opt_post) {
    ret = opt_post.call(null, node);
    if (typeof ret == 'boolean' && !ret) {
      return false;
    }
  }
}

// Our W3C DOM Node implementation. Note we call it XNode because we
// can't define the identifier Node. We do this mostly for Opera,
// where we can't reuse the HTML DOM for parsing our own XML, and for
// Safari, where it is too expensive to have the template processor
// operate on native DOM nodes.
function XNode(type, name, opt_value, opt_owner) {
  this.attributes = [];
  this.childNodes = [];

  XNode.init.call(this, type, name, opt_value, opt_owner);
}

function XDocument() {
  // NOTE(mesch): Acocording to the DOM Spec, ownerDocument of a
  // document node is null.
  XNode.call(this, DOM_DOCUMENT_NODE, '#document', null, null);
  this.documentElement = null;
}

// Don't call as method, use apply() or call().
XNode.init = function(type, name, value, owner) {
  this.nodeType = type - 0;
  this.nodeName = '' + name;
  this.nodeValue = '' + value;
  this.ownerDocument = owner;

  this.firstChild = null;
  this.lastChild = null;
  this.nextSibling = null;
  this.previousSibling = null;
  this.parentNode = null;
};

XNode.unused_ = [];

XNode.recycle = function(node) {
  if (!node) {
    return;
  }

  if (node.constructor == XDocument) {
    XNode.recycle(node.documentElement);
    return;
  }

  if (node.constructor != this) {
    return;
  }

  XNode.unused_.push(node);
  for (var a = 0; a < node.attributes.length; ++a) {
    XNode.recycle(node.attributes[a]);
  }
  for (var c = 0; c < node.childNodes.length; ++c) {
    XNode.recycle(node.childNodes[c]);
  }
  node.attributes.length = 0;
  node.childNodes.length = 0;
  XNode.init.call(node, 0, '', '', null);
};

XNode.create = function(type, name, value, owner) {
  if (XNode.unused_.length > 0) {
    var node = XNode.unused_.pop();
    XNode.init.call(node, type, name, value, owner);
    return node;
  } else {
    return new XNode(type, name, value, owner);
  }
};

XNode.prototype.appendChild = function(node) {
  // firstChild
  if (this.childNodes.length === 0) {
    this.firstChild = node;
  }

  // previousSibling
  node.previousSibling = this.lastChild;

  // nextSibling
  node.nextSibling = null;
  if (this.lastChild) {
    this.lastChild.nextSibling = node;
  }

  // parentNode
  node.parentNode = this;

  // lastChild
  this.lastChild = node;

  // childNodes
  this.childNodes.push(node);
};


XNode.prototype.replaceChild = function(newNode, oldNode) {
  if (oldNode == newNode) {
    return;
  }

  for (var i = 0; i < this.childNodes.length; ++i) {
    if (this.childNodes[i] == oldNode) {
      this.childNodes[i] = newNode;

      var p = oldNode.parentNode;
      oldNode.parentNode = null;
      newNode.parentNode = p;

      p = oldNode.previousSibling;
      oldNode.previousSibling = null;
      newNode.previousSibling = p;
      if (newNode.previousSibling) {
        newNode.previousSibling.nextSibling = newNode;
      }

      p = oldNode.nextSibling;
      oldNode.nextSibling = null;
      newNode.nextSibling = p;
      if (newNode.nextSibling) {
        newNode.nextSibling.previousSibling = newNode;
      }

      if (this.firstChild == oldNode) {
        this.firstChild = newNode;
      }

      if (this.lastChild == oldNode) {
        this.lastChild = newNode;
      }

      break;
    }
  }
};


XNode.prototype.insertBefore = function(newNode, oldNode) {
  if (oldNode == newNode) {
    return;
  }

  if (oldNode.parentNode != this) {
    return;
  }

  if (newNode.parentNode) {
    newNode.parentNode.removeChild(newNode);
  }

  var newChildren = [];
  for (var i = 0; i < this.childNodes.length; ++i) {
    var c = this.childNodes[i];
    if (c == oldNode) {
      newChildren.push(newNode);

      newNode.parentNode = this;

      newNode.previousSibling = oldNode.previousSibling;
      oldNode.previousSibling = newNode;
      if (newNode.previousSibling) {
        newNode.previousSibling.nextSibling = newNode;
      }

      newNode.nextSibling = oldNode;

      if (this.firstChild == oldNode) {
        this.firstChild = newNode;
      }
    }
    newChildren.push(c);
  }
  this.childNodes = newChildren;
};


XNode.prototype.removeChild = function(node) {
  var newChildren = [];
  for (var i = 0; i < this.childNodes.length; ++i) {
    var c = this.childNodes[i];
    if (c != node) {
      newChildren.push(c);
    } else {
      if (c.previousSibling) {
        c.previousSibling.nextSibling = c.nextSibling;
      }
      if (c.nextSibling) {
        c.nextSibling.previousSibling = c.previousSibling;
      }
      if (this.firstChild == c) {
        this.firstChild = c.nextSibling;
      }
      if (this.lastChild == c) {
        this.lastChild = c.previousSibling;
      }
    }
  }
  this.childNodes = newChildren;
};


XNode.prototype.hasAttributes = function() {
  return this.attributes.length > 0;
};


XNode.prototype.setAttribute = function(name, value) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      this.attributes[i].nodeValue = '' + value;
      return;
    }
  }
  this.attributes.push(XNode.create(DOM_ATTRIBUTE_NODE, name, value, this));
};


XNode.prototype.getAttribute = function(name) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      return this.attributes[i].nodeValue;
    }
  }
  return null;
};


XNode.prototype.removeAttribute = function(name) {
  var a = [];
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName != name) {
      a.push(this.attributes[i]);
    }
  }
  this.attributes = a;
};


XNode.prototype.getElementsByTagName = function(name) {
  var ret = [];
  var self = this;
  if ("*" == name) {
    domTraverseElements(this, function(node) {
       if (self == node){
           return;
       }
      ret.push(node);
    }, null);
  } else {
    domTraverseElements(this, function(node) {
      if (self == node){ 
          return;
      }
      if (node.nodeName == name) {
        ret.push(node);
      }
    }, null);
  }
  return ret;
};


XNode.prototype.getElementById = function(id) {
  var ret = null;
  domTraverseElements(this, function(node) {
    if (node.getAttribute('id') == id) {
      ret = node;
      return false;
    }
  }, null);
  return ret;
};



XDocument.prototype = new XNode(DOM_DOCUMENT_NODE, '#document');

XDocument.prototype.clear = function() {
  XNode.recycle(this.documentElement);
  this.documentElement = null;
};

XDocument.prototype.appendChild = function(node) {
  XNode.prototype.appendChild.call(this, node);
  this.documentElement = this.childNodes[0];
};

XDocument.prototype.createElement = function(name) {
  return XNode.create(DOM_ELEMENT_NODE, name, null, this);
};

XDocument.prototype.createDocumentFragment = function() {
  return XNode.create(DOM_DOCUMENT_FRAGMENT_NODE, '#document-fragment',
                    null, this);
};

XDocument.prototype.createTextNode = function(value) {
  return XNode.create(DOM_TEXT_NODE, '#text', value, this);
};

XDocument.prototype.createAttribute = function(name) {
  return XNode.create(DOM_ATTRIBUTE_NODE, name, null, this);
};

XDocument.prototype.createComment = function(data) {
  return XNode.create(DOM_COMMENT_NODE, '#comment', data, this);
};

XDocument.prototype.createCDATASection = function(data) {
  return XNode.create(DOM_CDATA_SECTION_NODE, '#cdata-section', data, this);
};

// Parses the given XML string with our custom, JavaScript XML parser. Written
// by Steffen Meschkat (mesch@google.com).
function xmlParse(xml) {
  var regex_empty = /\/$/;

  var regex_tagname;
  var regex_attribute;
  if (xml.match(/^<\?xml/)) {
    // When an XML document begins with an XML declaration
    // VersionInfo must appear.
    if (xml.search(new RegExp(XML10_VERSION_INFO)) == 5) {
      regex_tagname = XML10_TAGNAME_REGEXP;
      regex_attribute = XML10_ATTRIBUTE_REGEXP;
    } else if (xml.search(new RegExp(XML11_VERSION_INFO)) == 5) {
      regex_tagname = XML11_TAGNAME_REGEXP;
      regex_attribute = XML11_ATTRIBUTE_REGEXP;
    } else {
      // VersionInfo is missing, or unknown version number.
      // TODO : Fallback to XML 1.0 or XML 1.1, or just return null?
      // alert('VersionInfo is missing, or unknown version number.');
    }
  } else {
    // When an XML declaration is missing it's an XML 1.0 document.
    regex_tagname = XML10_TAGNAME_REGEXP;
    regex_attribute = XML10_ATTRIBUTE_REGEXP;
  }

  var xmldoc = new XDocument();
  var root = xmldoc;

  // For the record: in Safari, we would create native DOM nodes, but
  // in Opera that is not possible, because the DOM only allows HTML
  // element nodes to be created, so we have to do our own DOM nodes.

  // xmldoc = document.implementation.createDocument('','',null);
  // root = xmldoc; // .createDocumentFragment();
  // NOTE(mesch): using the DocumentFragment instead of the Document
  // crashes my Safari 1.2.4 (v125.12).
  var stack = [];

  var parent = root;
  stack.push(parent);

  // The token that delimits a section that contains markup as
  // content: CDATA or comments.
  var slurp = '';

  var x = stringSplit(xml, '<');
  for (var i = 1; i < x.length; ++i) {
    var xx = stringSplit(x[i], '>');
    var tag = xx[0];
    var text = xmlResolveEntities(xx[1] || '');
    var end,
        start,
        data,
        node;
    
    if (slurp) {
      // In a "slurp" section (CDATA or comment): only check for the
      // end of the section, otherwise append the whole text.
      end = x[i].indexOf(slurp);
      if (end != -1) {
        data = x[i].substring(0, end);
        parent.nodeValue += '<' + data;
        stack.pop();
        parent = stack[stack.length-1];
        text = x[i].substring(end + slurp.length);
        slurp = '';
      } else {
        parent.nodeValue += '<' + x[i];
        text = null;
      }

    } else if (tag.indexOf('![CDATA[') === 0) {
      start = '![CDATA['.length;
      end = x[i].indexOf(']]>');
      if (end != -1) {
        data = x[i].substring(start, end);
        node = domCreateCDATASection(xmldoc, data);
        domAppendChild(parent, node);
      } else {
        data = x[i].substring(start);
        text = null;
        node = domCreateCDATASection(xmldoc, data);
        domAppendChild(parent, node);
        parent = node;
        stack.push(node);
        slurp = ']]>';
      }

    } else if (tag.indexOf('!--') === 0) {
      start = '!--'.length;
      end = x[i].indexOf('-->');
      if (end != -1) {
        data = x[i].substring(start, end);
        node = domCreateComment(xmldoc, data);
        domAppendChild(parent, node);
      } else {
        data = x[i].substring(start);
        text = null;
        node = domCreateComment(xmldoc, data);
        domAppendChild(parent, node);
        parent = node;
        stack.push(node);
        slurp = '-->';
      }

    } else if (tag.charAt(0) == '/') {
      stack.pop();
      parent = stack[stack.length-1];

    } else if (tag.charAt(0) == '?') {
      // Ignore XML declaration and processing instructions
    } else if (tag.charAt(0) == '!') {
      // Ignore notation and comments
    } else {
      var empty = tag.match(regex_empty);
      var tagname = regex_tagname.exec(tag)[1];
      node = domCreateElement(xmldoc, tagname);

      var att = regex_attribute.exec(tag);
      while (att) {
        var val = xmlResolveEntities(att[5] || att[7] || '');
        domSetAttribute(node, att[1], val);
        att = regex_attribute.exec(tag);
      }

      domAppendChild(parent, node);
      if (!empty) {
        parent = node;
        stack.push(node);
      }
    }

    if (text && parent != root) {
      domAppendChild(parent, domCreateTextNode(xmldoc, text));
    }
  }

  return root;
}

// XPath expression values. They are what XPath expressions evaluate
// to. Strangely, the different value types are not specified in the
// XPath syntax, but only in the semantics, so they don't show up as
// nonterminals in the grammar. Yet, some expressions are required to
// evaluate to particular types, and not every type can be coerced
// into every other type. Although the types of XPath values are
// similar to the types present in JavaScript, the type coercion rules
// are a bit peculiar, so we explicitly model XPath types instead of
// mapping them onto JavaScript types. (See XPath spec.)
//
// The four types are:
//
//   StringValue
//
//   NumberValue
//
//   BooleanValue
//
//   NodeSetValue
//
// The common interface of the value classes consists of methods that
// implement the XPath type coercion rules:
//
//   stringValue() -- returns the value as a JavaScript String,
//
//   numberValue() -- returns the value as a JavaScript Number,
//
//   booleanValue() -- returns the value as a JavaScript Boolean,
//
//   nodeSetValue() -- returns the value as a JavaScript Array of DOM
//   Node objects.
//

function StringValue(value) {
  this.value = value;
  this.type = 'string';
}

StringValue.prototype.stringValue = function() {
  return this.value;
};

StringValue.prototype.booleanValue = function() {
  return this.value.length > 0;
};

StringValue.prototype.numberValue = function() {
  return this.value - 0;
};

StringValue.prototype.nodeSetValue = function() {
  throw this;
};

function BooleanValue(value) {
  this.value = value;
  this.type = 'boolean';
}

BooleanValue.prototype.stringValue = function() {
  return '' + this.value;
};

BooleanValue.prototype.booleanValue = function() {
  return this.value;
};

BooleanValue.prototype.numberValue = function() {
  return this.value ? 1 : 0;
};

BooleanValue.prototype.nodeSetValue = function() {
  throw this;
};

function NumberValue(value) {
  this.value = value;
  this.type = 'number';
}

NumberValue.prototype.stringValue = function() {
  return '' + this.value;
};

NumberValue.prototype.booleanValue = function() {
  return !!this.value;
};

NumberValue.prototype.numberValue = function() {
  return this.value - 0;
};

NumberValue.prototype.nodeSetValue = function() {
  throw this;
};

function NodeSetValue(value) {
  this.value = value;
  this.type = 'node-set';
}

NodeSetValue.prototype.stringValue = function() {
  if (this.value.length === 0) {
    return '';
  } else {
    return xmlValue(this.value[0]);
  }
};

NodeSetValue.prototype.booleanValue = function() {
  return this.value.length > 0;
};

NodeSetValue.prototype.numberValue = function() {
  return this.stringValue() - 0;
};

NodeSetValue.prototype.nodeSetValue = function() {
  return this.value;
};

// The axes of XPath expressions.

var xpathAxis = {
  ANCESTOR_OR_SELF: 'ancestor-or-self',
  ANCESTOR: 'ancestor',
  ATTRIBUTE: 'attribute',
  CHILD: 'child',
  DESCENDANT_OR_SELF: 'descendant-or-self',
  DESCENDANT: 'descendant',
  FOLLOWING_SIBLING: 'following-sibling',
  FOLLOWING: 'following',
  NAMESPACE: 'namespace',
  PARENT: 'parent',
  PRECEDING_SIBLING: 'preceding-sibling',
  PRECEDING: 'preceding',
  SELF: 'self'
};

var xpathAxesRe = [
    xpathAxis.ANCESTOR_OR_SELF,
    xpathAxis.ANCESTOR,
    xpathAxis.ATTRIBUTE,
    xpathAxis.CHILD,
    xpathAxis.DESCENDANT_OR_SELF,
    xpathAxis.DESCENDANT,
    xpathAxis.FOLLOWING_SIBLING,
    xpathAxis.FOLLOWING,
    xpathAxis.NAMESPACE,
    xpathAxis.PARENT,
    xpathAxis.PRECEDING_SIBLING,
    xpathAxis.PRECEDING,
    xpathAxis.SELF
].join('|');


// The tokens of the language. The label property is just used for
// generating debug output. The prec property is the precedence used
// for shift/reduce resolution. Default precedence is 0 as a lookahead
// token and 2 on the stack. TODO(mesch): this is certainly not
// necessary and too complicated. Simplify this!

// NOTE: tabular formatting is the big exception, but here it should
// be OK.

var TOK_PIPE =   { label: "|",   prec:   17, re: new RegExp("^\\|") };
var TOK_DSLASH = { label: "//",  prec:   19, re: new RegExp("^//")  };
var TOK_SLASH =  { label: "/",   prec:   30, re: new RegExp("^/")   };
var TOK_AXIS =   { label: "::",  prec:   20, re: new RegExp("^::")  };
var TOK_COLON =  { label: ":",   prec: 1000, re: new RegExp("^:")  };
var TOK_AXISNAME = { label: "[axis]", re: new RegExp('^(' + xpathAxesRe + ')') };
var TOK_PARENO = { label: "(",   prec:   34, re: new RegExp("^\\(") };
var TOK_PARENC = { label: ")",               re: new RegExp("^\\)") };
var TOK_DDOT =   { label: "..",  prec:   34, re: new RegExp("^\\.\\.") };
var TOK_DOT =    { label: ".",   prec:   34, re: new RegExp("^\\.") };
var TOK_AT =     { label: "@",   prec:   34, re: new RegExp("^@")   };

var TOK_COMMA =  { label: ",",               re: new RegExp("^,") };

var TOK_OR =     { label: "or",  prec:   10, re: new RegExp("^or\\b") };
var TOK_AND =    { label: "and", prec:   11, re: new RegExp("^and\\b") };
var TOK_EQ =     { label: "=",   prec:   12, re: new RegExp("^=")   };
var TOK_NEQ =    { label: "!=",  prec:   12, re: new RegExp("^!=")  };
var TOK_GE =     { label: ">=",  prec:   13, re: new RegExp("^>=")  };
var TOK_GT =     { label: ">",   prec:   13, re: new RegExp("^>")   };
var TOK_LE =     { label: "<=",  prec:   13, re: new RegExp("^<=")  };
var TOK_LT =     { label: "<",   prec:   13, re: new RegExp("^<")   };
var TOK_PLUS =   { label: "+",   prec:   14, re: new RegExp("^\\+"), left: true };
var TOK_MINUS =  { label: "-",   prec:   14, re: new RegExp("^\\-"), left: true };
var TOK_DIV =    { label: "div", prec:   15, re: new RegExp("^div\\b"), left: true };
var TOK_MOD =    { label: "mod", prec:   15, re: new RegExp("^mod\\b"), left: true };

var TOK_BRACKO = { label: "[",   prec:   32, re: new RegExp("^\\[") };
var TOK_BRACKC = { label: "]",               re: new RegExp("^\\]") };
var TOK_DOLLAR = { label: "$",               re: new RegExp("^\\$") };

var TOK_NCNAME = { label: "[ncname]", re: new RegExp('^' + XML_NC_NAME) };

var TOK_ASTERISK = { label: "*", prec: 15, re: new RegExp("^\\*"), left: true };
var TOK_LITERALQ = { label: "[litq]", prec: 20, re: new RegExp("^'[^\\']*'") };
var TOK_LITERALQQ = {
  label: "[litqq]",
  prec: 20,
  re: new RegExp('^"[^\\"]*"')
};

var TOK_NUMBER  = {
  label: "[number]",
  prec: 35,
  re: new RegExp('^\\d+(\\.\\d*)?') };

var TOK_QNAME = {
  label: "[qname]",
  re: new RegExp('^(' + XML_NC_NAME + ':)?' + XML_NC_NAME)
};

var TOK_NODEO = {
  label: "[nodetest-start]",
  re: new RegExp('^(processing-instruction|comment|text|node)\\(')
};

// The table of the tokens of our grammar, used by the lexer: first
// column the tag, second column a regexp to recognize it in the
// input, third column the precedence of the token, fourth column a
// factory function for the semantic value of the token.
//
// NOTE: order of this list is important, because the first match
// counts. Cf. DDOT and DOT, and AXIS and COLON.

var xpathTokenRules = [
    TOK_DSLASH,
    TOK_SLASH,
    TOK_DDOT,
    TOK_DOT,
    TOK_AXIS,
    TOK_COLON,
    TOK_AXISNAME,
    TOK_NODEO,
    TOK_PARENO,
    TOK_PARENC,
    TOK_BRACKO,
    TOK_BRACKC,
    TOK_AT,
    TOK_COMMA,
    TOK_OR,
    TOK_AND,
    TOK_NEQ,
    TOK_EQ,
    TOK_GE,
    TOK_GT,
    TOK_LE,
    TOK_LT,
    TOK_PLUS,
    TOK_MINUS,
    TOK_ASTERISK,
    TOK_PIPE,
    TOK_MOD,
    TOK_DIV,
    TOK_LITERALQ,
    TOK_LITERALQQ,
    TOK_NUMBER,
    TOK_QNAME,
    TOK_NCNAME,
    TOK_DOLLAR
];

// All the nonterminals of the grammar. The nonterminal objects are
// identified by object identity; the labels are used in the debug
// output only.
var XPathLocationPath = { label: "LocationPath" };
var XPathRelativeLocationPath = { label: "RelativeLocationPath" };
var XPathAbsoluteLocationPath = { label: "AbsoluteLocationPath" };
var XPathStep = { label: "Step" };
var XPathNodeTest = { label: "NodeTest" };
var XPathPredicate = { label: "Predicate" };
var XPathLiteral = { label: "Literal" };
var XPathExpr = { label: "Expr" };
var XPathPrimaryExpr = { label: "PrimaryExpr" };
var XPathVariableReference = { label: "Variablereference" };
var XPathNumber = { label: "Number" };
var XPathFunctionCall = { label: "FunctionCall" };
var XPathArgumentRemainder = { label: "ArgumentRemainder" };
var XPathPathExpr = { label: "PathExpr" };
var XPathUnionExpr = { label: "UnionExpr" };
var XPathFilterExpr = { label: "FilterExpr" };
var XPathDigits = { label: "Digits" };

var xpathNonTerminals = [
    XPathLocationPath,
    XPathRelativeLocationPath,
    XPathAbsoluteLocationPath,
    XPathStep,
    XPathNodeTest,
    XPathPredicate,
    XPathLiteral,
    XPathExpr,
    XPathPrimaryExpr,
    XPathVariableReference,
    XPathNumber,
    XPathFunctionCall,
    XPathArgumentRemainder,
    XPathPathExpr,
    XPathUnionExpr,
    XPathFilterExpr,
    XPathDigits
];

// Quantifiers that are used in the productions of the grammar.
var Q_01 = { label: "?" };
var Q_MM = { label: "*" };
var Q_1M = { label: "+" };

// Tag for left associativity (right assoc is implied by undefined).
var ASSOC_LEFT = true;


   
// XPath expressions. They are used as nodes in the parse tree and
// possess an evaluate() method to compute an XPath value given an XPath
// context. Expressions are returned from the parser. Teh set of
// expression classes closely mirrors the set of non terminal symbols
// in the grammar. Every non trivial nonterminal symbol has a
// corresponding expression class.
//
// The common expression interface consists of the following methods:
//
// evaluate(context) -- evaluates the expression, returns a value.
//
// toString() -- returns the XPath text representation of the
// expression (defined in xsltdebug.js).
//
// parseTree(indent) -- returns a parse tree representation of the
// expression (defined in xsltdebug.js).

function NodeTestAny() {
  this.value = new BooleanValue(true);
}

NodeTestAny.prototype.evaluate = function(ctx) {
  return this.value;
};

function NodeTestElementOrAttribute() {}

NodeTestElementOrAttribute.prototype.evaluate = function(ctx) {
  return new BooleanValue(
      ctx.node.nodeType == DOM_ELEMENT_NODE ||
      ctx.node.nodeType == DOM_ATTRIBUTE_NODE);
};

function NodeTestText() {}

NodeTestText.prototype.evaluate = function(ctx) {
  return new BooleanValue(ctx.node.nodeType == DOM_TEXT_NODE);
};

function NodeTestComment() {}

NodeTestComment.prototype.evaluate = function(ctx) {
  return new BooleanValue(ctx.node.nodeType == DOM_COMMENT_NODE);
};

function NodeTestPI(target) {
  this.target = target;
}

NodeTestPI.prototype.evaluate = function(ctx) {
  return new
  BooleanValue(ctx.node.nodeType == DOM_PROCESSING_INSTRUCTION_NODE &&
               (!this.target || ctx.node.nodeName == this.target));
};

function NodeTestNC(nsprefix) {
  this.regex = new RegExp("^" + nsprefix + ":");
  this.nsprefix = nsprefix;
}

NodeTestNC.prototype.evaluate = function(ctx) {
  var n = ctx.node;
  return new BooleanValue(this.regex.match(n.nodeName));
};

function NodeTestName(name) {
  this.name = name;
  this.re = new RegExp('^' + name + '$', "i");
}

NodeTestName.prototype.evaluate = function(ctx) {
  var n = ctx.node;
  if (ctx.caseInsensitive) {
    if (n.nodeName.length != this.name.length){ 
        return new BooleanValue(false);
    }
    return new BooleanValue(this.re.test(n.nodeName));
  } else {
    return new BooleanValue(n.nodeName == this.name);
  }
};

function TokenExpr(m) {
  this.value = m;
}

TokenExpr.prototype.evaluate = function() {
  return new StringValue(this.value);
};

function LocationExpr() {
  this.absolute = false;
  this.steps = [];
}

LocationExpr.prototype.appendStep = function(s) {
  var combinedStep = this._combineSteps(this.steps[this.steps.length-1], s);
  if (combinedStep) {
    this.steps[this.steps.length-1] = combinedStep;
  } else {
    this.steps.push(s);
  }
};

LocationExpr.prototype.prependStep = function(s) {
  var combinedStep = this._combineSteps(s, this.steps[0]);
  if (combinedStep) {
    this.steps[0] = combinedStep;
  } else {
    this.steps.unshift(s);
  }
};

// DGF try to combine two steps into one step (perf enhancement)
LocationExpr.prototype._combineSteps = function(prevStep, nextStep) {
  if (!prevStep){ 
      return null;
  }
  if (!nextStep) {
      return null;
  }
  var hasPredicates = (prevStep.predicates && prevStep.predicates.length > 0);
  if (prevStep.nodetest instanceof NodeTestAny && !hasPredicates) {
    // maybe suitable to be combined
    if (prevStep.axis == xpathAxis.DESCENDANT_OR_SELF) {
      if (nextStep.axis == xpathAxis.CHILD) {
        nextStep.axis = xpathAxis.DESCENDANT;
        return nextStep;
      } else if (nextStep.axis == xpathAxis.SELF) {
        nextStep.axis = xpathAxis.DESCENDANT_OR_SELF;
        return nextStep;
      }
    } else if (prevStep.axis == xpathAxis.DESCENDANT) {
      if (nextStep.axis == xpathAxis.SELF) {
        nextStep.axis = xpathAxis.DESCENDANT;
        return nextStep;
      }
    }
  }
  return null;
};


function xPathStep(nodes, steps, step, input, ctx) {
  var s = steps[step];
  var ctx2 = ctx.clone(input);
  var nodelist = s.evaluate(ctx2).nodeSetValue();

  for (var i = 0; i < nodelist.length; ++i) {
    if (step == steps.length - 1) {
      nodes.push(nodelist[i]);
    } else {
      xPathStep(nodes, steps, step + 1, nodelist[i], ctx);
    }
  }
}

LocationExpr.prototype.evaluate = function(ctx) {
  var start;
  if (this.absolute) {
    start = ctx.root;

  } else {
    start = ctx.node;
  }

  var nodes = [];
  xPathStep(nodes, this.steps, 0, start, ctx);
  return new NodeSetValue(nodes);
};


function StepExpr(axis, nodetest, opt_predicate) {
  this.axis = axis;
  this.nodetest = nodetest;
  this.predicate = opt_predicate || [];
}

StepExpr.prototype.appendPredicate = function(p) {
  this.predicate.push(p);
};

// Local utility functions that are used by the lexer or parser.

function xpathCollectDescendants(nodelist, node, opt_tagName) {
  if (opt_tagName && node.getElementsByTagName) {
    copyArray(nodelist, node.getElementsByTagName(opt_tagName));
    return;
  }
  for (var n = node.firstChild; n; n = n.nextSibling) {
    nodelist.push(n);
    xpathCollectDescendants(nodelist, n);
  }
}

// DGF extract a tag name suitable for getElementsByTagName
function xpathExtractTagNameFromNodeTest(nodetest) {
  if (nodetest instanceof NodeTestName) {
    return nodetest.name;
  } else if (nodetest instanceof NodeTestAny || nodetest instanceof NodeTestElementOrAttribute) {
    return "*";
  }
}

function xpathCollectDescendantsReverse(nodelist, node) {
  for (var n = node.lastChild; n; n = n.previousSibling) {
    nodelist.push(n);
    xpathCollectDescendantsReverse(nodelist, n);
  }
}

StepExpr.prototype.evaluate = function(ctx) {
  var input = ctx.node;
  var nodelist = [];
  var skipNodeTest = false;
  var n, nn, i, nodelist0, tagName;

  if (this.nodetest instanceof NodeTestAny) {
    skipNodeTest = true;
  }

  // NOTE(mesch): When this was a switch() statement, it didn't work
  // in Safari/2.0. Not sure why though; it resulted in the JavaScript
  // console output "undefined" (without any line number or so).

  if (this.axis ==  xpathAxis.ANCESTOR_OR_SELF) {
    nodelist.push(input);
    for (n = input.parentNode; n; n = n.parentNode) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.ANCESTOR) {
    for (n = input.parentNode; n; n = n.parentNode) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.ATTRIBUTE) {
    if (ctx.ignoreAttributesWithoutValue) {
      copyArrayIgnoringAttributesWithoutValue(nodelist, input.attributes);
    }
    else {
      copyArray(nodelist, input.attributes);
    }

  } else if (this.axis == xpathAxis.CHILD) {
    copyArray(nodelist, input.childNodes);

  } else if (this.axis == xpathAxis.DESCENDANT_OR_SELF) {
    if (this.nodetest.evaluate(ctx).booleanValue()) {
      nodelist.push(input);
    }
    tagName = xpathExtractTagNameFromNodeTest(this.nodetest);
    xpathCollectDescendants(nodelist, input, tagName);
    if (tagName){ 
        skipNodeTest = true;
    }

  } else if (this.axis == xpathAxis.DESCENDANT) {
    tagName = xpathExtractTagNameFromNodeTest(this.nodetest);
    xpathCollectDescendants(nodelist, input, tagName);
    if (tagName) {
        skipNodeTest = true;
    }

  } else if (this.axis == xpathAxis.FOLLOWING) {
    for (n = input; n; n = n.parentNode) {
      for (nn = n.nextSibling; nn; nn = nn.nextSibling) {
        nodelist.push(nn);
        xpathCollectDescendants(nodelist, nn);
      }
    }

  } else if (this.axis == xpathAxis.FOLLOWING_SIBLING) {
    for (n = input.nextSibling; n; n = n.nextSibling) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.NAMESPACE) {
    console.warn('not implemented: axis namespace');

  } else if (this.axis == xpathAxis.PARENT) {
    if (input.parentNode) {
      nodelist.push(input.parentNode);
    }

  } else if (this.axis == xpathAxis.PRECEDING) {
    for (n = input; n; n = n.parentNode) {
      for (nn = n.previousSibling; nn; nn = nn.previousSibling) {
        nodelist.push(nn);
        xpathCollectDescendantsReverse(nodelist, nn);
      }
    }

  } else if (this.axis == xpathAxis.PRECEDING_SIBLING) {
    for (n = input.previousSibling; n; n = n.previousSibling) {
      nodelist.push(n);
    }

  } else if (this.axis == xpathAxis.SELF) {
    nodelist.push(input);

  } else {
    throw 'ERROR -- NO SUCH AXIS: ' + this.axis;
  }

  if (!skipNodeTest) {
    // process node test
    nodelist0 = nodelist;
    nodelist = [];
    for (i = 0; i < nodelist0.length; ++i) {
      n = nodelist0[i];
      if (this.nodetest.evaluate(ctx.clone(n, i, nodelist0)).booleanValue()) {
        nodelist.push(n);
      }
    }
  }

  // process predicates
  for (i = 0; i < this.predicate.length; ++i) {
    nodelist0 = nodelist;
    nodelist = [];
    for (var ii = 0; ii < nodelist0.length; ++ii) {
      n = nodelist0[ii];
      if (this.predicate[i].evaluate(ctx.clone(n, ii, nodelist0)).booleanValue()) {
        nodelist.push(n);
      }
    }
  }

  return new NodeSetValue(nodelist);
};

function PredicateExpr(expr) {
  this.expr = expr;
}

PredicateExpr.prototype.evaluate = function(ctx) {
  var v = this.expr.evaluate(ctx);
  if (v.type == 'number') {
    // NOTE(mesch): Internally, position is represented starting with
    // 0, however in XPath position starts with 1. See functions
    // position() and last().
    return new BooleanValue(ctx.position == v.numberValue() - 1);
  } else {
    return new BooleanValue(v.booleanValue());
  }
};

function FunctionCallExpr(name) {
  this.name = name;
  this.args = [];
}

FunctionCallExpr.prototype.appendArg = function(arg) {
  this.args.push(arg);
};

FunctionCallExpr.prototype.evaluate = function(ctx) {
  var fn = '' + this.name.value;
  var f = this.xpathfunctions[fn];
  if (f) {
    return f.call(this, ctx);
  } else {
    xpathLog('XPath NO SUCH FUNCTION ' + fn);
    return new BooleanValue(false);
  }
};

FunctionCallExpr.prototype.xpathfunctions = {
  'last': function(ctx) {
    assert(this.args.length === 0);
    // NOTE(mesch): XPath position starts at 1.
    return new NumberValue(ctx.contextSize());
  },

  'position': function(ctx) {
    assert(this.args.length === 0);
    // NOTE(mesch): XPath position starts at 1.
    return new NumberValue(ctx.position + 1);
  },

  'count': function(ctx) {
    assert(this.args.length == 1);
    var v = this.args[0].evaluate(ctx);
    return new NumberValue(v.nodeSetValue().length);
  },

  'id': function(ctx) {
    assert(this.args.length == 1);
    var e = this.args[0].evaluate(ctx);
    var ret = [];
    var ids, i, ii, v, n;
    if (e.type == 'node-set') {
      ids = [];
      var en = e.nodeSetValue();
      for (i = 0; i < en.length; ++i) {
        v = xmlValue(en[i]).split(/\s+/);
        for (ii = 0; ii < v.length; ++ii) {
          ids.push(v[ii]);
        }
      }
    } else {
      ids = e.stringValue().split(/\s+/);
    }
    var d = ctx.root;
    for (i = 0; i < ids.length; ++i) {
      n = d.getElementById(ids[i]);
      if (n) {
        ret.push(n);
      }
    }
    return new NodeSetValue(ret);
  },

  'local-name': function(ctx) {
    console.warn('not implmented yet: XPath function local-name()');
  },

  'namespace-uri': function(ctx) {
    console.warn('not implmented yet: XPath function namespace-uri()');
  },

  'name': function(ctx) {
    assert(this.args.length == 1 || this.args.length === 0);
    var n;
    if (this.args.length === 0) {
      n = [ ctx.node ];
    } else {
      n = this.args[0].evaluate(ctx).nodeSetValue();
    }

    if (n.length === 0) {
      return new StringValue('');
    } else {
      return new StringValue(n[0].nodeName);
    }
  },

  'string':  function(ctx) {
    assert(this.args.length == 1 || this.args.length === 0);
    if (this.args.length === 0) {
      return new StringValue(new NodeSetValue([ ctx.node ]).stringValue());
    } else {
      return new StringValue(this.args[0].evaluate(ctx).stringValue());
    }
  },

  'concat': function(ctx) {
    var ret = '';
    for (var i = 0; i < this.args.length; ++i) {
      ret += this.args[i].evaluate(ctx).stringValue();
    }
    return new StringValue(ret);
  },

  'starts-with': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    return new BooleanValue(s0.indexOf(s1) === 0);
  },

  'contains': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    return new BooleanValue(s0.indexOf(s1) != -1);
  },

  'substring-before': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var i = s0.indexOf(s1);
    var ret;
    if (i == -1) {
      ret = '';
    } else {
      ret = s0.substr(0,i);
    }
    return new StringValue(ret);
  },

  'substring-after': function(ctx) {
    assert(this.args.length == 2);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var i = s0.indexOf(s1);
    var ret;
    if (i == -1) {
      ret = '';
    } else {
      ret = s0.substr(i + s1.length);
    }
    return new StringValue(ret);
  },

  'substring': function(ctx) {
    // NOTE: XPath defines the position of the first character in a
    // string to be 1, in JavaScript this is 0 ([XPATH] Section 4.2).
    assert(this.args.length == 2 || this.args.length == 3);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).numberValue();
    var ret, i0, i1, i2, s2;
    if (this.args.length == 2) {
      i1 = Math.max(0, Math.round(s1) - 1);
      ret = s0.substr(i1);

    } else {
      s2 = this.args[2].evaluate(ctx).numberValue();
      i0 = Math.round(s1) - 1;
      i1 = Math.max(0, i0);
      i2 = Math.round(s2) - Math.max(0, -i0);
      ret = s0.substr(i1, i2);
    }
    return new StringValue(ret);
  },

  'string-length': function(ctx) {
    var s;
    if (this.args.length > 0) {
      s = this.args[0].evaluate(ctx).stringValue();
    } else {
      s = new NodeSetValue([ ctx.node ]).stringValue();
    }
    return new NumberValue(s.length);
  },

  'normalize-space': function(ctx) {
    var s;
    if (this.args.length > 0) {
      s = this.args[0].evaluate(ctx).stringValue();
    } else {
      s = new NodeSetValue([ ctx.node ]).stringValue();
    }
    s = s.replace(/^\s*/,'').replace(/\s*$/,'').replace(/\s+/g, ' ');
    return new StringValue(s);
  },

  'translate': function(ctx) {
    assert(this.args.length == 3);
    var s0 = this.args[0].evaluate(ctx).stringValue();
    var s1 = this.args[1].evaluate(ctx).stringValue();
    var s2 = this.args[2].evaluate(ctx).stringValue();

    for (var i = 0; i < s1.length; ++i) {
      s0 = s0.replace(new RegExp(s1.charAt(i), 'g'), s2.charAt(i));
    }
    return new StringValue(s0);
  },

  'boolean': function(ctx) {
    assert(this.args.length == 1);
    return new BooleanValue(this.args[0].evaluate(ctx).booleanValue());
  },

  'not': function(ctx) {
    assert(this.args.length == 1);
    var ret = !this.args[0].evaluate(ctx).booleanValue();
    return new BooleanValue(ret);
  },

  'true': function(ctx) {
    assert(this.args.length === 0);
    return new BooleanValue(true);
  },

  'false': function(ctx) {
    assert(this.args.length === 0);
    return new BooleanValue(false);
  },

  'lang': function(ctx) {
    assert(this.args.length == 1);
    var lang = this.args[0].evaluate(ctx).stringValue();
    var xmllang;
    var n = ctx.node;
    while (n && n != n.parentNode /* just in case ... */) {
      xmllang = n.getAttribute('xml:lang');
      if (xmllang) {
        break;
      }
      n = n.parentNode;
    }
    if (!xmllang) {
      return new BooleanValue(false);
    } else {
      var re = new RegExp('^' + lang + '$', 'i');
      return new BooleanValue(xmllang.match(re) ||
                              xmllang.replace(/_.*$/,'').match(re));
    }
  },

  'number': function(ctx) {
    assert(this.args.length == 1 || this.args.length === 0);

    if (this.args.length == 1) {
      return new NumberValue(this.args[0].evaluate(ctx).numberValue());
    } else {
      return new NumberValue(new NodeSetValue([ ctx.node ]).numberValue());
    }
  },

  'sum': function(ctx) {
    assert(this.args.length == 1);
    var n = this.args[0].evaluate(ctx).nodeSetValue();
    var sum = 0;
    for (var i = 0; i < n.length; ++i) {
      sum += xmlValue(n[i]) - 0;
    }
    return new NumberValue(sum);
  },

  'floor': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.floor(num));
  },

  'ceiling': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.ceil(num));
  },

  'round': function(ctx) {
    assert(this.args.length == 1);
    var num = this.args[0].evaluate(ctx).numberValue();
    return new NumberValue(Math.round(num));
  },

  // TODO(mesch): The following functions are custom. There is a
  // standard that defines how to add functions, which should be
  // applied here.

  'ext-join': function(ctx) {
    assert(this.args.length == 2);
    var nodes = this.args[0].evaluate(ctx).nodeSetValue();
    var delim = this.args[1].evaluate(ctx).stringValue();
    var ret = '';
    for (var i = 0; i < nodes.length; ++i) {
      if (ret) {
        ret += delim;
      }
      ret += xmlValue(nodes[i]);
    }
    return new StringValue(ret);
  },

  // ext-if() evaluates and returns its second argument, if the
  // boolean value of its first argument is true, otherwise it
  // evaluates and returns its third argument.

  'ext-if': function(ctx) {
    assert(this.args.length == 3);
    if (this.args[0].evaluate(ctx).booleanValue()) {
      return this.args[1].evaluate(ctx);
    } else {
      return this.args[2].evaluate(ctx);
    }
  },

  // ext-cardinal() evaluates its single argument as a number, and
  // returns the current node that many times. It can be used in the
  // select attribute to iterate over an integer range.

  'ext-cardinal': function(ctx) {
    assert(this.args.length >= 1);
    var c = this.args[0].evaluate(ctx).numberValue();
    var ret = [];
    for (var i = 0; i < c; ++i) {
      ret.push(ctx.node);
    }
    return new NodeSetValue(ret);
  }
};

function UnionExpr(expr1, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
}

UnionExpr.prototype.evaluate = function(ctx) {
  var nodes1 = this.expr1.evaluate(ctx).nodeSetValue();
  var nodes2 = this.expr2.evaluate(ctx).nodeSetValue();
  var I1 = nodes1.length;
  for (var i2 = 0; i2 < nodes2.length; ++i2) {
    var n = nodes2[i2];
    var inBoth = false;
    for (var i1 = 0; i1 < I1; ++i1) {
      if (nodes1[i1] == n) {
        inBoth = true;
        i1 = I1; // break inner loop
      }
    }
    if (!inBoth) {
      nodes1.push(n);
    }
  }
  return new NodeSetValue(nodes1);
};

function PathExpr(filter, rel) {
  this.filter = filter;
  this.rel = rel;
}

PathExpr.prototype.evaluate = function(ctx) {
  var nodes = this.filter.evaluate(ctx).nodeSetValue();
  var nodes1 = [];
  for (var i = 0; i < nodes.length; ++i) {
    var nodes0 = this.rel.evaluate(ctx.clone(nodes[i], i, nodes)).nodeSetValue();
    for (var ii = 0; ii < nodes0.length; ++ii) {
      nodes1.push(nodes0[ii]);
    }
  }
  return new NodeSetValue(nodes1);
};

function FilterExpr(expr, predicate) {
  this.expr = expr;
  this.predicate = predicate;
}

FilterExpr.prototype.evaluate = function(ctx) {
  var nodes = this.expr.evaluate(ctx).nodeSetValue();
  for (var i = 0; i < this.predicate.length; ++i) {
    var nodes0 = nodes;
    nodes = [];
    for (var j = 0; j < nodes0.length; ++j) {
      var n = nodes0[j];
      if (this.predicate[i].evaluate(ctx.clone(n, j, nodes0)).booleanValue()) {
        nodes.push(n);
      }
    }
  }

  return new NodeSetValue(nodes);
};

function UnaryMinusExpr(expr) {
  this.expr = expr;
}

UnaryMinusExpr.prototype.evaluate = function(ctx) {
  return new NumberValue(-this.expr.evaluate(ctx).numberValue());
};

function BinaryExpr(expr1, op, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
  this.op = op;
}

BinaryExpr.prototype.evaluate = function(ctx) {
  var ret;
  switch (this.op.value) {
    case 'or':
      ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() ||
                             this.expr2.evaluate(ctx).booleanValue());
      break;

    case 'and':
      ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() &&
                             this.expr2.evaluate(ctx).booleanValue());
      break;

    case '+':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() +
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '-':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() -
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '*':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() *
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case 'mod':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() %
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case 'div':
      ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() /
                            this.expr2.evaluate(ctx).numberValue());
      break;

    case '=':
      ret = this.compare(ctx, function(x1, x2) { return x1 == x2; });
      break;

    case '!=':
      ret = this.compare(ctx, function(x1, x2) { return x1 != x2; });
      break;

    case '<':
      ret = this.compare(ctx, function(x1, x2) { return x1 < x2; });
      break;

    case '<=':
      ret = this.compare(ctx, function(x1, x2) { return x1 <= x2; });
      break;

    case '>':
      ret = this.compare(ctx, function(x1, x2) { return x1 > x2; });
      break;

    case '>=':
      ret = this.compare(ctx, function(x1, x2) { return x1 >= x2; });
      break;

    default:
      console.warn('BinaryExpr.evaluate: ' + this.op.value);
  }
  return ret;
};

BinaryExpr.prototype.compare = function(ctx, cmp) {
  var v1 = this.expr1.evaluate(ctx);
  var v2 = this.expr2.evaluate(ctx);
  var i, n, s, n1, n2, i1, i2, nn;

  var ret;
  if (v1.type == 'node-set' && v2.type == 'node-set') {
    n1 = v1.nodeSetValue();
    n2 = v2.nodeSetValue();
    ret = false;
    for (i1 = 0; i1 < n1.length; ++i1) {
      for (i2 = 0; i2 < n2.length; ++i2) {
        if (cmp(xmlValue(n1[i1]), xmlValue(n2[i2]))) {
          ret = true;
          // Break outer loop. Labels confuse the jscompiler and we
          // don't use them.
          i2 = n2.length;
          i1 = n1.length;
        }
      }
    }

  } else if (v1.type == 'node-set' || v2.type == 'node-set') {

    if (v1.type == 'number') {
      s = v1.numberValue();
      n = v2.nodeSetValue();

      ret = false;
      for (i = 0;  i < n.length; ++i) {
        nn = xmlValue(n[i]) - 0;
        if (cmp(s, nn)) {
          ret = true;
          break;
        }
      }

    } else if (v2.type == 'number') {
      n = v1.nodeSetValue();
      s = v2.numberValue();

      ret = false;
      for (i = 0;  i < n.length; ++i) {
        nn = xmlValue(n[i]) - 0;
        if (cmp(nn, s)) {
          ret = true;
          break;
        }
      }

    } else if (v1.type == 'string') {
      s = v1.stringValue();
      n = v2.nodeSetValue();

      ret = false;
      for (i = 0;  i < n.length; ++i) {
        nn = xmlValue(n[i]);
        if (cmp(s, nn)) {
          ret = true;
          break;
        }
      }

    } else if (v2.type == 'string') {
      n = v1.nodeSetValue();
      s = v2.stringValue();

      ret = false;
      for (i = 0;  i < n.length; ++i) {
        nn = xmlValue(n[i]);
        if (cmp(nn, s)) {
          ret = true;
          break;
        }
      }

    } else {
      ret = cmp(v1.booleanValue(), v2.booleanValue());
    }

  } else if (v1.type == 'boolean' || v2.type == 'boolean') {
    ret = cmp(v1.booleanValue(), v2.booleanValue());

  } else if (v1.type == 'number' || v2.type == 'number') {
    ret = cmp(v1.numberValue(), v2.numberValue());

  } else {
    ret = cmp(v1.stringValue(), v2.stringValue());
  }

  return new BooleanValue(ret);
};

function LiteralExpr(value) {
  this.value = value;
}

LiteralExpr.prototype.evaluate = function(ctx) {
  return new StringValue(this.value);
};

function NumberExpr(value) {
  this.value = value;
}

NumberExpr.prototype.evaluate = function(ctx) {
  return new NumberValue(this.value);
};

function VariableExpr(name) {
  this.name = name;
}

VariableExpr.prototype.evaluate = function(ctx) {
  return ctx.getVariable(this.name);
};

// Factory functions for semantic values (i.e. Expressions) of the
// productions in the grammar. When a production is matched to reduce
// the current parse state stack, the function is called with the
// semantic values of the matched elements as arguments, and returns
// another semantic value. The semantic value is a node of the parse
// tree, an expression object with an evaluate() method that evaluates the
// expression in an actual context. These factory functions are used
// in the specification of the grammar rules, below.

function makeTokenExpr(m) {
  return new TokenExpr(m);
}

function passExpr(e) {
  return e;
}

function makeAbbrevStep(abbrev) {
  switch (abbrev) {
  case '//':
    return new StepExpr('descendant-or-self', new NodeTestAny());

  case '.':
    return new StepExpr('self', new NodeTestAny());

  case '..':
    return new StepExpr('parent', new NodeTestAny());
  }
}

function makeLocationExpr1(slash, rel) {
  rel.absolute = true;
  return rel;
}

function makeLocationExpr2(dslash, rel) {
  rel.absolute = true;
  rel.prependStep(makeAbbrevStep(dslash.value));
  return rel;
}

function makeLocationExpr3(slash) {
  var ret = new LocationExpr();
  ret.appendStep(makeAbbrevStep('.'));
  ret.absolute = true;
  return ret;
}

function makeLocationExpr4(dslash) {
  var ret = new LocationExpr();
  ret.absolute = true;
  ret.appendStep(makeAbbrevStep(dslash.value));
  return ret;
}

function makeLocationExpr5(step) {
  var ret = new LocationExpr();
  ret.appendStep(step);
  return ret;
}

function makeLocationExpr6(rel, slash, step) {
  rel.appendStep(step);
  return rel;
}

function makeLocationExpr7(rel, dslash, step) {
  rel.appendStep(makeAbbrevStep(dslash.value));
  rel.appendStep(step);
  return rel;
}

function makeStepExpr1(dot) {
  return makeAbbrevStep(dot.value);
}

function makeStepExpr2(ddot) {
  return makeAbbrevStep(ddot.value);
}

function makeStepExpr3(axisname, axis, nodetest) {
  return new StepExpr(axisname.value, nodetest);
}

function makeStepExpr4(at, nodetest) {
  return new StepExpr('attribute', nodetest);
}

function makeStepExpr5(nodetest) {
  return new StepExpr('child', nodetest);
}

function makeStepExpr6(step, predicate) {
  step.appendPredicate(predicate);
  return step;
}


function makeNodeTestExpr1(asterisk) {
  return new NodeTestElementOrAttribute();
}

function makeNodeTestExpr2(ncname, colon, asterisk) {
  return new NodeTestNC(ncname.value);
}

function makeNodeTestExpr3(qname) {
  return new NodeTestName(qname.value);
}

function makeNodeTestExpr4(typeo, parenc) {
  var type = typeo.value.replace(/\s*\($/, '');
  switch(type) {
  case 'node':
    return new NodeTestAny();

  case 'text':
    return new NodeTestText();

  case 'comment':
    return new NodeTestComment();

  case 'processing-instruction':
    return new NodeTestPI('');
  }
}

function makeNodeTestExpr5(typeo, target, parenc) {
  var type = typeo.replace(/\s*\($/, '');
  if (type != 'processing-instruction') {
    throw type;
  }
  return new NodeTestPI(target.value);
}

function makePredicateExpr(pareno, expr, parenc) {
  return new PredicateExpr(expr);
}

function makePrimaryExpr(pareno, expr, parenc) {
  return expr;
}

function makeFunctionCallExpr1(name, pareno, parenc) {
  return new FunctionCallExpr(name);
}

function makeFunctionCallExpr2(name, pareno, arg1, args, parenc) {
  var ret = new FunctionCallExpr(name);
  ret.appendArg(arg1);
  for (var i = 0; i < args.length; ++i) {
    ret.appendArg(args[i]);
  }
  return ret;
}

function makeArgumentExpr(comma, expr) {
  return expr;
}

function makeUnionExpr(expr1, pipe, expr2) {
  return new UnionExpr(expr1, expr2);
}

function makePathExpr1(filter, slash, rel) {
  return new PathExpr(filter, rel);
}

function makePathExpr2(filter, dslash, rel) {
  rel.prependStep(makeAbbrevStep(dslash.value));
  return new PathExpr(filter, rel);
}

function makeFilterExpr(expr, predicates) {
  if (predicates.length > 0) {
    return new FilterExpr(expr, predicates);
  } else {
    return expr;
  }
}

function makeUnaryMinusExpr(minus, expr) {
  return new UnaryMinusExpr(expr);
}

function makeBinaryExpr(expr1, op, expr2) {
  return new BinaryExpr(expr1, op, expr2);
}

function makeLiteralExpr(token) {
  // remove quotes from the parsed value:
  var value = token.value.substring(1, token.value.length - 1);
  return new LiteralExpr(value);
}

function makeNumberExpr(token) {
  return new NumberExpr(token.value);
}

function makeVariableReference(dollar, name) {
  return new VariableExpr(name.value);
}

// Used before parsing for optimization of common simple cases. See
// the begin of xpathParse() for which they are.
function makeSimpleExpr(expr) {
    var a,b,c;
  if (expr.charAt(0) == '$') {
    return new VariableExpr(expr.substr(1));
  } else if (expr.charAt(0) == '@') {
    a = new NodeTestName(expr.substr(1));
    b = new StepExpr('attribute', a);
    c = new LocationExpr();
    c.appendStep(b);
    return c;
  } else if (expr.match(/^[0-9]+$/)) {
    return new NumberExpr(expr);
  } else {
    a = new NodeTestName(expr);
    b = new StepExpr('child', a);
    c = new LocationExpr();
    c.appendStep(b);
    return c;
  }
}

function makeSimpleExpr2(expr) {
  var steps = stringSplit(expr, '/');
  var c = new LocationExpr();
  for (var i = 0; i < steps.length; ++i) {
    var a = new NodeTestName(steps[i]);
    var b = new StepExpr('child', a);
    c.appendStep(b);
  }
  return c;
}

// The productions of the grammar. Columns of the table:
//
// - target nonterminal,
// - pattern,
// - precedence,
// - semantic value factory
//
// The semantic value factory is a function that receives parse tree
// nodes from the stack frames of the matched symbols as arguments and
// returns an a node of the parse tree. The node is stored in the top
// stack frame along with the target object of the rule. The node in
// the parse tree is an expression object that has an evaluate() method
// and thus evaluates XPath expressions.
//
// The precedence is used to decide between reducing and shifting by
// comparing the precendence of the rule that is candidate for
// reducing with the precedence of the look ahead token. Precedence of
// -1 means that the precedence of the tokens in the pattern is used
// instead. TODO: It shouldn't be necessary to explicitly assign
// precedences to rules.

// DGF As it stands, these precedences are purely empirical; we're
// not sure they can be made to be consistent at all.

var xpathGrammarRules =
  [
   [ XPathLocationPath, [ XPathRelativeLocationPath ], 18,
     passExpr ],
   [ XPathLocationPath, [ XPathAbsoluteLocationPath ], 18,
     passExpr ],

   [ XPathAbsoluteLocationPath, [ TOK_SLASH, XPathRelativeLocationPath ], 18,
     makeLocationExpr1 ],
   [ XPathAbsoluteLocationPath, [ TOK_DSLASH, XPathRelativeLocationPath ], 18,
     makeLocationExpr2 ],

   [ XPathAbsoluteLocationPath, [ TOK_SLASH ], 0,
     makeLocationExpr3 ],
   [ XPathAbsoluteLocationPath, [ TOK_DSLASH ], 0,
     makeLocationExpr4 ],

   [ XPathRelativeLocationPath, [ XPathStep ], 31,
     makeLocationExpr5 ],
   [ XPathRelativeLocationPath,
     [ XPathRelativeLocationPath, TOK_SLASH, XPathStep ], 31,
     makeLocationExpr6 ],
   [ XPathRelativeLocationPath,
     [ XPathRelativeLocationPath, TOK_DSLASH, XPathStep ], 31,
     makeLocationExpr7 ],

   [ XPathStep, [ TOK_DOT ], 33,
     makeStepExpr1 ],
   [ XPathStep, [ TOK_DDOT ], 33,
     makeStepExpr2 ],
   [ XPathStep,
     [ TOK_AXISNAME, TOK_AXIS, XPathNodeTest ], 33,
     makeStepExpr3 ],
   [ XPathStep, [ TOK_AT, XPathNodeTest ], 33,
     makeStepExpr4 ],
   [ XPathStep, [ XPathNodeTest ], 33,
     makeStepExpr5 ],
   [ XPathStep, [ XPathStep, XPathPredicate ], 33,
     makeStepExpr6 ],

   [ XPathNodeTest, [ TOK_ASTERISK ], 33,
     makeNodeTestExpr1 ],
   [ XPathNodeTest, [ TOK_NCNAME, TOK_COLON, TOK_ASTERISK ], 33,
     makeNodeTestExpr2 ],
   [ XPathNodeTest, [ TOK_QNAME ], 33,
     makeNodeTestExpr3 ],
   [ XPathNodeTest, [ TOK_NODEO, TOK_PARENC ], 33,
     makeNodeTestExpr4 ],
   [ XPathNodeTest, [ TOK_NODEO, XPathLiteral, TOK_PARENC ], 33,
     makeNodeTestExpr5 ],

   [ XPathPredicate, [ TOK_BRACKO, XPathExpr, TOK_BRACKC ], 33,
     makePredicateExpr ],

   [ XPathPrimaryExpr, [ XPathVariableReference ], 33,
     passExpr ],
   [ XPathPrimaryExpr, [ TOK_PARENO, XPathExpr, TOK_PARENC ], 33,
     makePrimaryExpr ],
   [ XPathPrimaryExpr, [ XPathLiteral ], 30,
     passExpr ],
   [ XPathPrimaryExpr, [ XPathNumber ], 30,
     passExpr ],
   [ XPathPrimaryExpr, [ XPathFunctionCall ], 31,
     passExpr ],

   [ XPathFunctionCall, [ TOK_QNAME, TOK_PARENO, TOK_PARENC ], -1,
     makeFunctionCallExpr1 ],
   [ XPathFunctionCall,
     [ TOK_QNAME, TOK_PARENO, XPathExpr, XPathArgumentRemainder, Q_MM,
       TOK_PARENC ], -1,
     makeFunctionCallExpr2 ],
   [ XPathArgumentRemainder, [ TOK_COMMA, XPathExpr ], -1,
     makeArgumentExpr ],

   [ XPathUnionExpr, [ XPathPathExpr ], 20,
     passExpr ],
   [ XPathUnionExpr, [ XPathUnionExpr, TOK_PIPE, XPathPathExpr ], 20,
     makeUnionExpr ],

   [ XPathPathExpr, [ XPathLocationPath ], 20,
     passExpr ],
   [ XPathPathExpr, [ XPathFilterExpr ], 19,
     passExpr ],
   [ XPathPathExpr,
     [ XPathFilterExpr, TOK_SLASH, XPathRelativeLocationPath ], 19,
     makePathExpr1 ],
   [ XPathPathExpr,
     [ XPathFilterExpr, TOK_DSLASH, XPathRelativeLocationPath ], 19,
     makePathExpr2 ],

   [ XPathFilterExpr, [ XPathPrimaryExpr, XPathPredicate, Q_MM ], 31,
     makeFilterExpr ],

   [ XPathExpr, [ XPathPrimaryExpr ], 16,
     passExpr ],
   [ XPathExpr, [ XPathUnionExpr ], 16,
     passExpr ],

   [ XPathExpr, [ TOK_MINUS, XPathExpr ], -1,
     makeUnaryMinusExpr ],

   [ XPathExpr, [ XPathExpr, TOK_OR, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_AND, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_EQ, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_NEQ, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_LT, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_LE, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_GT, XPathExpr ], -1,
     makeBinaryExpr ],
   [ XPathExpr, [ XPathExpr, TOK_GE, XPathExpr ], -1,
     makeBinaryExpr ],

   [ XPathExpr, [ XPathExpr, TOK_PLUS, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_MINUS, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],

   [ XPathExpr, [ XPathExpr, TOK_ASTERISK, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_DIV, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],
   [ XPathExpr, [ XPathExpr, TOK_MOD, XPathExpr ], -1,
     makeBinaryExpr, ASSOC_LEFT ],

   [ XPathLiteral, [ TOK_LITERALQ ], -1,
     makeLiteralExpr ],
   [ XPathLiteral, [ TOK_LITERALQQ ], -1,
     makeLiteralExpr ],

   [ XPathNumber, [ TOK_NUMBER ], -1,
     makeNumberExpr ],

   [ XPathVariableReference, [ TOK_DOLLAR, TOK_QNAME ], 200,
     makeVariableReference ]
   ];

// That function computes some optimizations of the above data
// structures and will be called right here. It merely takes the
// counter variables out of the global scope.


// XPath expression evaluation context. An XPath context consists of a
// DOM node, a list of DOM nodes that contains this node, a number
// that represents the position of the single node in the list, and a
// current set of variable bindings. (See XPath spec.)
//
// The interface of the expression context:
//
//   Constructor -- gets the node, its position, the node set it
//   belongs to, and a parent context as arguments. The parent context
//   is used to implement scoping rules for variables: if a variable
//   is not found in the current context, it is looked for in the
//   parent context, recursively. Except for node, all arguments have
//   default values: default position is 0, default node set is the
//   set that contains only the node, and the default parent is null.
//
//     Notice that position starts at 0 at the outside interface;
//     inside XPath expressions this shows up as position()=1.
//
//   clone() -- creates a new context with the current context as
//   parent. If passed as argument to clone(), the new context has a
//   different node, position, or node set. What is not passed is
//   inherited from the cloned context.
//
//   setVariable(name, expr) -- binds given XPath expression to the
//   name.
//
//   getVariable(name) -- what the name says.
//
//   setNode(position) -- sets the context to the node at the given
//   position. Needed to implement scoping rules for variables in
//   XPath. (A variable is visible to all subsequent siblings, not
//   only to its children.)
//
//   set/isCaseInsensitive -- specifies whether node name tests should
//   be case sensitive.  If you're executing xpaths against a regular
//   HTML DOM, you probably don't want case-sensitivity, because
//   browsers tend to disagree about whether elements & attributes
//   should be upper/lower case.  If you're running xpaths in an
//   XSLT instance, you probably DO want case sensitivity, as per the
//   XSL spec.

function ExprContext(node, opt_position, opt_nodelist, opt_parent, opt_caseInsensitive, opt_ignoreAttributesWithoutValue) {
  this.node = node;
  this.position = opt_position || 0;
  this.nodelist = opt_nodelist || [ node ];
  this.variables = {};
  this.parent = opt_parent || null;
  this.caseInsensitive = opt_caseInsensitive || false;
  this.ignoreAttributesWithoutValue = opt_ignoreAttributesWithoutValue || false;
  if (opt_parent) {
    this.root = opt_parent.root;
  } else if (this.node.nodeType == DOM_DOCUMENT_NODE) {
    // NOTE(mesch): DOM Spec stipulates that the ownerDocument of a
    // document is null. Our root, however is the document that we are
    // processing, so the initial context is created from its document
    // node, which case we must handle here explcitly.
    this.root = node;
  } else {
    this.root = node.ownerDocument;
  }
}

ExprContext.prototype.clone = function(opt_node, opt_position, opt_nodelist) {
  return new ExprContext(
      opt_node || this.node,
      typeof opt_position != 'undefined' ? opt_position : this.position,
      opt_nodelist || this.nodelist, this, this.caseInsensitive,
      this.ignoreAttributesWithoutValue);
};

ExprContext.prototype.setVariable = function(name, value) {
  if (value instanceof StringValue || value instanceof BooleanValue || 
    value instanceof NumberValue || value instanceof NodeSetValue) {
    this.variables[name] = value;
    return;
  }
  if ('true' === value) {
    this.variables[name] = new BooleanValue(true);
  } else if ('false' === value) {
    this.variables[name] = new BooleanValue(false);
  } else if (TOK_NUMBER.re.test(value)) {
    this.variables[name] = new NumberValue(value);
  } else {
    // DGF What if it's null?
    this.variables[name] = new StringValue(value);
  }
};

ExprContext.prototype.getVariable = function(name) {
  if (typeof this.variables[name] != 'undefined') {
    return this.variables[name];

  } else if (this.parent) {
    return this.parent.getVariable(name);

  } else {
    return null;
  }
};

ExprContext.prototype.setNode = function(position) {
  this.node = this.nodelist[position];
  this.position = position;
};

ExprContext.prototype.contextSize = function() {
  return this.nodelist.length;
};

ExprContext.prototype.isCaseInsensitive = function() {
  return this.caseInsensitive;
};

ExprContext.prototype.setCaseInsensitive = function(caseInsensitive) {
  this.caseInsensitive = caseInsensitive;
  return this.caseInsensitive;
};

ExprContext.prototype.isIgnoreAttributesWithoutValue = function() {
  return this.ignoreAttributesWithoutValue;
};

ExprContext.prototype.setIgnoreAttributesWithoutValue = function(ignore) {
   this.ignoreAttributesWithoutValue = ignore;
   return ignore;
};

var xpathRules = [];

function xpathParseInit() {
  if (xpathRules.length) {
    return;
  }

  // Some simple optimizations for the xpath expression parser: sort
  // grammar rules descending by length, so that the longest match is
  // first found.

  xpathGrammarRules.sort(function(a,b) {
    var la = a[1].length;
    var lb = b[1].length;
    if (la < lb) {
      return 1;
    } else if (la > lb) {
      return -1;
    } else {
      return 0;
    }
  });

  var k = 1;
  for (var i = 0; i < xpathNonTerminals.length; ++i) {
    xpathNonTerminals[i].key = k++;
  }

  for (i = 0; i < xpathTokenRules.length; ++i) {
    xpathTokenRules[i].key = k++;
  }

  xpathLog('XPath parse INIT: ' + k + ' rules');

  // Another slight optimization: sort the rules into bins according
  // to the last element (observing quantifiers), so we can restrict
  // the match against the stack to the subest of rules that match the
  // top of the stack.
  //
  // TODO(mesch): What we actually want is to compute states as in
  // bison, so that we don't have to do any explicit and iterated
  // match against the stack.

  function push_(array, position, element) {
    if (!array[position]) {
      array[position] = [];
    }
    array[position].push(element);
  }

  for (i = 0; i < xpathGrammarRules.length; ++i) {
    var rule = xpathGrammarRules[i];
    var pattern = rule[1];

    for (var j = pattern.length - 1; j >= 0; --j) {
      if (pattern[j] == Q_1M) {
        push_(xpathRules, pattern[j-1].key, rule);
        break;

      } else if (pattern[j] == Q_MM || pattern[j] == Q_01) {
        push_(xpathRules, pattern[j-1].key, rule);
        --j;

      } else {
        push_(xpathRules, pattern[j].key, rule);
        break;
      }
    }
  }

  xpathLog('XPath parse INIT: ' + xpathRules.length + ' rule bins');

  var sum = 0;
  mapExec(xpathRules, function(i) {
    if (i) {
      sum += i.length;
    }
  });

  xpathLog('XPath parse INIT: ' + (sum / xpathRules.length) +
           ' average bin size');
}


// Sorts by all order criteria defined. According to the JavaScript
// spec ([ECMA] Section 11.8.5), the compare operators compare strings
// as strings and numbers as numbers.
//
// NOTE: In browsers which do not follow the spec, this breaks only in
// the case that numbers should be sorted as strings, which is very
// uncommon.
function xpathSortByKey(v1, v2) {
  // NOTE: Sort key vectors of different length never occur in
  // xsltSort.

  for (var i = 0; i < v1.key.length; ++i) {
    var o = v1.key[i].order == 'descending' ? -1 : 1;
    if (v1.key[i].value > v2.key[i].value) {
      return +1 * o;
    } else if (v1.key[i].value < v2.key[i].value) {
      return -1 * o;
    }
  }

  return 0;
}

// Utility function to sort a list of nodes. Used by xsltSort() and
// nxslSelect().
function xpathSort(input, sort) {
  if (sort.length === 0) {
    return;
  }

  var sortlist = [], i;

  for (i = 0; i < input.contextSize(); ++i) {
    var node = input.nodelist[i];
    var sortitem = { node: node, key: [] };
    var context = input.clone(node, 0, [ node ]);

    for (var j = 0; j < sort.length; ++j) {
      var s = sort[j];
      var value = s.expr.evaluate(context);

      var evalue;
      if (s.type == 'text') {
        evalue = value.stringValue();
      } else if (s.type == 'number') {
        evalue = value.numberValue();
      }
      sortitem.key.push({ value: evalue, order: s.order });
    }

    // Make the sort stable by adding a lowest priority sort by
    // id. This is very convenient and furthermore required by the
    // spec ([XSLT] - Section 10 Sorting).
    sortitem.key.push({ value: i, order: 'ascending' });

    sortlist.push(sortitem);
  }

  sortlist.sort(xpathSortByKey);

  var nodes = [];
  for (i = 0; i < sortlist.length; ++i) {
    nodes.push(sortlist[i].node);
  }
  input.nodelist = nodes;
  input.setNode(0);
}

var xpathParseCache = {};

function xpathCacheLookup(expr) {
  return xpathParseCache[expr];
}


function xpathMatchStack(stack, pattern) {

  // NOTE(mesch): The stack matches for variable cardinality are
  // greedy but don't do backtracking. This would be an issue only
  // with rules of the form A* A, i.e. with an element with variable
  // cardinality followed by the same element. Since that doesn't
  // occur in the grammar at hand, all matches on the stack are
  // unambiguous.

  var S = stack.length;
  var P = pattern.length;
  var p, s;
  var match = [];
  match.matchlength = 0;
  var ds = 0;
  var getExpr = function(m) { return m.expr; };
  for (p = P - 1, s = S - 1; p >= 0 && s >= 0; --p, s -= ds) {
    ds = 0;
    var qmatch = [];
    if (pattern[p] == Q_MM) {
      p -= 1;
      match.push(qmatch);
      while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
        qmatch.push(stack[s - ds]);
        ds += 1;
        match.matchlength += 1;
      }

    } else if (pattern[p] == Q_01) {
      p -= 1;
      match.push(qmatch);
      while (s - ds >= 0 && ds < 2 && stack[s - ds].tag == pattern[p]) {
        qmatch.push(stack[s - ds]);
        ds += 1;
        match.matchlength += 1;
      }

    } else if (pattern[p] == Q_1M) {
      p -= 1;
      match.push(qmatch);
      if (stack[s].tag == pattern[p]) {
        while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
          qmatch.push(stack[s - ds]);
          ds += 1;
          match.matchlength += 1;
        }
      } else {
        return [];
      }

    } else if (stack[s].tag == pattern[p]) {
      match.push(stack[s]);
      ds += 1;
      match.matchlength += 1;

    } else {
      return [];
    }

    reverseInplace(qmatch);
    qmatch.expr = mapExpr(qmatch, getExpr);
  }

  reverseInplace(match);

  if (p == -1) {
    return match;

  } else {
    return [];
  }
}

function xpathTokenPrecedence(tag) {
  return tag.prec || 2;
}

function xpathGrammarPrecedence(frame) {
  var ret = 0, p;

  if (frame.rule) { /* normal reduce */
    if (frame.rule.length >= 3 && frame.rule[2] >= 0) {
      ret = frame.rule[2];

    } else {
      for (var i = 0; i < frame.rule[1].length; ++i) {
        p = xpathTokenPrecedence(frame.rule[1][i]);
        ret = Math.max(ret, p);
      }
    }
  } else if (frame.tag) { /* TOKEN match */
    ret = xpathTokenPrecedence(frame.tag);

  } else if (frame.length) { /* Q_ match */
    for (var j = 0; j < frame.length; ++j) {
      p = xpathGrammarPrecedence(frame[j]);
      ret = Math.max(ret, p);
    }
  }

  return ret;
}
/*DGF xpathReduce is where the magic happens in this parser.
Skim down to the bottom of this file to find the table of 
grammatical rules and precedence numbers, "The productions of the grammar".

The idea here
is that we want to take a stack of tokens and apply
grammatical rules to them, "reducing" them to higher-level
tokens.  Ultimately, any valid XPath should reduce to exactly one
"Expr" token.

Reduce too early or too late and you'll have two tokens that can't reduce
to single Expr.  For example, you may hastily reduce a qname that
should name a function, incorrectly treating it as a tag name.
Or you may reduce too late, accidentally reducing the last part of the
XPath into a top-level "Expr" that won't reduce with earlier parts of
the XPath.

A "cand" is a grammatical rule candidate, with a given precedence
number.  "ahead" is the upcoming token, which also has a precedence
number.  If the token has a higher precedence number than
the rule candidate, we'll "shift" the token onto the token stack,
instead of immediately applying the rule candidate.

Some tokens have left associativity, in which case we shift when they
have LOWER precedence than the candidate.
*/
function xpathReduce(stack, ahead) {
  var cand = null, i;

  if (stack.length > 0) {
    var top = stack[stack.length-1];
    var ruleset = xpathRules[top.tag.key];

    if (ruleset) {
      for (i = 0; i < ruleset.length; ++i) {
        var rule = ruleset[i];
        var match = xpathMatchStack(stack, rule[1]);
        if (match.length) {
          cand = {
            tag: rule[0],
            rule: rule,
            match: match
          };
          cand.prec = xpathGrammarPrecedence(cand);
          break;
        }
      }
    }
  }

  var ret;
  if (cand && (!ahead || cand.prec > ahead.prec ||
               (ahead.tag.left && cand.prec >= ahead.prec))) {
    for (i = 0; i < cand.match.matchlength; ++i) {
      stack.pop();
    }

    xpathLog('reduce ' + cand.tag.label + ' ' + cand.prec +
             ' ahead ' + (ahead ? ahead.tag.label + ' ' + ahead.prec +
                          (ahead.tag.left ? ' left' : '')
                          : ' none '));

    var matchexpr = mapExpr(cand.match, function(m) { return m.expr; });
    xpathLog('going to apply ' + cand.rule[3].toString());
    cand.expr = cand.rule[3].apply(null, matchexpr);

    stack.push(cand);
    ret = true;

  } else {
    if (ahead) {
      xpathLog('shift ' + ahead.tag.label + ' ' + ahead.prec +
               (ahead.tag.left ? ' left' : '') +
               ' over ' + (cand ? cand.tag.label + ' ' +
                           cand.prec : ' none'));
      stack.push(ahead);
    }
    ret = false;
  }
  return ret;
}



function stackToString(stack) {
  var ret = '';
  for (var i = 0; i < stack.length; ++i) {
    if (ret) {
      ret += '\n';
    }
    ret += stack[i].tag.label;
  }
  return ret;
}

// Copyright 2005 Google Inc.
// All Rights Reserved
//
// An XPath parser and evaluator written in JavaScript. The
// implementation is complete except for functions handling
// namespaces.
//
// Reference: [XPATH] XPath Specification
// <http://www.w3.org/TR/1999/REC-xpath-19991116>.
//
//
// The API of the parser has several parts:
//
// 1. The parser function xpathParse() that takes a string and returns
// an expession object.
//
// 2. The expression object that has an evaluate() method to evaluate the
// XPath expression it represents. (It is actually a hierarchy of
// objects that resembles the parse tree, but an application will call
// evaluate() only on the top node of this hierarchy.)
//
// 3. The context object that is passed as an argument to the evaluate()
// method, which represents the DOM context in which the expression is
// evaluated.
//
// 4. The value object that is returned from evaluate() and represents
// values of the different types that are defined by XPath (number,
// string, boolean, and node-set), and allows to convert between them.
//
// These parts are near the top of the file, the functions and data
// that are used internally follow after them.
//
//
// Author: Steffen Meschkat <mesch@google.com>


// The entry point for the parser.
//
// @param expr a string that contains an XPath expression.
// @return an expression object that can be evaluated with an
// expression context.

function xpathParse(expr) {
  xpathLog('parse ' + expr);
  xpathParseInit();

  var cached = xpathCacheLookup(expr);
  var ret;
  
  if (cached) {
    xpathLog(' ... cached');
    return cached;
  }

  // Optimize for a few common cases: simple attribute node tests
  // (@id), simple element node tests (page), variable references
  // ($address), numbers (4), multi-step path expressions where each
  // step is a plain element node test
  // (page/overlay/locations/location).

  if (expr.match(/^(\$|@)?\w+$/i)) {
    ret = makeSimpleExpr(expr);
    xpathParseCache[expr] = ret;
    xpathLog(' ... simple');
    return ret;
  }

  if (expr.match(/^\w+(\/\w+)*$/i)) {
    ret = makeSimpleExpr2(expr);
    xpathParseCache[expr] = ret;
    xpathLog(' ... simple 2');
    return ret;
  }

  var cachekey = expr; // expr is modified during parse

  var stack = [];
  var ahead = null;
  var previous = null;
  var done = false;

  var parse_count = 0;
  var lexer_count = 0;
  var reduce_count = 0;
  var result;
  
  while (!done) {
    parse_count++;
    expr = expr.replace(/^\s*/, '');
    previous = ahead;
    ahead = null;

    var rule = null;
    var match = '';
    for (var i = 0; i < xpathTokenRules.length; ++i) {
      result = xpathTokenRules[i].re.exec(expr);
      lexer_count++;
      if (result && result.length > 0 && result[0].length > match.length) {
        rule = xpathTokenRules[i];
        match = result[0];
        break;
      }
    }

    // Special case: allow operator keywords to be element and
    // variable names.

    // NOTE(mesch): The parser resolves conflicts by looking ahead,
    // and this is the only case where we look back to
    // disambiguate. So this is indeed something different, and
    // looking back is usually done in the lexer (via states in the
    // general case, called "start conditions" in flex(1)). Also,the
    // conflict resolution in the parser is not as robust as it could
    // be, so I'd like to keep as much off the parser as possible (all
    // these precedence values should be computed from the grammar
    // rules and possibly associativity declarations, as in bison(1),
    // and not explicitly set.

    if (rule &&
        (rule == TOK_DIV ||
         rule == TOK_MOD ||
         rule == TOK_AND ||
         rule == TOK_OR) &&
        (!previous ||
         previous.tag == TOK_AT ||
         previous.tag == TOK_DSLASH ||
         previous.tag == TOK_SLASH ||
         previous.tag == TOK_AXIS ||
         previous.tag == TOK_DOLLAR)) {
      rule = TOK_QNAME;
    }

    if (rule) {
      expr = expr.substr(match.length);
      xpathLog('token: ' + match + ' -- ' + rule.label);
      ahead = {
        tag: rule,
        match: match,
        prec: rule.prec ?  rule.prec : 0, // || 0 is removed by the compiler
        expr: makeTokenExpr(match)
      };

    } else {
      xpathLog('DONE');
      done = true;
    }

    while (xpathReduce(stack, ahead)) {
      reduce_count++;
      xpathLog('stack: ' + stackToString(stack));
    }
  }

  xpathLog('stack: ' + stackToString(stack));

  // DGF any valid XPath should "reduce" to a single Expr token
  if (stack.length != 1) {
    throw 'XPath parse error ' + cachekey + ':\n' + stackToString(stack);
  }

  result = stack[0].expr;
  xpathParseCache[cachekey] = result;

  xpathLog('XPath parse: ' + parse_count + ' / ' +
           lexer_count + ' / ' + reduce_count);

  return result;
}


// Parses and then evaluates the given XPath expression in the given
// input context. Notice that parsed xpath expressions are cached.
function xpathEval(select, context) {
  var expr = xpathParse(select);
  var ret = expr.evaluate(context);
  return ret;
}

// The entry point for the library: match an expression against a DOM
// node. Returns an XPath value.
function xpathDomEval(expr, node) {
  var expr1 = xpathParse(expr);
  var ret = expr1.evaluate(new ExprContext(node));
  return ret;
}




__extend__(Document.prototype,{
    
    evaluate: function(xpathText, contextNode, nsuriMapper, resultType, result){
        log.debug('evaluate');
        var context = new ExprContext(contextNode),
            compiled = xpathParse(xpathText);
        result = new XPathResult(
            resultType, 
            compiled.evaluate(context)
        );
        return result;
    }

});

XPathExpression.prototype.evaluate = function(contextNode, resultType, result){
    
    var context = new ExprContext(contextNode);
    result = new XPathResult(
        resultType, 
        this.compiled.evaluate(context)
    );
    return result;
};

__compileXPath__ = function(xpathText, nsuriMap){
    return xpathParse(xpathText);
};

}());

    
/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
