# search-helper

Created for simplify search operations.

### Installation

```sh
$ npm install -S search-helper
```

Examples:

```sh
 import {searchHelper} from "search-helper"

 const list=[{name:"emre",bio:{type:"human"}},
            {name:"helin",bio:{type:"afeti-devran"}}]

 const keys={name:"emre"}
 let filteredList=searchHelper(list,keys)
 //returned filteredList=[{name:"emre",bio:{type:"human"}}]

 const keys1={name:"emre",bio:{type:"afeti-devran"}}
 let filteredList=searchHelper(list,keys1)
  //returned filteredList=[]
  //beacuse strict paramater is true(by default). so not matched any item with this condition(keys1)

 var filteredList=searchHelper(list,keys1,{strict:false})
  //returned filteredList=[{name:"emre",bio:{type:"human"}},
  //                       {name:"helin",bio:{type:"afeti-devran"}}]
  // strict paramater is false(by user). so can do multi search with this condition(keys1)


 const keys3="afeti-devran"
 var filteredList=searchHelper(list,keys3)
  //returned filteredList=[{name:"helin",bio:{type:"afeti-devran"}}]

```

### Todos

- writable better algorithm
- writable better clean code
