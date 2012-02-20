var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix,
        local;
    if (i < 0) {
      return d3_nsPrefix.hasOwnProperty(name)
          ? {space: d3_nsPrefix[name], local: name} : name;
    }
    var prefix = name.substring(0, i),
        local = name.substring(i + 1);
    return {
      space: d3_nsPrefix.hasOwnProperty(prefix)
          ? d3_nsPrefix[prefix] : undefined,
      local: local
    };
  }
};
