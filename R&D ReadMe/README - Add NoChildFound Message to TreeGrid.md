#How we can display messages for child in tree grid which further has no more childs.

**STEP 1:**
  Firstly our task was to add carat to those nodes who are at leaf.
  we made it possible my alter the function **mayHaveChildren** in **base.js** as follows:
```js
  mayHaveChildren:function(parent){
			return parent.type !="message"; // parent.type !="city"
		}
```

**CONCLUSION:**
	After this, we got the carat for those nodes which further has no more child.
		
**STEP 2:**
**CASE 1:**
  Now, we want that when we click on that carat a new row will be inserted in which we can add message which we want to   display.
  For this, firstly we used **tree.js**
```js
 if(grid.renderQuery){                    
          console.log(grid.renderQuery(queryoptions).forEach.length, '*')
          if(grid.renderQuery(query, options).forEach.length == 0) {
                  var obj = {};
                  obj[grid.store.idProperty] = "test_" + query.parent;
                  for(each in grid.columns) {
                           obj[each] = "No Data FOund"
                   } 
                  this.queryEngine(query, options)([obj])
          }
                  return grid.renderQuery(query, options);
   }
 ```  
**EXPLANATION:**                            
                                                                                                                  
**CONCLUSION:**
 By using this code, we didn't required result, that's why we used another segment of code.
 ```js
 if(grid.renderQuery){
          console.log(grid.renderQuery(query, options).forEach.length, '*')
          if(grid.renderQuery(query, options).forEach.length == 0) {
                   var obj = {};
                   obj[grid.store.idProperty] = "test_" + query.parent;
                   for(each in grid.columns) {
                           obj[each] = "No Data FOund"
                   }
                   return grid.store.queryEngine(query, options)(obj))
          }
           return grid.renderQuery(query, options);
   }
  ``` 
**EXPLANATION:**  
                                              
**CONCLUSION:**
  By using this code, we didn't required result, that's why we used another segment of code.
 ```js
 if(grid.renderQuery){
           console.log(grid.renderQuery(query, options).forEach.length, '*')
           if(grid.renderQuery(query, options).forEach.length == 0) {
               return [{
                   id:'eretert',
                   parent:undefined,
                   name:"No Data",
                   type:"message"
               }]
            }
   }
  ``` 
**EXPLANATION:**  
                                                    
**CONCLUSION:**
   By using this code, we didn't required result, that's why we used another segment of code.                                                    
  ```js
 if(grid.renderQuery(query, options).forEach.length == 0) {
          var _d = new Deferred();
          _d.resolve([{
                           id:'eretert',
                           parent:undefined,
                           name:"No Data",
                           type:"message"
                      }])
             
           return d = QueryResults(_d)
   }  
  ``` 
**EXPLANATION:**  
                                                             
**CONCLUSION:**
  By using this code, we didn't required result, that's why we used another segment of code.
 ```js                                             
if(grid.renderQuery){
         console.log(grid.renderQuery(query, options).forEach.length, '*')
         if(grid.renderQuery(query, options).forEach.length == 0) {
                 var _d = new Deferred();
                 _d.resolve([{
                                 id:'eretert',
                                 parent:undefined,
                                 name:"No Data",
                                 type:"message"
                         }
                 ])
                 return QueryResults(_d)
         }
  } 
 ``` 
**EXPLANATION:**  
                                                     
**CONCLUSION:**
  By using this code, we didn't required result, that's why we used another segment of code.                                               
 ```js
if(grid.renderQuery){
         console.log(grid.renderQuery(query, options).forEach.length, '*')
         var_found = false;
         grid.renderQuery(query, options).forEach(function(res) {
                 _found = true;
         })
         if(!_found) {
                 var _d = new Deferred();
                 _d.resolve([{
                                 id:'eretert',
                                 parent:undefined,
                                 name:"No Data",
                                 type:"message"
                         }
                 ])
                 return QueryResults(_d)
         }
          return grid.renderQuery(query, options);
  } 
 ```
 
 **EXPLANATION:**       
                                                 
                                               }
**CONCLUSION:**
  By using this code, we didn't required result, that's why we used another segment of code.
