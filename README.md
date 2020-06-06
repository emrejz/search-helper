# search-helper

Created for simplify search operations.

### Installation

```sh
$ npm install -S search-helper
```

### Usage

```sh
const searchHelper = require("search-helper");
const filteredList = searchHelper(array,condition,options)

array => must be a list of objects
condition => must be a string or an object
options => must be an object and and have one parameter(strict)
```

### Options

```sh
strict => must be a boolean(true/false). its true by default.
if strict is true, condition works like and gate
if strict is false, condition works like or gate
```

### Examples

```sh
const searchHelper = require("search-helper");

const list = [
  { name: "emre", bio: { type: "human" } },
  { name: "george floyd", bio: { type: "human" } },
  { name: "helin", bio: { type: "afeti-devran" } },
];

const keys = { name: "emre" };
var filteredList = searchHelper(list, keys);
// it will return filteredList=[{name:"emre",bio:{type:"human"}}]

const keys1 = { name: "helin", bio: { type: "human" } };
var filteredList = searchHelper(list, keys1);
// it will return filteredList=[]
// beacuse strict paramater is true(by default).
// so its not matched any item with this condition(keys1)

var filteredList = searchHelper(list, keys1, { strict: false });
// it will return filteredList=[{name:"emre",bio:{type:"human"}},
//                          {name:"george floyd",bio:{type:"human"}},
//                          {name:"helin",bio:{type:"afeti-devran"}}]
// strict paramater is false(by user).
// so you can do multi search with this condition(keys1)

const keys3 = "afeti-devran";
var filteredList = searchHelper(list, keys3);
// it will return filteredList=[{name:"helin",bio:{type:"afeti-devran"}}]
// if keys parameter is a string, it will look at all fields


```

### Todos

- writable better algorithm
- writable better clean code

### Contact

if you find a problem, please contact me with this email.
emre.kayacan@msn.com
