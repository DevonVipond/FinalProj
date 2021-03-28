function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
}
function isFunction(lambda ) {
 return lambda && {}.toString.call(lambda) === '[object Function]';
}

function isObject ( myObject ) {
   return myObject && (typeof myObject  === "object");
}
const TYPES = {
  NUMBER: (data)=>(typeof data)==='number'&&!isNaN(data),
  STRING: (data)=>(typeof data)==='string',
  DATE:   (data)=>(typeof data)==='date',
  BOOL:   (data)=>(typeof data)==='boolean',
  OBJECT: (data)=>(typeof data)==='object'
};

const validateType = (value, expectedTypeValidator)=> {
    if(!value || !expectedTypeValidator(value))
        throw Error('Invalid type for argument: ' + value)
}
module.exports = {validateType, TYPES}