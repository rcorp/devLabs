#Drag and Drop templates from Tree Grid to another Grid, which is not using any store.

**STEP 1:**

Firstly, we did the complete R&D on **DnD_tree.html**
 
**EXPLANATION:**

**From DnD_tree.html,**
	  We extracted the code to be added in Tree Grid, so that we can Drag       
	  rows from this Tree Grid and Drop into another Grid.

```js
dndParams: {
	allowNested: true, 
	checkAcceptance: function(source, nodes) {
	return source !== this; // Don't self-accept.
	}
}
```
	
		
**CONCLUSION:**

By using above mentioned piece of code, we succeed in Dragging the rows from Tree Grid, Parent as well as Child.
	
**On** further **R&D** on **DnD_tree.html**				
Then we tried Dropping the rows in a Normal List or Grid, which don't have Store.

**EXPLANATION:**

Code being firstly used by us,
```js
	window.targetgrid = new DnDList({
		sort: "order",
		//	store: createOrderedStore(),
		renderRow: function(object) {
			return put("div", object.name);
		},
		dndParams: {
			isSource: false
		}
	}, "targetlist");  
```

**CONCLUSION:**	
   
In this Code, we commented the **Store**, i.e. list is not using any store. Then i used Grid instead of List in the same manner. But we concluded that in **Grid and List**, we can't Drop rows, if they are not using store. If **store** is there, then this task can easily be performed.

**STEP 2:**

Then we did complete R&D on **DnD.html** There i found the concept of DnDSource.
                                  
**EXPLANATION:**

We created a normal div using **DnDSource, HTML, CSS**
    
Code being used is:

```css
#another-target, #another-source, #invalid-source {
	float: left;
	width: 204px;
	height: 200px;
	margin-right: 5px;
	border: 1px solid green;
}		
```

```js
	var source = new DnDSource("another-source", {
		accept: ["dgrid-row"]
	});
```

**CONCLUSION:**

By using this code, we succeed in **Dropping** the rows from Tree Grid to normal div, **Parent** as well as **Child**.

**STEP 3:**

Now our task was to get those Rows being **Dropped** in the **Div** from the **Tree Grid**.
  
**CASE 1:**  

We tried the same thing by adding the following code in the function: **checkAcceptance: function(source,nodes)**
   
 **EXPLANATION:**

Code being added is:

```js
dndParams: {
	checkAcceptance: function(source, nodes) {
		console.log("row being dropped is", nodes[0].id);
		return source !== this; // Don't self-accept.
	},
},
```                                          

**CONCLUSION:**

By using this, we succeed in getting the **id** of row being  **Dropped.**
     
**CASE 2:**

But we wanted to perform the same thing using **events**, so that we can dynamically alter the code. For this, we added the code firstly in the code of div being formed
using source.

**EXPLANATION:**

Code added is:
```js
	var anotherSourceDiv = document.getElementById("another-source");
	var source = new DnDSource("another-source", {
		accept: ["dgrid-row"],
		isSource:false,
		onDrop: function(source, nodes){
			nodes.forEach(function(node)
			anotherTargetDiv.innerHTML = "Dropped " +     
			source.getItem(node.id).data.name;
		});
	});

```

**CONCLUSION:**

By using this, we were getting the required result. But the problem was still, that we can't alter the code dynamically.
     
**CASE 3:**

We find out the alternative, by using **"dojo/dnd/Moveable"** and **"dojo/aspect"**.
    
**EXPLANATION:**  

In this, event is being used i.e. **"onDropExternal"**

Code is:

```js
	aspect.after(source, "onDropExternal", function(source,nodes,copy){		
		console.debug("Start moving m1", source, nodes[0].id);
	}, true);    
 ```                                                         

**CONCLUSION:**

After this, we finally we succeed **Dragging and Dropping** rows along with the **id** of rows being **Dropped.**.
