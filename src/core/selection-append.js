d3_selectionPrototype.append = function(value) {
    if (typeof value === "function") {
     return this.each(function() {
        var v = value.apply(this, arguments);
        this.appendChild(v);
     });
    }
    else {
        tag_name = d3.ns.qualify(value);

        append = function() {
            return this.appendChild(document.createElementNS(this.namespaceURI, tag_name));
        }

        appendNS = function() {
            return this.appendChild(document.createElementNS(tag_name.space, tag_name.local));
        }

        return this.select(tag_name.local ? appendNS : append);
    }
};
