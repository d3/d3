var d3_QL = function(array, opts){
  opts = opts || {};
  // if opts.deferred is true
  // TODO: use deferred and operate arbitary functions in select when use group
  
  if(!array instanceof Array)
    array = [array];

  for(var method in d3_QL.prototype){
    array[method] = d3_QL.prototype[method];
  }
  return array;
};
d3_QL._keyDelimiter = '_$_';
d3_QL._genFieldsNameGen = function(/* array */ fields){
  var len = fields.length;
  return function(obj){
    var fieldsName = [];
    for(var i = 0; i < len; i++){
      if(obj.hasOwnProperty(fields[i])){
        fieldsName.push(obj[fields[i]]);
      }else{
        return false;
      }
    }
    return fieldsName.join(d3_QL._keyDelimiter);
  };
};
d3_QL._insertGroupFields = function(/* object */ retObj, /* array */ fields, /* string */ keyName){
  var keys = keyName.split(d3_QL._keyDelimiter);
  for(var i = 0, l = keys.length; i < l; i++){
    retObj[fields[i]] = keys[i];
  }
};

d3_QL.prototype.select = function(/* hash */ fields){
  var keys = d3.keys(fields)
  , keylen = keys.length;

  var resArray = [];
    for(var i = 0, l = this.length; i < l; i++){
      var row = this[i];
      var obj = {};
      for(var j = 0; j < keylen; j++){
        obj[keys[j]] = row[keys[j]];
      }
      resArray.push(obj);
    }
  return new d3_QL(resArray);
};
d3_QL.prototype.where = function(/* hash or function*/ cond){
  var resArray = [];
  for(var i = 0, l = this.length; i < l; i++){
    if(this._matchCond(this[i], cond)){
      resArray.push(this[i]);
    }
  }
  return new d3_QL(resArray);
};
d3_QL.prototype.join = function(/* data array */ array, /* hash */ onCond){
};
d3_QL.prototype.order = function(/* hash */ orders){
  var _orders = orders;
  if(typeof orders !== 'function'){
    // {'store number': 1}
    _orders = function(a, b){
        var result = true;
      for(var key in orders){
        if(orders.hasOwnProperty(key) && a.hasOwnProperty(key) && b.hasOwnProperty(key)){
          result = result && (orders[key] > 0 ? (a[key] > b[key]) : (a[key] < b[key]));
        }
      }
      return result;
    };
  }

  return new d3_QL(this.sort(_orders));
};
d3_QL.prototype.group = function(/* group fields array */ fields, /* operation hash */ ops, /* init hash */ init){
  var len = this.length;
  var _retHash = {};
  var genFieldsName = d3_QL._genFieldsNameGen(fields);

  for(var i = 0; i < len; i++){
    var key = genFieldsName(this[i]);
    if(key){
        if(!_retHash.hasOwnProperty(key))
          _retHash[key] = {};
      for(var k in ops){
        if(!ops.hasOwnProperty(k))
          break;
        if(!_retHash[key].hasOwnProperty(k))
          _retHash[key][k] = init[k] || 0;
        _retHash[key][k] = ops[k](_retHash[key][k], this[i]);
      }
    }
  }
  var retArray = [];
  for(var key in _retHash){
    var obj = _retHash[key];
    d3_QL._insertGroupFields(obj, fields, key);
    retArray.push(obj);
  }
  return new d3_QL(retArray);
};
d3_QL.prototype.distinct = function(/* string */ field, /* boolean */ sorted){
  var keys = {};
  sorted = sorted || false;
  for(var i = 0, l = this.length; i < l; i++){
    if(this[i].hasOwnProperty(field))
      keys[this[i][field]] = true;
  }
  return d3.keys(keys).sort();
};
d3_QL.prototype.count = function(){
    return this.length;
};

d3_QL.prototype._matchCond = function(obj, cond){
  for(var key in cond){
    if(cond.hasOwnProperty(key)){
      if(!obj.hasOwnProperty(key))
        return false;
      
      if(typeof cond[key] === 'function'){
        if(!cond[key](obj[key]))
          return false;
      }else if(cond[key] instanceof RegExp){
        if(!obj[key].match(cond[key]))
          return false;
      }else if(typeof cond[key] === 'object'){
      }else{
        if(obj[key] !== cond[key]){
          return false;
        }
      }
    }
  }
  return true;
};

d3.ql = function(array){
  return new d3_QL(array);
};
