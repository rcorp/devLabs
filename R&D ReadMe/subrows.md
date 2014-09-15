#Documentation: SubRows

**STEP 1:**
 Intro to SubRows:
 
**EXPLANATION:**
We used the concept of **subrows** to display the **columns vertically.**
In this,we are defining the following  function and using this instead of **defining the columns** in **treeGrid**.
```js
	function getSubRows(){
		return[
						[
					tree({label:"User", field:"user", sortable: false,colSpan:10}),
					{label:"Edit", field:"editor", sortable: false,colSpan:10},
					{label:"Delete", field:"delete",colSpan:10},
						], 
					[{label:"Roll no", field:"rollno",colSpan:30}],
					[{label:"DOB", field:"dob",colSpan:30}],
					[{label:"address", field:"address",colSpan:30}
					]
			];
		}
```		
			
We can use it like this:
```js
		var StandardGrid = declare([Grid, Keyboard,DnD,ColumnHider]);	
		var treeGrid = window.treeGrid = new StandardGrid({
						sort: "id",
						store: testCountryStore,
						subRows:getSubRows(),
		}, "treeGrid");
```
**CONCLUSION:**
		By using the above segment of code, **columns** will be  **displayed vertically** instead of horizontally along with it's corresponding data.
	
**STEP 2:**
		Now, our task was to hide the header of those subrows.
**EXPLANATION:**
we want to hide the header of subrows being displayed, and it's corresponding data will be displayed on click of parent node.
```js
				treeGrid.styleColumn("1-0","display:none");
				treeGrid.styleColumn("2-0","display:none");
				treeGrid.styleColumn("3-0","display:none");
				treeGrid.styleColumn("4-0","display:none");								
				treeGrid.resize();
```
				                                                                                    
**CONCLUSION:**
   By using this, we succeed in hiding the header of subrows but the data corresponding to those subrows was not visible, that we didn't want to do.
   
**STEP 3:**
   Now our task was to get those data corresponding to subrows.
   
 **EXPLANATION:**
    we used the following code,
   ```js
    aspect.after(treeGrid, "insertRow", function(m, x){
	var _this = treeGrid;
	var _type = x[0].type;
	console.log("type is",_type);
	var _id= x[0].id;
	if(_type == "country") {
		console.log("id is", _id);
		setTimeout(function() {
			for(each in _this.columns) {
				console.log(_this.cell(_this.row(_id), each).column.id)
				if(_this.cell(_this.row(_id), each).column.id!="0-0") {
					if(_this.cell(_this.row(_id), each).element) {
				_this.cell(_this.row(_id), each).element.style.display="table-cell";
				if(_this.cell(_this.row(_id), each).column.id!="2-0"&&_this.cell(_this.row(_id), each).column.id!="1-0"&&_this.cell(_this.row(_id), each).column.id!="3-0"&&_this.cell(_this.row(_id), each).column.id!="4-0")
										{
											if(_this.cell(_this.row(_id), each).element) {
										_this.cell(_this.row(_id), each).element.remove();
										}
										}
									}
								}
							}
						}, 100)
					}
					return m
				});
```     
**CONCLUSION:**
 After this, we had the data and the header was hidden.
     
