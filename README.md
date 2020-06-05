# search-helper

Created for simplify search operations.

git repo => https://github.com/emrejz/search-helper

### Installation

```sh
$ npm install -S search-helper
```

Examples:

```sh
const { searchHelper } = require("search-helper");

const list = [
  { name: "emre", bio: { type: "human" } },
  { name: "helin", bio: { type: "afeti-devran" } },
];

const keys = { name: "emre" };
var filteredList = searchHelper(list, keys);
//will return filteredList=[{name:"emre",bio:{type:"human"}}]

const keys1 = { name: "emre", bio: { type: "afeti-devran" } };
var filteredList = searchHelper(list, keys1);
//will return filteredList=[]
//beacuse strict paramater is true(by default). so not matched any item with this condition(keys1)

var filteredList = searchHelper(list, keys1, { strict: false });
//will return filteredList=[{name:"emre",bio:{type:"human"}},
//                       {name:"helin",bio:{type:"afeti-devran"}}]
// strict paramater is false(by user). so can do multi search with this condition(keys1)

const keys3 = "afeti-devran";
var filteredList = searchHelper(list, keys3);
//returned filteredList=[{name:"helin",bio:{type:"afeti-devran"}}]
// if keys parameter is a string, it will look at all fields


```

### Todos

- writable better algorithm
- writable better clean code