```js
if(grid.renderQuery){
         var _found = false;
         grid.renderQuery(query, options).forEach(function(res) {
                 _found = true;
                 console.log('asdsd')
         })
         console.log(_found, '_found')
         if(!_found) {
                 var _d = new Deferred();
                 _d.resolve([{
                                 id:'eretert',
                                 parent:undefined,
                                 name:"No Data",
                                 type:"message"
                         }
                 ])
                 return _d
         }
         console.log('returned')
         return grid.renderQuery(query, options);
  }
  ```
  
**FINAL CONCLUSION:**
	we tried all the above mentioned code bt unfortunately, all of them fails.
	after all this, we can finally conclude that this task won't be possible in **tree.js**
**REASON:**	
As deferred 
    		











**CASE 2:**
  Then we switch to **base.js**, in **query** function,
  we did the following query,
```js
var _res = this.queryEngine(query, options)(this.data);
			if(_res.length==0) {
				return [{
				id:"test_" + query.parent,
				name:"No More Child Found.",
				type:"message"
			}]	
			}
			return this.queryEngine(query, options)(this.data);
		}
```		
  
**EXPLANATION:**
	**var_res =  this.queryEngine(query, options)(this.data);**
  	 returns the object refering to each child and the number of child each parent node have, when we reached the node which has no more further childs,
	then **_res** will have **no objects** and **number of child will be 0**,
	   by using this thing i.e. **when _res.length==0**
	   we are creating a new row with **id  "test_"** with **type message** and **name will be message only that we want to get displayed.**

**CONCLUSION:**
	After this, we successfully got the new row nd message can be displayed very easily.

**STEP 3:**
  Now, our task was to hide all the other columns except the one with the message to be displayed.

**CASE 1:**
  Firstly we tried with **customFormatter**,
  we used **css properties**, as follows, **to hide the data and border as well,** for each column of that particular row, except the one with the message to be displayed.
      .formatter {
				display: none;
				border: 0px;
			}
	 we are using **customFormatter function** in only one column of the tree grid, i.e. column with **label: "Type"**. 
```js
		columns: [
	tree({
		label: "Name",
		field: "name",
		sortable: false
	}),
	editor({
		label: "Visited",
		field: "bool",
		sortable: false
	}, "checkbox"), {
		label: "Type",
		field: "type",
		sortable: false,
		formatter: customFormatter
	}, {
		label: "Population",
		field: "population"
	}, {
		label: "Timezone",
		field: "timezone"
	}
],

```			
						
The **customFormatter Function** is being defined as follows, that will hide the data and border for the new row with message to be displayed only.
```js
    function customFormatter(data,object){
						if(object.type=="message"){
						console.log("data is", data);
						return '<div class="outer"><span class="formatter">' +
							("" + data).replace(/</g, "&lt;") + "</span></div>";
					   }
						else
							return data;
		}
```
	
**EXPLANATION:**
   We succeed in hiding the text, but border was still there, that's why we dropped the idea.
       
 **CONCLUSION:**
   Infact we tried, the same thing with customRenderCell, but the result    was same.
    
**CASE 2:** 
		In this, we used **aspect.after** and **setTimeout function**, after the creation of treegrid.
```js
aspect.after(treeGrid, "insertRow", function(m, x){
					console.log("aspect called", x[0].id);
					var _this = treeGrid;
					var _id = x[0].id;
					if(_id == "test_Cairo") {
						setTimeout(function() {
							for(each in _this.columns) {
								console.log(_this.cell(_this.row(_id), each).column.id)
								if(_this.cell(_this.row(_id), each).column.id!=0) {
									if(_this.cell(_this.row(_id), each).element) {
										_this.cell(_this.row(_id), each).element.remove();
									}
								}
							}
						}, 100)
					}
					return m;
	});
```	

**EXPLANATION:**
		We are using the id of that particular row which has the message to be displayed,
    With this we are getting the id of each column of that row.
    After that just by knowing the id of the column displaying message when can easily remove all the other columns.

**CONCLUSION:**		
		By using this code,
		we got only the message to be displayed when node further has no more child, as all other columns for that particular row are being deleted.
		 		

			      
       
	 
	 
 


