/*
	drawdot v.1.1
	update: 19.11.2014
*/
function drawdot(canvasIdStr,_color)
{
	var draw = $("#"+canvasIdStr);
	var paint = false;
	var color = "#FF0000";
	if (_color) { color = _color;}
	var clickX = new Array();
	var clickY = new Array();
	var colorArr = new Array();
	var isEnabled = false;
	var clickDrag = new Array();
	context = document.getElementById(canvasIdStr).getContext("2d");
	
	//Public functions:
	this.enable = function()
	{
		isEnabled = true;
	}
	this.disable = function()
	{
		isEnabled = false;
	}
	this.color = function(_color)
	{
		color = _color;	
	}
	this.clear = function()
	{
		context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
	}
	this.dot = function(x,y)
	{
		paint = true;
		addClick(x, y);
		redraw();
	}
	//Private functions:
	draw.mousedown(function(e){
		if (isEnabled){
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;
				
			paint = true;
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			redraw();
		}
	});
	draw.mouseup(function(e){
	  paint = false;
	});
	draw.mouseleave(function(e){
	  paint = false;
	});
	function addClick(x, y, dragging)
	{
	  clickX.push(x);
	  clickY.push(y);
	  colorArr.push(color);
	}
	function redraw()
	{
		context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
		for(var i=0; i < clickX.length; i++) 
		{	
			context.beginPath();
			context.arc(clickX[i],clickY[i], 4, 0, 2 * Math.PI, true);
			context.fillStyle = colorArr[i];
			context.fill();
		}
	}	
}