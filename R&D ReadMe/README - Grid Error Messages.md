#Show diffrent kind of Error Messages in a Grid.


#How grid's noDataFound message works?

**CASE: Using Grid.js**

```js
window.grid = new (declare([Grid]))({
	//store:  testStore,
	columns: {
		id: "ID",
				col1: 'Column 1',
				col2: {label: 'Column2', sortable: false},
				col3: 'Column 3',
				col4: 'Column 4',
	},
	loadingMessage: "Loading data...",
	noDataMessage: "<h1 class='dgrid-no-data'>No results found.</h1>"
}, "grid");
grid.refresh(); 
//grid.renderArray(testStore.data);
```

**OUTPUT:**




**EXPLANATION:**

**Grid** doesn’t support  `NoDataMessage`  that’s why, with normal grid Message won’t get displayed when query yields no result.

But in case of OnDemandGrid, message of NoDataMessage will be displayed on the screen.

**REASON:**

There is some part of code, in the code of OnDemandGrid and Pagination as well that is not there in Grid itself,
That is discussed below.


**CASE: Using OnDemandGrid**

```js
window.grid = new (declare([OnDemandGrid]))({
	//store:  testStore,
	columns: {
		id: "ID",
				col1: 'Column 1',
				col2: {label: 'Column2', sortable: false},
				col3: 'Column 3',
				col4: 'Column 4'
	},
	loadingMessage: "Loading data...",
	noDataMessage: "<h1 class='dgrid-no-data'>No results found.</h1>"
}, "grid");
grid.refresh();
//grid.renderArray(testStore.data);
```

**OUTPUT:**

 

**EXPLANATION:**

Here when we are using **OnDemandGrid**, and query is yielding no result then `NoDataMessage` will be displayed, grid will show a message - **No results found**.

**REASON:**

There is something in the code of OnDemandGrid which is supporting `NoDataMessage` feature.

The Code is in **OnDemandList.js** inherited by **onDemandGrid** in the function

  **renderQuery: function(query, options)**

```js
if(total === 0){
	if(noDataNode){
			put(noDataNode, "!");
			deleteself.noDataNode;
	}
	self.noDataNode = noDataNode = put("div.dgrid-no-data");
	parentNode.insertBefore(noDataNode, self._getFirstRowSibling(parentNode));
	noDataNode.innerHTML = self.noDataMessage;
}
```

**CASE: Grid with Pagination**

```js
window.grid = new (declare([Grid,Pagination]))({
	//store:  testStore,			
		columns: {
		id: "ID",
				col1: 'Column 1',
				col2: {label: 'Column2', sortable: false},
				col3: 'Column 3',
				col4: 'Column 4'
	},
	loadingMessage: "Loading data...",
	noDataMessage: "<h1 class='dgrid-no-data'>No results found.</h1>"
}, "grid");
grid.refresh();
```

**OUTPUT:**
 



**EXPLANATION:**

Only **Grid(grid.js)** does not support `NoDataMessage`, hence no message,
But the interesting part is when we include **Pagination** with Grid it started supporting `NoDataMessage` and we are getting message on our screen as **No results found**.

**REASON:**
There is something in the code of Pagination that is also there in OnDemandGrid that allow them to support NoDataMessage.
That we need to find out.









#Displaying  different messages in a Grid.

We researched and found the snippet below reponsible for showing a message in a Grid defined in OnDemandList.js in the function:
**renderQuery: function(query, options)**

We have copied it and modified it to make it work to show diffrent messages in grid.

```js
if(total === 0){
	if(noDataNode){
		put(noDataNode, "!");
		deleteself.noDataNode;
   }
	self.noDataNode = noDataNode = put("div.dgrid-no-data");
	parentNode.insertBefore(noDataNode, self._getFirstRowSibling(parentNode));
	noDataNode.innerHTML = self.noDataMessage;
 }
```

We have added diffrent messages to the Grid as:

```js
varStandardGrid = declare([Grid, Selection, Keyboard]);
var grid = window.grid = new StandardGrid({
	sort: "id",
	store: testStore,
	columns: columns,
	sort: "col3", // initially sort by col3 ascending
	noDataMessage: "Nobody here but us chickens!",
	loadingMessage: "Loading...",
	signingoogledrive: "please firstly sign in google drive",
	notemplatefound: "no template found"
}, "grid");

grid.on("dgrid-error", function(evt) {
	console.warn("error on grid: ", evt.error);
	console.warn("sign in googledrive",evt.error.msg);
	var self=grid;
	var noDataNode= self.noDataNode;
	var preloadNode= self.preload.node.parentNode;
	console.log("self.preload is",self.preload);
	var parentNode= preloadNode.parentNode;
	if(noDataNode){
		put(noDataNode, "!");
		deleteself.noDataNode;
	}
	self.noDataNode = noDataNode = put("div.dgrid-no-data");
	parentNode.insertBefore(noDataNode, self._getFirstRowSibling(parentNode));
	noDataNode.innerHTML = self[evt.error.message];
});
```

Here we  are  using **errorStores.js** as a server
The piece of code we are using from it is:

```js
asyncQueryStore.query = function() {
	var dfd = new Deferred();
	setTimeout(function() { dfd.reject("signingoogledrive"); }, 200);
	
	var results = new QueryResults(dfd.promise);
	results.total = 0;
	return results;
};
```
**OUTPUT:**


**CONCLUSION:**

We can display different messages  according  to our requirement  in a Grid.
