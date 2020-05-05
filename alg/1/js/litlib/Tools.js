/*
 * v0.1 

 Oprescul
 */

function Tools() {
}

Tools.rotateToPoint = function (domElement, pointObject, degreesOffset)
{
	if (degreesOffset == undefined) {degreesOffset=0}

	//measure the perpedincular sides of a right triangle
	var cx = pointObject.x - domElement.position().left;
	var cy = pointObject.y - domElement.position().top; 

	//trace(pointObject.x,pointObject.y)
	//trace(domElement.position().left, domElement.position().top)
			
	var Radians = Math.atan2(cy,cx);
	var Degrees = Radians * 180 / Math.PI + degreesOffset;
	trace(Degrees)

	domElement.css('-webkit-transform','rotate('+Degrees+'deg)'); 
 	domElement.css('-moz-transform','rotate('+Degrees+'deg)');
  	domElement.css('transform','rotate('+Degrees+'deg)');
}

Tools.getAngleToPoint = function (pointObject1, pointObject2)
{
	//measure the perpedincular sides of a right triangle
	var cx = pointObject2.x - pointObject1.x
	var cy = pointObject2.y - pointObject1.y 
			
	var Radians = Math.atan2(cy,cx);
	var Degrees = Radians * 180 / Math.PI;

	return Degrees
}

