#Before getting into your Projects

And lastly, you got your project and you are fermenting in a Team. But before making your first **MasterPiece** you should be conversant with the **basic prerequisites for prettifying your Code**.

We all are grouped into departments and teams. Although our tasks are different but in the end **these will be getting integrated into one Project**. In future some other person would be using or continuing with your code. It is thus necessary that your **work should not only be capable of working**, but it should also be **easy to Read and Understand** not neccessarily by other fellow developers but by the developer(who has developed the code) itself not only for now but in the future also.

Moreover, we are using **Sublime Text** as an Editor, we should know some **shortcuts** defined by it particularly to assist developers to **increase their efficiency** by decreasing their very tedious tasks like Multiple Edits, Auto Formatting/Indentation etc.

#What do we need to reproduce a Quality Code?

1. Naming Convention.
2. Documentation.
3. Code Formatting.
4. Sublime Keyboard Short Cuts.

#Naming Convention:

Let us take a Sample code

```js
var x = 5000
var y = a*b*c;
var z = x - y
```

#What did you get?
**hmmm, Nothing**.

Now, Check this

```js
var amount = 5000
var simpleInterest = principal * rateOfInterest * time;
var totalAmount = amount + simpleInterest
```

**Is it clear?**
I hope so

We use **CamelCase** for variables - **eg:** `totalAmount`

some better examples would be:

	defaultColorScheme
	isUserVerifiedByAdmin
	noDataMessage

In our Office, as our Product is using the **Dojo Toolkit**, We follow the *code convention followed or defined by* **Dojo**.

#Documentation

**Code convention**, helps in understanding what the code is doing, but the answer of **
How is it doing and Why we have done in this way is even dropping**.

**Documentation** of the code can be done to answer these queries.

Check out this code snippet.

```js
var amount = 5000;
var simpleInterest = principal * rateOfInterest * time;
var totalAmount = amount + simpleInterest
```

**How & Why?**

The above example is related to Mathematics, the developer may or may not have that in-depth knowledge of Mathematics, the developer may make some mistakes in Math formulas etc. The correct formula could be provided to developer in the two forms.

1. As a part of requirement
2. Allow developer to research it first and then implement it.

In **case 1:** the developer should be sure or confident what he/she is implementing. He can Cross Check his/her work by referencing the documentation.

In **case 2:** One can Cross Check,  whether the developer has implemented the formula correctly or not.

In either way or any other situation, documentation help us to understand what the developer has done and How he/she has done.

**Mathematical formula of calculating a Simple Interest**

**How:**

	Simple Interest = Principle Amount * Rate of Interest * Time Period

**Why:**

`The credit holder has to give a percentage of Interest after certain time period along with the Total Amount.`

`Interest is a fee paid by a borrower of assets to the owner as a form of compensation for the use of the assets.`

to calculate Total Amount to be paid, the formula is

	TotalAmount = Amount + Simple Interest

Same can be explained by adding **Documentation** to the code.

There might be some cases where developer has used some **Quick Fixes due to urgency** of work, one can **explain all those conditions and problems which lead him/her to use those quick fixes and how they could be solved in future**.

Let's say, we may need to change certain values for different Cases, we can **mention the exact Case in the documentation** as

1. For `Time `Period **less than** `5 years`
	**R** would be **5%**
2. For `Time Period` greater than or equal to `5 years` 
	**R** would be **8**%

#Code Formatting

PrettyFormatting or formatting of code in a Human Readable form.

Check this code **Snippet**
```js
_updateNotifyHandle: function(store){
if(this._notifyHandle){
this._notifyHandle.remove();
delete this._notifyHandle;
}
if(store && typeof store.notify === "function"){
this._notifyHandle = aspect.after(store, "notify",
lang.hitch(this, "_onNotify"), true);
}
}
```

**Is it easy to read?**
Nope.

**How about this?**

```js
_updateNotifyHandle: function(store){
	if(this._notifyHandle){
		this._notifyHandle.remove();
		delete this._notifyHandle;
	}

	if(store && typeof store.notify === "function"){
		this._notifyHandle = aspect.after(store, "notify", lang.hitch(this, "_onNotify"), true);
	}
}
```
**Indentation** helps making your code more **readable** and also **helps avoiding error of missing braces** etc. in the code.

#Subkime Shorcuts:

Will be added **ASAP**

