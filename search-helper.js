let filterCond = null;
let tempPaths = [];
let tempObj = [];
let paths = [];

function isNoObject() {
  return typeof filterCond != "object";
}

function findObjKeys(obj) {
  const keys = Object.keys(obj);
  for (let index = 0; index < keys.length; index++) {
    const element = obj[keys[index]];
    if (typeof element == "object" && !Array.isArray(element)) {
      tempObj = [...tempObj, keys[index]];
      findObjKeys(obj[keys[index]]);
    } else {
      tempPaths.push([...tempObj, keys[index]]);
    }
    if (index == keys.length - 1) tempObj.pop();
  }
  paths = [...paths, ...tempPaths];
  tempPaths = [];
  return paths;
}

function filteredItem(item, paths, strict) {
  let final = true;
  let isStr = isNoObject();
  for (let i = 0; i < paths.length; i++) {
    let element = item;
    let filter = filterCond;
    for (let j = 0; j < paths[i].length; j++) {
      element = element[paths[i][j]];
      filter = isStr ? filter : filter[paths[i][j]];
      if (filter != null) {
        if (j == paths[i].length - 1) {
          if (strict) {
            final = final * (element == filter);
          } else {
            final = element == filter;
            if (final) {
              return true;
            }
          }
        }
      }
    }
  }
  return final;
}

function searchHelper(array, keys, options = {}) {
  filterCond = keys;
  const isStr = isNoObject();
  if (options.strict == undefined) options.strict = true;
  let { strict } = options;
  if (typeof strict != "boolean")
    throw new Error("Strict option must be boolean");
  isStr ? (strict = false) : strict;
  findObjKeys(isStr ? array[0] : keys);
  if (Array.isArray(array)) {
    return array.filter((item) => filteredItem(item, paths, strict));
  } else {
    throw new Error("Your list must be an array");
  }
}

module.exports = searchHelper;
