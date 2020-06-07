let filterCond = null;
let tempPaths = [];
let tempObj = [];
let paths = [];

function isValidCondition() {
  return (
    (typeof filterCond == "object" ||
      typeof filterCond == "number" ||
      typeof filterCond == "string") &&
    !Array.isArray(filterCond)
  );
}
function isNoObjCondition() {
  return typeof filterCond == "number" || typeof filterCond == "string";
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
  let isValidItem = true;
  let isNoObjCond = isNoObjCondition();
  for (let i = 0; i < paths.length; i++) {
    let element = item;
    let filter = filterCond;
    for (let j = 0; j < paths[i].length; j++) {
      element = element[paths[i][j]];
      filter = isNoObjCond ? filter : filter[paths[i][j]];
      if (filter != null) {
        if (j == paths[i].length - 1) {
          if (strict) {
            isValidItem = isValidItem * (element == filter);
          } else {
            isValidItem = element == filter;
            if (isValidItem) {
              return true;
            }
          }
        }
      }
    }
  }
  return isValidItem;
}

function searchHelper(array, condition, options = {}) {
  filterCond = condition;
  if (!isValidCondition()) {
    throw new Error("Condition must be string, number or object");
  }
  if (options.strict == undefined) {
    options.strict = true;
  }
  let { strict } = options;
  if (typeof strict != "boolean") {
    throw new Error("Strict option must be boolean");
  }
  const isNoObjCond = isNoObjCondition();
  isNoObjCond ? (strict = false) : strict;
  findObjKeys(isNoObjCond ? array[0] : condition);
  if (Array.isArray(array)) {
    return array.filter((item) => filteredItem(item, paths, strict));
  } else {
    throw new Error("Your list must be an array");
  }
}

module.exports = searchHelper;
