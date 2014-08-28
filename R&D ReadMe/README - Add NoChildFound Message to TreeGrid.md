#How can we display messages for child in tree grid which further has no more childs.

**Requirement:**
We need to display a Folder-File Structure using a TreeGrid. A normal Grid has an options to display message when data is empty as `noDataMessage`, we need to show similar kind of messages for **Every parent Row**.

**Problems:**

1. Do this in a **Tree Grid**
2. **Grid** natively supports **One Message** at a time(Only one div to show Message)
3. Extend **Tree.js**.


#Add Carat to those nodes who are at leaf.

By defaut if a **Parent** has **No Child** then there should be no **Carat**, if we don't have **Carat**, how can we allow user to click on it and to show - **No Child Message** when it gets expanded.


**STEP 1:**
we made it possible by altering the function **mayHaveChildren** in **base.js** as:

```js
    mayHaveChildren:function(parent){
        return parent.type !="message"; // parent.type !="city"
    }
```

**CONCLUSION:**
    After this, we got the **Carat** for those nodes which further has no more child.
        
**STEP 2:**

**CASE 1:**
  Now, we want that when we click on that **Carat** a **New Row** should get inserted which we can use to display message.

  For this, we modified **tree.js**

```js
    ...
    if(grid.renderQuery){                    
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
We checked, which part of code in **tree.js** is responsible for adding rows as Tree like structure. We found the above code snippet and added a condition to check if there is any result or not.

        if(grid.renderQuery(query, options).forEach.length == 0) {
        //Condition - No Results

If no result then return a Data in such a way as needed by tree grid to insert a new row as done in **base.js**

        this.queryEngine(query, options)([obj])
        //Insert new row code - Data as returned by `store.query`

**CONCLUSION:**

**Failed** - Reason?, we had no Reason it should work perfectly but it doesn't. We thought that we should use and return a **Deferred** directly instead of using queryEngine. Moreover, ``this don't have a function queryEngine


**CASE 2:**
                                                    
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
We used **Deferred** and resolved it with our Dummy Data and returned it using **QueryResult**
                                                             
**CONCLUSION:**

**Failed** - Reason?, we again had no Reason it should work perfectly but it doesn't. We thought to use `def.`forEach type and use some Flags to control some conditions.


**Case 3:**
                                               
```js
if (grid.renderQuery) {
    var_found = false;
    grid.renderQuery(query, options).forEach(function(res) {
        _found = true;
    })
    if (!_found) {
        var _d = new Deferred();
        _d.resolve([{
            id: 'eretert',
            parent: undefined,
            name: "No Data",
            type: "message"
        }])
        return QueryResults(_d)
    }
    return grid.renderQuery(query, options);
}
 ```
 
**EXPLANATION:**       
Do `def.ForEach`, if ``forEach gets executed it means we have **Children** and set **Flag to true**.
if **Flag** is **false** then ``return our Custom Data to insert a new Row to display message. 

**CONCLUSION:**
By using this code, we didn't required result, that's why we used another segment of code.


**Case 4:**
```js
if (grid.renderQuery) {
    var _found = false;
    grid.renderQuery(query, options).forEach(function(res) {
        _found = true;
        console.log('asdsd')
    })
    console.log(_found, '_found')
    if (!_found) {
        var _d = new Deferred();
        _d.resolve([{
            id: 'eretert',
            parent: undefined,
            name: "No Data",
            type: "message"
        }])
        return _d
    }
    console.log('returned')
    return grid.renderQuery(query, options);
}
```
  
**Explanation:**

**Failed** - `grid.`renderQuery returns a **Deferred** whick takes adds some delays
and till it gets executed completely the `return` statement below it gets execute and thats why we have't get any **Row** yet instead of using all **Surely Correct Code**.

**CONCLUSION:**
**Modifying `tree.js` is not a Solution** because whatever condition we will apply at or before

    return grid.renderQuery(query, options);

we have to resolve that **Deferred** and by the time **Deferred** gets resolved the `return` statement will get executed early due to **delay** in resolving **Deferred**.


**CASE 5:**
Then we switched to **base.js**, we modified **query** function as

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

    var_res =  this.queryEngine(query, options)(this.data);

returns Array of child Objects, to resolve our issue, we explicitly returned a single object with Message to be displayed and It works. Finally, We got the only solution for displaying Messages under Each Parent with no Child. We can also use it for other conditions and messages.

**CONCLUSION:**
    After this, we successfully got the new row and message can be displayed very easily.

**STEP 3:**
  Now, our task was to hide all the other columns except the one with the message to be displayed.

**CASE 1:**
  First we tried with **customFormatter**,

  we used **css properties**, as follows, **to hide the data and border as well,** for each column of that particular row, except the one with the message to be displayed.

```css
.formatter {
    display: none;
    border: 0px;
}
```
We used **customFormatter** function in only one column of the tree grid, i.e. column with **label: "Type"**. 

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
]
```         
                        
The **customFormatter** is defined as follows, that will hide the data and border for the new row excpt the cell with the Message to be displayed.

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
   Infact we tried, the same thing with **customRenderCell**, but the result    was same.
    
**CASE 2:** 
In this, we used **aspect.after** and **setTimeout**, after the creation of treegrid.

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
We are using the id of that particular row which has the message to be displayed, With this we got the id of each column of that row. After that just by using the Id of the Column used for Displaying message we can easily remove all the other cells of that row.

**CONCLUSION:**     
By using this code, we got the message to be displayed when Parent Row further has no more child, with extra columns Removed for that particular row.

