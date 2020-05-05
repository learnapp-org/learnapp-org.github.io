/*
v0.5
	- added additiveRotation bool
v0.4
	- added yoyo rotation

	v0.3
	added yoyo method
	added transformOrigin method

 * v0.2
 //added error handling for advanced easing function

 * v0.1 

 Oprescul
 */
 //TODO:
 //- scaleTo
function TweenLit() {
}

TweenLit.slideTo = function (target, x, y, duration, ease, onCompleteCallback)
{
	if (ease == undefined) {ease="linear"}

	//needs jquery ui for more easing types
	else
	{ 
		if (!jQuery.ui)
		{
			console.log
			(
				'Warning: You are calling a tween with an advanced easing function other then "linear".	jQuery.ui needs to be loaded for advanced easing functions. -> falling back to "LINEAR"'
			);

			ease="linear";
		} 
	} 

    target.animate
        (
            {left: x, top: y},
            {duration: duration, queue: false, easing: ease, complete: onCompleteCallback}            
        )
}

TweenLit.rotateTo = function (target, degrees, duration, onCompleteCallback) //!MARKED AS SEMI-BROKEN
{
	target.animate
	(
		{rotationAmount: degrees},
		{
		    step: function(now,fx) 
		    		{				      
				      $(this).css
					    	(
					      		{
					      				'-ms-transform': 'rotate('+now+'deg)',
					      			'-webkit-transform': 'rotate('+now+'deg)',
					      			   '-moz-transform': 'rotate('+now+'deg)',
					      					'transform': 'rotate('+now+'deg)'
					      		}					      
					    	);
		   			},
		    duration: duration,
		    queue: false,
		    complete: onCompleteCallback,
		    easing: 'linear'
		}		
	)
}

TweenLit.alphaTo = function (target, alpha, duration, onCompleteCallback)
{
	target.animate
	(
		{opacity: alpha},
		{duration: duration, queue: false, complete:onCompleteCallback}		
	)
}

TweenLit.scaleTo = function (target, scaleFrom, scaleTo, duration, ease)
{	
	//default params
	if (ease == undefined) {ease="linear"};

	$({scaleChange: scaleFrom}).animate
			(
				{scaleChange: scaleTo},
				{
				   step:function(now,fx) 
				   		{
				   			target.css
					    	(
					      		{
					      				'-ms-transform': 'scale('+now+')',
					      			'-webkit-transform': 'scale('+now+')',
					      			   '-moz-transform': 'scale('+now+')',
					      				    'transform': 'scale('+now+')'
					      		}					      
					    	);
			   			},
					duration:duration,
					queue: false,
					easing: ease										    
				}
				
			)	
}

TweenLit.transformOrigin = function (target, originX, originY)
{	
	target.css
	(
		{
		    '-webkit-transform-origin': originX+'%'+' '+originY+'%', /* Chrome, Safari, Opera */ 
		   	    '-ms-transform-origin': originX+'%'+' '+originY+'%', /* IE 9 */      
		   			'transform-origin': originX+'%'+' '+originY+'%'
		}
	);
}


TweenLit.yoyo = function (target, property, startProp, endProp, speed)
{
	this.useAdditiveRotation = true;

	var isPlaying = false;
	var tweenInFunction;
	var tweenOutFunction;
	var animator;
	var currentPropValue = 0;
	var instance = this;

	switch(property) 
	{
		case 'alpha':
			//make sure the target is visible
			target.css("opacity", startProp);	
			target.css("display", "block");	

			//build animator method
			animator = function (propValue, onCompleteCallback)
			{
				target.animate
				(
					{opacity: propValue},
					{duration: speed, queue: false, complete: onCompleteCallback}		
				)				
			}

       		break;

       	case 'x':
			
			//build animator method
			animator = function (propValue, onCompleteCallback)
			{
				target.animate
				(
					{left: propValue},
					{duration: speed, queue: false, complete: onCompleteCallback}		
				)				
			}
       	break; 

       	case 'y':
			
			//build animator method
			animator = function (propValue, onCompleteCallback)
			{
				target.animate
				(
					{top: propValue},
					{duration: speed, queue: false, complete: onCompleteCallback}		
				)				
			}
       	break;   

       	case 'rotation':
       		animator = function (propValue, onCompleteCallback)       		
       		{
       			if (currentPropValue < -360) {currentPropValue = currentPropValue + 360; setCssRotation(currentPropValue)};
       			if (currentPropValue > 360) {currentPropValue = currentPropValue - 360; setCssRotation(currentPropValue)};
       			
       			var targetRotation;
       			if (instance.useAdditiveRotation){targetRotation = currentPropValue + propValue}
       				else{targetRotation = propValue};       			
       			
       			$({rotationAmount: currentPropValue}).animate
				(
					{rotationAmount: targetRotation},
					{
					    step: function(now,fx) 
					    		{					    						    			
							      setCssRotation(now);							      
					   			},
					    duration: speed,
					    queue: false,
					    complete: onCompleteCallback,
					    easing: 'linear'
					}
					
				)
				currentPropValue = targetRotation;

				function setCssRotation(deg)
				{
					target.css
					    	(
					      		{
					      				'-ms-transform': 'rotate('+deg+'deg)',
					      			'-webkit-transform': 'rotate('+deg+'deg)',
					      			   '-moz-transform': 'rotate('+deg+'deg)',
					      					'transform': 'rotate('+deg+'deg)'
					      		}					      
					    	);
				}
			}
       	break;
	}

	this.start = function (loopCount)
	{
		var loop = 0;  //FIX LOOP COUNTING

		isPlaying = true;
		var switchValue = false;
		var valueToTween = endProp;

		var recursiveAnimation = function()
		{
			if((loop-2)/2 == loopCount){isPlaying = false}

			if(isPlaying)
			{
				animator (switchValue ? startProp : endProp, recursiveAnimation);
				switchValue = !switchValue;
				loop++
			} 
			else if (switchValue)
			{
				animator (switchValue ? startProp : endProp, recursiveAnimation);
				switchValue = !switchValue;
				loop++
			}
			
		}

		//call the animator
		recursiveAnimation();
		loop++
		
	}

	this.stop = function ()
	{
		isPlaying = false;
	}
}

TweenLit.visible = function (target, value)
{
	if (value)	{target.css("display", "block")}
	else {target.css("display", "hidden")}	
}

